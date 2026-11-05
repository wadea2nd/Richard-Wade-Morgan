/* Light / dark toggle.
   - The saved choice (localStorage) wins; otherwise the site opens in light.
   - The whole page crossfades between the two (View Transitions API where
     supported; otherwise every color eases over the same duration). */

const KEY = "rwm-theme";
const root = document.documentElement;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const current = () => (root.dataset.theme === "dark" ? "dark" : "light");

function syncChrome() {
  const dark = current() === "dark";
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", String(dark));
  });
  /* Tint the browser UI (mobile address bar) to the page color. */
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute("content", getComputedStyle(root).getPropertyValue("--color-bg").trim());
}

function apply(next) {
  root.dataset.theme = next;
  try { localStorage.setItem(KEY, next); } catch (e) { /* storage blocked */ }
  syncChrome();
  document.dispatchEvent(new CustomEvent("themechange", { detail: { theme: next } }));
}

function toggle() {
  const next = current() === "dark" ? "light" : "dark";

  if (prefersReducedMotion()) { apply(next); return; }

  if (document.startViewTransition) {
    /* The crossfade can be skipped (for example if the tab is hidden); the
       theme still changes, so those rejections are safe to ignore. */
    const transition = document.startViewTransition(() => apply(next));
    transition.ready.catch(() => {});
    transition.finished.catch(() => {});
    return;
  }

  root.classList.add("theme-transition");
  apply(next);
  window.setTimeout(() => root.classList.remove("theme-transition"), 800);
}

export function initTheme() {
  syncChrome();
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => btn.addEventListener("click", toggle));
}
