/* ============================================================================
   PROJECT DATA — the only file you need to edit to change project content.

   Each project has:
     title    — shown everywhere the project is named
     client   — who the work was for
     role     — your role on it
     year     — shown in indexes and captions
     summary  — array of paragraphs for the project page (plain text only;
                anything you type here is inserted safely, never as HTML)
     images   — array of { src, alt, caption } for the carousel + lightbox.
                Swap the placeholder .svg files in assets/img/ for real
                images (JPG/PNG are fine) and update src to match. Always
                write meaningful alt text — screen readers depend on it.

   The order of RWM_PROJECT_ORDER controls the Work index, the homepage
   sub-nav, and the prev/next links on project pages.
   ========================================================================== */

window.RWM_PROJECT_ORDER = [
  "google-search",
  "delta-centennial",
  "delta-pride",
  "stord",
  "outsports",
  "design-archive"
];

window.RWM_PROJECTS = {
  "google-search": {
    title: "Google Search",
    client: "Google, via Prpl",
    role: "UX Comms Designer",
    year: "2024 — present",
    summary: [
      "Placeholder summary — describe the search experience work here: the problem space, the team, and the craft that went into it.",
      "A second paragraph for process: how the work moved from exploration to shipped experience, and what you owned along the way.",
      "A third for outcomes — what changed for users, and what you learned."
    ],
    images: [
      { src: "assets/img/google-search-1.svg", alt: "Google Search project — overview frame", caption: "Overview — placeholder" },
      { src: "assets/img/google-search-2.svg", alt: "Google Search project — process exploration", caption: "Process — placeholder" },
      { src: "assets/img/google-search-3.svg", alt: "Google Search project — interface detail", caption: "Detail — placeholder" },
      { src: "assets/img/google-search-4.svg", alt: "Google Search project — system view", caption: "System — placeholder" },
      { src: "assets/img/google-search-5.svg", alt: "Google Search project — final frame", caption: "Final — placeholder" }
    ]
  },

  "delta-centennial": {
    title: "Delta Air Lines Centennial",
    client: "Delta Air Lines",
    role: "Art Director",
    year: "2023 — 2024",
    summary: [
      "Placeholder summary — a century of Delta. Describe the centennial campaign: the scale, the heritage material, and the audiences it had to reach.",
      "A second paragraph for the creative platform and how it flexed across touchpoints.",
      "A third for the moments you're proudest of."
    ],
    images: [
      { src: "assets/img/delta-centennial-1.svg", alt: "Delta Centennial — hero identity", caption: "Identity — placeholder" },
      { src: "assets/img/delta-centennial-2.svg", alt: "Delta Centennial — campaign environment", caption: "Environment — placeholder" },
      { src: "assets/img/delta-centennial-3.svg", alt: "Delta Centennial — print application", caption: "Print — placeholder" },
      { src: "assets/img/delta-centennial-4.svg", alt: "Delta Centennial — motion still", caption: "Motion — placeholder" },
      { src: "assets/img/delta-centennial-5.svg", alt: "Delta Centennial — detail view", caption: "Detail — placeholder" }
    ]
  },

  "delta-pride": {
    title: "Delta Pride 2024",
    client: "Delta Air Lines",
    role: "Art Director",
    year: "2024",
    summary: [
      "Placeholder summary — Delta's 2024 Pride program. Describe the brief, the community voices involved, and the visual system.",
      "A second paragraph on how the work showed up in the world — aircraft, gates, people.",
      "A third on why this one mattered."
    ],
    images: [
      { src: "assets/img/delta-pride-1.svg", alt: "Delta Pride 2024 — key visual", caption: "Key visual — placeholder" },
      { src: "assets/img/delta-pride-2.svg", alt: "Delta Pride 2024 — apparel application", caption: "Apparel — placeholder" },
      { src: "assets/img/delta-pride-3.svg", alt: "Delta Pride 2024 — environmental graphics", caption: "Environment — placeholder" },
      { src: "assets/img/delta-pride-4.svg", alt: "Delta Pride 2024 — social toolkit", caption: "Social — placeholder" },
      { src: "assets/img/delta-pride-5.svg", alt: "Delta Pride 2024 — event moment", caption: "Event — placeholder" }
    ]
  },

  "stord": {
    title: "Stord",
    client: "Stord",
    role: "Senior Brand Designer",
    year: "2022 — 2023",
    summary: [
      "Placeholder summary — the Stord brand. Describe the rebrand or brand-building work: where the company was, and where the identity took it.",
      "A second paragraph for the system: type, color, motion, voice.",
      "A third for rollout and adoption."
    ],
    images: [
      { src: "assets/img/stord-1.svg", alt: "Stord — brand identity lockup", caption: "Identity — placeholder" },
      { src: "assets/img/stord-2.svg", alt: "Stord — design system components", caption: "System — placeholder" },
      { src: "assets/img/stord-3.svg", alt: "Stord — web application", caption: "Product — placeholder" },
      { src: "assets/img/stord-4.svg", alt: "Stord — collateral suite", caption: "Collateral — placeholder" },
      { src: "assets/img/stord-5.svg", alt: "Stord — environmental application", caption: "Environment — placeholder" }
    ]
  },

  "outsports": {
    title: "Outsports",
    client: "Outsports / Vox Media",
    role: "Designer",
    year: "2021",
    summary: [
      "Placeholder summary — Outsports. Describe the editorial identity work and the community it serves.",
      "A second paragraph for the design decisions that carried the voice.",
      "A third for reach and response."
    ],
    images: [
      { src: "assets/img/outsports-1.svg", alt: "Outsports — masthead identity", caption: "Masthead — placeholder" },
      { src: "assets/img/outsports-2.svg", alt: "Outsports — editorial layout", caption: "Editorial — placeholder" },
      { src: "assets/img/outsports-3.svg", alt: "Outsports — social graphics", caption: "Social — placeholder" },
      { src: "assets/img/outsports-4.svg", alt: "Outsports — event branding", caption: "Event — placeholder" },
      { src: "assets/img/outsports-5.svg", alt: "Outsports — merchandise", caption: "Merch — placeholder" }
    ]
  },

  "design-archive": {
    title: "Design Archive",
    client: "Independent",
    role: "Designer / Archivist",
    year: "Ongoing",
    summary: [
      "Placeholder summary — the archive. Posters, identities, experiments, and personal work collected over the years.",
      "A second paragraph on what keeps the practice sharp between client work.",
      "A third inviting people to ask about any piece."
    ],
    images: [
      { src: "assets/img/design-archive-1.svg", alt: "Design Archive — poster series", caption: "Posters — placeholder" },
      { src: "assets/img/design-archive-2.svg", alt: "Design Archive — identity studies", caption: "Identities — placeholder" },
      { src: "assets/img/design-archive-3.svg", alt: "Design Archive — print experiments", caption: "Print — placeholder" },
      { src: "assets/img/design-archive-4.svg", alt: "Design Archive — type studies", caption: "Type — placeholder" },
      { src: "assets/img/design-archive-5.svg", alt: "Design Archive — personal work", caption: "Personal — placeholder" }
    ]
  }
};

