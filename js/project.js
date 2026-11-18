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

  /* The page opens with the header picture, then all the words in one
     passage (a headline sentence, the rest in two columns, then the team
     credits), and then the pictures begin. The words are gathered from the
     story in the order they were written. */
  const story = project.story;
  const words = story.filter((block) => !block.type && (typeof block.text === "string" || typeof block.note === "string"));
  const pictures = story.filter((block) => !words.includes(block));
  const nodes = renderStory(pictures);                 /* one call, so the viewer steps through every picture */
  const hasHeader = pictures[0] && pictures[0].type === "full";
  if (hasHeader) bodyEl.append(nodes.shift());

  const paragraphs = words.map((block) => (typeof block.text === "string" ? block.text : block.note));
  if (paragraphs.length || project.credits.length) {
    const intro = el("section", "project-intro");
    intro.dataset.reveal = "";

    if (paragraphs.length) {
      intro.append(el("h2", "project-intro__lead", paragraphs[0]));
      if (paragraphs.length > 1) {
        const body = el("div", "project-intro__body");
        paragraphs.slice(1).forEach((text) => body.append(el("p", "", text)));
        intro.append(body);
      }
    }

    if (project.credits.length) {
      const credits = el("div", "credits");
      project.credits.forEach((entry) => {
        const row = el("div", "credits__row");
        row.append(el("span", "credits__label", entry.label || ""), el("p", "", entry.text));
        credits.append(row);
      });
      intro.append(credits);
    }
    bodyEl.append(intro);
  }

  nodes.forEach((node) => bodyEl.append(node));

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
