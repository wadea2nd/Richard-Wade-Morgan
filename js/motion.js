/* Motion: the gentle scroll reveal and the page-leave fade.
   Everything is skipped for visitors who prefer reduced motion. */

const root = document.documentElement;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Called after the page's content exists (project pages build theirs first). */
export function initMotion() {
  root.classList.add("motion-ready");
  if (prefersReducedMotion()) return;

  const reveals = [...document.querySelectorAll("[data-reveal]")];

  const io = new IntersectionObserver(
    (entries) => {
      const entering = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

      /* Items that appear together arrive one after another. */
      entering.forEach((entry, index) => {
        entry.target.style.setProperty("--d", `${Math.min(index, 5) * 90}ms`);
        entry.target.classList.add("is-in");
        io.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
  );

  reveals.forEach((el) => io.observe(el));
}

/* Fade the content column out before following an internal link. */
export function initPageLeave() {
  document.addEventListener("click", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const link = event.target.closest && event.target.closest("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;

    const url = new URL(link.href, window.location.href);
    if (!/^https?:$/.test(url.protocol) || url.origin !== window.location.origin) return;
    if (url.pathname === window.location.pathname && url.search === window.location.search) return;
    if (prefersReducedMotion()) return;

    event.preventDefault();
    root.classList.add("is-leaving");
    window.setTimeout(() => { window.location.href = link.href; }, 230);
  });

  /* Coming back with the browser's back button restores the page as it was. */
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) root.classList.remove("is-leaving");
  });
}

/* Design-system page: replay the reveal on demand. */
export function initReplay() {
  document.querySelectorAll("[data-replay]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.replay);
      if (!target) return;
      target.classList.remove("is-in");
      void target.offsetWidth;              /* restart the transition */
      requestAnimationFrame(() => target.classList.add("is-in"));
    });
  });
}
