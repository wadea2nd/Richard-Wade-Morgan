/* Accordions: the "Work" item in the menu and the tabs on the About page.

   Markup: an element with [data-accordion] holding a button with
   [data-accordion-toggle] (aria-controls → the panel's id) and the panel.

   Firm click-on, click-off: a click, tap, or Enter/Space opens one, and it
   stays open until it is clicked again. Nothing opens or closes on hover.
   [data-accordion-remember="work"] also keeps the state across pages. */

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

export function initAccordions() {
  document.querySelectorAll("[data-accordion]").forEach((group) => {
    const p = parts(group);
    if (!p) return;

    /* The menu's "Work" item remembers its state for the visit, so it stays
       as it is while pages change. */
    const memory = group.dataset.accordionRemember;
    if (memory && document.documentElement.classList.contains("work-open")) {
      setOpen(group, true);
      document.documentElement.classList.remove("work-open");   /* same look, no animation */
    }

    p.toggle.addEventListener("click", () => {
      const open = p.toggle.getAttribute("aria-expanded") !== "true";
      setOpen(group, open);
      if (memory) {
        try { sessionStorage.setItem("rwm-" + memory, open ? "open" : "closed"); } catch (e) { /* ignore */ }
      }
    });
  });
}
