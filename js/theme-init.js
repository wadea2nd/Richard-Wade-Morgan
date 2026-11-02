/* Runs synchronously in <head>, before first paint.
   - Picks the theme (saved choice, else the OS preference) so a dark-mode
     visitor never sees a flash of light.
   - Marks the page as scripted ("js") so the reveal animation can hide
     content safely, and arms a failsafe: if the main scripts have not run
     after 3 seconds, "motion-failed" reveals everything. */
(function () {
  var root = document.documentElement;
  var theme = null;

  try {
    var saved = localStorage.getItem("rwm-theme");
    if (saved === "light" || saved === "dark") theme = saved;
  } catch (e) { /* storage blocked: fall through */ }

  if (!theme) {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  root.setAttribute("data-theme", theme);
  root.classList.add("js");

  setTimeout(function () {
    if (!root.classList.contains("motion-ready")) root.classList.add("motion-failed");
  }, 3000);
})();
