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
       { label: "A small divider line above a group of pictures" }
       { note: "A line of copy that sits below a group of pictures" }

       { type: "full",     image: "id" }                          one picture, full width
       { type: "row",      images: [...] }                         pictures side by side, matched in height
       { type: "grid",     columns: 4, images: [...] }             an even grid
       { type: "collage",  images: [...] }                         three overlapping pictures
       { type: "carousel", label: "…", images: [...] }            swipeable slides (see variants below)
       { type: "split",    text: "…", image: "id", side: "right" }      a paragraph beside a picture
       { type: "video",    src, poster, width, height, title }     a video that plays on demand
                           (add loop: true for a silent animation that plays while on screen)

     Carousel variants:  variant: "thumbs"  one slide plus a row of thumbnails
                         variant: "peek"    neighbors show at the edges
                         variant: "strip"   a film strip; any shapes, one height

     Extras on full / row / grid / carousel:
       zoom: "lens"   a magnifier follows the mouse (great for decks and boards)
       zoom: "pan"    the picture zooms in place as the mouse moves
       tone: "panel"  a soft surface behind transparent product shots
       tone: "stage"  a black band, for photography shot on black
       frame: true    a soft browser-style frame for screenshots

     Inside "images", each entry is a picture id from images.js, or
     { id: "…", caption: "…" } (carousels show captions under the slide).
     Pictures rarely need captions: prefer a { label } divider between groups,
     and a { note } below a group for anything longer.

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
      { type: "full", image: "gs-placeholder-1" },
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
      { type: "full", image: "dc-header" },
      { text: "In 2024, I was invited to help ideate, design, and deploy the first stage of Delta Air Lines’ Centennial identity." },
      { text: "We were challenged to develop a special, year-long brand identity to build excitement not only among customers, but among the people who make Delta possible internally. We envisioned the work taking over the annual employee appreciation campaign for 2024, with the identity expanding outward to customers and partners after the company’s 2025 anniversary." },
      { text: "We established a strategic angle of “Illuminating” and shifted the brand motto to “We’ll Never Stop Climbing.” From there, archival research at the Delta Flight Museum helped us produce special identity variations for the Centennial. The asset library spanned logos, patterns, textures, and more, which I applied to merch, trading cards, onboard beverage cans, and countless other touchpoints throughout the year." },
      { label: "Pitch deck" },
      { type: "carousel", label: "From the Centennial pitch deck", variant: "thumbs", ratio: "16 / 9", fit: "contain", images: [{ id: "dc-deck-1", caption: "Illuminating: radiant, thoughtful, and perspective-shifting." }, { id: "dc-deck-2", caption: "The color palette." }, { id: "dc-deck-3", caption: "Metallic inspiration." }, { id: "dc-deck-4", caption: "The emblem." }, { id: "dc-deck-5", caption: "The metallic supergraphic." }, { id: "dc-logo-construction", caption: "How the emblem is built." }] },
      { label: "Patterns" },
      { type: "grid", columns: 4, images: ["dc-pattern-1", "dc-pattern-2", "dc-pattern-3", "dc-pattern-4", "dc-pattern-5", "dc-pattern-6", "dc-pattern-7", "dc-pattern-8"], zoom: "pan" },
      { label: "Merch" },
      { type: "row", images: ["dc-merch-crewneck-gray", "dc-merch-crewneck-navy", "dc-merch-tee-white-front", "dc-merch-tee-white-back"], tone: "panel" },
      { type: "row", images: ["dc-merch-tee-blue-front", "dc-merch-tee-blue-back", "dc-merch-sock-trio", "dc-merch-sock-pair"], tone: "panel" },
      { type: "collage", images: ["dc-merch-shirt-tennis", "dc-merch-socks-cafe", "dc-merch-sweater-athlete"] },
      { type: "row", images: ["dc-merch-snacks", "dc-merch-cards"] },
      { type: "full", image: "dc-merch-shop", frame: true },
      { type: "split", text: "For the employee appreciation campaign, I crafted an environmental design system for buildings, buses, signs, and lamp posts to flood Delta campuses with celebratory ephemera. Photographer Chris Patey and production house Partners&Co were selected to produce our photography and b-roll for video work. Together, we produced deeply moving imagery to herald where the brand was headed.", image: "dc-campus-poster", side: "right" },
      { label: "Pitch creative" },
      { type: "carousel", label: "Campaign pitch creative", variant: "peek", ratio: "16 / 9", fit: "contain", images: ["dc-pitch-1", "dc-pitch-2", "dc-pitch-3", "dc-pitch-mocks"], zoom: "lens" },
      { label: "Portraits" },
      { type: "full", image: "dc-portrait-group-2" },
      { type: "row", images: ["dc-portrait-jetway", "dc-portrait-tug"] },
      { type: "row", images: ["dc-portrait-tower", "dc-portrait-group-1", "dc-portrait-pilot"] },
      { type: "row", images: ["dc-portrait-attendant-1", "dc-portrait-attendant-2", "dc-portrait-reservations"] },
      { label: "Campus" },
      { type: "full", image: "dc-campus-banner-wide" },
      { type: "row", images: ["dc-bus-519", "dc-bus-551"] },
      { type: "row", images: ["dc-campus-banner-closeup", "dc-campus-banner-brick", "dc-campus-gate"] },
      { text: "On January 1, 2025, assets launched onboard, online, and onsite. After the Centennial Gala in March, the full suite of assets, merchandise, and experiences launched worldwide. Iteration continued throughout 2025 with multiple design executions and brand partnerships to show the world how we celebrated 100 years of one of the most iconic airlines in aviation history." },
      { label: "Launch" },
      { type: "full", image: "dc-sphere" },
      { label: "Livery" },
      { type: "row", images: ["dc-livery-wing", "dc-livery-install", "dc-livery-drone"], zoom: "pan" },
      { type: "full", image: "dc-news-hub", frame: true },
      { label: "Anthem film" },
      { type: "video", title: "The Delta Centennial anthem film", src: "assets/video/anthem.mp4", poster: "assets/video/anthem-poster.webp", width: 1600, height: 676 },
      { label: "Website animation" },
      { type: "video", title: "An animation of the Delta Centennial website", src: "assets/video/website-animation.mp4", poster: "assets/video/website-animation-poster.webp", width: 1600, height: 1020, loop: true, frame: true },
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
      { type: "full", image: "dp-header" },
      { text: "During my time at Delta, I was tasked with ideating the Global Pride campaign for 2024. It culminated in activations at seven locations worldwide, ending with a float in the famous Amsterdam Pride canal parade. The project also allowed our SkyTeam partner, KLM, to debut a presence at their home Pride celebration. Our creative strategy landed on a blend of themes from Delta, KLM, and AMS Pride to put forth a unique expression of the global vision." },
      { text: "Steering clear of the obvious, we found inspiration not only in the iridescence of the atmosphere, but in our shimmering aircraft trading cards. The focus shifted to translucent, iridescent, and reflective materials, making a joyful presence that blended the Delta and KLM brands in a seamless visual execution where both were equally present." },
      { label: "Presentation" },
      { type: "carousel", label: "From the creative presentation", variant: "thumbs", ratio: "16 / 9", fit: "contain", images: ["dp-deck-1", "dp-deck-2", "dp-deck-3", "dp-deck-4", "dp-deck-5"], zoom: "lens" },
      { text: "Constructed by the local firm Prideboten, the float sailed for three hours and passed under 21 bridges, its inflatable tail deflating and re-emerging with onboard ping and smoke machines. Full details were captured in a Delta News Hub article." },
      { label: "Building the float" },
      { type: "full", image: "dp-construction", zoom: "lens" },
      { label: "Amsterdam" },
      { type: "full", image: "dp-chariot" },
      { type: "full", image: "dp-ads", zoom: "lens" },
      { note: "Working on the largest Pride activation of my career was a great reminder of how much of an impact my work as a designer can have on the community I belong to, and the wealth of what simply being yourself can manifest as." },
      { text: "This creative direction was applied to numerous offshoot floats across the US for local city Pride parades, with colorful fuselage windows “flying” down joyful streets." },
      { label: "Other global activations" },
      { type: "full", image: "dp-influence", zoom: "lens" },
      { type: "full", image: "dp-other", zoom: "lens" },
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
      { type: "full", image: "st-header" },
      { text: "From 2021 to 2023, I helped graduate a brand from its first visual iteration to a serious global competitor in the logistics space. Studio Freight was the guiding force in helping us achieve this goal." },
      { label: "Before" },
      { type: "carousel", label: "The Stord brand before", variant: "peek", ratio: "16 / 9", fit: "contain", images: ["st-old-logo", "st-old-logo-boxes", "st-old-collateral", "st-old-hiring"] },
      { text: "After initial stakeholder fact-finding, it was clear the brand needed to be disruptive, boundary-pushing, and founded on a design system that could span every form of media and space." },
      { label: "Early explorations" },
      { type: "row", images: ["st-early-boards", "st-early-logos"], zoom: "lens" },
      { text: "A design audit determined the “box” mark was susceptible to collapse, much like corrugated cardboard itself. Stord needed to be strong, indomitable, and clear. The roundedness of the S and circular, pointed shapes emerged as front runners. The final mark displays the strength of the trust you can place in Stord to make your supply chain a competitive advantage. We then brought in 3D artist Tom Hoying to render elements showing what logistics could look like in our new ethos." },
      { label: "The new system" },
      { type: "grid", columns: 2, images: ["st-final-logo", "st-final-type", "st-final-icons", "st-final-interactive"], zoom: "lens" },
      { type: "full", image: "st-final-system", zoom: "lens" },
      { label: "3D elements" },
      { type: "full", image: "st-3d-4" },
      { type: "row", images: ["st-3d-1", "st-3d-3"] },
      { type: "row", images: ["st-3d-2", "st-3d-5"] },
      { text: "Evolving the website was a fun delve into how far things could be pushed. Built on the idea of “gaming code,” users could scroll through each part of the supply chain in the city and see how Stord delivers its services better than the competition, part interactive experience and part usable tool." },
      { type: "full", image: "st-site", tone: "panel" },
      { label: "Launch film" },
      { type: "video", title: "The Stord launch film: At the speed of the Cloud", src: "assets/video/stord-launch.mp4", poster: "assets/video/stord-launch-poster.webp", width: 1920, height: 1080 },
      { text: "The overhaul won immediate buy-in from the two founders, the exec team, and a few customers who had just come onboard with Stord’s services. It made waves across the supply chain industry and contributed to many new customers signing on." },
      { label: "Display ads" },
      { type: "carousel", label: "Stord display ads", variant: "strip", ratio: "16 / 9", fit: "contain", images: ["st-ad-tall-1", "st-ad-tall-2", "st-ad-tall-3", "st-ad-tall-0", "st-ad-1", "st-ad-2", "st-ad-3", "st-ad-4"] },
      { label: "Social" },
      { type: "row", images: ["st-post-2", "st-post-4", "st-post-5"] },
      { label: "Ebooks" },
      { type: "row", images: ["st-ebook-1", "st-ebook-2", "st-ebook-3"] },
      { label: "Welcome box" },
      { type: "carousel", label: "The Stord welcome box", variant: "strip", ratio: "16 / 9", fit: "contain", images: ["st-box-closed", "st-box-open", "st-box-card", "st-box-cards", "st-box-tumbler", "st-box-speaker", "st-box-stickers"] },
      { label: "Stickers and sub-brands" },
      { type: "row", images: ["st-sticker-sheet", "st-logo-sheet"] },
      { type: "row", images: ["st-finance-art", "st-laptop-stickers"] },
      { label: "Pride at Stord" },
      { type: "row", images: ["st-pride-announcement", "st-pride-shirts"] },
      { label: "Live events" },
      { type: "row", images: ["st-event-booth", "st-event-monitor", "st-event-banners", "st-event-stage"], zoom: "pan" },
    ]
  },
  {
    slug: "outsports",
    title: "Outsports",
    credits: [
      { label: "Team Credits:", text: "Phil Delbourgo (CD), Krystal Jackson (PM)" },
      { label: "", text: "A warm remembrance: Phil Delbourgo passed one year after this project launched. He was helpful, friendly, and one of the most incredible design professionals of his time. It was an honor to work with him on this identity." }],
    story: [
      { type: "full", image: "os-header" },
      { text: "In 2022, I was awarded a Pride Month project for Vox Media. What began as a simple email turned into a great conversation about queer identity, sports, and branding. The creative director and founders selected me to refresh the brand of Outsports.com." },
      { type: "full", image: "os-history" },
      { text: "The goal was to modernize the logo and craft a simple system the internal team at Vox could run with. A few prior rebrand attempts had not landed, so this was a chance to dive deeper into putting meaning to mark." },
      { text: "A brand audit revealed the old identity was not the community leader it could have been, nor as inspirational as the stories it housed. Diving into the symbolism of the queer community and modern design trends shaped how I would execute this identity." },
      { label: "Sketches" },
      { type: "row", images: ["os-sketches-low", "os-sketches-high"] },
      { text: "After a few rounds, an upward arrow form was selected. It felt new, progressive, and outside the system most SB Nation brands sat within, and it could stand as a unique mark heralding positive contact with the brand." },
      { label: "Exploration" },
      { type: "carousel", label: "Logo exploration", variant: "peek", ratio: "16 / 9", fit: "contain", images: ["os-logo", "os-arrows-scatter", "os-arrows-outline", "os-lockups-type", "os-lockups-color"] },
      { label: "Final logo and brand" },
      { type: "carousel", label: "The final logo and brand", variant: "thumbs", ratio: "16 / 9", fit: "contain", images: ["os-logo-blue", "os-logo-sky", "os-palette", "os-courage", "os-fearless", "os-news-graphic", "os-logo-color"] },
      { type: "full", image: "os-toolkit", zoom: "lens" },
      { text: "The rebrand received great acclaim, with positive reactions from the founders, the publisher of SB Nation, internal partners, Vox Media’s Chief Creative Officer, and plenty of fans online. The brand will be used for years to come and brings a previously sidelined name out into the open." },
      { label: "In use" },
      { type: "row", images: ["os-site", "os-instagram"], frame: true },
    ]
  },
  {
    slug: "design-archive",
    title: "Design Archive",
    credits: [],
    story: [
      { text: "An assortment of design work and projects from 2014 to 2024." },
      { label: "Morrison" },
      { type: "row", images: ["da-morrison", "da-holiday-card", "da-bobs-sticker"] },
      { label: "Gig posters" },
      { type: "row", images: ["da-poster-eyes", "da-poster-death-stuff", "da-poster-julien-baker"] },
      { type: "row", images: ["da-poster-hiss", "da-poster-mothers", "da-poster-tenement"] },
      { label: "Marks" },
      { type: "row", images: ["da-hunks", "da-tacitus", "da-rhino"] },
      { label: "Brand systems" },
      { type: "row", images: ["da-hooters-guides", "da-hooters-system"], zoom: "lens" },
      { type: "full", image: "da-hoa" },
      { label: "Thesis" },
      { type: "row", images: ["da-thesis", "da-thesis-animation"] },
      { label: "Zine" },
      { type: "full", image: "da-zine" },
      { label: "AT&T" },
      { type: "full", image: "da-coffee" },
      { type: "row", images: ["da-headspace-cloud", "da-headspace-record"] },
      { label: "Cause and campaign posters" },
      { type: "row", images: ["da-lulu", "da-acs"] },
      { type: "row", images: ["da-trustpac", "da-engagepac"] },
      { label: "Vinny's mutual aid bakery" },
      { type: "row", images: ["da-vinnys-social", "da-vinnys-feast", "da-vinnys-pattern"] },
      { label: "Delta and Team USA" },
      { type: "row", images: ["da-team-usa-card", "da-team-usa-pin"] },
      { label: "Odds and ends" },
      { type: "row", images: ["da-fernbank", "da-double-click"] },
    ]
  },
];

