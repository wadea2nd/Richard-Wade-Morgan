/* Light / dark toggle.
   - The saved choice (localStorage) wins; otherwise the site opens in light.
   - The new theme is revealed by a growing circle from the button (View
     Transitions); elsewhere every color eases together (tokens.css,
     section 0), so header, body, and menus never fall out of step. */

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

/* Switching themes. On a phone the change is instant (the status bar and page
   switch together on the next frame). On a larger screen, where the browser
   supports View Transitions, the new theme is revealed by a circle growing out
   of the button, with no grey half-way blend. Elsewhere the colors ease between
   the two (tokens.css). */
const phone = window.matchMedia("(max-width: 51.999rem)");
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function toggle(event) {
  const next = current() === "dark" ? "light" : "dark";

  /* On a phone the change is instant: the status bar and the page take the new
     theme on the very next frame, with no reveal to wait for. */
  if (prefersReducedMotion() || phone.matches || !document.startViewTransition) {
    apply(next);
    return;
  }

  const box = (event.currentTarget || document.body).getBoundingClientRect();
  const x = box.left + box.width / 2;
  const y = box.top + box.height / 2;
  const reach = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

  root.classList.add("theme-reveal");           /* no color easing underneath the reveal */
  const transition = document.startViewTransition(() => apply(next));
  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${Math.ceil(reach)}px at ${x}px ${y}px)`] },
      { duration: 800, easing: "cubic-bezier(0.22, 1, 0.36, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  }).catch(() => {});
  transition.finished.catch(() => {}).finally(() => root.classList.remove("theme-reveal"));
}

export function initTheme() {
  syncChrome();
  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => btn.addEventListener("click", toggle));
}
