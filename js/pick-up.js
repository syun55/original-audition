/* global jQuery */

(function ($) {
  "use strict";

  if (!$) {
    console.error("jQueryが読み込まれていません。");
    return;
  }

  $(function () {
    const $page = $(".pickup-page");

    if (!$page.length) return;

    $page.addClass("has-js");

    // ハンバーガーメニュー
    const $menuButton = $(".pu-menu-button");
    const $menu = $("#main-menu");
    const desktop = window.matchMedia("(min-width: 1025px)");

    $menuButton.prop("hidden", false);

    function closeMenu(returnFocus = false) {
      $menu.removeClass("is-active");

      $menuButton
        .attr({
          "aria-expanded": "false",
          "aria-label": "メニューを開く",
        })
        .text("☰");

      if (returnFocus) {
        $menuButton.trigger("focus");
      }
    }

    $menuButton.on("click", function () {
      const isOpen = $(this).attr("aria-expanded") !== "true";

      $menu.toggleClass("is-active", isOpen);

      $(this)
        .attr({
          "aria-expanded": String(isOpen),
          "aria-label": isOpen
            ? "メニューを閉じる"
            : "メニューを開く",
        })
        .text(isOpen ? "×" : "☰");
    });

    $menu.on("click", "a", function () {
      closeMenu();
    });

    $(document).on("keydown", function (event) {
      if (
        event.key === "Escape" &&
        $menuButton.attr("aria-expanded") === "true"
      ) {
        closeMenu(true);
      }
    });

    $(document).on("click", function (event) {
      if (!$(event.target).closest(".pu-header").length) {
        closeMenu();
      }
    });

    desktop.addEventListener("change", function (event) {
      if (event.matches) {
        closeMenu();
      }
    });

    // カテゴリー絞り込み
    const $filters = $(".pu-filters");
    const $filterButtons = $filters.find("button");
    const $cards = $(".pu-card");
    const $count = $("#pickup-count");
    const $empty = $(".pu-empty");

    $filters.prop("hidden", false);

    function applyFilter(category) {
      let visibleCount = 0;

      $cards.each(function () {
        const $card = $(this);

        const isVisible =
          category === "all" ||
          $card.attr("data-category") === category;

        $card.prop("hidden", !isVisible);

        if (isVisible) {
          visibleCount += 1;
        }
      });

      $filterButtons.each(function () {
        const isSelected =
          $(this).attr("data-filter") === category;

        $(this).attr("aria-pressed", String(isSelected));
      });

      $count.text(`${visibleCount}件の募集`);
      $empty.prop("hidden", visibleCount !== 0);
    }

    $filterButtons.on("click", function () {
      applyFilter($(this).attr("data-filter"));
    });

    applyFilter("all");
  });
})(window.jQuery);