/* ==========================================================================
   CONTENT
   --------------------------------------------------------------------------
   Everything you would edit to change the site's content lives here (plus
   the About and Home copy, which is plain text in about.html / index.html).

   PROJECTS  the six projects, in nav order. Each has:
     slug      the URL id: project.html?p=<slug>
     title     shown in the nav and as the page heading
     summary   paragraphs. A string is a paragraph; an array of strings is a
               stack of short lines (like a list).
     credits   optional [{ label, text }] shown in small mono type
     images    [{ src, alt, caption, width, height }]. alt is read aloud by
               screen readers, so describe the image. width/height reserve
               space so the page never jumps while images load.

   SLIDES    the homepage slideshow, in order. `project` links a slide to a
             project page (use null for none).

   Text is inserted with textContent, never as HTML, so nothing typed here
   can inject code.
   ========================================================================== */

export const SITE = {
  name: "Richard Wade Morgan",
  email: "wadewadedonttellme@gmail.com",
  linkedin: "https://www.linkedin.com/in/richard-wade-morgan/",
  studio: "https://www.instagram.com/prismaticmenagerie/",
  url: "https://richardwademorgan.com"
};

const PLACEHOLDER = "assets/img/placeholder-wide.svg";

export const PROJECTS = [
  {
    slug: "google-search",
    title: "Google Search",
    summary: [
      "As an internal-facing design lead, I look for the strategic problems worth fixing and smooth them out.",
      "I partner with team leads and directors to learn their goals and the persistent thorns they never had time to solve, the kind of work that always gets delegated away from P0 tasks.",
      ["Vibe-coded project 1", "Vibe-coded project 2", "Vibe-coded project 3"],
      "Plus a smattering of brand identities for internal teams."
    ],
    credits: [],
    images: [
      { src: PLACEHOLDER, alt: "Placeholder for Google Search project imagery", caption: "Project imagery coming soon.", width: 1600, height: 900 },
      { src: PLACEHOLDER, alt: "Placeholder for Google Search project imagery", caption: "", width: 1600, height: 900 }
    ]
  },
  {
    slug: "delta-centennial",
    title: "Delta Air Lines Centennial",
    summary: [
      "In 2024, I was invited to help ideate, design, and deploy the first stage of Delta Air Lines’ Centennial identity.",
      "We were challenged to develop a special, year-long brand identity to build excitement not only among customers, but among the people who make Delta possible internally. We envisioned the work taking over the annual employee appreciation campaign for 2024, with the identity expanding outward to customers and partners after the company’s 2025 anniversary.",
      "We established a strategic angle of “Illuminating” and shifted the brand motto to “We’ll Never Stop Climbing.” From there, archival research at the Delta Flight Museum helped us produce special identity variations for the Centennial. The asset library spanned logos, patterns, textures, and more, which I applied to merch, trading cards, onboard beverage cans, and countless other touchpoints throughout the year.",
      "For the employee appreciation campaign, I crafted an environmental design system for buildings, buses, signs, and lamp posts to flood Delta campuses with celebratory ephemera. Photographer Chris Patey and production house Partners&Co were selected to produce our photography and b-roll for video work. Together, we produced deeply moving imagery to herald where the brand was headed.",
      "On January 1, 2025, assets launched onboard, online, and onsite. After the Centennial Gala in March, the full suite of assets, merchandise, and experiences launched worldwide. Iteration continued throughout 2025 with multiple design executions and brand partnerships to show the world how we celebrated 100 years of one of the most iconic airlines in aviation history."
    ],
    credits: [
      {
        label: "Team Credits:",
        text: "Maya Dukes (Director), Alex Blackwell (Sr AD), Hannah Tran (Sr AD), Sharita Frazier (Sr AD), Kathy Wolstenhome (AD), Ayana Noble (AD), Carey McKay (Design), Dawn Taylor (Design), Aaliyah McNeal (Design), Andersen Cupid (Design), Keefe Justice (Copy Lead), Emily Turner (Copy), Amber Laraque (PM Lead), Jerry Johnson (PM), Toni Mishael (PM), Amy Bley (PM), AJ Culberson (PM), Cari Jelinek (Production Lead), Jane Davis (Production), Scott Storey (Production), Camille Williams (Production), Wendell Scott (Production), Jennie Lee Gruber (Strategy), JL Perez (Strategy), Christopher Patey (Photography), Partners&Co (Production), Harper+Scott (Merch Production)"
      }
    ],
    images: [
      { src: "assets/img/slider-2.jpg", alt: "A Delta Air Lines building with a large Centennial banner of employees above the words “We’ll never stop climbing.”", caption: "The Centennial banner, part of the environmental system that flooded Delta campuses.", width: 1920, height: 1080 },
      { src: "assets/img/slider-1.png", alt: "The Delta 100 Years Centennial logo in white on a navy field.", caption: "The Centennial mark.", width: 1920, height: 1080 }
    ]
  },
  {
    slug: "delta-pride",
    title: "Delta Pride 2024",
    summary: [
      "During my time at Delta, I was tasked with ideating the Global Pride campaign for 2024. It culminated in activations at seven locations worldwide, ending with a float in the famous Amsterdam Pride canal parade. The project also allowed our SkyTeam partner, KLM, to debut a presence at their home Pride celebration. Our creative strategy landed on a blend of themes from Delta, KLM, and AMS Pride to put forth a unique expression of the global vision.",
      "Steering clear of the obvious, we found inspiration not only in the iridescence of the atmosphere, but in our shimmering aircraft trading cards. The focus shifted to translucent, iridescent, and reflective materials, making a joyful presence that blended the Delta and KLM brands in a seamless visual execution where both were equally present.",
      "Constructed by the local firm Prideboten, the float sailed for three hours and passed under 21 bridges, its inflatable tail deflating and re-emerging with onboard ping and smoke machines. Full details were captured in a Delta News Hub article.",
      "This creative direction was applied to numerous offshoot floats across the US for local city Pride parades, with colorful fuselage windows “flying” down joyful streets."
    ],
    credits: [
      {
        label: "Team Credits:",
        text: "Alex Blackwell (Sr AD), Hannah Tran (AD), Keefe Justice (Copy), Emily Turner (Copy), Prideboten (Production), Toni Mishael (PM)"
      }
    ],
    images: [
      { src: "assets/img/slider-3.jpg", alt: "The Delta and KLM Pride float, a white barge with rainbow-colored fuselage windows and an inflatable tail, on an Amsterdam canal.", caption: "Working on the largest Pride activation of my career was a great reminder of how much of an impact my work as a designer can have on the community I belong to, and the wealth of what simply being yourself can manifest as.", width: 1920, height: 1080 }
    ]
  },
  {
    slug: "stord",
    title: "Stord",
    summary: [
      "From 2021 to 2023, I helped graduate a brand from its first visual iteration to a serious global competitor in the logistics space. Studio Freight was the guiding force in helping us achieve this goal.",
      "After initial stakeholder fact-finding, it was clear the brand needed to be disruptive, boundary-pushing, and founded on a design system that could span every form of media and space.",
      "A design audit determined the “box” mark was susceptible to collapse, much like corrugated cardboard itself. Stord needed to be strong, indomitable, and clear. The roundedness of the S and circular, pointed shapes emerged as front runners. The final mark displays the strength of the trust you can place in Stord to make your supply chain a competitive advantage. We then brought in 3D artist Tom Hoying to render elements showing what logistics could look like in our new ethos.",
      "Evolving the website was a fun delve into how far things could be pushed. Built on the idea of “gaming code,” users could scroll through each part of the supply chain in the city and see how Stord delivers its services better than the competition, part interactive experience and part usable tool.",
      "The overhaul won immediate buy-in from the two founders, the exec team, and a few customers who had just come onboard with Stord’s services. It made waves across the supply chain industry and contributed to many new customers signing on."
    ],
    credits: [
      {
        label: "Team Credits:",
        text: "Studio Freight (Design), John Williams (CD), Mario Paganini (CMO), Luke DeHaas (Design), Ruthie Fleming (Design)"
      }
    ],
    images: [
      { src: "assets/img/slider-4.jpg", alt: "The Stord website: an oversized black Stord wordmark above an isometric illustration of a city.", caption: "The redesigned Stord website.", width: 1920, height: 1080 }
    ]
  },
  {
    slug: "outsports",
    title: "Outsports",
    summary: [
      "In 2022, I was awarded a Pride Month project for Vox Media. What began as a simple email turned into a great conversation about queer identity, sports, and branding. The creative director and founders selected me to refresh the brand of Outsports.com.",
      "The goal was to modernize the logo and craft a simple system the internal team at Vox could run with. A few prior rebrand attempts had not landed, so this was a chance to dive deeper into putting meaning to mark.",
      "A brand audit revealed the old identity was not the community leader it could have been, nor as inspirational as the stories it housed. Diving into the symbolism of the queer community and modern design trends shaped how I would execute this identity.",
      "After a few rounds, an upward arrow form was selected. It felt new, progressive, and outside the system most SB Nation brands sat within, and it could stand as a unique mark heralding positive contact with the brand.",
      "The rebrand received great acclaim, with positive reactions from the founders, the publisher of SB Nation, internal partners, Vox Media’s Chief Creative Officer, and plenty of fans online. The brand will be used for years to come and brings a previously sidelined name out into the open."
    ],
    credits: [
      { label: "Team Credits:", text: "Phil Delbourgo (CD), Krystal Jackson (PM)" },
      { label: "", text: "A warm remembrance: Phil Delbourgo passed one year after this project launched. He was helpful, friendly, and one of the most incredible design professionals of his time. It was an honor to work with him on this identity." }
    ],
    images: [
      { src: "assets/img/slider-5.jpg", alt: "The Outsports homepage with its upward-arrow logo above a grid of news stories.", caption: "The refreshed Outsports.com.", width: 1920, height: 1080 }
    ]
  },
  {
    slug: "design-archive",
    title: "Design Archive",
    summary: [
      "An assortment of design work and projects from 2014 to 2024."
    ],
    credits: [],
    images: [
      { src: "assets/img/slider-6.jpg", alt: "A grid of Hooters brand work: logo, packaging, menus, merchandise, billboards, and social posts in orange, cream, and brown.", caption: "Hooters brand system.", width: 1920, height: 1080 },
      { src: "assets/img/slider-7.jpg", alt: "A “Bob’s your uncle.” sticker held up in front of a red wall printed with a large letter-M pattern.", caption: "Morrison.", width: 1920, height: 1080 }
    ]
  }
];

