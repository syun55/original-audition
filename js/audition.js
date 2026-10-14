/* global jQuery */
(function ($) {
  "use strict";

  if (!$) {
    console.error("jQueryが読み込まれていません。");
    return;
  }

  $(function () {
    const $body = $(".audition-page");
    if (!$body.length) return;

    const $form = $("#search-form");
    const $grid = $("#au-results");
    const $more = $("#au-more");
    const $keyword = $("#au-keyword");
    const $category = $("#au-category");
    const $beginner = $("#au-beginner");
    const $sort = $("#au-sort");

    const cards = $grid.children(".au-card").get();
    const pageSize = 6;

    let matches = cards.slice();
    let shown = pageSize;

    // 全角・半角、大文字・小文字の違いを揃える
    function normalize(value) {
      return String(value)
        .normalize("NFKC")
        .toLowerCase()
        .trim();
    }

    // 検索結果を表示
    function render() {
      cards.forEach(function (card) {
        card.hidden = true;
      });

      matches.forEach(function (card, index) {
        $grid.append(card);
        card.hidden = index >= shown;
      });

      $("#au-count").text(
        `${matches.length}件中 ${Math.min(shown, matches.length)}件を表示`
      );

      $(".au-empty").prop("hidden", matches.length !== 0);
      $more.prop("hidden", shown >= matches.length);
    }

    // 並び替え
    function sortResults() {
      const order = $sort.val();

      matches.sort(function (a, b) {
        if (order === "deadline") {
          return (
            a.dataset.deadline.localeCompare(b.dataset.deadline) ||
            Number(a.dataset.order) - Number(b.dataset.order)
          );
        }

        return Number(a.dataset.order) - Number(b.dataset.order);
      });
    }

    // キーワード・カテゴリ・未経験可で絞り込み
    function search() {
      const words = normalize($keyword.val())
        .split(/\s+/)
        .filter(Boolean);

      const category = $category.val();
      const beginnerOnly = $beginner.prop("checked");

      matches = cards.filter(function (card) {
        const data = card.dataset;

        const categoryMatches =
          category === "all" || data.category === category;

        const beginnerMatches =
          !beginnerOnly || data.beginner === "true";

        const keywordMatches = words.every(function (word) {
          return normalize(data.search).includes(word);
        });

        return categoryMatches && beginnerMatches && keywordMatches;
      });

      shown = pageSize;
      sortResults();
      render();

      // 上部カテゴリ帯の選択状態
      $("[data-category-link]").each(function () {
        if (this.dataset.categoryLink === category) {
          $(this).attr("aria-current", "true");
        } else {
          $(this).removeAttr("aria-current");
        }
      });
    }

    // 検索ボタン・Enterキー
    $form.on("submit", function (event) {
      event.preventDefault();
      search();
    });

    // カテゴリ・チェックボックス変更時
    $category.add($beginner).on("change", search);

    // 並び順変更時
    $sort.on("change", function () {
      shown = pageSize;
      sortResults();
      render();
    });

    // 条件をクリア
    $form.on("reset", function () {
      // フォームの値が初期化された後に検索する
      window.setTimeout(function () {
        $sort.val("new");
        search();
      }, 0);
    });

    // 検索結果が0件の場合のリセット
    $("#au-empty-reset").on("click", function () {
      $form[0].reset();
      $keyword.trigger("focus");
    });

    // もっと見る
    $more.on("click", function () {
      const firstNewCard = matches[shown];

      shown += pageSize;
      render();

      if (firstNewCard) {
        $(firstNewCard).find("a").first().trigger("focus");
      }
    });

    // 上部のカテゴリ帯
    $("[data-category-link]").on("click", function (event) {
      // 新しいタブで開く操作などは妨げない
      if (
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      event.preventDefault();

      $category.val(this.dataset.categoryLink);
      search();
      $category.trigger("focus");
    });

    // URLのカテゴリ指定を反映
    // 例：audition.html?category=voice
    const initialCategory = new URLSearchParams(
      window.location.search
    ).get("category");

    const validCategory = $category
      .find("option")
      .get()
      .some(function (option) {
        return option.value === initialCategory;
      });

    if (validCategory) {
      $category.val(initialCategory);
    }

    // JavaScriptの準備完了後に操作を有効化
    $body.addClass("au-enhanced");
    $form.find("fieldset").prop("disabled", false);
    $sort.prop("disabled", false);

    search();

    // ハンバーガーメニュー
    const $toggle = $(".au-menu-toggle").prop("hidden", false);
    const $nav = $("#au-navigation");

    function closeMenu(returnFocus = false) {
      $toggle
        .attr("aria-expanded", "false")
        .text("メニュー");

      $nav.removeClass("is-open");

      if (returnFocus) {
        $toggle.trigger("focus");
      }
    }

    $toggle.on("click", function () {
      const open = $(this).attr("aria-expanded") !== "true";

      $(this)
        .attr("aria-expanded", String(open))
        .text(open ? "閉じる ×" : "メニュー");

      $nav.toggleClass("is-open", open);
    });

    $nav.on("click", "a", function () {
      closeMenu();
    });

    // Escapeキーで閉じる
    $(document).on("keydown", function (event) {
      if (
        event.key === "Escape" &&
        $toggle.attr("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    // ヘッダーの外をクリックしたら閉じる
    $(document).on("click", function (event) {
      if (!$(event.target).closest(".au-header").length) {
        closeMenu();
      }
    });

    // PC幅になったら開閉状態をリセット
    window
      .matchMedia("(min-width: 1025px)")
      .addEventListener("change", function (event) {
        if (event.matches) {
          closeMenu();
        }
      });
  });
})(window.jQuery);