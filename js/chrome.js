/* Page chrome that depends on scrolling:
   - the "Back to top" button (bottom right) that appears once the page has
     been scrolled a little;
   - an "is-scrolled" flag on <html>, used to draw a hairline under the
     pinned mobile masthead. */

const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5M5.5 11.5L12 5l6.5 6.5"/></svg>';

export function initChrome() {
  const root = document.documentElement;

  const button = document.createElement("button");
  button.type = "button";
  button.className = "to-top";
  button.setAttribute("aria-label", "Back to top");
  button.innerHTML = ARROW;
  document.body.append(button);

  let queued = false;
  function update() {
    queued = false;
    const y = window.scrollY;
    root.classList.toggle("is-scrolled", y > 8);
    button.classList.toggle("is-visible", y > window.innerHeight * 0.6);
  }

  window.addEventListener("scroll", () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener("resize", update);
  update();

  button.addEventListener("click", () => {
    window.scrollTo({ top: 0 });          /* smooth unless reduced motion is on (base.css) */
    /* The button is about to fade out, so park keyboard focus at the top of the
       page content (which draws no outline) instead of leaving it behind. */
    const main = document.getElementById("main");
    if (main) main.focus({ preventScroll: true });
  });
}
