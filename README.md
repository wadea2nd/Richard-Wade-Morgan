# Richard Wade Morgan: portfolio

A static site (plain HTML, CSS, and JavaScript modules). No framework, no
build step, no dependencies: upload the folder to Netlify and it works.

This is the **Cargo-style redesign**. The previous design is preserved on the
`v1-custom-build` branch (and the `v1-custom-build-final` tag).

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: intro statement and the slideshow |
| `about.html` | About: bio, work, speaking, press, photo |
| `project.html` | One template for all six projects, filled from `js/data.js` |
| `design-system.html` | Living style guide (tokens, type, components). Not linked in the nav. |

Project URLs work two ways: `project.html?p=stord` and, on Netlify,
`/stord` (see the redirects in `netlify.toml`).

## Editing content

- **Project stories:** `js/data.js`. Each project is a `story`: your words
  and pictures in the order they appear on the page. The comment at the top of
  that file lists every layout (full-width picture, row, grid, collage, three
  kinds of carousel, a paragraph beside a picture, and video), plus the hover
  zoom options. To rearrange a
  page, reorder the entries; to add a picture, add its id to one.
- **Pictures:** `js/images.js` lists every project picture by id, with its
  file in `assets/img/work/<project>/`, its pixel size, and its alt text. To
  add one, put the file in that folder, add an entry, and use the id in a
  story. Export web images around 2200px on the long edge, as WebP (or JPEG
  at quality ~80). Always write meaningful alt text.
- **Slideshow:** the `SLIDES` list in `js/data.js`; its pictures are in
  `assets/img/slides/`.
- **Videos:** `assets/video/` holds H.264 MP4 files (with `faststart`, so they
  begin quickly) and a poster picture for each. Encode new ones at 1600px wide,
  quality ~25, which turns a 2-minute film into roughly 15 to 25 MB.
- The "Work" menu is plain HTML in each page, so if you add or rename a
  project, update the `<ul class="nav__projects">` in `index.html`,
  `about.html`, `project.html`, and `design-system.html` as well.
- **Home and About copy:** plain text in `index.html` and `about.html`.

## Design system

Everything visual comes from **`css/tokens.css`**: color (light and dark),
type, space, layout, radii, motion timing, and layering. No other stylesheet
contains a raw color, font size, spacing value, or duration.

| File | Responsibility |
| --- | --- |
| `css/fonts.css` | Self-hosted font files (in `assets/fonts/`), so text never waits on another server |
| `css/tokens.css` | The tokens. Change a value here to retune the whole site. |
| `css/base.css` | Reset and the core text styles: **h1**, **h2**, and **body** |
| `css/layout.css` | The two-column shell and the mobile single column |
| `css/components.css` | Masthead, nav, slider, figures, dialogs, buttons, floating emoji |
| `css/motion.css` | Every animation, plus the reduced-motion rules |
| `css/design-system.css` | Styles for the style-guide page only |

**Type:** Faculty Glyphic is used only for the site name and the intro
statement (the large `h1` on the home and About pages, class `intro`). Hanken
Grotesk variable handles everything else: navigation, project titles, body
copy, and h2 labels. Space Mono is for captions and credits. All sizes are
fluid `clamp()` values between a 375px phone and a 1920px desktop.

**Themes:** light and dark, toggled by the half-moon at the top right of
the window (in the pinned header on phones). In dark mode both header icons are light orange. The site always opens in
light mode; the choice is saved in the browser, and the page crossfades
between the two. `js/theme-init.js` runs before the first paint so a returning
dark-mode visitor never sees a flash of light.

**Motion:** deliberately quiet. Nothing appears until the fonts are ready, then
the name, controls, and menu rise in one after another, the headline and copy
fade up as they scroll into view, and images fade in as they finish loading.
The name, controls, and menu only make that entrance on the first page of a
visit. Nothing bounces. Everything stops for visitors who prefer reduced
motion.

**Floating emoji:** four emoji drift across the window, floating in at one
edge and out another, and can be dragged and thrown. In light mode
the fly-swatter icon (next to the half-moon) drops them to the bottom of the
screen, where they stay until each is dragged off the left, right, or top
edge. In dark mode the icon becomes a lightbulb: it lights up and the emoji
swarm around it like moths. Either way, "Release gnats" sets them free, and
switching themes always does too.

## JavaScript

`js/main.js` is the only entry point. It wires up the modules each page needs
and isolates failures, so one broken feature never takes the page down.

`theme.js` · `nav.js` (mobile menu) · `accordion.js` (the "Work" menu item and the About page tabs) · `chrome.js` (back-to-top button) · `motion.js` (font-ready gate, reveals, image fade, page fade) ·
`slider.js` · `floaties.js` (the draggable emoji) · `copy.js` (the Contact menu's copy buttons) ·
`lightbox.js` · `project.js` (builds a project page) · `blocks.js` (the story layouts, including video) · `carousel.js` (default, thumbs, peek, and strip) · `zoom.js` (hover lens and pan zoom) · `guard.js` (image-drag deterrent) ·
`data.js` (content) · `images.js` (picture library) · `design-system.js`

Content from `data.js` is inserted with `textContent`, never as HTML.

## Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus rings,
keyboard access everywhere, 4.5:1 contrast in both themes, a pausable
slideshow, native `<dialog>` for the lightbox, an inert page
behind the open mobile menu, and full support for `prefers-reduced-motion`.
The floating emoji are decoration and hidden from assistive technology.

## Contact menu

"Contact" in the menu opens a short list: **LinkedIn** (opens in a new tab) and
**Email** (opens the visitor's mail app). Each has a small copy button that puts
the link or address on the clipboard, for pasting somewhere else. To change
either address, edit it in the Contact `<li>` of the menu in `index.html`,
`about.html`, `project.html`, and `design-system.html` (the link and its
`data-copy` value).

## Security

`netlify.toml` sends a strict Content-Security-Policy (scripts and styles
from this site only, fonts self-hosted), plus the usual hardening
headers. The site therefore uses no inline scripts or inline `style`
attributes: keep it that way when editing.

## Still placeholder

- Google Search project copy (cleaned up from your outline) and images
- The Google Search page still uses placeholder images; the other five projects use your newest Drive images and videos
