/* global jQuery */
(function ($) {
  "use strict";

  if (!$) {
    console.error("jQueryが読み込まれていません。");
    return;
  }

  $(function () {
    if (!$("body").hasClass("search-page")) return;

    // ハンバーガーメニュー
    $("body").addClass("ag-enhanced");

    const $menu = $("#ag-navigation");
    const $menuButton = $(".ag-menu-button").prop("hidden", false);

    function closeMenu() {
      $menu.removeClass("is-active");

      $menuButton
        .attr("aria-expanded", "false")
        .text("メニュー");
    }

    $menuButton.on("click", function () {
      const open = $(this).attr("aria-expanded") !== "true";

      $menu.toggleClass("is-active", open);

      $(this)
        .attr("aria-expanded", String(open))
        .text(open ? "閉じる" : "メニュー");
    });

    $menu.on("click", "a", closeMenu);

    $(document).on("click", function (event) {
      if (!$(event.target).closest(".ag-header").length) {
        closeMenu();
      }
    });

    $(document).on("keydown", function (event) {
      if (
        event.key === "Escape" &&
        $menu.hasClass("is-active")
      ) {
        closeMenu();
        $menuButton.trigger("focus");
      }
    });

    window
      .matchMedia("(min-width: 1025px)")
      .addEventListener("change", closeMenu);

    // 検索
    const $form = $("#agency-search");
    const $keyword = $("#ag-keyword");
    const $genre = $("#ag-genre");
    const $sections = $("#ag-results .ag-section");
    const $cards = $sections.find(".ag-card");

    function normalize(value) {
      return String(value)
        .normalize("NFKC")
        .toLowerCase()
        .replace(/\s+/g, " ")
        .trim();
    }

    // 検索用テキストを最初に準備
    const searchTexts = new Map();

    $cards.each(function () {
      const text = [
        $(this).find("h3").text(),
        $(this).find(".ag-platform").text(),
        $(this).find(".ag-area").text(),
        $(this).find(".ag-card-description").text(),
        $(this).find(".ag-tags").text(),
        $(this).find("details p").text(),
      ].join(" ");

      searchTexts.set(this, normalize(text));
    });

    function filterAgencies() {
      const query = normalize($keyword.val());
      const words = query ? query.split(" ") : [];
      const genre = $genre.val();

      let total = 0;

      $sections.each(function () {
        const $section = $(this);

        const genreMatches =
          genre === "all" ||
          $section.attr("data-genre") === genre;

        let sectionCount = 0;

        $section.find(".ag-card").each(function () {
          const text = searchTexts.get(this);

          const keywordMatches = words.every(function (word) {
            return text.includes(word);
          });

          const visible = genreMatches && keywordMatches;

          $(this).prop("hidden", !visible);

          if (visible) sectionCount += 1;
        });

        $section.prop("hidden", sectionCount === 0);
        $section.find(".ag-section-count").text(sectionCount + "件");

        total += sectionCount;
      });

      $("#ag-count").text(
        total + "件の事務所が見つかりました"
      );

      $("#ag-empty").prop("hidden", total !== 0);
    }

    $form.find("fieldset").prop("disabled", false);

    $form.on("submit", function (event) {
      event.preventDefault();
      filterAgencies();
    });

    $genre.on("change", filterAgencies);

    $form.on("reset", function () {
      // resetイベント後に入力値が初期化されるため、
      // 次のタイミングで表示を更新する
      window.setTimeout(function () {
        filterAgencies();
        $keyword.trigger("focus");
      }, 0);
    });

    // ジャンル別リンク：
    // 検索で非表示になっていても対象の一覧を表示する
    $(".ag-jump").on("click", "a", function (event) {
      const id = this.hash.slice(1);
      const target = document.getElementById(id);

      if (!target || !$(target).is(".ag-section")) return;

      event.preventDefault();

      $keyword.val("");
      $genre.val("all");
      filterAgencies();

      target.scrollIntoView({ block: "start" });

      $(target)
        .find("h2")
        .attr("tabindex", "-1")
        .trigger("focus");
    });

    filterAgencies();
  });
})(window.jQuery);