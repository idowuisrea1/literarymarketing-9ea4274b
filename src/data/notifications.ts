/**
 * Sales / social-proof notification data.
 *
 * HONESTY RULES
 * - Project, message and service notices are SAMPLE content. They are shown with a visible SAMPLE or SERVICE badge.
 * - Review notices come only from REVIEWS below. Nothing is invented. Reviews are labelled
 *   "Sample testimonial" until you set `verified: true` for a review you can back with real records.
 * - No timestamps, purchase counts or "just now" claims are ever shown.
 */

export type Kind = "project" | "message" | "review" | "service";

export type ReviewGroup =
  | "website"
  | "author-marketing"
  | "marketplace"
  | "publishing"
  | "branding"
  | "experience"
  | "premium";

export type Notice = {
  id: string;
  kind: Kind;
  title: string;
  text: string;
  name?: string;
  rating?: number;
  group?: ReviewGroup;
  /** True = simulated/example content, shown with a SAMPLE badge. */
  sample: boolean;
  /** Only true for reviews backed by genuine customer records. */
  verified?: boolean;
};

export const NOTICE_CONFIG = {
  initialDelayMs: 9000,
  minGapMs: 18000,
  maxGapMs: 35000,
  durationMs: 6500,
  maxPerSession: 10,
  /** How many recent notices to avoid repeating. Must be smaller than the total pool. */
  recentMemory: 6,
};

/* ---------- A. Project completion (sample) ---------- */
const PROJECTS: Notice[] = [
  { id: "p-business-site", kind: "project", sample: true, title: "Project Completed!", text: "A professional business website has been delivered." },
  { id: "p-author-site", kind: "project", sample: true, title: "Author Website Design", text: "Project completed." },
  { id: "p-marketplace", kind: "project", sample: true, title: "Multi-Vendor Marketplace", text: "Project delivered." },
  { id: "p-formatting", kind: "project", sample: true, title: "Book Formatting & Publishing", text: "Project completed." },
  { id: "p-business-dev", kind: "project", sample: true, title: "Business Website Development", text: "Successfully delivered." },
  { id: "p-brand", kind: "project", sample: true, title: "Brand Identity Design", text: "Project completed." },
];

/* ---------- B. Customer enquiries (sample) ---------- */
const MESSAGES: Notice[] = [
  { id: "m-business", kind: "message", sample: true, title: "New Customer Enquiry", text: "Hello! I'm interested in getting a professional website for my business." },
  { id: "m-designs", kind: "message", sample: true, title: "New Customer Enquiry", text: "I love your website designs. Can we discuss my project?" },
  { id: "m-author", kind: "message", sample: true, title: "New Customer Enquiry", text: "I'm looking for someone to build an author website." },
  { id: "m-market", kind: "message", sample: true, title: "New Customer Enquiry", text: "Can you help me create a multi-vendor marketplace?" },
  { id: "m-marketing", kind: "message", sample: true, title: "New Customer Enquiry", text: "I would love to discuss your book marketing services." },
];

/* ---------- D. Service spotlights (factual, not transactions) ---------- */
const SERVICES: Notice[] = [
  { id: "s-web", kind: "service", sample: false, title: "Website Design & Development", text: "Modern, fast websites built around your goals." },
  { id: "s-author", kind: "service", sample: false, title: "Author Website Creation", text: "A professional home online for you and your books." },
  { id: "s-marketing", kind: "service", sample: false, title: "Book Marketing", text: "Social, email and promotion to help readers find your book." },
  { id: "s-market", kind: "service", sample: false, title: "Marketplace Development", text: "Multi-vendor marketplace websites." },
  { id: "s-format", kind: "service", sample: false, title: "Book Formatting", text: "Clean, professional interiors for print and ebook." },
  { id: "s-edit", kind: "service", sample: false, title: "Manuscript Editing", text: "Careful editing to get your manuscript ready." },
  { id: "s-publish", kind: "service", sample: false, title: "Publishing Preparation", text: "Get your book ready to publish with confidence." },
  { id: "s-brand", kind: "service", sample: false, title: "Branding & Creative Design", text: "Brand identity and creative design for authors and businesses." },
];

/* ---------- C. Reviews ----------
 * PASTE YOUR REAL TESTIMONIALS HERE (original names and wording). Example shape:
 *
 *   { name: "Reviewer Name", group: "website", text: "Full original review text.", short: "Optional shorter version.", verified: false },
 *
 * The review collection was not included in the request, so this list is empty and no review
 * notifications are shown until you add some. Nothing is invented.
 */
export type Review = { name: string; group: ReviewGroup; text: string; short?: string; rating?: number; verified?: boolean };
export const REVIEWS: Review[] = [];

export function shorten(text: string, max = 150): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (stop > max * 0.5) return cut.slice(0, stop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
}

const REVIEW_NOTICES: Notice[] = REVIEWS.map((r, i) => ({
  id: `r-${i}`,
  kind: "review" as const,
  title: "5-Star Review",
  text: r.short ?? shorten(r.text),
  name: r.name,
  rating: r.rating ?? 5,
  group: r.group,
  sample: !r.verified,
  verified: !!r.verified,
}));

export const NOTICES: Notice[] = [...PROJECTS, ...MESSAGES, ...REVIEW_NOTICES, ...SERVICES];
