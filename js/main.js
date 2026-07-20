/* ============================================================================
   Richard Wade Morgan — Portfolio interactions
   ----------------------------------------------------------------------------
   Plain JavaScript, no dependencies. Every feature is wrapped in safeInit()
   so one failure can never blank the site. All project content is inserted
   with textContent (never innerHTML), so nothing in projects.js can inject
   markup. You should not need to edit this file.
   ========================================================================== */

(function () {
  "use strict";

  document.documentElement.classList.remove("no-js");

  var prefersReducedMotion =
    window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Run each feature independently; log failures instead of dying. */
  function safeInit(name, fn) {
    try { fn(); } catch (err) {
      if (window.console && console.error) console.error("[RWM] " + name + " failed:", err);
    }
  }

  /* --------------------------------------------------------------------------
     1. Animation gate — hidden documents (embedded previews, background tabs)
     freeze CSS transitions at their first frame, which would leave fade-in
     pages permanently blank. While the document is hidden, .anim-off makes
     every reveal instant; it lifts when the page is shown.
     -------------------------------------------------------------------------- */
  function initAnimGate() {
    var root = document.documentElement;
    function sync() { root.classList.toggle("anim-off", document.hidden === true); }
    sync();
    document.addEventListener("visibilitychange", sync);
  }

  /* --------------------------------------------------------------------------
     2. Accent — one muted color per visit, drawn from the site palette.
     Used for hovers, selection, ripples, and type accents.
     -------------------------------------------------------------------------- */
  var PALETTE = [
    { hex: "#a6503f", hue: 12 },   /* dusty red    */
    { hex: "#b07d2b", hue: 40 },   /* harvest gold */
    { hex: "#6e7f4c", hue: 82 },   /* sage         */
    { hex: "#527389", hue: 204 },  /* slate blue   */
    { hex: "#8a5a83", hue: 309 }   /* muted plum   */
  ];

  function initAccent() {
    var pick = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    document.documentElement.style.setProperty("--accent", pick.hex);
  }

  /* --------------------------------------------------------------------------
     3. Page fade transitions
     -------------------------------------------------------------------------- */
  function initPageTransitions() {
    function reveal() { document.body.classList.add("is-ready"); }

    if (document.readyState === "complete" || document.readyState === "interactive") {
      reveal();
    } else {
      document.addEventListener("DOMContentLoaded", reveal);
    }
    /* Belt and suspenders: never leave the page invisible. */
    setTimeout(reveal, 1200);

    /* Restore visibility when returning via the back/forward cache. */
    window.addEventListener("pageshow", function () {
      document.body.classList.remove("is-leaving");
      reveal();
    });

    /* Fade out before following internal links (new-tab clicks excluded). */
    document.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
      var a = e.target && e.target.closest ? e.target.closest("a[href]") : null;
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      var href = a.getAttribute("href") || "";
      if (/^(https?:)?\/\//i.test(href) || /^(mailto|tel):/i.test(href) || href.charAt(0) === "#") return;
      if (prefersReducedMotion || document.hidden) return;   /* navigate instantly */
      e.preventDefault();
      document.body.classList.add("is-leaving");
      setTimeout(function () { window.location.href = href; }, 220);
    });
  }

  /* --------------------------------------------------------------------------
     4. Cursor-following gradient cloud — small, muted, behind everything.
     -------------------------------------------------------------------------- */
  function initCloud() {
    var canvas = document.getElementById("cloudCanvas");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* Draw very small and upscale via CSS (image-rendering: pixelated) —
       the coarse resolution is the grain that gives the cloud its form. */
    var SCALE = 0.055, W = 0, H = 0;
    function resize() {
      W = Math.max(1, Math.round(window.innerWidth * SCALE));
      H = Math.max(1, Math.round(window.innerHeight * SCALE));
      canvas.width = W;
      canvas.height = H;
    }
    resize();
    window.addEventListener("resize", resize);

    var pointer = { x: 0.5, y: 0.42, active: false };
    window.addEventListener("pointermove", function (e) {
      pointer.x = e.clientX / Math.max(1, window.innerWidth);
      pointer.y = e.clientY / Math.max(1, window.innerHeight);
      pointer.active = true;
    }, { passive: true });

    /* No mouse (phones/tablets): the cloud rides along with each scroll,
       swaying gently, so the effect still feels alive under a thumb. */
    var finePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) {
      window.addEventListener("scroll", function () {
        var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
        pointer.x = 0.5 + Math.sin(window.scrollY / 240) * 0.22;
        pointer.y = 0.22 + (window.scrollY / max) * 0.5;
        pointer.active = true;
      }, { passive: true });
    }

    /* A small cluster: blobs stay near the cursor, not across the page. */
    var blobs = [];
    for (var i = 0; i < 4; i++) {
      var c = PALETTE[(i * 2 + Math.floor(Math.random() * PALETTE.length)) % PALETTE.length];
      blobs.push({
        hue: c.hue,
        x: 0.5, y: 0.42, tx: 0.5, ty: 0.42,
        r: 0.11 + Math.random() * 0.07,          /* compact radii */
        speed: i === 0 ? 0.09 : 0.02 + Math.random() * 0.02,
        drift: 0.4 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        spread: 0.10 + Math.random() * 0.08       /* how far from the cursor */
      });
    }

    var t = Math.random() * 1000;

    /* Physics only — advance every blob toward its target. */
    function step() {
      t += 0.004;
      var ax = pointer.x, ay = pointer.y;
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i];
        if (i === 0) {
          b.tx = ax; b.ty = ay;
        } else {
          /* Satellites orbit the cursor tightly. */
          b.tx = ax + Math.sin(t * b.drift + b.phase) * b.spread;
          b.ty = ay + Math.cos(t * b.drift * 0.8 + b.phase) * b.spread;
        }
        b.x += (b.tx - b.x) * b.speed;
        b.y += (b.ty - b.y) * b.speed;
      }
    }

    function paint() {
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < blobs.length; i++) {
        var b = blobs[i];
        var cx = b.x * W, cy = b.y * H;
        var radius = b.r * Math.min(W, H) * 2.4;
        var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        g.addColorStop(0, "hsla(" + b.hue + ", 48%, 60%, 0.65)");
        g.addColorStop(1, "hsla(" + b.hue + ", 48%, 60%, 0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      /* A dusting of single-pixel specks — grain that shimmers as it moves */
      for (var s = 0; s < 140; s++) {
        ctx.fillStyle = s % 2 ? "rgba(38, 34, 26, 0.05)" : "rgba(241, 236, 223, 0.10)";
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
    }

    function frame() {
      step();
      paint();
      if (!prefersReducedMotion) requestAnimationFrame(frame);
    }

    frame(); /* reduced motion: renders one static frame, then stops */

    /* rAF freezes in hidden/embedded documents; keep the cloud moving on a
       slow timer there so the effect survives. */
    if (!prefersReducedMotion) {
      setInterval(function () {
        if (!document.hidden) return;  /* visible pages are driven by rAF */
        for (var s = 0; s < 30; s++) step();
        paint();
      }, 400);
    }
  }

  /* --------------------------------------------------------------------------
     5. Ripple on click — any .btn, .nav-link, .subnav-link, buttons.
     -------------------------------------------------------------------------- */
  function initRipple() {
    if (prefersReducedMotion) return;
    document.addEventListener("pointerdown", function (e) {
      var host = e.target && e.target.closest
        ? e.target.closest(".btn, .nav-link, .lightbox-close, .lightbox-arrow")
        : null;
      if (!host) return;
      var rect = host.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      host.appendChild(ripple);
      ripple.addEventListener("animationend", function () { ripple.remove(); });
      setTimeout(function () { ripple.remove(); }, 800); /* fallback cleanup */
    });
  }

  /* --------------------------------------------------------------------------
     7. Homepage: auto-rotating feature carousel (also advances on
     horizontal scroll/swipe with the same crossfade)
     -------------------------------------------------------------------------- */
  function initFeatureSlider() {
    var box = document.getElementById("featureBox");
    var items = window.RWM_CAROUSEL;
    if (!box || !items || !items.length) return;

    var stage = box.querySelector(".feature-stage");
    if (!stage) return;
    /* Optional caption bar — the current design goes without one */
    var captionName = box.querySelector(".feature-caption .name");
    var counter = box.querySelector(".feature-caption .counter");

    var slides = [], current = 0, timer = null;
    var INTERVAL = 2200; /* brisk, control-free rhythm */

    items.forEach(function (item, i) {
      var el = document.createElement(item.href ? "a" : "div");
      el.className = "feature-slide";
      if (item.href) {
        el.href = item.href;
        el.setAttribute("aria-label", "View project: " + item.name);
      }
      var img = document.createElement("img");
      img.src = item.src;
      img.alt = item.alt || item.name || "Featured work";
      img.loading = i === 0 ? "eager" : "lazy";
      img.addEventListener("error", function () { el.remove(); });
      el.appendChild(img);
      stage.appendChild(el);
      slides.push(el);
    });

    function show(i) {
      current = (i + items.length) % items.length;
      slides.forEach(function (s, j) {
        s.classList.toggle("is-active", j === current);
        s.tabIndex = j === current ? 0 : -1;
      });
      if (captionName) {
        captionName.textContent = (items[current].name || "") +
          (items[current].year ? " — " + items[current].year : "");
      }
      if (counter) {
        counter.textContent = String(current + 1).padStart(2, "0") + " / " +
          String(items.length).padStart(2, "0");
      }
    }

    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() {
      stop();
      if (prefersReducedMotion) return;
      timer = setInterval(function () { show(current + 1); }, INTERVAL);
    }

    /* Pause while hovered, focused, or the tab is hidden. */
    box.addEventListener("mouseenter", stop);
    box.addEventListener("mouseleave", restart);
    box.addEventListener("focusin", stop);
    box.addEventListener("focusout", restart);
    document.addEventListener("visibilitychange", function () {
      if (document.hidden) stop(); else restart();
    });

    /* Horizontal trackpad/wheel scroll fades to the next/previous slide. */
    var wheelLock = 0;
    stage.addEventListener("wheel", function (e) {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY) || Math.abs(e.deltaX) < 8) return;
      e.preventDefault();
      var now = Date.now();
      if (now - wheelLock < 550) return;  /* one fade per gesture */
      wheelLock = now;
      show(current + (e.deltaX > 0 ? 1 : -1));
      restart();
    }, { passive: false });

    /* Touch/mouse swipe does the same. */
    var swipeX = null, didSwipe = false;
    stage.addEventListener("pointerdown", function (e) { swipeX = e.clientX; didSwipe = false; });
    stage.addEventListener("pointerup", function (e) {
      if (swipeX === null) return;
      var dx = e.clientX - swipeX;
      swipeX = null;
      if (Math.abs(dx) > 40) {
        didSwipe = true;
        show(current + (dx < 0 ? 1 : -1));
        restart();
      }
    });
    /* A swipe that ends on a linked slide must not navigate. */
    stage.addEventListener("click", function (e) {
      if (didSwipe) { e.preventDefault(); e.stopPropagation(); didSwipe = false; }
    }, true);

    show(0);
    restart();
  }

  /* --------------------------------------------------------------------------
     8. Work page: index rows
     -------------------------------------------------------------------------- */
  function initWorkIndex() {
    var host = document.getElementById("workIndex");
    if (!host || !window.RWM_PROJECTS || !window.RWM_PROJECT_ORDER) return;
    window.RWM_PROJECT_ORDER.forEach(function (slug, i) {
      var p = window.RWM_PROJECTS[slug];
      if (!p) return;
      var a = document.createElement("a");
      a.className = "index-row fade-in";
      a.href = "project.html?p=" + encodeURIComponent(slug);

      var num = document.createElement("span");
      num.className = "index-num";
      num.textContent = String(i + 1).padStart(2, "0");

      var name = document.createElement("span");
      name.className = "index-name";
      name.textContent = p.title;

      a.appendChild(num);
      a.appendChild(name);

      /* Hover peek: first gallery image floats in on the right */
      if (p.images && p.images[0]) {
        var peek = document.createElement("img");
        peek.className = "index-peek";
        peek.src = p.images[0].src;
        peek.alt = "";
        peek.setAttribute("aria-hidden", "true");
        peek.loading = "lazy";
        peek.addEventListener("error", function () { peek.remove(); });
        a.appendChild(peek);
      }

      host.appendChild(a);
    });
  }

  /* --------------------------------------------------------------------------
     9. Project page: build info column, gallery, pager from the URL slug
     -------------------------------------------------------------------------- */
  function initProjectPage() {
    var infoHost = document.getElementById("projectInfo");
    var trackHost = document.getElementById("galleryTrack");
    if (!infoHost || !trackHost) return;

    var params = new URLSearchParams(window.location.search);
    var slug = (params.get("p") || "").replace(/[^a-z0-9-]/gi, "");
    var project = window.RWM_PROJECTS ? window.RWM_PROJECTS[slug] : null;

    /* Unknown or missing slug: a friendly dead-end instead of a broken page. */
    if (!project) {
      var fallback = document.createElement("div");
      var h = document.createElement("h1");
      h.textContent = "Project not found";
      var msg = document.createElement("p");
      msg.textContent = "That link doesn't match a project. The full index has everything:";
      var back = document.createElement("a");
      back.className = "btn";
      back.href = "work.html";
      back.textContent = "View all work";
      fallback.appendChild(h);
      fallback.appendChild(msg);
      fallback.appendChild(back);
      infoHost.appendChild(fallback);
      return;
    }

    document.title = project.title + " — Richard Wade Morgan";

    /* Left column: back link, title, summary */
    var backlink = document.createElement("a");
    backlink.className = "backlink";
    backlink.href = "work.html";
    backlink.textContent = "← Index";

    var h1 = document.createElement("h1");
    h1.textContent = project.title;

    var summary = document.createElement("div");
    summary.className = "project-summary";
    (project.summary || []).forEach(function (text) {
      var p = document.createElement("p");
      p.textContent = text;
      summary.appendChild(p);
    });

    infoHost.appendChild(backlink);
    infoHost.appendChild(h1);
    infoHost.appendChild(summary);

    /* Right column: gallery cards (each opens the lightbox) */
    var images = project.images || [];
    images.forEach(function (imgData, i) {
      var card = document.createElement("button");
      card.type = "button";
      card.className = "gallery-card";
      card.setAttribute("aria-label", "Expand image " + (i + 1) + " of " + images.length +
        (imgData.caption ? ": " + imgData.caption : ""));

      var img = document.createElement("img");
      img.src = imgData.src;
      img.alt = imgData.alt || project.title + " image " + (i + 1);
      img.loading = i < 2 ? "eager" : "lazy";
      img.addEventListener("error", function () { card.remove(); });

      card.appendChild(img);
      card.addEventListener("click", function () { openLightbox(images, i, project.title); });
      trackHost.appendChild(card);
    });

    /* Prev / next project pager */
    var pager = document.getElementById("projectPager");
    var order = window.RWM_PROJECT_ORDER || [];
    var idx = order.indexOf(slug);
    if (pager && idx !== -1 && order.length > 1) {
      var prevSlug = order[(idx - 1 + order.length) % order.length];
      var nextSlug = order[(idx + 1) % order.length];
      var prev = document.createElement("a");
      prev.href = "project.html?p=" + encodeURIComponent(prevSlug);
      prev.textContent = "← " + window.RWM_PROJECTS[prevSlug].title;
      var next = document.createElement("a");
      next.href = "project.html?p=" + encodeURIComponent(nextSlug);
      next.textContent = window.RWM_PROJECTS[nextSlug].title + " →";
      pager.appendChild(prev);
      pager.appendChild(next);
    }
  }

  /* --------------------------------------------------------------------------
     10. Lightbox — keyboard accessible image expansion
     -------------------------------------------------------------------------- */
  var lightboxState = { images: [], index: 0, lastFocus: null };

  function openLightbox(images, index, fallbackTitle) {
    var lb = document.getElementById("lightbox");
    if (!lb || !images || !images.length) return;
    lightboxState.images = images;
    lightboxState.index = index;
    lightboxState.lastFocus = document.activeElement;

    renderLightbox(fallbackTitle);
    lb.classList.add("is-open");
    document.body.classList.add("lightbox-open");
    requestAnimationFrame(function () { lb.classList.add("is-visible"); });
    if (document.hidden) lb.classList.add("is-visible"); /* frozen-rAF safety */
    var closeBtn = lb.querySelector(".lightbox-close");
    if (closeBtn) closeBtn.focus();
  }

  function renderLightbox(fallbackTitle) {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    var img = lb.querySelector("img");
    var cap = lb.querySelector("figcaption");
    var item = lightboxState.images[lightboxState.index];
    if (!img || !item) return;
    img.src = item.src;
    img.alt = item.alt || fallbackTitle || "Expanded image";
    if (cap) {
      cap.textContent = (item.caption || "") + "  ·  " +
        (lightboxState.index + 1) + " / " + lightboxState.images.length;
    }
  }

  function closeLightbox() {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.classList.remove("is-visible", "is-open");
    document.body.classList.remove("lightbox-open");
    if (lightboxState.lastFocus && lightboxState.lastFocus.focus) lightboxState.lastFocus.focus();
  }

  function stepLightbox(dir) {
    var n = lightboxState.images.length;
    if (!n) return;
    lightboxState.index = (lightboxState.index + dir + n) % n;
    renderLightbox();
  }

  function initLightbox() {
    var lb = document.getElementById("lightbox");
    if (!lb) return;
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    var close = lb.querySelector(".lightbox-close");
    var prev = lb.querySelector(".lightbox-arrow--prev");
    var next = lb.querySelector(".lightbox-arrow--next");
    if (close) close.addEventListener("click", closeLightbox);
    if (prev) prev.addEventListener("click", function () { stepLightbox(-1); });
    if (next) next.addEventListener("click", function () { stepLightbox(1); });

    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      /* Keep focus inside the dialog while it's open. */
      if (e.key === "Tab") {
        var focusables = lb.querySelectorAll("button");
        if (!focusables.length) return;
        var first = focusables[0], last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* --------------------------------------------------------------------------
     11. Scroll fade-ins — with fallbacks for observers that never fire
     -------------------------------------------------------------------------- */
  function initFadeIns() {
    var items = document.querySelectorAll(".fade-in");
    /* Hidden documents never fire the observer — show everything at once. */
    if (document.hidden || !("IntersectionObserver" in window)) {
      for (var i = 0; i < items.length; i++) items[i].classList.add("is-visible");
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    for (var j = 0; j < items.length; j++) io.observe(items[j]);

    /* Watchdog: if the observer hasn't revealed in-viewport items shortly
       after load (throttled renderers), reveal them manually and stand down. */
    var tries = 0;
    var watchdog = setInterval(function () {
      tries++;
      var pending = document.querySelectorAll(".fade-in:not(.is-visible)");
      if (!pending.length || tries > 6) { clearInterval(watchdog); return; }
      for (var k = 0; k < pending.length; k++) {
        var r = pending[k].getBoundingClientRect();
        if (r.top < window.innerHeight && r.bottom > 0) pending[k].classList.add("is-visible");
      }
    }, 900);
  }

  /* --------------------------------------------------------------------------
     12. Image guard — deter casual saving of the work. Blocks drag-to-
     desktop and the right-click "Save Image As…" menu on images only
     (right-click elsewhere on the page behaves normally).
     -------------------------------------------------------------------------- */
  function initImageGuard() {
    document.addEventListener("dragstart", function (e) {
      if (e.target && e.target.tagName === "IMG") e.preventDefault();
    });
    document.addEventListener("contextmenu", function (e) {
      if (e.target && (e.target.tagName === "IMG" || e.target.closest(".gallery-card, .feature-slide, .lightbox"))) {
        e.preventDefault();
      }
    });
  }

  /* --------------------------------------------------------------------------
     13. Footer year
     -------------------------------------------------------------------------- */
  function initYear() {
    var el = document.getElementById("footerYear");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* Boot ------------------------------------------------------------------- */
  safeInit("animGate", initAnimGate);
  safeInit("accent", initAccent);
  safeInit("pageTransitions", initPageTransitions);
  safeInit("cloud", initCloud);
  safeInit("ripple", initRipple);
  safeInit("featureSlider", initFeatureSlider);
  safeInit("workIndex", initWorkIndex);
  safeInit("projectPage", initProjectPage);
  safeInit("lightbox", initLightbox);
  safeInit("fadeIns", initFadeIns);
  safeInit("imageGuard", initImageGuard);
  safeInit("year", initYear);
})();
