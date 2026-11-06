/* Navigation: the mobile menu and the footer year. */

let closeMenuFn = null;

/* Closes the full-screen menu if it is open; returns whether it was. */
export function closeMenu() {
  return closeMenuFn ? closeMenuFn() : false;
}

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

  closeMenuFn = () => {
    const wasOpen = drawer.classList.contains("is-open");
    if (wasOpen) setOpen(false);
    return wasOpen;
  };

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

/* Marks the nav link for the current project as the current page. */
export function markCurrent(slug) {
  document.querySelectorAll(".nav__link[data-slug]").forEach((link) => {
    if (link.dataset.slug === slug) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
}

/* Marks the current project straight away from the address, so the menu is
   already right while the page itself is still being built. */
export function markCurrentFromLocation() {
  const query = new URLSearchParams(window.location.search).get("p");
  const last = window.location.pathname.split("/").filter(Boolean).pop() || "";
  markCurrent(query || last.replace(/\.html$/, ""));
}
