/* Hover zoom for detail-rich pictures (patterns, photographs).

   The picture zooms in place and pans with the mouse. Mouse only: touch and
   keyboard visitors tap or press the picture to open the full-screen viewer
   instead, so nothing is lost without a mouse. */

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

export function enableZoom(figure, level = 2.5) {
  const trigger = figure.querySelector(".figure__trigger");
  const img = trigger && trigger.querySelector("img");
  if (!trigger || !img) return;

  trigger.classList.add("is-zoomable");
  trigger.style.setProperty("--zoom", String(level));

  const pan = (event) => {
    const box = trigger.getBoundingClientRect();
    img.style.transformOrigin = `${((event.clientX - box.left) / box.width) * 100}% ${((event.clientY - box.top) / box.height) * 100}%`;
  };

  trigger.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || !finePointer.matches) return;
    trigger.classList.add("is-zooming");
    pan(event);
  });
  trigger.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse" && trigger.classList.contains("is-zooming")) pan(event);
  });
  trigger.addEventListener("pointerleave", () => trigger.classList.remove("is-zooming"));
}
