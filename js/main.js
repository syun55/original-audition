/* global jQuery */
(function ($) {
    "use strict";

    if (!$) {
        console.error("jQueryが読み込まれていません。");
        return;
    }

    $(function () {
        if (!$("body").hasClass("home-page")) return;

        // ハンバーガーメニュー
        const $menuButton = $(".hamburger-menu-button");
        const $menu = $("#main-menu");

        function closeMenu(returnFocus = false) {
            $menu.removeClass("is-active");

            $menuButton
                .attr({
                    "aria-expanded": "false",
                    "aria-label": "メニューを開く",
                })
                .text("☰");

            if (returnFocus) $menuButton.trigger("focus");
        }

        $menuButton.on("click", function () {
            const open = $(this).attr("aria-expanded") !== "true";

            $menu.toggleClass("is-active", open);

            $(this)
                .attr({
                    "aria-expanded": String(open),
                    "aria-label": open ? "メニューを閉じる" : "メニューを開く",
                })
                .text(open ? "×" : "☰");
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
            if (!$(event.target).closest("header").length) {
                closeMenu();
            }
        });

        window
            .matchMedia("(min-width: 1025px)")
            .addEventListener("change", function (event) {
                if (event.matches) closeMenu();
            });

        // メインスライダー
        const $slider = $(".main-group");
        const $toggle = $(".slide-toggle");
        const reducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );

        // OSで動きを減らす設定の場合は、自動再生を停止して開始
        let isPlaying = !reducedMotion.matches;

        function updatePlayButton() {
            $toggle
                .text(isPlaying ? "Ⅱ" : "▶")
                .attr(
                    "aria-label",
                    isPlaying
                        ? "自動スライドを一時停止"
                        : "自動スライドを再生"
                );
        }

        if (!$.fn.slick) {
            console.error(
                "Slickが読み込まれていません。HTMLのscriptタグを確認してください。"
            );
        } else if (
            $slider.length &&
            !$slider.hasClass("slick-initialized")
        ) {
            $slider.slick({
                // 中央のカードと、左右のカードの一部を表示
                centerMode: true,
                centerPadding: "0px",
                variableWidth: true,
                slidesToShow: 1,
                slidesToScroll: 1,

                // 繰り返し・自動再生
                infinite: true,
                autoplay: isPlaying,
                autoplaySpeed: 3500,
                speed: reducedMotion.matches ? 0 : 600,
                cssEase: "ease-in-out",

                // 読んでいる間・操作している間は止める
                pauseOnHover: true,
                pauseOnFocus: true,

                // スマホでスワイプ可能
                swipe: true,
                touchMove: true,

                arrows: true,
                dots: false,
                accessibility: true,

                prevArrow: $(".slide-prev"),
                nextArrow: $(".slide-next"),
            });

            $(".slider-controls").addClass("is-ready");
            updatePlayButton();

            // 一時停止・再生ボタン
            $toggle.on("click", function () {
                isPlaying = !isPlaying;

                $slider.slick(
                    isPlaying ? "slickPlay" : "slickPause"
                );

                updatePlayButton();
            });

            // OSの「視差効果を減らす」設定が変わった場合
            reducedMotion.addEventListener("change", function (event) {
                $slider.slick(
                    "slickSetOption",
                    "speed",
                    event.matches ? 0 : 600,
                    false
                );

                if (event.matches) {
                    isPlaying = false;
                    $slider.slick("slickPause");
                    updatePlayButton();
                }
            });

            // 画像などの読み込み完了後に位置を再計算
            $(window).on("load", function () {
                $slider.slick("setPosition");
            });
        }

        // オーディション一覧のタブ切り替え
        const $tabs = $(".audition-tabs .tab-button");
        const $panels = $(".audition-container");

        function activateTab($tab, focus = false) {
            const panel = document.getElementById(
                $tab.attr("aria-controls")
            );

            if (!panel) return;

            $tabs
                .removeClass("active")
                .attr({
                    "aria-selected": "false",
                    tabindex: "-1",
                });

            $tab
                .addClass("active")
                .attr({
                    "aria-selected": "true",
                    tabindex: "0",
                });

            $panels.removeClass("active").prop("hidden", true);
            $(panel).addClass("active").prop("hidden", false);

            if (focus) $tab.trigger("focus");
        }

        $tabs.on("click", function () {
            activateTab($(this));
        });

        $tabs.on("keydown", function (event) {
            const current = $tabs.index(this);
            let next;

            switch (event.key) {
                case "ArrowRight":
                    next = (current + 1) % $tabs.length;
                    break;
                case "ArrowLeft":
                    next = (current - 1 + $tabs.length) % $tabs.length;
                    break;
                case "Home":
                    next = 0;
                    break;
                case "End":
                    next = $tabs.length - 1;
                    break;
                default:
                    return;
            }

            event.preventDefault();
            activateTab($tabs.eq(next), true);
        });

        activateTab($tabs.first());
    });
})(window.jQuery);