export const SLIDES = [
  { src: "assets/img/slides/delta-centennial-logo.webp", alt: "The Delta 100 Years Centennial logo in white on a navy field.", title: "Delta Centennial mark", project: "delta-centennial" },
  { src: "assets/img/slides/delta-banner.webp", alt: "A large Centennial banner of Delta employees above the words “We’ll never stop climbing” on the side of a Delta building.", title: "Delta Air Lines Centennial", project: "delta-centennial" },
  { src: "assets/img/slides/delta-pride.webp", alt: "The Delta and KLM Pride float on an Amsterdam canal, a white barge with rainbow-colored fuselage windows.", title: "Delta Pride 2024", project: "delta-pride" },
  { src: "assets/img/slides/stord-site.webp", alt: "The Stord website: an oversized black Stord wordmark above an isometric illustration of a city.", title: "Stord", project: "stord" },
  { src: "assets/img/slides/outsports-site.webp", alt: "The Outsports homepage with its upward-arrow logo above a grid of news stories.", title: "Outsports", project: "outsports" },
  { src: "assets/img/slides/hooters-brand.webp", alt: "A grid of Hooters brand work: logo, packaging, menus, merchandise, billboards, and social posts.", title: "Hooters", project: "design-archive" },
  { src: "assets/img/slides/morrison-work.webp", alt: "A “Bob’s your uncle.” sticker held up in front of a red wall printed with large letters.", title: "Morrison", project: "design-archive" }
];
