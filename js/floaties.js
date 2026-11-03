/* Floating emoji.

   Float mode   Four emoji drift across the window: each floats in from one
                edge, crosses the screen, and floats out another edge, then
                returns after a pause. They can be grabbed and thrown.

   Swat mode    The "Swat gnats" button drops them to the bottom of the
                screen, where they pile up and stay until each is dragged off
                the left, right, or top edge. "Release gnats" brings them back.

   They are decoration only (aria-hidden), so nothing depends on them. Their
   state carries across pages within a visit. With reduced motion they never
   move on their own: they stay put, still draggable, and swatting drops
   them straight to the bottom. */

const EMOJI = ["🐊", "🥜", "🐶", "🍑"];
const STORE = "rwm-floaties";
const BASE_SPEED = 52;        /* px/s of a lazy drift */
const MAX_THROW = 1500;       /* px/s cap on a throw */
const GRAVITY = 2400;         /* px/s² while swatted */
const EDGE_ZONE = 14;         /* px from an edge that counts as "off the screen" */

const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const rand = (min, max) => min + Math.random() * (max - min);

export function initFloaties() {
  const still = reduced();
  const saved = restore();
  let mode = saved && saved.mode === "swatted" ? "swatted" : "float";

  const items = EMOJI.map((char, i) => {
    const el = document.createElement("span");
    el.className = "floaty";
    el.setAttribute("aria-hidden", "true");
    const glyph = document.createElement("span");
    glyph.className = "floaty__glyph";
    glyph.textContent = char;
    el.append(glyph);
    document.body.append(el);
    return { el, i, x: 0, y: 0, vx: 0, vy: 0, rot: 0, size: 40, wait: 0, gone: false, dragging: false };
  });

  const bounds = () => ({ w: window.innerWidth, h: window.innerHeight });
  const floorOf = (item) => bounds().h - item.size - 6;

  const isOut = (item) => {
    const { w, h } = bounds();
    return item.x > w + 20 || item.x < -item.size - 20 || item.y > h + 20 || item.y < -item.size - 20;
  };

  const onScreen = (item) => !item.gone && item.wait <= 0 && !isOut(item);

  /* Start an emoji just outside a random edge, heading across the window. */
  function spawn(item, delay) {
    const { w, h } = bounds();
    const side = Math.floor(Math.random() * 4);             /* 0 top, 1 right, 2 bottom, 3 left */
    const pad = item.size + 12;
    if (side === 0) { item.x = rand(0, w); item.y = -pad; }
    if (side === 1) { item.x = w + 12; item.y = rand(0, h); }
    if (side === 2) { item.x = rand(0, w); item.y = h + 12; }
    if (side === 3) { item.x = -pad; item.y = rand(0, h); }

    const tx = rand(w * 0.2, w * 0.8);
    const ty = rand(h * 0.2, h * 0.8);
    const dx = tx - item.x, dy = ty - item.y;
    const len = Math.hypot(dx, dy) || 1;
    const speed = BASE_SPEED * rand(0.75, 1.3);
    item.vx = (dx / len) * speed;
    item.vy = (dy / len) * speed;
    item.wait = delay;
  }

  function draw(item) {
    const tilt = mode === "swatted"
      ? item.rot
      : Math.max(-16, Math.min(16, item.vx * 0.05));
    item.el.style.transform = `translate3d(${item.x}px, ${item.y}px, 0) rotate(${tilt}deg)`;
  }

  /* Initial placement ---------------------------------------------------- */
  function place() {
    const { w, h } = bounds();
    items.forEach((item) => {
      item.size = item.el.offsetWidth || 40;
      const s = saved && saved.items && saved.items[item.i];

      if (s) {
        item.x = s.x * w; item.y = s.y * h;
        item.vx = s.vx * w; item.vy = s.vy * h;
        item.wait = s.wait || 0;
        item.gone = !!s.gone;
        item.rot = s.rot || 0;
        if (item.gone) { item.el.classList.add("is-gone"); item.el.hidden = true; }
      } else if (still) {
        item.x = rand(0, w - item.size);
        item.y = rand(0, h - item.size);
      } else {
        spawn(item, 0.8 + item.i * rand(1.2, 2.2));          /* float in, one by one */
      }

      if (mode === "swatted" && !item.gone) {
        item.y = floorOf(item);
        item.vx = 0; item.vy = 0; item.wait = 0;
        if (!item.rot) item.rot = rand(-22, 22);
      }
      draw(item);
    });
  }

  /* Physics --------------------------------------------------------------- */
  let last = performance.now();

  function stepFloat(item, dt) {
    if (item.wait > 0) { item.wait -= dt; return; }

    item.x += item.vx * dt;
    item.y += item.vy * dt;

    /* Gone past an edge and still heading away: float back in later. */
    if (isOut(item)) {
      const { w, h } = bounds();
      const away = (item.x + item.size / 2 - w / 2) * item.vx + (item.y + item.size / 2 - h / 2) * item.vy > 0;
      if (away) spawn(item, rand(1.5, 6));
    }

    /* Ease a thrown emoji back to a lazy drift. */
    const speed = Math.hypot(item.vx, item.vy) || 1;
    const eased = speed + (BASE_SPEED - speed) * Math.min(1, dt * 0.6);
    item.vx *= eased / speed;
    item.vy *= eased / speed;
  }

  function stepSwatted(item, dt) {
    const { w } = bounds();
    item.vy += GRAVITY * dt;
    item.x += item.vx * dt;
    item.y += item.vy * dt;

    const floor = floorOf(item);
    if (item.y >= floor) {
      item.y = floor;
      item.vy = Math.abs(item.vy) < 160 ? 0 : -item.vy * 0.32;
      item.vx *= Math.max(0, 1 - dt * 7);                      /* floor friction */
    }
    if (item.x < 0 && !item.dragging) { item.x = 0; item.vx = Math.abs(item.vx) * 0.4; }
    if (item.x > w - item.size && !item.dragging) { item.x = w - item.size; item.vx = -Math.abs(item.vx) * 0.4; }
  }

  function collide() {
    for (let a = 0; a < items.length; a += 1) {
      for (let b = a + 1; b < items.length; b += 1) {
        const p = items[a], q = items[b];
        if (!onScreen(p) || !onScreen(q)) continue;
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
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    items.forEach((item) => {
      if (item.dragging || item.gone) return;
      if (mode === "swatted") stepSwatted(item, dt);
      else stepFloat(item, dt);
    });
    collide();
    items.forEach((item) => { if (!item.gone) draw(item); });
    requestAnimationFrame(frame);
  }

  /* Dragging and throwing -------------------------------------------------- */
  items.forEach((item) => {
    let grabX = 0, grabY = 0;
    let trail = [];
    let pointer = { x: 0, y: 0 };

    item.el.addEventListener("pointerdown", (event) => {
      item.dragging = true;
      item.wait = 0;
      item.el.classList.add("is-dragging");
      item.el.setPointerCapture(event.pointerId);
      grabX = event.clientX - item.x;
      grabY = event.clientY - item.y;
      trail = [{ t: performance.now(), x: item.x, y: item.y }];
      pointer = { x: event.clientX, y: event.clientY };
      event.preventDefault();
    });

    item.el.addEventListener("pointermove", (event) => {
      if (!item.dragging) return;
      item.x = event.clientX - grabX;
      item.y = event.clientY - grabY;
      pointer = { x: event.clientX, y: event.clientY };
      const now = performance.now();
      trail.push({ t: now, x: item.x, y: item.y });
      trail = trail.filter((point) => now - point.t < 90);
      draw(item);
    });

    const release = () => {
      if (!item.dragging) return;
      item.dragging = false;
      item.el.classList.remove("is-dragging");

      /* Dragged off the left, right, or top edge while swatted: gone. */
      if (mode === "swatted") {
        const { w } = bounds();
        const cx = item.x + item.size / 2;
        const cy = item.y + item.size / 2;
        if (pointer.x <= EDGE_ZONE || pointer.x >= w - EDGE_ZONE || pointer.y <= EDGE_ZONE || cx < 0 || cx > w || cy < 0) {
          dismiss(item);
          return;
        }
      }

      if (still || trail.length < 2) { item.vx = 0; item.vy = 0; return; }
      const first = trail[0], lastPoint = trail[trail.length - 1];
      const span = Math.max((lastPoint.t - first.t) / 1000, 0.016);
      item.vx = Math.max(-MAX_THROW, Math.min(MAX_THROW, (lastPoint.x - first.x) / span));
      item.vy = Math.max(-MAX_THROW, Math.min(MAX_THROW, (lastPoint.y - first.y) / span));
    };
    item.el.addEventListener("pointerup", release);
    item.el.addEventListener("pointercancel", release);
  });

  function dismiss(item) {
    item.gone = true;
    item.vx = 0; item.vy = 0;
    item.el.classList.add("is-gone");
    window.setTimeout(() => { if (item.gone) item.el.hidden = true; }, 400);
  }

  /* Swat / release ----------------------------------------------------------- */
  const buttons = [...document.querySelectorAll("[data-swat]")];

  /* The buttons are icon-only, so the label lives in aria-label and title. */
  const status = document.createElement("p");
  status.className = "visually-hidden";
  status.setAttribute("role", "status");
  document.body.append(status);

  function syncButtons(announce = false) {
    const label = mode === "swatted" ? "Release gnats" : "Swat gnats";
    buttons.forEach((button) => {
      button.setAttribute("aria-label", label);
      button.setAttribute("title", label);
      button.dataset.state = mode;
    });
    if (announce) status.textContent = mode === "swatted" ? "Gnats swatted." : "Gnats released.";
  }

  function swat() {
    mode = "swatted";
    items.forEach((item) => {
      if (item.gone) return;
      item.wait = 0;
      item.rot = rand(-24, 24);

      if (still) {
        item.y = floorOf(item);
        item.vx = 0; item.vy = 0;
        item.x = Math.min(Math.max(item.x, 0), bounds().w - item.size);
        draw(item);
        return;
      }

      if (isOut(item)) {                         /* out of view: drop in from above */
        item.x = rand(0, bounds().w - item.size);
        item.y = -item.size - rand(0, 160);
        item.vx = 0; item.vy = 0;
      } else {
        item.vx += rand(-140, 140);
        item.vy = Math.min(item.vy, 0) + rand(-340, -80);   /* a little hop first */
      }
    });
    syncButtons(true);
  }

  function releaseAll() {
    mode = "float";
    items.forEach((item) => {
      if (item.gone) {
        item.gone = false;
        item.el.hidden = false;
        item.el.classList.remove("is-gone");
        if (!still) spawn(item, rand(0.3, 2));
        else { item.x = rand(0, bounds().w - item.size); item.y = rand(0, bounds().h - item.size); }
      } else if (!still) {
        item.vx = rand(-90, 90);
        item.vy = -rand(220, 340);                /* lift off the floor */
      }
    });
    syncButtons(true);
  }

  buttons.forEach((button) => button.addEventListener("click", () => (mode === "swatted" ? releaseAll() : swat())));

  /* Keep things sensible when the window changes size. */
  window.addEventListener("resize", () => {
    const { w } = bounds();
    items.forEach((item) => {
      if (mode === "swatted" && !item.gone) {
        item.x = Math.min(item.x, w - item.size);
        item.y = floorOf(item);
      }
      draw(item);
    });
  });

  /* Remember everything so the next page picks up where this one left off. */
  window.addEventListener("pagehide", () => {
    const { w, h } = bounds();
    try {
      sessionStorage.setItem(STORE, JSON.stringify({
        mode,
        items: items.map((i) => ({
          x: i.x / w, y: i.y / h, vx: i.vx / w, vy: i.vy / h, rot: i.rot, wait: i.wait, gone: i.gone
        }))
      }));
    } catch (e) { /* ignore */ }
  });

  place();
  syncButtons();
  items.forEach((item) => { if (!item.gone) requestAnimationFrame(() => item.el.classList.add("is-ready")); });

  if (!still) requestAnimationFrame((t) => { last = t; frame(t); });
}

function restore() {
  try {
    const raw = sessionStorage.getItem(STORE);
    const data = raw && JSON.parse(raw);
    return data && Array.isArray(data.items) && data.items.length === EMOJI.length ? data : null;
  } catch (e) {
    return null;
  }
}
