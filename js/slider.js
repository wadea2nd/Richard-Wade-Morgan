/* Homepage slideshow.
   Follows the WAI-ARIA carousel pattern:
   - autoplay can be paused (the Pause button), and stops on hover, on focus,
     when the tab is hidden, and when offscreen;
   - visitors who prefer reduced motion start paused;
   - prev/next buttons, ← → keys, and swipe all work;
   - the live region only announces slides while autoplay is off. */

import { SLIDES } from "./data.js";

const INTERVAL = 4200;
const pad = (n) => String(n).padStart(2, "0");

const CHEVRON = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7"/></svg>'
};

export function initSlider(root) {
  const viewport = root.querySelector(".slider__viewport");
  const status = root.querySelector("[data-slider-status]");
  const pauseBtn = root.querySelector(".slider__pause");
  if (!viewport || !SLIDES.length) return;

  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Build every slide from the data. */
  viewport.textContent = "";
  const slides = SLIDES.map((slide, i) => {
    const figure = document.createElement("figure");
    figure.className = "slider__slide";
    figure.setAttribute("role", "group");
    figure.setAttribute("aria-roledescription", "slide");
    figure.setAttribute("aria-label", `${i + 1} of ${SLIDES.length}`);

    const img = document.createElement("img");
    img.src = slide.src;
    img.alt = slide.alt;
    img.width = 1920;
    img.height = 1080;
    img.decoding = "async";
    if (i > 0) img.loading = "lazy";
    figure.append(img);

    if (slide.project) {
      const link = document.createElement("a");
      link.className = "slider__link";
      link.href = `project.html?p=${encodeURIComponent(slide.project)}`;
      link.setAttribute("aria-label", `View project: ${slide.title}`);
      figure.append(link);
    }

    viewport.append(figure);
    return figure;
  });

  const makeButton = (dir) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = `slider__btn slider__btn--${dir}`;
    btn.setAttribute("aria-label", dir === "prev" ? "Previous slide" : "Next slide");
    btn.innerHTML = CHEVRON[dir];
    return btn;
  };
  const prevBtn = makeButton("prev");
  const nextBtn = makeButton("next");
  viewport.append(prevBtn, nextBtn);

  let index = 0;
  let timer = null;
  let userPaused = reduced;
  let hovering = false;
  let focusedWithin = false;
  let visible = true;

  function show(next, { announce = false } = {}) {
    index = (next + slides.length) % slides.length;
    slides.forEach((slide, i) => slide.classList.toggle("is-active", i === index));
    if (status) {
      status.textContent = `${pad(index + 1)} / ${pad(slides.length)} · ${SLIDES[index].title}`;
    }
    if (announce) viewport.setAttribute("aria-live", "polite");
  }

  function playing() { return !userPaused && !hovering && !focusedWithin && visible && !document.hidden; }

  function schedule() {
    window.clearInterval(timer);
    timer = null;
    viewport.setAttribute("aria-live", playing() ? "off" : "polite");
    if (playing()) timer = window.setInterval(() => show(index + 1), INTERVAL);
  }

  function setPaused(paused) {
    userPaused = paused;
    if (pauseBtn) {
      pauseBtn.textContent = paused ? "Play" : "Pause";
      pauseBtn.setAttribute("aria-pressed", String(paused));
    }
    schedule();
  }

  prevBtn.addEventListener("click", () => { show(index - 1, { announce: true }); schedule(); });
  nextBtn.addEventListener("click", () => { show(index + 1, { announce: true }); schedule(); });

  if (pauseBtn) {
    pauseBtn.hidden = false;
    pauseBtn.addEventListener("click", () => setPaused(!userPaused));
  }

  root.addEventListener("mouseenter", () => { hovering = true; schedule(); });
  root.addEventListener("mouseleave", () => { hovering = false; schedule(); });
  root.addEventListener("focusin", () => { focusedWithin = true; schedule(); });
  root.addEventListener("focusout", () => { focusedWithin = false; schedule(); });
  document.addEventListener("visibilitychange", schedule);

  root.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { show(index - 1, { announce: true }); event.preventDefault(); }
    if (event.key === "ArrowRight") { show(index + 1, { announce: true }); event.preventDefault(); }
  });

  /* Swipe */
  let startX = null;
  viewport.addEventListener("pointerdown", (event) => { startX = event.clientX; });
  viewport.addEventListener("pointerup", (event) => {
    if (startX === null) return;
    const dx = event.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 48) {
      show(index + (dx < 0 ? 1 : -1), { announce: true });
      schedule();
      viewport.dataset.swiped = "1";
      window.setTimeout(() => delete viewport.dataset.swiped, 60);
    }
  });
  viewport.addEventListener("pointercancel", () => { startX = null; });

  /* A swipe that ends on a linked slide shouldn't also follow the link. */
  viewport.addEventListener("click", (event) => {
    if (viewport.dataset.swiped) { event.preventDefault(); delete viewport.dataset.swiped; }
  }, true);

  new IntersectionObserver((entries) => {
    visible = entries[0].isIntersecting;
    schedule();
  }, { threshold: 0.25 }).observe(root);

  if (pauseBtn) {
    pauseBtn.textContent = userPaused ? "Play" : "Pause";
    pauseBtn.setAttribute("aria-pressed", String(userPaused));
  }
  show(0);
  schedule();
}
