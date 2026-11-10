/* Story carousel: a swipeable strip of slides with previous/next buttons.
   It scrolls natively (scroll snapping), so touch swiping, trackpads, and the
   arrow keys all work.

   Variants:
     default  one slide at a time, with a counter and a caption bar
     thumbs   one slide at a time, with a row of thumbnails to jump around
     peek     slides sit at the center with the neighbors showing at the edges
     strip    a film strip of pictures of any shape, at one shared height */

const CHEVRON = {
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7"/></svg>',
};

const calm = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function button(direction, label) {
  const b = document.createElement("button");
  b.type = "button";
  b.className = `carousel__btn carousel__btn--${direction}`;
  b.setAttribute("aria-label", label);
  b.innerHTML = CHEVRON[direction];
  return b;
}

export function initCarousel(root, slides, label, variant = "default") {
  root.setAttribute("role", "group");
  root.setAttribute("aria-roledescription", "carousel");
  root.setAttribute("aria-label", label);
  if (variant !== "default") root.classList.add(`carousel--${variant}`);

  const strip = variant === "strip";
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
  const prev = button("prev", strip ? "Scroll back" : "Previous slide");
  const next = button("next", strip ? "Scroll forward" : "Next slide");
  const count = document.createElement("span");
  count.className = "carousel__count";
  const caption = document.createElement("p");
  caption.className = "carousel__caption";
  caption.setAttribute("aria-live", "polite");
  const progress = document.createElement("span");
  progress.className = "carousel__progress";
  progress.setAttribute("aria-hidden", "true");
  progress.append(document.createElement("i"));

  if (strip) bar.append(prev, next, progress);
  else bar.append(prev, next, count, caption);

  root.append(viewport, bar);

  let thumbs = [];
  if (variant === "thumbs") {
    const rail = document.createElement("div");
    rail.className = "carousel__thumbs";
    rail.setAttribute("role", "group");
    rail.setAttribute("aria-label", `${label}: thumbnails`);
    thumbs = slides.map((slide, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "carousel__thumb";
      b.setAttribute("aria-label", `Show slide ${i + 1} of ${slides.length}`);
      const img = document.createElement("img");
      img.src = slide.item.src;
      img.alt = "";
      img.loading = "lazy";
      img.decoding = "async";
      b.append(img);
      b.addEventListener("click", () => goTo(i));
      rail.append(b);
      return b;
    });
    root.append(rail);
  }

  let index = 0;

  function nearest() {
    const mid = viewport.scrollLeft + viewport.clientWidth / 2;
    let best = 0;
    let bestGap = Infinity;
    slides.forEach((slide, i) => {
      const gap = Math.abs(slide.node.offsetLeft + slide.node.offsetWidth / 2 - mid);
      if (gap < bestGap) { bestGap = gap; best = i; }
    });
    return best;
  }

  function show(i) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((slide, n) => slide.node.classList.toggle("is-current", n === index));
    thumbs.forEach((thumb, n) => thumb.setAttribute("aria-current", String(n === index)));
    if (strip) return;
    count.textContent = `${String(index + 1).padStart(2, "0")} / ${String(slides.length).padStart(2, "0")}`;
    caption.textContent = captions[index];
    prev.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }

  function updateStrip() {
    const max = viewport.scrollWidth - viewport.clientWidth;
    prev.disabled = viewport.scrollLeft <= 2;
    next.disabled = viewport.scrollLeft >= max - 2;
    const share = viewport.scrollWidth ? (viewport.scrollLeft + viewport.clientWidth) / viewport.scrollWidth : 1;
    progress.firstChild.style.setProperty("--p", `${Math.round(share * 100)}%`);
  }

  /* While a button-driven slide is in flight, scroll events must not drag the
     counter back to the slide being left. */
  let lockUntil = 0;

  function goTo(i) {
    const target = Math.max(0, Math.min(slides.length - 1, i));
    lockUntil = Date.now() + 750;
    slides[target].node.scrollIntoView({
      behavior: calm() ? "auto" : "smooth",
      inline: variant === "default" || variant === "thumbs" ? "start" : "center",
      block: "nearest",
    });
    show(target);
  }

  function scrollStrip(direction) {
    viewport.scrollBy({ left: direction * viewport.clientWidth * 0.8, behavior: calm() ? "auto" : "smooth" });
  }

  let ticking = false;
  viewport.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      ticking = false;
      if (strip) { updateStrip(); return; }
      if (Date.now() < lockUntil) return;
      const i = nearest();
      if (i !== index) show(i);
    });
  }, { passive: true });

  prev.addEventListener("click", () => (strip ? scrollStrip(-1) : goTo(index - 1)));
  next.addEventListener("click", () => (strip ? scrollStrip(1) : goTo(index + 1)));
  viewport.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    const dir = event.key === "ArrowLeft" ? -1 : 1;
    if (strip) scrollStrip(dir); else goTo(index + dir);
    event.preventDefault();
  });

  if (strip) {
    window.addEventListener("resize", updateStrip);
    updateStrip();
    requestAnimationFrame(updateStrip);       /* again once the strip has been laid out */
  }
  show(0);
}
