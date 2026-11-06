/* Story carousel: a swipeable strip of slides with previous/next buttons,
   a counter, and a caption that follows the current slide.

   It scrolls natively (scroll snapping), so touch swiping, trackpads, and
   keyboard arrows all work. The strip is focusable for arrow-key use. */

const CHEVRON = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7"/></svg>',
};

function button(direction, label) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = `carousel__btn carousel__btn--${direction}`;
  b.setAttribute("aria-label", label);
  b.innerHTML = CHEVRON[direction];
  return b;
}

export function initCarousel(root, slides, label) {
  root.setAttribute("role", "group");
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("aria-label", label);

  const viewport = document.createElement("div");
  viewport.className = "carousel__viewport";
  viewport.tabIndex = 0;
  viewport.setAttribute("aria-label", `${label}: use the arrow keys to move between slides`);

  const captions = [];
  slides.forEach((slide, i) => {
    slide.node.classList.add("carousel__slide");
    slide.node.setAttribute("role", "group");
    slide.node.setAttribute("aria-roledescription", "slide");
    slide.node.setAttribute("aria-label", `${i + 1} of ${slides.length}`);

    /* The caption lives in the bar below, not under each slide. */
    const caption = slide.node.querySelector("figcaption");
    captions.push(caption ? caption.textContent : "");
    if (caption) caption.remove();

    viewport.append(slide.node);
  });

  const bar = document.createElement("div");
  bar.className = "carousel__bar";
  const prev = button("prev", "Previous slide");
  const next = button("next", "Next slide");
  const caption = document.createElement("p");
  caption.className = "carousel__caption";
  caption.setAttribute("aria-live", "polite");
  const count = document.createElement("span");
  count.className = "carousel__count";
  bar.append(prev, next, count, caption);

  root.append(viewport, bar);

  let index = 0;

  function slideWidth() { return viewport.clientWidth; }

  function show(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    caption.textContent = captions[index];
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }

  /* While a button-driven slide is in flight, scroll events must not drag the
     counter back to the slide being left. */
  let lockUntil = 0;

  function goTo(i) {
    const target = Math.max(0, Math.min(slides.length - 1, i));
    lockUntil = Date.now() + 750;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    viewport.scrollTo({ left: target * slideWidth(), behavior: calm ? "auto" : "smooth" });
    show(target);
  }

  /* Keep the counter and caption in step with swiping or scrolling. */
  let ticking = false;
  viewport.addEventListener("scroll", () => {
    if (ticking || Date.now() < lockUntil) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      const i = Math.round(viewport.scrollLeft / Math.max(1, slideWidth()));
      if (i !== index) show(i);
    });
  }, { passive: true });

  prev.addEventListener("click", () => goTo(index - 1));
  next.addEventListener("click", () => goTo(index + 1));
  viewport.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { goTo(index - 1); event.preventDefault(); }
    if (event.key === "ArrowRight") { goTo(index + 1); event.preventDefault(); }
  });

  show(0);
}
