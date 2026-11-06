/* ==========================================================================
   CONTENT
   --------------------------------------------------------------------------
   Everything you would edit to change the site's content lives here (plus
   the About and Home copy, which is plain text in about.html / index.html,
   and the picture library in images.js).

   PROJECTS  the six projects, in nav order. Each has:
     slug      the URL id: project.html?p=<slug>
     title     shown in the nav and as the page heading
     credits   optional [{ label, text }] shown in small mono type
     story     the page, top to bottom: your words and pictures woven
               together, in this order. Each entry is one block:

       { text: "A paragraph." }
       { list: ["A", "short", "list"] }
       { label: "A small heading above a group of pictures" }

       { type: "full",     image: "id", caption: "…" }          one picture, full width
       { type: "row",      images: [...] }                       pictures side by side, matched in height
       { type: "grid",     columns: 4, images: [...] }           an even grid
       { type: "mosaic",   variant: "feature-left", images: [...] }   one big picture, two small
       { type: "collage",  images: [...] }                       three overlapping pictures
       { type: "masonry",  columns: 3, images: [...] }           staggered columns
       { type: "carousel", label: "…", images: [...] }          swipeable slides
       { type: "split",    text: "…", image: "id", side: "right" }    a paragraph beside a tall picture

     Inside "images", each entry is a picture id from images.js, or
     { id: "…", caption: "…" } to add a caption. Add  tone: "stage"  to a row
     for a black band, or  frame: true  for a soft browser-style frame.

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

export const PROJECTS = [
  {
    slug: "google-search",
    title: "Google Search",
    credits: [],
    story: [
      { text: "As an internal-facing design lead, I look for the strategic problems worth fixing and smooth them out." },
      { text: "I partner with team leads and directors to learn their goals and the persistent thorns they never had time to solve, the kind of work that always gets delegated away from P0 tasks." },
      { list: ["Vibe-coded project 1", "Vibe-coded project 2", "Vibe-coded project 3"] },
      { text: "Plus a smattering of brand identities for internal teams." },
      { type: "full", image: "gs-placeholder-1", caption: "Project imagery coming soon." },
      { type: "full", image: "gs-placeholder-2" },
    ]
  },
  {
    slug: "delta-centennial",
    title: "Delta Air Lines Centennial",
    credits: [
      {
        label: "Team Credits:",
        text: "Maya Dukes (Director), Alex Blackwell (Sr AD), Hannah Tran (Sr AD), Sharita Frazier (Sr AD), Kathy Wolstenhome (AD), Ayana Noble (AD), Carey McKay (Design), Dawn Taylor (Design), Aaliyah McNeal (Design), Andersen Cupid (Design), Keefe Justice (Copy Lead), Emily Turner (Copy), Amber Laraque (PM Lead), Jerry Johnson (PM), Toni Mishael (PM), Amy Bley (PM), AJ Culberson (PM), Cari Jelinek (Production Lead), Jane Davis (Production), Scott Storey (Production), Camille Williams (Production), Wendell Scott (Production), Jennie Lee Gruber (Strategy), JL Perez (Strategy), Christopher Patey (Photography), Partners&Co (Production), Harper+Scott (Merch Production)"
      }],
    story: [
      { text: "In 2024, I was invited to help ideate, design, and deploy the first stage of Delta Air Lines’ Centennial identity." },
      { type: "full", image: "dc-opening", caption: "The Centennial mark." },
      { text: "We were challenged to develop a special, year-long brand identity to build excitement not only among customers, but among the people who make Delta possible internally. We envisioned the work taking over the annual employee appreciation campaign for 2024, with the identity expanding outward to customers and partners after the company’s 2025 anniversary." },
      { text: "We established a strategic angle of “Illuminating” and shifted the brand motto to “We’ll Never Stop Climbing.” From there, archival research at the Delta Flight Museum helped us produce special identity variations for the Centennial. The asset library spanned logos, patterns, textures, and more, which I applied to merch, trading cards, onboard beverage cans, and countless other touchpoints throughout the year." },
      { type: "carousel", label: "From the Centennial pitch deck", ratio: "16 / 9", fit: "contain", images: [{ id: "dc-deck-1", caption: "Illuminating: radiant, thoughtful, and perspective-shifting." }, { id: "dc-deck-2", caption: "The color palette." }, { id: "dc-deck-3", caption: "Metallic inspiration." }, { id: "dc-deck-4", caption: "The emblem." }, { id: "dc-deck-5", caption: "The metallic supergraphic." }, { id: "dc-deck-6", caption: "The creative wrapper." }, { id: "dc-deck-7", caption: "The tone moodboard." }] },
      { type: "grid", columns: 4, images: ["dc-pattern-1", "dc-pattern-2", "dc-pattern-3", "dc-pattern-4", "dc-pattern-5", "dc-pattern-6", "dc-pattern-7", "dc-pattern-8"], caption: "The pattern library." },
      { label: "Merch" },
      { type: "row", images: ["dc-merch-crewneck-gray", "dc-merch-crewneck-navy", "dc-merch-tee-front", "dc-merch-tee-back"], tone: "stage" },
      { type: "row", images: ["dc-merch-sock-trio", "dc-merch-sock-pair"], tone: "stage" },
      { type: "collage", images: ["dc-merch-shirt-tennis", "dc-merch-socks-cafe", "dc-merch-sweater-athlete"], caption: "Centennial apparel out in the world." },
      { type: "row", images: [{ id: "dc-merch-snacks", caption: "Cabin snacks." }, { id: "dc-merch-cards", caption: "Aircraft trading cards." }] },
      { type: "row", images: [{ id: "dc-merch-can", caption: "The SweetWater Brewing × Delta 100 can." }, { id: "dc-merch-shop", caption: "The Delta Shop." }], frame: true },
      { type: "split", text: "For the employee appreciation campaign, I crafted an environmental design system for buildings, buses, signs, and lamp posts to flood Delta campuses with celebratory ephemera. Photographer Chris Patey and production house Partners&Co were selected to produce our photography and b-roll for video work. Together, we produced deeply moving imagery to herald where the brand was headed.", image: "dc-campus-poster", caption: "“We have something they don’t: you.”", side: "right" },
      { type: "full", image: "dc-deck-mocks", caption: "The campaign mocks." },
      { type: "full", image: "dc-campus-banner-wide", caption: "The environmental system, on site." },
      { type: "row", images: ["dc-bus-519", "dc-bus-551"] },
      { type: "row", images: ["dc-campus-banner-closeup", "dc-campus-banner-brick", "dc-campus-gate"] },
      { type: "full", image: "dc-portrait-group-2", caption: "Centennial portraits, photographed by Chris Patey." },
      { type: "row", images: ["dc-portrait-jetway", "dc-portrait-tug"] },
      { type: "row", images: ["dc-portrait-tower", "dc-portrait-group-1", "dc-portrait-pilot"] },
      { type: "row", images: ["dc-portrait-attendant-1", "dc-portrait-attendant-2", "dc-portrait-reservations"] },
      { text: "On January 1, 2025, assets launched onboard, online, and onsite. After the Centennial Gala in March, the full suite of assets, merchandise, and experiences launched worldwide. Iteration continued throughout 2025 with multiple design executions and brand partnerships to show the world how we celebrated 100 years of one of the most iconic airlines in aviation history." },
      { type: "full", image: "dc-sphere", caption: "The Centennial mark lights the Sphere in Las Vegas." },
      { type: "full", image: "dc-news-hub", caption: "The Centennial on the Delta News Hub.", frame: true },
    ]
  },
  {
    slug: "delta-pride",
    title: "Delta Pride 2024",
    credits: [
      {
        label: "Team Credits:",
        text: "Alex Blackwell (Sr AD), Hannah Tran (AD), Keefe Justice (Copy), Emily Turner (Copy), Prideboten (Production), Toni Mishael (PM)"
      }],
    story: [
      { text: "During my time at Delta, I was tasked with ideating the Global Pride campaign for 2024. It culminated in activations at seven locations worldwide, ending with a float in the famous Amsterdam Pride canal parade. The project also allowed our SkyTeam partner, KLM, to debut a presence at their home Pride celebration. Our creative strategy landed on a blend of themes from Delta, KLM, and AMS Pride to put forth a unique expression of the global vision." },
      { type: "full", image: "dp-float-0", caption: "The float on the Amsterdam canal." },
      { text: "Steering clear of the obvious, we found inspiration not only in the iridescence of the atmosphere, but in our shimmering aircraft trading cards. The focus shifted to translucent, iridescent, and reflective materials, making a joyful presence that blended the Delta and KLM brands in a seamless visual execution where both were equally present." },
      { type: "carousel", label: "From the creative presentation", ratio: "16 / 9", fit: "contain", images: [{ id: "dp-deck-1", caption: "Creative direction: Uniting." }, { id: "dp-deck-2", caption: "Bright, illuminating, and polychromatic." }, { id: "dp-deck-3", caption: "Mood: iridescent trading cards." }, { id: "dp-deck-4", caption: "Float design notes." }, { id: "dp-deck-5", caption: "The float, illustrated." }, { id: "dp-deck-6", caption: "Together We Shine." }] },
      { text: "Constructed by the local firm Prideboten, the float sailed for three hours and passed under 21 bridges, its inflatable tail deflating and re-emerging with onboard ping and smoke machines. Full details were captured in a Delta News Hub article." },
      { type: "row", images: ["dp-float-1", "dp-float-2"] },
      { type: "row", images: ["dp-canal-bridge", { id: "dp-ad-richard", caption: "Working on the largest Pride activation of my career was a great reminder of how much of an impact my work as a designer can have on the community I belong to, and the wealth of what simply being yourself can manifest as." }] },
      { type: "split", text: "This creative direction was applied to numerous offshoot floats across the US for local city Pride parades, with colorful fuselage windows “flying” down joyful streets.", image: "dp-digital-ad", caption: "Seattle PrideFest digital ad.", side: "right", size: "narrow" },
      { type: "row", images: [{ id: "dp-miami", caption: "Miami Pride." }, { id: "dp-nyc", caption: "New York Pride." }] },
      { type: "full", image: "dp-brighton", caption: "Brighton Pride, with Virgin Atlantic." },
      { type: "row", images: [{ id: "dp-booth", caption: "The activation booth." }, { id: "dp-truck", caption: "Vehicle livery." }] },
    ]
  },
  {
    slug: "stord",
    title: "Stord",
    credits: [
      {
        label: "Team Credits:",
        text: "Studio Freight (Design), John Williams (CD), Mario Paganini (CMO), Luke DeHaas (Design), Ruthie Fleming (Design)"
      }],
    story: [
      { text: "From 2021 to 2023, I helped graduate a brand from its first visual iteration to a serious global competitor in the logistics space. Studio Freight was the guiding force in helping us achieve this goal." },
      { type: "row", images: [{ id: "st-old-logo", caption: "Before: the previous wordmark." }, { id: "st-old-instagram", caption: "Before: the previous social feed." }] },
      { text: "After initial stakeholder fact-finding, it was clear the brand needed to be disruptive, boundary-pushing, and founded on a design system that could span every form of media and space." },
      { type: "row", images: [{ id: "st-early-logos", caption: "Early logo explorations." }, { id: "st-early-system", caption: "Early design system explorations." }] },
      { text: "A design audit determined the “box” mark was susceptible to collapse, much like corrugated cardboard itself. Stord needed to be strong, indomitable, and clear. The roundedness of the S and circular, pointed shapes emerged as front runners. The final mark displays the strength of the trust you can place in Stord to make your supply chain a competitive advantage. We then brought in 3D artist Tom Hoying to render elements showing what logistics could look like in our new ethos." },
      { type: "row", images: [{ id: "st-old-logo-boxes", caption: "The box mark, built from cardboard." }, { id: "st-old-logo-drawing", caption: "The box mark, drawn and finished." }] },
      { type: "row", images: [{ id: "st-final-logo", caption: "The final logo system." }, { id: "st-final-system-1", caption: "The final design system." }] },
      { type: "full", image: "st-final-system-2" },
      { type: "mosaic", variant: "feature-left", images: ["st-3d-4", "st-3d-1", "st-3d-3"], caption: "3D elements by Tom Hoying." },
      { type: "row", images: ["st-3d-2", "st-3d-5"] },
      { text: "Evolving the website was a fun delve into how far things could be pushed. Built on the idea of “gaming code,” users could scroll through each part of the supply chain in the city and see how Stord delivers its services better than the competition, part interactive experience and part usable tool." },
      { type: "full", image: "st-site", caption: "The Stord website." },
      { text: "The overhaul won immediate buy-in from the two founders, the exec team, and a few customers who had just come onboard with Stord’s services. It made waves across the supply chain industry and contributed to many new customers signing on." },
      { label: "Display ads" },
      { type: "row", images: ["st-ad-tall-1", "st-ad-tall-2", "st-ad-tall-3", "st-ad-tall-0"] },
      { type: "row", images: ["st-ad-1", "st-ad-2", "st-ad-3", "st-ad-4"] },
      { label: "Social" },
      { type: "row", images: ["st-post-2", "st-post-4", "st-post-5"] },
      { label: "Ebooks" },
      { type: "row", images: ["st-ebook-1", "st-ebook-2", "st-ebook-3"] },
      { label: "Day to day" },
      { type: "grid", columns: 4, images: ["st-box-closed", "st-box-open", "st-box-card", "st-box-cards", "st-box-tumbler", "st-box-speaker", "st-box-stickers", "st-pride-shirts"] },
      { type: "row", images: ["st-sticker-sheet", "st-logo-sheet"] },
      { type: "row", images: ["st-pride-announcement", "st-pride-patches", "st-laptop-stickers"] },
      { label: "Live events" },
      { type: "row", images: ["st-event-booth", "st-event-monitor", "st-event-banners", "st-event-stage"] },
      { label: "Video stills" },
      { type: "row", images: ["st-video-1", "st-video-2", "st-video-4"] },
    ]
  },
  {
    slug: "outsports",
    title: "Outsports",
    credits: [
      { label: "Team Credits:", text: "Phil Delbourgo (CD), Krystal Jackson (PM)" },
      { label: "", text: "A warm remembrance: Phil Delbourgo passed one year after this project launched. He was helpful, friendly, and one of the most incredible design professionals of his time. It was an honor to work with him on this identity." }],
    story: [
      { text: "In 2022, I was awarded a Pride Month project for Vox Media. What began as a simple email turned into a great conversation about queer identity, sports, and branding. The creative director and founders selected me to refresh the brand of Outsports.com." },
      { type: "full", image: "os-history", caption: "The Outsports brand before the refresh." },
      { text: "The goal was to modernize the logo and craft a simple system the internal team at Vox could run with. A few prior rebrand attempts had not landed, so this was a chance to dive deeper into putting meaning to mark." },
      { text: "A brand audit revealed the old identity was not the community leader it could have been, nor as inspirational as the stories it housed. Diving into the symbolism of the queer community and modern design trends shaped how I would execute this identity." },
      { type: "row", images: [{ id: "os-sketches-low", caption: "Early sketches." }, { id: "os-sketches-high", caption: "Concept sketches." }] },
      { text: "After a few rounds, an upward arrow form was selected. It felt new, progressive, and outside the system most SB Nation brands sat within, and it could stand as a unique mark heralding positive contact with the brand." },
      { type: "row", images: ["os-arrows-scatter", "os-arrows-outline"] },
      { type: "full", image: "os-logo" },
      { type: "row", images: ["os-lockups-type", "os-lockups-color"] },
      { type: "row", images: ["os-logo-blue", "os-logo-sky", "os-palette"] },
      { type: "mosaic", variant: "feature-left", images: ["os-news-graphic", "os-courage", "os-fearless"] },
      { type: "full", image: "os-logo-color" },
      { text: "The rebrand received great acclaim, with positive reactions from the founders, the publisher of SB Nation, internal partners, Vox Media’s Chief Creative Officer, and plenty of fans online. The brand will be used for years to come and brings a previously sidelined name out into the open." },
      { type: "row", images: [{ id: "os-site", caption: "Outsports.com, redesigned." }, { id: "os-instagram", caption: "Outsports on Instagram." }], frame: true },
    ]
  },
  {
    slug: "design-archive",
    title: "Design Archive",
    credits: [],
    story: [
      { text: "An assortment of design work and projects from 2014 to 2024." },
      { type: "row", images: ["da-morrison", "da-bobs-sticker"] },
      { type: "masonry", columns: 3, images: ["da-poster-transformation", "da-poster-death-stuff", "da-poster-julien-baker", "da-poster-hiss", "da-poster-mothers", "da-poster-tenement"] },
      { type: "row", images: ["da-hunks", "da-tacitus", "da-housing", "da-rhino"] },
      { type: "row", images: ["da-hooters-guides", "da-hooters-system"] },
      { type: "full", image: "da-hoa" },
      { type: "row", images: ["da-zine-cover", "da-zine-spread-1", "da-zine-spread-2"] },
      { type: "mosaic", variant: "feature-left", images: ["da-coffee", "da-headspace-cloud", "da-headspace-record"] },
      { type: "row", images: ["da-lulu", "da-acs", "da-trustpac", "da-engagepac"] },
      { type: "row", images: ["da-vinnys-cover", "da-vinnys-menu"] },
      { type: "row", images: ["da-vinnys-social", "da-vinnys-feast", "da-vinnys-pattern"] },
      { type: "row", images: ["da-team-usa-card", "da-team-usa-pin"] },
      { type: "row", images: ["da-holiday-card", "da-fernbank", "da-double-click"] },
    ]
  },
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
