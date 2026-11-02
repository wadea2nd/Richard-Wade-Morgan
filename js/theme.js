/* Light / dark toggle.
   - The saved choice (localStorage) wins; otherwise the OS preference.
   - With the View Transitions API (Chromium, Safari 18+) the new theme
     expands as a circle from the toggle button. Elsewhere, and for visitors
     who prefer reduced motion, colors simply ease or switch instantly. */

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
}

function toggle(event) {
  const next = current() === "dark" ? "light" : "dark";

  if (!document.startViewTransition || prefersReducedMotion()) {
    if (prefersReducedMotion()) { apply(next); return; }
    root.classList.add("theme-transition");
    apply(next);
    window.setTimeout(() => root.classList.remove("theme-transition"), 600);
    return;
  }

  const rect = event.currentTarget.getBoundingClientRect();
  const x = rect.left + rect.width / 2;
  const y = rect.top + rect.height / 2;
  const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  const transition = document.startViewTransition(() => apply(next));
  transition.ready
    .then(() => {
      root.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 750, easing: "cubic-bezier(0.65, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    })
    .catch(() => { /* transition skipped: the theme has still been applied */ });
}

export function initTheme() {
  syncChrome();
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => btn.addEventListener("click", toggle));

  /* Follow the OS if the visitor hasn't made a choice of their own. */
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", (e) => {
    let saved = null;
    try { saved = localStorage.getItem(KEY); } catch (err) { /* ignore */ }
    if (!saved) { root.dataset.theme = e.matches ? "dark" : "light"; syncChrome(); }
  });
}