export const SLIDES = [
  { src: "assets/img/slider-3.jpg", alt: "The Delta and KLM Pride float, a white barge with rainbow-colored fuselage windows, on an Amsterdam canal.", title: "Delta Pride 2024", project: "delta-pride" },
  { src: "assets/img/slider-5.jpg", alt: "The Outsports homepage with its upward-arrow logo above a grid of news stories.", title: "Outsports", project: "outsports" },
  { src: "assets/img/slider-2.jpg", alt: "A Delta Air Lines building with a large Centennial banner above the words “We’ll never stop climbing.”", title: "Delta Air Lines Centennial", project: "delta-centennial" },
  { src: "assets/img/slider-7.jpg", alt: "A “Bob’s your uncle.” sticker held up in front of a red wall printed with a large letter-M pattern.", title: "Morrison", project: "design-archive" },
  { src: "assets/img/slider-4.jpg", alt: "The Stord website: an oversized black Stord wordmark above an isometric illustration of a city.", title: "Stord", project: "stord" },
  { src: "assets/img/slider-6.jpg", alt: "A grid of Hooters brand work: logo, packaging, menus, merchandise, billboards, and social posts.", title: "Hooters", project: "design-archive" },
  { src: "assets/img/slider-1.png", alt: "The Delta 100 Years Centennial logo in white on a navy field.", title: "Delta Centennial mark", project: "delta-centennial" }
];
