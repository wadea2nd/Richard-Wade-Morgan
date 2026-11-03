/* Navigation: the mobile menu and the footer year. */

import { openAccordion } from "./accordion.js";

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
  if (found) openAccordion(document.querySelector(".nav__group"));
}
