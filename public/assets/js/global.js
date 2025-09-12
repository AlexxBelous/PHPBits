// <script id="__bs_script__">//<![CDATA[
//     (function () {
//         try {
//         var script = document.createElement('script');
//         if ('async') {
//         script.async = true;
//     }
//         script.src = 'http://HOST:3002/browser-sync/browser-sync-client.js?v=3.0.4'.replace("HOST", location.hostname);
//         if (document.body) {
//         document.body.appendChild(script);
//     } else if (document.head) {
//         document.head.appendChild(script);
//     }
//     } catch (e) {
//         console.error("Browsersync: could not append script tag", e);
//     }
//     })()
//     //]]></script>

document.addEventListener("DOMContentLoaded", () => {
    const answerTitle = document.querySelector(".answer-title");
    const code = document.querySelector("code");

    if (answerTitle && code) {
        answerTitle.addEventListener("click", () => {
            if (code.classList.contains("open")) {
                code.style.maxHeight = "0";
                code.classList.remove("open");
            } else {
                code.style.maxHeight = code.scrollHeight + "px"; // подстраивается под контент
                code.classList.add("open");
            }
        });
    }
});



