/* Image lightbox, built on the native <dialog> element, which supplies the
   focus trap, Escape-to-close, and return of focus for free.
   Arrow keys (and the on-screen arrows) step through the project's images.

   Touch and trackpad: swipe left or right to change picture; pinch, or
   double-tap, to zoom in; drag to look around while zoomed. On a mouse, the
   wheel and a double-click zoom as well. */

const ICONS = {
  close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7"/></svg>'
};

let dialog, img, caption, prevBtn, nextBtn;
let images = [];
let index = 0;

const MAX_ZOOM = 5;
let scale = 1;
let panX = 0;
let panY = 0;
let suppressClickUntil = 0;                /* a swipe or pinch must not count as a click that closes the box */

function build() {
  dialog = document.createElement("dialog");
  dialog.className = "lightbox";
  dialog.setAttribute("aria-label", "Expanded image");
  dialog.innerHTML = `
    <figure class="lightbox__figure">
      <img class="lightbox__img" alt="">
      <figcaption class="lightbox__caption"></figcaption>
    </figure>
    <button type="button" class="lightbox__btn lightbox__btn--close" aria-label="Close">${ICONS.close}</button>
    <button type="button" class="lightbox__btn lightbox__btn--prev" aria-label="Previous image">${ICONS.prev}</button>
    <button type="button" class="lightbox__btn lightbox__btn--next" aria-label="Next image">${ICONS.next}</button>
  `;
  document.body.append(dialog);

  img = dialog.querySelector(".lightbox__img");
  caption = dialog.querySelector(".lightbox__caption");
  prevBtn = dialog.querySelector(".lightbox__btn--prev");
  nextBtn = dialog.querySelector(".lightbox__btn--next");

  dialog.querySelector(".lightbox__btn--close").addEventListener("click", () => dialog.close());
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));

  /* Clicking the dark area (not the image or buttons) closes it. */
  dialog.addEventListener("click", (event) => {
    if (Date.now() < suppressClickUntil) return;
    if (event.target === dialog || event.target.classList.contains("lightbox__figure")) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { step(-1); event.preventDefault(); }
    if (event.key === "ArrowRight") { step(1); event.preventDefault(); }
  });

  dialog.addEventListener("contextmenu", (event) => event.preventDefault());

  gestures();
}

/* ---- zoom and swipe ---------------------------------------------------- */

function applyTransform() {
  img.style.transform = scale === 1 ? "" : `translate(${panX}px, ${panY}px) scale(${scale})`;
  dialog.classList.toggle("is-zoomed", scale > 1);
}

function clampPan() {
  const w = img.offsetWidth * scale;
  const h = img.offsetHeight * scale;
  const maxX = Math.max(0, (w - window.innerWidth) / 2 + 40);
  const maxY = Math.max(0, (h - window.innerHeight) / 2 + 40);
  panX = Math.max(-maxX, Math.min(maxX, panX));
  panY = Math.max(-maxY, Math.min(maxY, panY));
}

function resetZoom() {
  scale = 1; panX = 0; panY = 0;
  applyTransform();
}

/* Zoom to a new level, keeping the point under the fingers where it is. */
function zoomTo(next, cx, cy) {
  const clamped = Math.max(1, Math.min(MAX_ZOOM, next));
  const box = img.getBoundingClientRect();
  const ox = cx - (box.left + box.width / 2);          /* point relative to the picture's center */
  const oy = cy - (box.top + box.height / 2);
  const ratio = clamped / scale;
  panX -= ox * (ratio - 1);
  panY -= oy * (ratio - 1);
  scale = clamped;
  if (scale === 1) { panX = 0; panY = 0; }
  clampPan();
  applyTransform();
}