/* Homepage carousel — featured projects (they link through) plus work that
   doesn't have its own page (slides with "href: null" are display-only).
   Add, remove, or reorder freely. */
window.RWM_CAROUSEL = [
  { src: "assets/img/google-search-1.svg", alt: "Google Search — featured work", name: "Google Search", year: "2024", href: "project.html?p=google-search" },
  { src: "assets/img/delta-centennial-1.svg", alt: "Delta Air Lines Centennial — featured work", name: "Delta Air Lines Centennial", year: "2024", href: "project.html?p=delta-centennial" },
  { src: "assets/img/extra-1.svg", alt: "Miscellaneous poster work", name: "Misc — Posters", year: "Various", href: null },
  { src: "assets/img/delta-pride-1.svg", alt: "Delta Pride 2024 — featured work", name: "Delta Pride 2024", year: "2024", href: "project.html?p=delta-pride" },
  { src: "assets/img/stord-1.svg", alt: "Stord — featured work", name: "Stord", year: "2023", href: "project.html?p=stord" },
  { src: "assets/img/extra-2.svg", alt: "Studio experiments", name: "Studio — Experiments", year: "Various", href: null },
  { src: "assets/img/outsports-1.svg", alt: "Outsports — featured work", name: "Outsports", year: "2021", href: "project.html?p=outsports" },
  { src: "assets/img/design-archive-1.svg", alt: "Design Archive — featured work", name: "Design Archive", year: "Ongoing", href: "project.html?p=design-archive" }
];
