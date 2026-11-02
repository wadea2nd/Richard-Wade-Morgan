/* Motion: bump-in text, scroll reveals, the first-visit sidebar intro, and
   the page-leave fade. All timing is read from CSS tokens where possible;
   everything is skipped for visitors who prefer reduced motion. */

const root = document.documentElement;
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Splits a word into pieces at hyphens so "farm-raised" can wrap after the
   hyphen just like normal text. */
const pieces = (word) => word.match(/[^-]+-?|-+/g) || [word];

/* Wraps every word of an element in <span class="w"> (keeping nested
   markup and the original spaces) and gives each a staggered delay. */
export function splitWords(el) {
  if (el.dataset.split) return;

  let count = 0;
  const spans = [];

  const walk = (source, target) => {
    source.childNodes.forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            target.append(document.createTextNode(part));
          } else {
            pieces(part).forEach((piece) => {
              const span = document.createElement("span");
              span.className = "w";
              span.textContent = piece;
              target.append(span);
              spans.push(span);
              count += 1;
            });
          }
        });
      } else if (child.nodeType === Node.ELEMENT_NODE) {
        if (child.hasAttribute("data-no-split") || child.tagName === "svg" || child.tagName === "IMG") {
          /* Kept whole, but it still bumps in with the words around it. */
          const span = document.createElement("span");
          span.className = "w";
          span.append(child.cloneNode(true));
          target.append(span);
          spans.push(span);
          count += 1;
        } else {
          const clone = child.cloneNode(false);
          target.append(clone);
          walk(child, clone);
        }
      }
    });
  };

  const holder = document.createDocumentFragment();
  const scratch = document.createElement("div");
  walk(el, scratch);
  while (scratch.firstChild) holder.append(scratch.firstChild);
  el.textContent = "";
  el.append(holder);

  /* Cap the whole cascade near one second, however long the text is. */
  const base = Number(el.dataset.bumpDelay || 0);
  const step = Math.min(28, 1000 / Math.max(count, 1));
  spans.forEach((span, i) => span.style.setProperty("--d", `${base + i * step}ms`));

  el.dataset.split = "1";
  el.classList.add("is-split");
}

function observe(elements, onEnter, options) {
  const io = new IntersectionObserver((entries) => {
    const entering = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
    entering.forEach((entry, index) => {
      onEnter(entry.target, index);
      io.unobserve(entry.target);
    });
  }, options);
  elements.forEach((el) => io.observe(el));
}

/* Called after the page's content exists (project pages build theirs first). */
export function initMotion() {
  root.classList.add("motion-ready");
  if (prefersReducedMotion()) return;

  const start = () => {
    introSidebar();

    const bumps = [...document.querySelectorAll("[data-bump]")];
    bumps.forEach(splitWords);
    observe(bumps, (el) => requestAnimationFrame(() => el.classList.add("is-in")), { threshold: 0.15 });

    const reveals = [...document.querySelectorAll("[data-reveal]")];
    observe(
      reveals,
      (el, index) => {
        el.style.setProperty("--d", `${Math.min(index, 6) * 80 + Number(el.dataset.revealDelay || 0)}ms`);
        el.classList.add("is-in");
      },
      { threshold: 0.08, rootMargin: "0px 0px -6% 0px" }
    );
  };

  /* Wait for the web fonts so words don't reflow mid-animation, but never
     longer than a moment. */
  const fontsReady = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  Promise.race([fontsReady, new Promise((resolve) => setTimeout(resolve, 450))]).then(start);
}

/* First page of a session: the sidebar bumps in. After that it stays still,
   so it feels like one persistent frame as you move between pages. */
function introSidebar() {
  if (!root.classList.contains("nav-intro")) return;

  const items = [
    document.querySelector(".brand"),
    ...document.querySelectorAll("[data-nav-item]"),
    document.querySelector(".colophon")
  ].filter(Boolean);

  items.forEach((el, i) => el.style.setProperty("--d", `${i * 55}ms`));
  root.classList.add("nav-intro-play");
  try { sessionStorage.setItem("rwm-intro", "1"); } catch (e) { /* ignore */ }

  /* Drop the "hidden" state once the sequence has played. */
  window.setTimeout(() => root.classList.remove("nav-intro", "nav-intro-play"), 1600);
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

/* Design-system page: replay the bump-in on demand. */
export function initReplay() {
  document.querySelectorAll("[data-replay-bump]").forEach((button) => {
    button.addEventListener("click", () => {
      const target = document.querySelector(button.dataset.replayBump);
      if (!target) return;
      target.classList.remove("is-in");
      void target.offsetWidth;              /* restart the animation */
      requestAnimationFrame(() => target.classList.add("is-in"));
    });
  });
}
