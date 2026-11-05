/* Accordions: the "Work" item in the menu and the tabs on the About page.

   Markup: an element with [data-accordion] holding a button with
   [data-accordion-toggle] (aria-controls → the panel's id) and the panel.

   Firm click-on, click-off: a click, tap, or Enter/Space opens one, and it
   stays open until it is clicked again. Nothing opens or closes on hover. */

function parts(group) {
  const toggle = group.querySelector("[data-accordion-toggle]");
  const panel = toggle && document.getElementById(toggle.getAttribute("aria-controls"));
  return toggle && panel ? { toggle, panel } : null;
}

function setOpen(group, open) {
  const p = parts(group);
  if (!p) return;
  p.toggle.setAttribute("aria-expanded", String(open));
  p.panel.classList.toggle("is-open", open);
}

/* Used by the nav to open "Work" on a project page. */
export function openAccordion(group) {
  if (group) setOpen(group, true);
}

export function initAccordions() {
  document.querySelectorAll("[data-accordion]").forEach((group) => {
    const p = parts(group);
    if (!p) return;
    p.toggle.addEventListener("click", () => {
      setOpen(group, p.toggle.getAttribute("aria-expanded") !== "true");
    });
  });
}
