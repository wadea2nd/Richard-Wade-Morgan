/* Story blocks: turns a project's `story` (see data.js) into page elements.

   Everything is built with DOM nodes and textContent, never as HTML.
   Every picture opens in the lightbox, which steps through all of the
   project's pictures in the order they appear on the page. */

import { IMAGES } from "./images.js";
import { openLightbox } from "./lightbox.js";
import { initCarousel } from "./carousel.js";

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

  function figures(entries, options) {
    return entries.map((entry) => figure(entry, options)).filter(Boolean);
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
      const outer = el("div", `story-media story-media--full ${frameClass(block)}`.trim());
      outer.append(f.node);
      return outer;
    },

    row(block) {
      const layout = el("div", "row");
      figures(block.images).forEach((f) => layout.append(f.node));
      return wrap(layout, block, `${block.tone === "stage" ? "story-media--stage" : ""} ${frameClass(block)}`.trim());
    },

    grid(block) {
      const layout = el("div", "grid");
      layout.style.setProperty("--cols", String(block.columns || 4));
      figures(block.images).forEach((f) => layout.append(f.node));
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

    carousel(block) {
      const slides = figures(block.images);
      if (!slides.length) return null;
      const outer = el("div", "story-media carousel");
      const [rw, rh] = String(block.ratio || "16 / 9").split("/").map((n) => parseFloat(n));
      outer.style.setProperty("--carousel-ar", (rw / (rh || 1)).toFixed(4));
      if (block.fit === "cover") outer.classList.add("carousel--cover");
      initCarousel(outer, slides, block.label || "Gallery");
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

  return elements;
}
