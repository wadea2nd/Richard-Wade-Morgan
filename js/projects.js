/* ============================================================================
   PROJECT DATA — the only file you need to edit to change project content.

   Each project has:
     title    — shown everywhere the project is named
     client   — who the work was for
     role     — your role on it
     year     — shown in indexes and captions
     summary  — array of paragraphs for the project page (plain text only;
                anything you type here is inserted safely, never as HTML)
     credits  — optional array of small-print paragraphs shown under the
                summary (team credits, notes)
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
      "In 2024, I was invited to help ideate, design, and deploy the first stage of Delta Air Lines’ Centennial identity.",
      "We were challenged to develop a special, year-long brand identity to build excitement not only among customers, but among the people who make Delta possible internally. We envisioned the work taking over the annual employee appreciation campaign for 2024, with the identity expanding outward to customers and partners after the company’s 2025 anniversary.",
      "We established a strategic angle of “Illuminating” and shifted the brand motto to “We’ll Never Stop Climbing.” From there, archival research at the Delta Flight Museum helped us produce special identity variations for the Centennial. The asset library spanned logos, patterns, textures, and more, which I applied to merch, trading cards, onboard beverage cans, and countless other touchpoints throughout the year.",
      "For the employee appreciation campaign, I crafted an environmental design system for buildings, buses, signs, and lamp posts to flood Delta campuses with celebratory ephemera. Photographer Chris Patey and production house Partners&Co were selected to produce our photography and b-roll for video work. Together, we produced deeply moving imagery to herald where the brand was headed.",
      "On January 1, 2025, assets launched onboard, online, and onsite. After the Centennial Gala in March, the full suite of assets, merchandise, and experiences launched worldwide. Iteration continued throughout 2025 with multiple design executions and brand partnerships to show the world how we celebrated 100 years of one of the most iconic airlines in aviation history."
    ],
    credits: [
      "Team Credits: Maya Dukes (Director), Alex Blackwell (Sr AD), Hannah Tran (Sr AD), Sharita Frazier (Sr AD), Kathy Wolstenhome (AD), Ayana Noble (AD), Carey McKay (Design), Dawn Taylor (Design), Aaliyah McNeal (Design), Andersen Cupid (Design), Keefe Justice (Copy Lead), Emily Turner (Copy), Amber Laraque (PM Lead), Jerry Johnson (PM), Toni Mishael (PM), Amy Bley (PM), AJ Culberson (PM), Cari Jelinek (Production Lead), Jane Davis (Production), Scott Storey (Production), Camille Williams (Production), Wendell Scott (Production), Jennie Lee Gruber (Strategy), JL Perez (Strategy), Christopher Patey (Photography), Partners&Co (Production), Harper+Scott (Merch Production)"
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
      "During my time at Delta, I was tasked with ideating the Global Pride campaign for 2024. It culminated in activations at seven locations worldwide, ending with a float in the famous Amsterdam Pride canal parade. The project also allowed our SkyTeam partner, KLM, to debut a presence at their home Pride celebration. Our creative strategy landed on a blend of themes from Delta, KLM, and AMS Pride to put forth a unique expression of the global vision.",
      "Steering clear of the obvious, we found inspiration not only in the iridescence of the atmosphere, but in our shimmering aircraft trading cards. The focus shifted to translucent, iridescent, and reflective materials, making a joyful presence that blended the Delta and KLM brands in a seamless visual execution where both were equally present.",
      "Constructed by the local firm Prideboten, the float sailed for three hours and passed under 21 bridges, its inflatable tail deflating and re-emerging with onboard ping and smoke machines. Full details were captured in a Delta News Hub article.",
      "The creative direction was applied to offshoot floats across the US for local city Pride parades, with colorful fuselage windows “flying” down joyful streets."
    ],
    credits: [
      "Team Credits: Alex Blackwell (Sr AD), Hannah Tran (AD), Keefe Justice (Copy), Emily Turner (Copy), Prideboten (Production), Toni Mishael (PM)"
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
      "From 2021 to 2023, I helped graduate a brand from its first visual iteration to a serious global competitor in the logistics space. Studio Freight was the guiding force in helping us achieve this goal.",
      "After initial stakeholder fact-finding, it was clear the brand needed to be disruptive, boundary-pushing, and founded on a design system that could span every form of media and space.",
      "A design audit determined the “box” mark was susceptible to collapse, much like corrugated cardboard itself. Stord needed to be strong, indomitable, and clear. The roundedness of the S and circular, pointed shapes emerged as front runners. The final mark displays the strength of the trust you can place in Stord to make your supply chain a competitive advantage. We then brought in 3D artist Tom Hoying to render elements showing what logistics could look like in our new ethos.",
      "Evolving the website was a fun delve into how far things could be pushed. Built on the idea of “gaming code,” users could scroll through each part of the supply chain in the city and see how Stord delivers its services better than the competition, part interactive experience and part usable tool.",
      "The overhaul won immediate buy-in from the two founders, the exec team, and a few customers who had just come onboard with Stord’s services. It made waves across the supply chain industry and contributed to many new customers signing on."
    ],
    credits: [
      "Team Credits: Studio Freight (Design), John Williams (CD), Mario Paganini (CMO), Luke DeHaas (Design), Ruthie Fleming (Design)"
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
      "In 2022, I was awarded a Pride Month project for Vox Media. What began as a simple email turned into a great conversation about queer identity, sports, and branding. The creative director and founders selected me to refresh the brand of Outsports.com.",
      "The goal was to modernize the logo and craft a simple system the internal team at Vox could run with. A few prior rebrand attempts had not landed, so this was a chance to dive deeper into putting meaning to mark.",
      "A brand audit revealed the old identity was not the community leader it could have been, nor as inspirational as the stories it housed. Diving into the symbolism of the queer community and modern design trends shaped how I would execute this identity.",
      "After a few rounds, an upward arrow form was selected. It felt new, progressive, and outside the system most SB Nation brands sat within, and it could stand as a unique mark heralding positive contact with the brand.",
      "The rebrand received great acclaim, with positive reactions from the founders, the publisher of SB Nation, internal partners, Vox Media’s Chief Creative Officer, and plenty of fans online. The brand will be used for years to come and brings a previously sidelined name out into the open."
    ],
    credits: [
      "Team Credits: Phil Delbourgo (CD), Krystal Jackson (PM)",
      "A warm remembrance: Phil Delbourgo passed one year after this project launched. He was helpful, friendly, and one of the most incredible design professionals of his time. It was an honor to work with him on this identity."
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
      "An assortment of design work and projects from 2014 to 2024."
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

/* Homepage carousel — real work, in the numbered order provided.
   Slides with an href click through to their project page; "href: null"
   slides are display-only. Add, remove, or reorder freely. */
window.RWM_CAROUSEL = [
  { src: "assets/img/slider-1.png", alt: "Delta Air Lines Centennial logo", name: "Delta Air Lines Centennial", href: "project.html?p=delta-centennial" },
  { src: "assets/img/slider-2.jpg", alt: "Delta Air Lines Centennial campaign banner", name: "Delta Air Lines Centennial", href: "project.html?p=delta-centennial" },
  { src: "assets/img/slider-3.jpg", alt: "Delta Pride 2024 campaign artwork", name: "Delta Pride 2024", href: "project.html?p=delta-pride" },
  { src: "assets/img/slider-4.jpg", alt: "Stord website design", name: "Stord", href: "project.html?p=stord" },
  { src: "assets/img/slider-5.jpg", alt: "Outsports site design", name: "Outsports", href: "project.html?p=outsports" },
  { src: "assets/img/slider-6.jpg", alt: "Hooters brand work", name: "Hooters", href: null },
  { src: "assets/img/slider-7.jpg", alt: "Morrison work", name: "Morrison", href: null }
];
