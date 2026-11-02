/* Image lightbox, built on the native <dialog> element, which supplies the
   focus trap, Escape-to-close, and return of focus for free.
   Arrow keys (and the on-screen arrows) step through the project's images. */

const ICONS = {
  close: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 5l14 14M19 5L5 19"/></svg>',
  prev: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M9 5l7 7-7 7"/></svg>'
};

let dialog, img, caption, prevBtn, nextBtn;
let images = [];
let index = 0;

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
    if (event.target === dialog || event.target.classList.contains("lightbox__figure")) dialog.close();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") { step(-1); event.preventDefault(); }
    if (event.key === "ArrowRight") { step(1); event.preventDefault(); }
  });

  dialog.addEventListener("contextmenu", (event) => event.preventDefault());
}

function render() {
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
