/* Entry point. Every page loads this one module; it wires up the pieces a
   page needs. Page-specific code (slider, project pages, design-system
   page) is imported only where it is used.

   Each feature is independent: if one fails, the rest still run and the
   content stays readable. */

import { initTheme } from "./theme.js";
import { initNav, initYear, markCurrentFromLocation } from "./nav.js";
import { initAccordions } from "./accordion.js";
import { initContact } from "./contact.js";
import { initMotion, initPageLeave, initReplay, initImageFade, whenFontsReady } from "./motion.js";
import { initChrome } from "./chrome.js";
import { initFloaties } from "./floaties.js";
import { initGuard } from "./guard.js";

function safe(name, fn) {
  try {
    fn();
  } catch (error) {
    console.error(`[site] ${name} failed:`, error);
  }
}

async function safeAsync(name, load) {
  try {
    await load();
  } catch (error) {
    console.error(`[site] ${name} failed:`, error);
  }
}

async function boot() {
  const page = document.body.dataset.page;
  const fontsReady = whenFontsReady();

  safe("imageFade", initImageFade);

  safe("theme", initTheme);
  safe("nav", initNav);
  if (page === "project") safe("currentLink", markCurrentFromLocation);
  safe("accordions", initAccordions);
  safe("year", initYear);
  safe("contact", initContact);
  safe("guard", initGuard);

  /* Page content must exist before motion looks for things to animate. */
  if (page === "project") {
    await safeAsync("project", async () => (await import("./project.js")).initProject());
  }
  if (page === "home") {
    await safeAsync("slider", async () => (await import("./slider.js")).initSlider(document.getElementById("slider")));
  }
  if (page === "design-system") {
    await safeAsync("designSystem", async () => (await import("./design-system.js")).initDesignSystem());
  }

  safe("pageLeave", initPageLeave);
  safe("replay", initReplay);
  safe("imageFade", initImageFade);

  /* Nothing appears until the fonts are ready, then it all arrives together. */
  await fontsReady;
  document.documentElement.classList.add("is-ready");
  try { sessionStorage.setItem("rwm-entered", "1"); } catch (e) { /* ignore */ }
  safe("motion", initMotion);
  safe("chrome", initChrome);
  safe("floaties", initFloaties);
}

boot();
