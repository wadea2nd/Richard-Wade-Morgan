/* Navigation: the mobile menu, the "Work" accordion, and the footer year. */

export function initNav() {
  const button = document.querySelector(".menu-toggle");
  const drawer = document.getElementById("drawer");
  const main = document.getElementById("main");
  if (!button || !drawer) return;

  const narrow = window.matchMedia("(max-width: 51.999rem)");

  function setOpen(open) {
    drawer.classList.toggle("is-open", open);
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute("aria-label", open ? "Close menu" : "Menu");
    document.body.classList.toggle("menu-open", open);
    /* While the menu covers the page, the page behind it is inert. */
    if (main) main.inert = open && narrow.matches;
  }

  button.addEventListener("click", () => setOpen(!drawer.classList.contains("is-open")));

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && drawer.classList.contains("is-open")) {
      setOpen(false);
      button.focus();
    }
  });

  /* Rotating the phone or resizing past the breakpoint resets the menu. */
  narrow.addEventListener("change", () => setOpen(false));

  setOpen(false);
}

/* "Work" accordion. A mouse hovering over the button opens it (after a short
   pause, so sweeping past doesn't); clicking or tapping toggles it. It never
   closes on its own: closing is always a click. Touch has no hover, so it
   simply toggles. */
let workToggle = null;
let workPanel = null;

function setWork(open) {
  if (!workToggle || !workPanel) return;
  workToggle.setAttribute("aria-expanded", String(open));
  workPanel.classList.toggle("is-open", open);
}

export function initWork() {
  workToggle = document.querySelector("[data-nav-toggle]");
  workPanel = workToggle && document.getElementById(workToggle.getAttribute("aria-controls"));
  if (!workToggle || !workPanel) return;

  let hoverTimer = null;

  workToggle.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse") return;
    window.clearTimeout(hoverTimer);
    hoverTimer = window.setTimeout(() => setWork(true), 140);
  });
  workToggle.addEventListener("pointerleave", () => window.clearTimeout(hoverTimer));

  workToggle.addEventListener("click", () => {
    window.clearTimeout(hoverTimer);
    setWork(workToggle.getAttribute("aria-expanded") !== "true");
  });
}

export function initYear() {
  document.querySelectorAll("[data-year]").forEach((el) => {
    el.textContent = String(new Date().getFullYear());
  });
}

/* Marks the nav link for the current project as the current page, and opens
   the Work list so it is visible. */
export function markCurrent(slug) {
  let found = false;
  document.querySelectorAll(".nav__link[data-slug]").forEach((link) => {
    if (link.dataset.slug === slug) { link.setAttribute("aria-current", "page"); found = true; }
    else link.removeAttribute("aria-current");
  });
  if (found) setWork(true);
}
