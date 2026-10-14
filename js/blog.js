/* global jQuery */
(function ($) {
    "use strict";

    if (!$) {
        console.error("jQueryが読み込まれていません。");
        return;
    }

    $(function () {
        if (!$("body").hasClass("blog-page")) return;

        // ハンバーガーメニュー
        $("body").addClass("bl-enhanced");

        const $menu = $("#bl-navigation");
        const $toggle = $(".bl-menu-toggle").prop("hidden", false);

        function closeMenu() {
            $menu.removeClass("is-active");

            $toggle
                .attr("aria-expanded", "false")
                .text("メニュー");
        }

        $toggle.on("click", function () {
            const open = $(this).attr("aria-expanded") !== "true";

            $menu.toggleClass("is-active", open);

            $(this)
                .attr("aria-expanded", String(open))
                .text(open ? "閉じる" : "メニュー");
        });

        $menu.on("click", "a", closeMenu);

        $(document).on("keydown", function (event) {
            if (
                event.key === "Escape" &&
                $menu.hasClass("is-active")
            ) {
                closeMenu();
                $toggle.trigger("focus");
            }
        });

        $(document).on("click", function (event) {
            if (!$(event.target).closest(".bl-header").length) {
                closeMenu();
            }
        });

        window
            .matchMedia("(min-width: 1025px)")
            .addEventListener("change", closeMenu);

        // 記事のカテゴリー絞り込み
        const $cards = $(".bl-grid .bl-card");
        const $filters = $("[data-filter]");
        const $more = $(".bl-more");

        let topic = "all";
        let limit = 6;

        function render() {
            const $matched = $cards.filter(function () {
                return (
                    topic === "all" ||
                    $(this).attr("data-topic") === topic
                );
            });

            $cards.prop("hidden", true);
            $matched.slice(0, limit).prop("hidden", false);

            $filters.each(function () {
                const selected =
                    $(this).attr("data-filter") === topic;

                $(this).attr("aria-pressed", String(selected));
            });

            $("#bl-count").text(
                $matched.length +
                "件中 " +
                Math.min(limit, $matched.length) +
                "件を表示"
            );

            $more.prop("hidden", limit >= $matched.length);

            return $matched;
        }

        $(".bl-filters").prop("hidden", false);

        $filters.on("click", function () {
            topic = $(this).attr("data-filter");
            limit = 6;
            render();
        });

        // 「もっと見る」で記事を追加表示
        $more.on("click", function () {
            const previous = limit;
            limit += 6;

            render()
                .eq(previous)
                .find("summary")
                .trigger("focus");
        });

        // おすすめの記事から本文を開く
        function revealArticle() {
            const card = document.getElementById(
                window.location.hash.slice(1)
            );

            if (!card || !$(card).is(".bl-grid .bl-card")) {
                return;
            }

            topic = "all";
            limit = Math.max(6, $cards.index(card) + 1);

            render();

            $(card).find("details").prop("open", true);
            card.scrollIntoView({ block: "start" });
            $(card).find("summary").trigger("focus");
        }

        $(window).on("hashchange", revealArticle);

        $(".bl-pick-card").on("click", function () {
            if (this.hash === window.location.hash) {
                revealArticle();
            }
        });

        // 初期表示
        render();
        revealArticle();
    });
})(window.jQuery);