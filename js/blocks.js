/* Story blocks: turns a project's `story` (see data.js) into page elements.

   Everything is built with DOM nodes and textContent, never as HTML.
   Every picture opens in the lightbox, which steps through all of the
   project's pictures in the order they appear on the page. */

import { IMAGES } from "./images.js";
import { openLightbox } from "./lightbox.js";
import { initCarousel } from "./carousel.js";
import { enableZoom } from "./zoom.js";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/* An entry is an image id, or { id, caption }. */
function resolve(entry) {
  const id = typeof entry === "string" ? entry : entry && entry.id;
  const base = IMAGES[id];
  if (!base) {
    console.warn(`[site] Unknown image id in story: ${id}`);
    return null;
  }
  return { id, ...base, caption: typeof entry === "object" && entry.caption ? entry.caption : "" };
}

/* Splits pictures into rows so that every row, scaled to fill the width, comes
   out as close as possible to the target height (a small dynamic program). */
function partitionRows(ratios, width, gap, targetHeight) {
  const n = ratios.length;
  const best = new Array(n + 1).fill(Infinity);
  const from = new Array(n + 1).fill(0);
  best[0] = 0;
  for (let j = 1; j <= n; j += 1) {
    let sum = 0;
    for (let i = j - 1; i >= Math.max(0, j - 6); i -= 1) {
      sum += ratios[i];
      const fit = (width - gap * (j - i - 1)) / sum;           /* the row's height if it fills the width */
      const dev = (fit - targetHeight) / targetHeight;
      const cost = dev * dev * (dev < 0 ? 1.4 : 1) + 0.02;
      if (best[i] + cost < best[j]) { best[j] = best[i] + cost; from[j] = i; }
    }
  }
  const rows = [];
  for (let j = n; j > 0; j = from[j]) rows.unshift(Array.from({ length: j - from[j] }, (_, k) => from[j] + k));
  return rows;
}

