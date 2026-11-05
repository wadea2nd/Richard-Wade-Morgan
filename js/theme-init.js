/* Runs synchronously in <head>, before first paint.
   - Picks the theme: the visitor's saved choice, otherwise LIGHT (the site
     always opens in light mode, whatever the device prefers).
   - Marks the page as scripted ("js") so the entrance animation can hold
     content back safely, and arms a failsafe: if the main scripts have not
     run after 3 seconds, "motion-failed" and "is-ready" show everything. */
(function () {
  var root = document.documentElement;
  var theme = "light";

  try {
    var saved = localStorage.getItem("rwm-theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) { /* storage blocked: stay light */ }

  root.setAttribute("data-theme", theme);
  root.classList.add("js");

  /* The name, menu, and controls only make their entrance on the first page of
     a visit; after that they are simply there while pages change. */
  try { if (sessionStorage.getItem("rwm-entered")) root.classList.add("chrome-seen"); } catch (e) { /* ignore */ }

  setTimeout(function () {
    if (!root.classList.contains("motion-ready")) root.classList.add("motion-failed", "is-ready");
  }, 3000);
})();
