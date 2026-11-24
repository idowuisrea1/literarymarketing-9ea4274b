/**
 * Sales / social-proof notification data.
 *
 * HONESTY RULES
 * - Project and enquiry notices are SAMPLE content. They are shown with a visible SAMPLE badge.
 * - Service notices are factual service highlights and carry a SERVICE badge.
 * - Review notices come only from src/data/reviews.ts. Nothing is invented. They are labelled
 *   "Sample testimonial" until REVIEWS_VERIFIED is set to true in that file.
 * - No timestamps, purchase counts or "just now" claims are ever shown.
 */

import { REVIEWS, REVIEWS_VERIFIED, type ReviewGroup } from "./reviews";

export type Kind = "project" | "message" | "review" | "service";

export type Notice = {
  id: string;
  kind: Kind;
  title: string;
  /** Text shown in the popup (a short excerpt for reviews). */
  text: string;
  /** Complete original review text, shown when the visitor expands the popup. */
  full?: string;
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
  recentMemory: 12,
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

/* ---------- C. Reviews (data lives in src/data/reviews.ts) ---------- */
export function shorten(text: string, max = 150): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const stop = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "), cut.lastIndexOf("? "));
  if (stop > max * 0.5) return cut.slice(0, stop + 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s]+$/, "") + "…";
}

const REVIEW_NOTICES: Notice[] = REVIEWS.map((r) => ({
  id: r.id,
  kind: "review" as const,
  title: "5-Star Review",
  text: r.excerpt ?? shorten(r.review),
  full: r.review,
  name: r.name,
  rating: r.rating,
  group: r.category,
  sample: !REVIEWS_VERIFIED,
  verified: REVIEWS_VERIFIED,
}));

export const NOTICES: Notice[] = [...PROJECTS, ...MESSAGES, ...REVIEW_NOTICES, ...SERVICES];
