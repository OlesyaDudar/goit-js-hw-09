!function(){var t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]"),n=document.body,a=null;function o(){n.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0))}t.addEventListener("click",(function(){o(),a=setInterval(o,1e3),t.disabled=!0})),e.addEventListener("click",(function(){clearInterval(a),t.disabled=!1}))}();
//# sourceMappingURL=01-color-switcher.724cd6a3.js.map
