# Richard Wade Morgan — Portfolio

A static site: plain HTML, CSS, and JavaScript. No build tools, no frameworks,
no dependencies. Upload the whole folder to any host (Netlify, GitHub Pages,
Vercel, or classic web hosting) and it works.

## Editing content (no coding needed)

- **Project text & images** — edit `js/projects.js`. Every project's title,
  client, role, year, paragraphs, and image list lives there, with comments
  explaining each field. The Work index, homepage sub-nav, homepage carousel,
  and project pages all read from this one file.
- **About page** — edit `about.html`; the copy is plain text between tags.
- **Images** — replace the placeholder `.svg` files in `assets/img/` with real
  JPG/PNG files and update the `src` paths in `js/projects.js`. Keep the alt
  text meaningful — screen readers depend on it.
- **Links** — the LinkedIn (`https://www.linkedin.com/`) and Art Studio
  (`https://example.com/`) URLs in every page's footer are placeholders;
  search-and-replace them with your real profiles. The email is already real.

## Design system

- **Grid**: 12 columns on desktop (≥1024px), 8 on tablet (768–1023px), 4 on
  mobile (<768px), with 24px gutters (16px on mobile) inside a 1240px
  container. Every multi-column layout places its children on this grid with
  explicit column spans — see the architecture comment at the top of
  `css/styles.css`.
- **Tokens**: all colors, type sizes, spacing steps (4px base scale), radii,
  and motion timings are defined once in `:root` and referenced everywhere.
  To retune the site, change the token, not the components.
- Palette: putty cream background `#eae4d6`, near-black warm ink `#26221a`,
  thin dark rules `#3a3428` — no pure white, no pure black, no drop shadows.
  One muted accent color (dusty red / gold / sage / slate / plum) is picked
  at random per visit.
- Type: **Space Grotesk** (light–medium) for headlines · **Inter** (thin) for
  body · **Space Mono** for labels and buttons — loaded from Google Fonts.
- Nav: sticky top header everywhere; on phones the nav docks to the bottom
  center for thumbs.
- Small print: SVG favicon (`assets/favicon.svg`), `theme-color` meta, and a
  `humans.txt` at the root.

## Built-in safeguards

- Content is inserted with `textContent` (never HTML), so nothing typed into
  `projects.js` can inject code.
- Every feature initializes independently — one failure can't blank the site.
- Fade-ins reveal instantly in environments that can't run animations
  (background tabs, embedded previews), and everything is visible even if
  JavaScript is disabled.
- Reduced-motion preferences are respected throughout.