function gestures() {
  const pointers = new Map();
  let pinchStart = null;                       /* { distance, scale } */
  let dragFrom = null;                         /* { x, y, panX, panY } */
  let swipeFrom = null;                        /* { x, y, at } */
  let lastTap = { at: 0, x: 0, y: 0 };
  let moved = false;                           /* did this touch travel, or pinch? */

  const distance = () => {
    const [a, b] = [...pointers.values()];
    return Math.hypot(a.x - b.x, a.y - b.y);
  };
  const middle = () => {
    const [a, b] = [...pointers.values()];
    return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  };

  dialog.addEventListener("pointerdown", (event) => {
    if (event.target.closest(".lightbox__btn")) return;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (pointers.size === 1) moved = false;
    if (pointers.size === 2) {
      moved = true;
      pinchStart = { distance: distance(), scale };
      swipeFrom = null; dragFrom = null;
    } else if (pointers.size === 1) {
      if (scale > 1) dragFrom = { x: event.clientX, y: event.clientY, panX, panY };
      else swipeFrom = { x: event.clientX, y: event.clientY, at: Date.now() };
    }
  });

  dialog.addEventListener("pointermove", (event) => {
    if (!pointers.has(event.pointerId)) return;
    const first = pointers.get(event.pointerId);
    if (first && Math.hypot(event.clientX - first.x, event.clientY - first.y) > 0) moved = moved || pointers.size > 1;
    pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (swipeFrom && Math.hypot(event.clientX - swipeFrom.x, event.clientY - swipeFrom.y) > 12) moved = true;
    if (dragFrom && Math.hypot(event.clientX - dragFrom.x, event.clientY - dragFrom.y) > 12) moved = true;
    if (pointers.size === 2 && pinchStart) {
      const mid = middle();
      zoomTo(pinchStart.scale * (distance() / pinchStart.distance), mid.x, mid.y);
    } else if (dragFrom) {
      panX = dragFrom.panX + (event.clientX - dragFrom.x);
      panY = dragFrom.panY + (event.clientY - dragFrom.y);
      clampPan();
      applyTransform();
    }
  });

  const finish = (event) => {
    if (!pointers.has(event.pointerId)) return;
    const wasOne = pointers.size === 1;
    if (moved) suppressClickUntil = Date.now() + 450;
    pointers.delete(event.pointerId);
    if (pointers.size < 2) pinchStart = null;
    if (!wasOne) { dragFrom = null; swipeFrom = null; return; }

    dragFrom = null;
    if (event.type === "pointercancel") { swipeFrom = null; return; }

    /* A clear horizontal flick while not zoomed changes the picture. */
    if (swipeFrom) {
      const dx = event.clientX - swipeFrom.x;
      const dy = event.clientY - swipeFrom.y;
      const quick = Date.now() - swipeFrom.at < 900;
      swipeFrom = null;
      if (scale === 1 && quick && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4 && images.length > 1) {
        step(dx < 0 ? 1 : -1);
        return;
      }
    }

    /* Double-tap (or double-click) toggles zoom. */
    const now = Date.now();
    const onPicture = event.target === img;
    if (onPicture && now - lastTap.at < 320 && Math.hypot(event.clientX - lastTap.x, event.clientY - lastTap.y) < 30) {
      zoomTo(scale > 1 ? 1 : 2.5, event.clientX, event.clientY);
      lastTap = { at: 0, x: 0, y: 0 };
    } else {
      lastTap = { at: now, x: event.clientX, y: event.clientY };
    }
  };
  dialog.addEventListener("pointerup", finish);
  dialog.addEventListener("pointercancel", finish);

  /* Mouse wheel and trackpad pinch zoom around the cursor. */
  dialog.addEventListener("wheel", (event) => {
    if (event.target.closest(".lightbox__btn")) return;
    event.preventDefault();
    zoomTo(scale * Math.exp(-event.deltaY * (event.ctrlKey ? 0.01 : 0.0025)), event.clientX, event.clientY);
  }, { passive: false });

  dialog.addEventListener("close", resetZoom);
}

function render() {
  resetZoom();
  const item = images[index];
  img.src = item.src;
  img.alt = item.alt || "";
  caption.textContent = item.caption ? item.caption : "";
  caption.hidden = !item.caption;
  const single = images.length < 2;
  prevBtn.hidden = single;
  nextBtn.hidden = single;
}

function step(direction) {
  index = (index + direction + images.length) % images.length;
  render();
}

export function openLightbox(list, start) {
  if (!dialog) build();
  images = list;
  index = start;
  render();
  dialog.showModal();
}
