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

- **Projects and slideshow:** `js/data.js`. Every project's copy, credits,
  images, and alt text live there, with comments explaining each field. The
  "Work" menu is plain HTML in each page, so if you add or rename a project,
  update the `<ol class="nav__projects">` in `index.html`, `about.html`, `project.html`, and
  `design-system.html` as well.
- **Home and About copy:** plain text in `index.html` and `about.html`.
- **Images:** put files in `assets/img/` and point `js/data.js` at them.
  Always write meaningful `alt` text. Export web images at roughly 1920px
  wide (JPEG, quality ~80): big enough to look great, small enough to load
  fast.

## Design system

Everything visual comes from **`css/tokens.css`**: color (light and dark),
type, space, layout, radii, motion timing, and layering. No other stylesheet
contains a raw color, font size, spacing value, or duration.

| File | Responsibility |
| --- | --- |
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
the window (in the pinned header on phones). In dark mode both header icons are light orange. The choice is saved in the browser, the first visit follows the
operating system, and the page crossfades between the two. `js/theme-init.js`
runs before the first paint so dark-mode visitors never see a flash of light.

**Motion:** deliberately quiet. Content fades up a few pixels as it arrives;
nothing bounces. Everything stops for visitors who prefer reduced motion.

**Floating emoji:** four emoji drift across the window, floating in at one
edge and out another, and can be dragged and thrown. The fly-swatter icon
(next to the half-moon) drops them to the bottom of the screen, where they stay until
each is dragged off the left, right, or top edge; "Release gnats" brings
them back.

## JavaScript

`js/main.js` is the only entry point. It wires up the modules each page needs
and isolates failures, so one broken feature never takes the page down.

`theme.js` · `nav.js` (mobile menu) · `accordion.js` (the "Work" menu item and the About page tabs) · `chrome.js` (back-to-top button) · `motion.js` (reveals, page fade) ·
`slider.js` · `floaties.js` (the draggable emoji) · `contact.js` ·
`lightbox.js` · `project.js` · `guard.js` (image-drag deterrent) ·
`data.js` (content) · `design-system.js`

Content from `data.js` is inserted with `textContent`, never as HTML.

## Accessibility

Semantic landmarks, one `h1` per page, a skip link, visible focus rings,
keyboard access everywhere, 4.5:1 contrast in both themes, a pausable
slideshow, native `<dialog>` for the contact form and lightbox, an inert page
behind the open mobile menu, and full support for `prefers-reduced-motion`.
The floating emoji are decoration and hidden from assistive technology.

## Contact form

"Contact" opens a message form. It posts to **Netlify Forms** (the hidden
form in `index.html` is how Netlify finds it). Netlify only accepts the
messages once these are set up in its dashboard:

1. *Site configuration → Forms*: turn on **form detection**, then redeploy the
   site so Netlify re-reads the pages. A form that Netlify hasn't detected
   answers every send with an error 404.
2. *Forms → Form notifications → Add notification → Email*: choose the
   address that should receive messages. Without this, messages are stored
   in the dashboard but nothing arrives in your inbox.

If a send fails, the dialog says why (for example "error 404") and offers a
`mailto:` link and a "copy my address" button, so nothing is lost.

## Security

`netlify.toml` sends a strict Content-Security-Policy (scripts and styles
from this site only, fonts from Google Fonts), plus the usual hardening
headers. The site therefore uses no inline scripts or inline `style`
attributes: keep it that way when editing.

## Still placeholder

- Google Search project copy (cleaned up from your outline) and images
- Slideshow and project images are the current set; swap in the new Drive images
