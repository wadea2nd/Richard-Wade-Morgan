/* Light / dark toggle.
   - The saved choice (localStorage) wins; otherwise the site opens in light.
   - Every color eases between the two together (tokens.css, section 0), so
     header, body, and menus never fall out of step. */

const KEY = "rwm-theme";
const root = document.documentElement;

const current = () => (root.dataset.theme === "dark" ? "dark" : "light");

function syncChrome() {
  const dark = current() === "dark";
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(dark));
  });
  /* Tint the browser UI (mobile address bar) to the page color. */
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue(dark ? "--night-900" : "--paper-100").trim());
}

function apply(next) {
  root.dataset.theme = next;
  try { localStorage.setItem(KEY, next); } catch (e) { /* storage blocked */ }
  syncChrome();
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
}

function toggle() {
  /* The colors themselves ease between the two themes (see tokens.css), so
     switching is just a change of the theme name. */
  apply(current() === "dark" ? "light" : "dark");
}

export function initTheme() {
  syncChrome();
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => btn.addEventListener("click", toggle));
}
