/* global jQuery */
(function ($) {
  "use strict";

  if (!$) {
    console.error("jQueryが読み込まれていません。");
    return;
  }

  $(function () {
    if (!$("body").hasClass("detail-page")) return;

    // ハンバーガーメニュー
    $("body").addClass("dt-enhanced");

    const $menu = $("#dt-navigation");
    const $menuButton = $(".dt-menu-button").prop("hidden", false);

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
      if (!$(event.target).closest(".dt-header").length) {
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

    // URLから募集IDを取得
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const auditions = window.STAGE_NOTE_AUDITIONS;

    $("#dt-loading").prop("hidden", true);

    // 未指定・存在しないIDの場合
    if (
      !id ||
      !auditions ||
      !Object.prototype.hasOwnProperty.call(auditions, id)
    ) {
      document.title = "募集が見つかりません｜STAGE NOTE";
      $("#dt-error").prop("hidden", false);
      return;
    }

    const audition = auditions[id];

    function formatDate(value) {
      return value.replace(/-/g, ".");
    }

    const deadline = formatDate(audition.deadline);

    // タイトル・説明
    document.title = audition.title + "｜STAGE NOTE";

    $('meta[name="description"]').attr(
      "content",
      audition.description + " ポートフォリオ用の架空の募集です。"
    );

    $("#dt-title, #dt-breadcrumb-title").text(audition.title);
    $("#dt-description").text(audition.description);

    $("#dt-category, #dt-summary-category").text(
      audition.category
    );

    $("#dt-experience").text(
      audition.beginner ? "未経験可" : "経験者向け"
    );

    $("#dt-category-link")
      .text(audition.category)
      .attr(
        "href",
        "audition.html?category=" +
          encodeURIComponent(audition.categoryKey)
      );

    // メインビジュアル
    $("#dt-visual").attr("data-tone", audition.tone);

    $("#dt-visual-category").text(
      "STAGE NOTE / " + audition.category
    );

    $("#dt-visual-title").text(audition.visualTitle);

    // ポイント
    const $points = $("#dt-points").empty();

    audition.points.forEach(function (point) {
      $("<li>").text(point).appendTo($points);
    });

    // 募集要項
    $("#dt-overview").text(audition.overview);
    $("#dt-qualification").text(audition.qualification);
    $("#dt-area, #dt-summary-area").text(audition.area);
    $("#dt-materials").text(audition.materials);
    $("#dt-fee").text(audition.fee);
    $("#dt-activity-terms").text(audition.activityTerms);
    $("#dt-organizer").text(audition.organizer);
    $("#dt-after").text(audition.after);

    $("#dt-deadline")
      .attr("datetime", audition.deadline)
      .text(deadline);

    $("#dt-summary-deadline").text(deadline);

    // 選考の流れ
    const $steps = $("#dt-steps").empty();

    audition.steps.forEach(function (step) {
      const $item = $("<li>");
      const $body = $("<div>");

      $("<h3>").text(step.title).appendTo($body);
      $("<p>").text(step.text).appendTo($body);

      $item.append($body).appendTo($steps);
    });

    // よくある質問
    const $faq = $("#dt-faq").empty();

    audition.faq.forEach(function (item) {
      const $details = $("<details>");

      $("<summary>")
        .text(item.question)
        .appendTo($details);

      $("<p>")
        .text(item.answer)
        .appendTo($details);

      $details.appendTo($faq);
    });

    // カテゴリーの現在位置
    $(".site-category a").each(function () {
      const url = new URL(this.href, window.location.href);

      if (
        url.searchParams.get("category") ===
        audition.categoryKey
      ) {
        $(this).attr("aria-current", "true");
      }
    });

    // ほかの募集を3件表示
    const $related = $("#dt-related-list").empty();

    Object.entries(auditions)
      .filter(function ([otherId]) {
        return otherId !== id;
      })
      .slice(0, 3)
      .forEach(function ([otherId, other]) {
        const $item = $("<li>");

        const $link = $("<a>").attr(
          "href",
          "application.html?id=" + encodeURIComponent(otherId)
        );

        $("<span>", {
          class: "dt-related-category",
        })
          .text(other.category)
          .appendTo($link);

        $("<h3>")
          .text(other.title)
          .appendTo($link);

        $("<span>", {
          class: "dt-related-link",
        })
          .text("詳細を見る →")
          .appendTo($link);

        $item.append($link).appendTo($related);
      });

    $("#dt-content").prop("hidden", false);

    // 詳細項目への直接リンクにも対応
    const hash = window.location.hash.slice(1);

    if (hash) {
      const target = document.getElementById(hash);

      if (
        target &&
        document.getElementById("dt-content").contains(target)
      ) {
        target.scrollIntoView({ block: "start" });
      }
    }
  });
})(window.jQuery);