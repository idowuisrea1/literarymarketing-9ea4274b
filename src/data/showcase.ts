/**
 * Author Website Showcase data.
 * Every sample uses FICTIONAL authors, titles, reviews and outlets. Nothing here is a real client,
 * real endorsement, real sales figure or real award.
 */

export const SITE_ORIGIN = "https://www.literarymarketing.online";

/** Flip to true once the showcase has been tested and approved for search engines. */
export const INDEXABLE = false;

export const GENRES = [
  ["fiction", "Fiction"],
  ["nonfiction", "Nonfiction"],
  ["romance", "Romance"],
  ["fantasy", "Fantasy"],
  ["thriller", "Thriller"],
  ["childrens", "Children's"],
  ["memoir", "Memoir"],
  ["business", "Business"],
  ["other", "Other"],
] as const;

export const STYLES = ["cinematic", "minimalist", "editorial", "literary", "luxury", "colorful", "immersive"] as const;

export type Sample = {
  id: string;
  number: string;
  name: string;
  audience: string;
  objective: string;
  genres: string[];
  styles: string[];
  features: string[];
  status: "live" | "planned";
  /** Only set when the route really exists. */
  demoPath?: "/author-website-showcase/bestseller";
  cover: { title: string; author: string; from: string; to: string };
};

export const SAMPLES: Sample[] = [
  {
    id: "bestseller", number: "01", name: "Bestseller Author Website", status: "live", demoPath: "/author-website-showcase/bestseller",
    audience: "Commercial fiction authors with a backlist and a new release to push.",
    objective: "Show credibility, put the latest book front and centre, and make buying obvious.",
    genres: ["fiction", "thriller"], styles: ["cinematic", "editorial"],
    features: ["Latest-release hero with buy buttons", "Series and backlist browser", "Trailer preview dialog", "Reviews and media sections", "Newsletter signup"],
    cover: { title: "Ninety Days to Midnight", author: "Dane Corvin", from: "#7a0f14", to: "#e5322d" },
  },
  {
    id: "literary", number: "02", name: "Literary Fiction Author", status: "planned",
    audience: "Literary novelists and short-story writers.",
    objective: "Signal artistic quality and credibility with restraint.",
    genres: ["fiction"], styles: ["literary", "minimalist", "editorial"],
    features: ["Editorial typography", "Selected publications", "Literary reviews", "Events list"],
    cover: { title: "The Quiet Orchard", author: "Imani Lowe", from: "#2f3b34", to: "#a8b5a0" },
  },
  {
    id: "romance", number: "03", name: "Romance Author", status: "planned",
    audience: "Romance authors with series and a reader community.",
    objective: "Build an emotional connection and move readers through the series.",
    genres: ["fiction", "romance"], styles: ["colorful"],
    features: ["Featured series", "Reader bonuses", "Book collections", "Newsletter signup"],
    cover: { title: "Summer at Larkspur", author: "Nell Hartley", from: "#b8336a", to: "#f6a5b8" },
  },
  {
    id: "fantasy", number: "04", name: "Fantasy and Sci-Fi Author", status: "planned",
    audience: "Fantasy and science-fiction authors building a universe.",
    objective: "Make the fictional world tangible and keep readers exploring.",
    genres: ["fiction", "fantasy"], styles: ["immersive", "cinematic"],
    features: ["World-building sections", "Maps and lore", "Character introductions", "Series navigation"],
    cover: { title: "Crown of Ash", author: "Tavish Orme", from: "#1b1f4a", to: "#6a5acd" },
  },
  {
    id: "thriller", number: "05", name: "Thriller and Mystery Author", status: "planned",
    audience: "Suspense, crime and mystery authors.",
    objective: "Create curiosity while keeping the page readable and conversion-focused.",
    genres: ["fiction", "thriller"], styles: ["cinematic"],
    features: ["Dramatic type", "Teaser section", "Series navigation", "Media appearances"],
    cover: { title: "The Glass Alibi", author: "R. J. Castellan", from: "#101418", to: "#3b4650" },
  },
  {
    id: "nonfiction", number: "06", name: "Nonfiction and Thought Leader", status: "planned",
    audience: "Experts, consultants and speakers with a book.",
    objective: "Turn expertise into credibility, audience growth and bookings.",
    genres: ["nonfiction", "business"], styles: ["editorial", "minimalist"],
    features: ["Positioning statement", "Key ideas and excerpt", "Speaking enquiries", "Resources"],
    cover: { title: "The Slow Advantage", author: "Dr. Amara Quinn", from: "#0f3d5e", to: "#2e86c1" },
  },
  {
    id: "childrens", number: "07", name: "Children's Book Author", status: "planned",
    audience: "Picture-book and middle-grade authors.",
    objective: "Delight children and give parents and teachers what they need.",
    genres: ["childrens"], styles: ["colorful"],
    features: ["Illustrated covers", "Age groups", "Sample reading", "School visit info"],
    cover: { title: "Pip and the Paper Moon", author: "Rosa Bellweather", from: "#f59e0b", to: "#fde68a" },
  },
  {
    id: "memoir", number: "08", name: "Memoir and Personal Story", status: "planned",
    audience: "Memoirists and personal-story authors.",
    objective: "Build trust so readers connect with the author's experience.",
    genres: ["memoir", "nonfiction"], styles: ["editorial"],
    features: ["Author story", "Selected excerpts", "Media coverage", "Speaking"],
    cover: { title: "What the River Kept", author: "Walter Adeyemi", from: "#5b3a29", to: "#c9a27e" },
  },
  {
    id: "luxury", number: "09", name: "Luxury Author Brand", status: "planned",
    audience: "Prominent authors and thought leaders with a premium brand.",
    objective: "Communicate premium positioning and authority without clutter.",
    genres: ["nonfiction", "other"], styles: ["luxury", "minimalist"],
    features: ["Refined typography", "Restrained palette", "Editorial imagery", "Elegant transitions"],
    cover: { title: "Gilded Hours", author: "Vivienne Aldous", from: "#1a1a1a", to: "#b08d57" },
  },
  {
    id: "starter", number: "10", name: "Independent Author Starter", status: "planned",
    audience: "First-time and self-published authors.",
    objective: "Prove a focused site works without a huge amount of content.",
    genres: ["fiction", "other"], styles: ["minimalist"],
    features: ["Featured book", "Simple buy links", "About section", "Newsletter and contact"],
    cover: { title: "A Map of Small Hours", author: "Kit Fenwick", from: "#134e4a", to: "#5eead4" },
  },
];

