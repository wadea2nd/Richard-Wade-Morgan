/* Image guard: a light deterrent against casually dragging work out of the
   page or using "Save image as…". It cannot stop a determined visitor (a
   screenshot always works), but it keeps the easy paths closed. */

export function initGuard() {
  document.addEventListener("dragstart", (event) => {
    if (event.target instanceof HTMLImageElement) event.preventDefault();
  });

  document.addEventListener("contextmenu", (event) => {
    const target = event.target;
    if (target instanceof Element && target.closest("img, .figure__trigger, .slider__viewport, .photo")) {
      event.preventDefault();
    }
  });
}
