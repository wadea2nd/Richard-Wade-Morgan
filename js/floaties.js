/* Floating emoji.
   Four emoji drift around the window, bounce off its edges and each other,
   and can be grabbed and thrown. They are decoration only (aria-hidden), so
   nothing depends on them. Their positions carry across pages within a
   visit, so they feel like one continuous toy.

   Reduced motion: they stay where they are (still draggable, no inertia). */

const EMOJI = ["🐊", "🥜", "🐶", "🍑"];
const STORE = "rwm-floaties";
const BASE_SPEED = 46;          /* px/s the emoji settle back toward */
const MAX_THROW = 1400;         /* px/s cap on a throw */

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function initFloaties() {
  const host = document.body;
  const still = reduced();
  const saved = restore();

  const items = EMOJI.map((char, i) => {
    const el = document.createElement("span");
    el.className = "floaty";
    el.setAttribute("aria-hidden", "true");
    const glyph = document.createElement("span");
    glyph.className = "floaty__glyph";
    glyph.textContent = char;
    el.append(glyph);
    host.append(el);
    return { el, i, x: 0, y: 0, vx: 0, vy: 0, size: 0, dragging: false };
  });

  const bounds = () => ({ w: window.innerWidth, h: window.innerHeight });

  function place() {
    const { w, h } = bounds();
    items.forEach((item) => {
      item.size = item.el.offsetWidth || 40;
      const s = saved && saved[item.i];
      if (s) {
        item.x = s.x * w; item.y = s.y * h; item.vx = s.vx * w; item.vy = s.vy * h;
      } else {
        item.x = Math.random() * (w - item.size);
        item.y = Math.random() * (h - item.size);
        const angle = Math.random() * Math.PI * 2;
        const speed = BASE_SPEED * (0.7 + Math.random() * 0.7);
        item.vx = Math.cos(angle) * speed;
        item.vy = Math.sin(angle) * speed;
      }
      clamp(item);
      draw(item);
    });
  }

  function clamp(item) {
    const { w, h } = bounds();
    item.x = Math.min(Math.max(item.x, 0), Math.max(w - item.size, 0));
    item.y = Math.min(Math.max(item.y, 0), Math.max(h - item.size, 0));
  }

  function draw(item) {
    const tilt = Math.max(-18, Math.min(18, item.vx * 0.06));
    item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${tilt}deg)`;
  }

  /* Physics ----------------------------------------------------------------- */
  let last = performance.now();

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const { w, h } = bounds();

    items.forEach((item) => {
      if (item.dragging) return;

      item.x += item.vx * dt;
      item.y += item.vy * dt;

      if (item.x < 0) { item.x = 0; item.vx = Math.abs(item.vx) * 0.92; }
      if (item.y < 0) { item.y = 0; item.vy = Math.abs(item.vy) * 0.92; }
      if (item.x > w - item.size) { item.x = w - item.size; item.vx = -Math.abs(item.vx) * 0.92; }
      if (item.y > h - item.size) { item.y = h - item.size; item.vy = -Math.abs(item.vy) * 0.92; }

      /* Ease thrown emoji back down to a lazy drift (and keep slow ones moving). */
      const speed = Math.hypot(item.vx, item.vy) || 1;
      const eased = speed + (BASE_SPEED - speed) * Math.min(1, dt * 0.7);
      item.vx *= eased / speed;
      item.vy *= eased / speed;
    });

    /* Gentle elastic collisions between emoji. */
    for (let a = 0; a < items.length; a += 1) {
      for (let b = a + 1; b < items.length; b += 1) {
        const p = items[a], q = items[b];
        const dx = (q.x + q.size / 2) - (p.x + p.size / 2);
        const dy = (q.y + q.size / 2) - (p.y + p.size / 2);
        const dist = Math.hypot(dx, dy);
        const min = (p.size + q.size) * 0.42;
        if (dist > 0 && dist < min) {
          const nx = dx / dist, ny = dy / dist;
          const push = (min - dist) / 2;
          if (!p.dragging) { p.x -= nx * push; p.y -= ny * push; }
          if (!q.dragging) { q.x += nx * push; q.y += ny * push; }
          const rv = (q.vx - p.vx) * nx + (q.vy - p.vy) * ny;
          if (rv < 0) {
            p.vx += rv * nx; p.vy += rv * ny;
            q.vx -= rv * nx; q.vy -= rv * ny;
          }
        }
      }
    }

    items.forEach(draw);
    requestAnimationFrame(frame);
  }

  /* Dragging and throwing ---------------------------------------------------- */
  items.forEach((item) => {
    let grabX = 0, grabY = 0;
    let trail = [];

    item.el.addEventListener("pointerdown", (event) => {
      item.dragging = true;
      item.el.classList.add("is-dragging");
      item.el.setPointerCapture(event.pointerId);
      grabX = event.clientX - item.x;
      grabY = event.clientY - item.y;
      trail = [{ t: performance.now(), x: item.x, y: item.y }];
      event.preventDefault();
    });

    item.el.addEventListener("pointermove", (event) => {
      if (!item.dragging) return;
      item.x = event.clientX - grabX;
      item.y = event.clientY - grabY;
      clamp(item);
      const now = performance.now();
      trail.push({ t: now, x: item.x, y: item.y });
      trail = trail.filter((point) => now - point.t < 90);
      draw(item);
    });

    const release = () => {
      if (!item.dragging) return;
      item.dragging = false;
      item.el.classList.remove("is-dragging");
      if (still || trail.length < 2) { item.vx = 0; item.vy = 0; return; }
      const first = trail[0], lastPoint = trail[trail.length - 1];
      const span = Math.max((lastPoint.t - first.t) / 1000, 0.016);
      item.vx = Math.max(-MAX_THROW, Math.min(MAX_THROW, (lastPoint.x - first.x) / span));
      item.vy = Math.max(-MAX_THROW, Math.min(MAX_THROW, (lastPoint.y - first.y) / span));
    };
    item.el.addEventListener("pointerup", release);
    item.el.addEventListener("pointercancel", release);
  });

  /* Keep everything on screen when the window changes size. */
  window.addEventListener("resize", () => { items.forEach((item) => { clamp(item); draw(item); }); });

  /* Remember where everything is so the next page can pick up from here. */
  window.addEventListener("pagehide", () => {
    const { w, h } = bounds();
    try {
      sessionStorage.setItem(STORE, JSON.stringify(items.map((i) => ({
        x: i.x / w, y: i.y / h, vx: i.vx / w, vy: i.vy / h
      }))));
    } catch (e) { /* ignore */ }
  });

  place();
  items.forEach((item, i) => {
    item.el.style.setProperty("--d", `${500 + i * 140}ms`);
    requestAnimationFrame(() => item.el.classList.add("is-ready"));
  });

  if (still) {
    items.forEach((item) => { item.vx = 0; item.vy = 0; });
  } else {
    requestAnimationFrame((t) => { last = t; frame(t); });
  }
}

function restore() {
  try {
    const raw = sessionStorage.getItem(STORE);
    const data = raw && JSON.parse(raw);
    return Array.isArray(data) && data.length === EMOJI.length ? data : null;
  } catch (e) {
    return null;
  }
}
