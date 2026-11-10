/* Hover zoom for detail-rich pictures (decks, boards, type specimens, patterns).

   "lens"  a round magnifier follows the pointer and shows the picture at
           2.5x, while the whole picture stays visible underneath.
   "pan"   the picture itself zooms in place and pans with the pointer.

   Mouse only. Touch and keyboard visitors tap or press the picture to open
   the full-screen viewer instead, so nothing is lost without a mouse. */

const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

export function enableZoom(figure, mode, level = 2.5) {
  const trigger = figure.querySelector(".figure__trigger");
  const img = trigger && trigger.querySelector("img");
  if (!trigger || !img) return;

  trigger.classList.add("is-zoomable", `is-zoom-${mode}`);
  trigger.style.setProperty("--zoom", String(level));

  let lens = null;
  if (mode === "lens") {
    lens = document.createElement("span");
    lens.className = "zoom-lens";
    lens.setAttribute("aria-hidden", "true");
    trigger.append(lens);
  }

  const place = (event) => {
    const box = trigger.getBoundingClientRect();
    const x = event.clientX - box.left;
    const y = event.clientY - box.top;

    if (lens) {
      const size = lens.offsetWidth;
      lens.style.left = `${x - size / 2}px`;
      lens.style.top = `${y - size / 2}px`;
      lens.style.backgroundSize = `${box.width * level}px ${box.height * level}px`;
      lens.style.backgroundPosition = `${size / 2 - x * level}px ${size / 2 - y * level}px`;
    } else {
      img.style.transformOrigin = `${(x / box.width) * 100}% ${(y / box.height) * 100}%`;
    }
  };

  trigger.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "mouse" || !finePointer.matches) return;
    if (lens) lens.style.backgroundImage = `url("${img.currentSrc || img.src}")`;
    trigger.classList.add("is-zooming");
    place(event);
  });
  trigger.addEventListener("pointermove", (event) => {
    if (event.pointerType === "mouse" && trigger.classList.contains("is-zooming")) place(event);
  });
  trigger.addEventListener("pointerleave", () => trigger.classList.remove("is-zooming"));
}
