/* Project page: builds the page from js/data.js for the project named in the
   URL (project.html?p=stord, or a pretty path like /stord on Netlify).
   Content is inserted with textContent / DOM nodes only, never as HTML. */

import { PROJECTS, SITE } from "./data.js";
import { openLightbox } from "./lightbox.js";
import { markCurrent } from "./nav.js";

function slugFromLocation() {
  const query = new URLSearchParams(window.location.search).get("p");
  if (query) return query;
  const last = window.location.pathname.split("/").filter(Boolean).pop() || "";
  return last.replace(/\.html$/, "");
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function setMeta(selector, value) {
  const node = document.querySelector(selector);
  if (node) node.setAttribute("content", value);
}

export function initProject() {
  const titleEl = document.getElementById("project-title");
  const bodyEl = document.getElementById("project-body");
  if (!titleEl || !bodyEl) return;

  const slug = slugFromLocation();
  const index = PROJECTS.findIndex((project) => project.slug === slug);

  /* Unknown project: a friendly dead end rather than a blank page. */
  if (index === -1) {
    document.title = `Project not found | ${SITE.name}`;
    titleEl.textContent = "That project doesn’t exist";
    const back = el("a", "", "Back to the home page");
    back.href = "index.html";
    bodyEl.append(el("p", "prose", "The link may be old or mistyped. Every project is in the menu."), back);
    return;
  }

  const project = PROJECTS[index];

  document.title = `${project.title} | ${SITE.name}, Creative Director`;
  const lead = project.summary.find((part) => typeof part === "string") || "";
  const description = lead.length > 155 ? `${lead.slice(0, 152).trimEnd()}…` : lead;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[property="og:description"]', description);
  markCurrent(project.slug);

  titleEl.textContent = project.title;

  /* Copy */
  const prose = el("div", "prose flow");
  project.summary.forEach((part) => {
    if (Array.isArray(part)) {
      const list = el("ul", "plain-list");
      part.forEach((line) => list.append(el("li", "", line)));
      list.dataset.reveal = "";
      prose.append(list);
    } else {
      const p = el("p", "", part);
      p.dataset.reveal = "";
      prose.append(p);
    }
  });
  bodyEl.append(prose);

  /* Credits */
  if (project.credits.length) {
    const credits = el("div", "credits");
    credits.dataset.reveal = "";
    project.credits.forEach((entry) => {
      const block = el("p");
      if (entry.label) block.append(el("span", "credits__label", entry.label));
      block.append(document.createTextNode(entry.text));
      credits.append(block);
    });
    bodyEl.append(credits);
  }

  /* Gallery: every image opens in the lightbox. */
  const gallery = el("div", "gallery");
  project.images.forEach((image, i) => {
    const figure = el("figure", "figure");
    figure.dataset.reveal = "";

    const trigger = el("button", "figure__trigger");
    trigger.type = "button";
    trigger.setAttribute("aria-label", `Enlarge image ${i + 1} of ${project.images.length}: ${image.alt}`);

    const img = document.createElement("img");
    img.src = image.src;
    img.alt = "";                       /* the button already carries the description */
    img.width = image.width;
    img.height = image.height;
    img.decoding = "async";
    if (i > 0) img.loading = "lazy";
    trigger.append(img);
    trigger.addEventListener("click", () => openLightbox(project.images, i));
    figure.append(trigger);

    if (image.caption) figure.append(el("figcaption", "", image.caption));
    gallery.append(figure);
  });
  bodyEl.append(gallery);

  /* Next / previous project */
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const pager = el("nav", "pager");
  pager.setAttribute("aria-label", "More projects");

  const link = (project, direction, className) => {
    const a = el("a", className);
    a.href = `project.html?p=${encodeURIComponent(project.slug)}`;
    a.rel = direction;
    const dir = el("span", "pager__dir", direction === "prev" ? "Previous" : "Next");
    a.append(dir, document.createTextNode(project.title));
    return a;
  };
  pager.append(link(prev, "prev", "pager__prev"), link(next, "next", "pager__next"));
  pager.dataset.reveal = "";
  bodyEl.append(pager);
}
