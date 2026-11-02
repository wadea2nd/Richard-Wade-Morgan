/* Design-system page: fills in live token values and computed type sizes
   straight from the stylesheet, so the page can never drift from the site. */

export function initDesignSystem() {
  const root = document.documentElement;

  const fill = () => {
    const styles = getComputedStyle(root);
    document.querySelectorAll("[data-token]").forEach((el) => {
      el.textContent = styles.getPropertyValue(el.dataset.token).trim();
    });
  };

  const sizes = {
    intro: () => getComputedStyle(document.querySelector(".ds__intro")).fontSize,
    h1: () => getComputedStyle(document.querySelector(".ds__h1")).fontSize,
    h2: () => getComputedStyle(document.querySelector(".ds__h2")).fontSize,
    body: () => getComputedStyle(document.body).fontSize,
    nav: () => getComputedStyle(document.querySelector(".ds__nav")).fontSize,
    mono: () => getComputedStyle(document.querySelector(".ds__specimen .mono:not(.muted)")).fontSize
  };

  const fillSizes = () => {
    document.querySelectorAll("[data-size]").forEach((el) => {
      const read = sizes[el.dataset.size];
      if (read) el.textContent = `${Math.round(parseFloat(read()) * 10) / 10}px`;
    });
  };

  fill();
  fillSizes();
  window.addEventListener("resize", fillSizes);

  /* Re-read after a theme change. */
  new MutationObserver(fill).observe(root, { attributes: true, attributeFilter: ["data-theme"] });
}
