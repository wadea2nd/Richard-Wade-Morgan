/* Accordions: the "Work" item in the menu and the Work / Speaking / Press
   sections on the About page.

   Markup: an element with [data-accordion] holding a button with
   [data-accordion-toggle] (aria-controls → the panel's id) and the panel.

   A mouse hovering over the button opens it (after a short pause, so sweeping
   past doesn't); rolling off the whole group folds it back up. Clicking,
   tapping, or pressing Enter/Space toggles it, which is the only way for
   touch and keyboard visitors. */

const OPEN_DELAY = 140;
const CLOSE_DELAY = 260;

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
    const { toggle } = p;

    let openTimer = null;
    let closeTimer = null;
    const clearTimers = () => { window.clearTimeout(openTimer); window.clearTimeout(closeTimer); };
    const isOpen = () => toggle.getAttribute("aria-expanded") === "true";
    const mouse = (event) => event.pointerType === "mouse";

    toggle.addEventListener("pointerenter", (event) => {
      if (!mouse(event)) return;
      clearTimers();
      if (!isOpen()) openTimer = window.setTimeout(() => setOpen(group, true), OPEN_DELAY);
    });

    group.addEventListener("pointerenter", (event) => {
      if (mouse(event)) window.clearTimeout(closeTimer);
    });

    group.addEventListener("pointerleave", (event) => {
      if (!mouse(event)) return;
      clearTimers();
      closeTimer = window.setTimeout(() => {
        if (group.querySelector(":focus-visible")) return;   /* keep it open for keyboard users */
        setOpen(group, false);
      }, CLOSE_DELAY);
    });

    toggle.addEventListener("click", () => {
      clearTimers();
      setOpen(group, !isOpen());
    });
  });
}