export function renderStory(story) {
  const lightbox = [];                         /* every picture, in page order */
  let count = 0;

  /* One picture: a button (opens the lightbox) holding the image, plus caption. */
  function figure(entry, { fill = false, className = "" } = {}) {
    const item = resolve(entry);
    if (!item) return null;

    const ratio = item.width / item.height;
    const node = el("figure", `figure${className ? ` ${className}` : ""}`);
    node.style.setProperty("--ar", ratio.toFixed(4));
    if (ratio >= 1.2) node.classList.add("figure--wide");
    if (fill) node.classList.add("figure--fill");

    const index = lightbox.length;
    lightbox.push({ src: item.src, alt: item.alt, caption: item.caption });

    const trigger = el("button", "figure__trigger");
    trigger.type = "button";
    trigger.setAttribute("aria-label", `Enlarge image: ${item.alt}`);

    const img = document.createElement("img");
    img.src = item.src;
    img.alt = "";                              /* the button already carries the description */
    img.width = item.width;
    img.height = item.height;
    img.decoding = "async";
    if (count === 0) img.fetchPriority = "high";
    else img.loading = "lazy";
    count += 1;
    trigger.append(img);
    trigger.addEventListener("click", () => openLightbox(lightbox, index));
    node.append(trigger);

    if (item.caption) node.append(el("figcaption", "", item.caption));
    return { node, item };
  }

  function figures(entries, options, block) {
    const list = entries.map((entry) => figure(entry, options)).filter(Boolean);
    if (block && block.zoom) list.forEach((f) => enableZoom(f.node, block.zoomLevel));
    return list;
  }

  /* A video: a poster that plays on demand, or a silent loop that plays only
     while it is on screen (with a pause button, and never under reduced motion). */
  function videoFigure(block) {
    const outer = el("div", `story-media${block.frame ? " story-media--frame" : ""}`);
    const box = el("div", "video");
    box.style.setProperty("--ar", (block.width / block.height).toFixed(4));

    const video = document.createElement("video");
    video.src = block.src;
    video.poster = block.poster;
    video.playsInline = true;
    video.setAttribute("aria-label", block.title || "Video");
    video.preload = block.loop ? "metadata" : "none";
    box.append(video);

    if (block.loop) {
      video.muted = true;
      video.loop = true;
      const toggle = el("button", "video__toggle", "Pause");
      toggle.type = "button";
      toggle.setAttribute("aria-label", "Pause or play the animation");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let userPaused = reduced;
      const sync = () => { toggle.textContent = video.paused ? "Play" : "Pause"; };
      toggle.addEventListener("click", () => {
        if (video.paused) { userPaused = false; video.play().catch(() => {}); }
        else { userPaused = true; video.pause(); }
      });
      video.addEventListener("play", sync);
      video.addEventListener("pause", sync);
      new IntersectionObserver((entries) => {
        const visible = entries[0].isIntersecting;
        if (visible && !userPaused) video.play().catch(() => {});
        if (!visible) video.pause();
      }, { threshold: 0.35 }).observe(box);
      box.append(toggle);
      sync();
    } else {
      video.controls = true;
    }

    outer.append(box);
    if (block.caption) outer.append(el("p", "story-caption", block.caption));
    return outer;
  }

  const reveal = (node) => { node.dataset.reveal = ""; return node; };

  /* Every block is a .story-media wrapper around its layout, so a block's own
     caption can sit underneath the whole group. */
  function wrap(layout, block, extra = "") {
    const outer = el("div", `story-media${extra ? ` ${extra}` : ""}`);
    outer.append(layout);
    if (block.caption) outer.append(el("p", "story-caption", block.caption));
    return outer;
  }

  const frameClass = (block) => (block.frame ? "story-media--frame" : "");

  const builders = {
    full(block) {
      const f = figure({ id: block.image, caption: block.caption });
      if (!f) return null;
      if (block.zoom) enableZoom(f.node, block.zoomLevel);
      const outer = el("div", `story-media story-media--full ${block.tone === "panel" ? "story-media--panel" : ""} ${frameClass(block)} ${block.still ? "story-media--still" : ""}`.replace(/\s+/g, " ").trim());
      outer.append(f.node);
      return outer;
    },

    row(block) {
      const layout = el("div", "row");
      figures(block.images, undefined, block).forEach((f) => layout.append(f.node));
      const tone = block.tone === "stage" ? "story-media--stage" : block.tone === "panel" ? "story-media--panel" : "";
      return wrap(layout, block, `${tone} ${frameClass(block)}`.trim());
    },

    grid(block) {
      const layout = el("div", "grid");
      layout.style.setProperty("--cols", String(block.columns || 4));
      figures(block.images, undefined, block).forEach((f) => layout.append(f.node));
      return wrap(layout, block);
    },

    masonry(block) {
      const layout = el("div", "masonry");
      layout.style.setProperty("--cols", String(block.columns || 3));
      figures(block.images).forEach((f) => layout.append(f.node));
      return wrap(layout, block);
    },

    mosaic(block) {
      const layout = el("div", `mosaic mosaic--${block.variant || "feature-left"}`);
      figures(block.images, { fill: true }).forEach((f) => layout.append(f.node));
      return wrap(layout, block);
    },

    collage(block) {
      const layout = el("div", "collage");
      figures(block.images, { fill: true }).forEach((f) => layout.append(f.node));
      return wrap(layout, block);
    },

    split(block) {
      const f = figure({ id: block.image, caption: block.caption });
      if (!f) return null;
      const outer = el("div", `story-media split split--${block.side === "left" ? "left" : "right"}${block.size === "narrow" ? " split--narrow" : ""}`);
      const text = el("div", "split__text");
      text.append(el("p", "", block.text));
      const side = el("div", "split__media");
      side.append(f.node);
      outer.append(text, side);
      return outer;
    },

    /* A gallery: pictures of any shape packed into rows of one height each,
       at their own proportions. It re-flows to fit the width of the screen. */
    gallery(block) {
      const items = figures(block.images);
      if (!items.length) return null;
      const layout = el("div", "gallery");
      const ratios = items.map((f) => f.item.width / f.item.height);
      const target = block.rowHeight || 17;                     /* rem */
      let packedFor = 0;

      function pack() {
        const width = layout.clientWidth;
        if (!width || Math.abs(width - packedFor) < 2) return;
        packedFor = width;
        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
        const gap = parseFloat(getComputedStyle(layout).rowGap) || 12;
        const rows = partitionRows(ratios, width, gap, (width < 600 ? target * 0.62 : target) * rem);
        layout.replaceChildren();
        rows.forEach((indexes) => {
          const rowEl = el("div", "gallery__row");
          indexes.forEach((i) => rowEl.append(items[i].node));
          layout.append(rowEl);
        });
      }

      new ResizeObserver(pack).observe(layout);
      window.addEventListener("resize", pack);
      /* the layout is measured once it is on the page */
      const wait = setInterval(() => {
        if (layout.isConnected && layout.clientWidth) { clearInterval(wait); pack(); }
      }, 50);
      return wrap(layout, block);
    },

    video(block) {
      return videoFigure(block);
    },

    carousel(block) {
      const slides = figures(block.images, undefined, block);
      if (!slides.length) return null;
      const outer = el("div", "story-media carousel");
      const [rw, rh] = String(block.ratio || "16 / 9").split("/").map((n) => parseFloat(n));
      outer.style.setProperty("--carousel-ar", (rw / (rh || 1)).toFixed(4));
      if (block.fit === "cover") outer.classList.add("carousel--cover");
      initCarousel(outer, slides, block.label || "Gallery", block.variant || "default");
      return outer;
    },
  };

  const elements = [];
  story.forEach((block) => {
    let node = null;

    if (block.type && builders[block.type]) {
      node = builders[block.type](block);
      if (node) reveal(node);
    } else if (!block.type && block.text !== undefined) {
      node = reveal(el("p", "prose story-text", block.text));
    } else if (!block.type && Array.isArray(block.list)) {
      node = reveal(el("ul", "plain-list prose story-text"));
      block.list.forEach((line) => node.append(el("li", "", line)));
    } else if (!block.type && block.label !== undefined) {
      node = reveal(el("p", "story-label", block.label));
    } else if (!block.type && block.note !== undefined) {
      node = reveal(el("p", "story-note", block.note));
    } else {
      console.warn("[site] Unknown story block:", block);
    }

    if (node) elements.push(node);
  });

  /* Neighboring paragraphs read as one passage. On a wide screen a passage of
     of two or more paragraphs runs in two columns across the full width of the
     pictures (see .story-passage in components.css); a lone paragraph or note
     simply spans that width in one column. */
  const passages = [];
  elements.forEach((node) => {
    const last = passages[passages.length - 1];
    if (node.classList.contains("story-text") && node.tagName === "P") {
      if (last && last.isPassage) last.items.push(node);
      else passages.push({ isPassage: true, items: [node] });
    } else {
      passages.push(node);
    }
  });

  return passages.map((entry) => {
    if (!entry.isPassage) {
      return entry;
    }
    if (entry.items.length === 1) return entry.items[0];        /* a lone paragraph just spans the width */
    const wrapper = el("div", "story-passage story-text");
    wrapper.dataset.reveal = "";
    entry.items.forEach((p) => { delete p.dataset.reveal; p.classList.remove("prose"); wrapper.append(p); });
    return wrapper;
  });
}
