(function () {
    "use strict";

    const loader = document.getElementById("sn-loading");

    if (!loader) return;

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    );

    // 動きを減らす設定の場合は演出を省略
    if (reducedMotion.matches) return;

    // 同じタブでトップページへ戻ったときは再表示しない
    const storageKey = "stage-note-loading-seen";

    try {
        if (sessionStorage.getItem(storageKey) === "1") return;
    } catch {
        // ストレージが使えない場合もページを表示する
    }

    loader.hidden = false;

    const startedAt = performance.now();
    const minimumDuration = 2400;
    const maximumDuration = 7000;

    let finished = false;
    let finishTimer;

    function finishLoading() {
        if (finished) return;

        finished = true;

        clearTimeout(finishTimer);
        clearTimeout(safetyTimer);

        loader.classList.add("is-leaving");

        try {
            sessionStorage.setItem(storageKey, "1");
        } catch {
            // 保存できなくても終了処理は継続する
        }

        window.setTimeout(function () {
            loader.hidden = true;
        }, 500);

        document.removeEventListener("keydown", handleKeydown);
        window.removeEventListener("load", handleLoaded);
        window.removeEventListener("pageshow", handlePageShow);
    }

    function handleLoaded() {
        const elapsed = performance.now() - startedAt;
        const remaining = Math.max(0, minimumDuration - elapsed);

        finishTimer = window.setTimeout(finishLoading, remaining);
    }

    function handleKeydown(event) {
        // キーボード操作を始めたらページを表示
        if (event.key === "Escape" || event.key === "Tab") {
            finishLoading();
        }
    }

    function handlePageShow(event) {
        if (event.persisted) finishLoading();
    }

    // 画像などの読み込みが遅くても、最大4秒で終了
    const safetyTimer = window.setTimeout(
        finishLoading,
        maximumDuration
    );

    document.addEventListener("keydown", handleKeydown);
    window.addEventListener("pageshow", handlePageShow);

    if (document.readyState === "complete") {
        handleLoaded();
    } else {
        window.addEventListener("load", handleLoaded, { once: true });
    }
})();