/**
 * Reference research. Observations are taken from Scott Lorenz's article (book-publicist.com).
 * The individual sites were not separately audited. These are principles only; no code, layout,
 * artwork or copy is reused. Concepts are independent and not affiliated with any reference author.
 */
export const REFERENCE_SOURCE = "https://book-publicist.com/top-30-author-websites-in-2026-compiled-by-book-publicist-scott-lorenz/";

export const REFERENCES = [
  { name: "Patrick Asare", url: "https://patrickasareauthor.com/", sample: "01", observed: "Cover high on the page, buy buttons, a trailer and media interviews together.", used: "Hero shows cover, buy buttons and trailer without any extra clicks." },
  { name: "Karen Kingsbury", url: "https://www.karenkingsbury.com/", sample: "01", observed: "One new release drives the whole page toward purchase.", used: "Latest release is the single dominant call to action." },
  { name: "Janet Evanovich", url: "https://evanovich.com/", sample: "01", observed: "A dark background makes the featured book stand out; subscribe sits in the header.", used: "Dark canvas for the cover; newsletter reachable from the navigation." },
  { name: "Colleen Coble", url: "https://colleencoble.com/", sample: "01", observed: "Clean layout with newsletter signup and dedicated areas for books and media.", used: "Separate backlist, media and newsletter sections with clear headings." },
  { name: "James Patterson", url: "https://www.jamespatterson.com/", sample: "01", observed: "Mailing list, shareable books and latest trailers.", used: "Trailer preview and newsletter are first-class sections." },
  { name: "Nora Roberts", url: "https://noraroberts.com/", sample: "01", observed: "Robust books section with a release schedule and a full book list.", used: "Browsable backlist grouped by series." },
] as const;
