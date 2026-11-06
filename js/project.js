/* Project page: builds the page from js/data.js for the project named in the
   URL (project.html?p=stord, or a pretty path like /stord on Netlify).
   Content is inserted with textContent / DOM nodes only, never as HTML. */

import { PROJECTS, SITE } from "./data.js";
import { renderStory } from "./blocks.js";
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
  const lead = (project.story.find((block) => typeof block.text === "string") || {}).text || "";
  const description = lead.length > 155 ? `${lead.slice(0, 152).trimEnd()}…` : lead;
  setMeta('meta[name="description"]', description);
  setMeta('meta[property="og:title"]', document.title);
  setMeta('meta[property="og:description"]', description);
  markCurrent(project.slug);

  titleEl.textContent = project.title;

  /* The story: words and pictures, in order. */
  renderStory(project.story).forEach((node) => bodyEl.append(node));

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
