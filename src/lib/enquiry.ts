import { ONE_TIME, PACKAGES } from "@/data/site";

export const STAGES = ["Still writing", "Ready to launch", "Already published", "Several books / series"];
export const BUDGETS = ["Under $300", "$300 – $600", "$600 – $1,200", "$1,200+", "Not sure yet"];
export const TIMELINES = ["As soon as possible", "Within 1 month", "1 – 3 months", "Just exploring"];

export type Answers = {
  name: string; email: string; genre: string; stage: string; title: string;
  services: string[]; interest: string; budget: string; timeline: string; details: string;
};

// Single services that map to a one-time project (existing ONE_TIME ids).
const ONE_OFF: Record<string, string> = {
  "Graphic & Cover Design": "cover",
  "Video That Sells Books": "trailer",
  "Author Websites & Landing Pages": "website",
  "Website Audit, SEO & Optimization": "audit",
  "Amazon & Goodreads Growth": "aplus",
};

/** Rules-based suggestion using only existing PACKAGES / ONE_TIME data. */
export function suggestPackage(a: Pick<Answers, "services" | "budget">): { name: string; price: string } {
  const pkg = (i: number) => ({ name: PACKAGES[i]!.name, price: `${PACKAGES[i]!.price}${PACKAGES[i]!.period}` });
  const one = a.services.length === 1 ? ONE_TIME.find((o) => o.id === ONE_OFF[a.services[0]!]) : undefined;
  if (a.budget === "Under $300") return one ? { name: one.name, price: `from ${one.from}` } : pkg(0);
  if (a.budget === "$300 – $600") return pkg(0);
  if (a.budget === "$600 – $1,200") return pkg(1);
  if (a.budget === "$1,200+") return pkg(2);
  if (a.services.includes("Full Package") || a.services.length >= 4) return pkg(2);
  if (a.services.length >= 2) return pkg(1);
  return one ? { name: one.name, price: `from ${one.from}` } : pkg(0);
}

export function buildBrief(a: Answers): string {
  const s = suggestPackage(a);
  return [
    `Project brief — ${a.name || "Author"}`,
    a.title && `Book: ${a.title}`,
    a.genre && `Genre: ${a.genre}`,
    a.stage && `Stage: ${a.stage}`,
    a.interest && `Interested in: ${a.interest}`,
    a.services.length > 0 && `Services: ${a.services.join(", ")}`,
    a.budget && `Budget: ${a.budget}`,
    a.timeline && `Timeline: ${a.timeline}`,
    `Suggested starting point: ${s.name} (${s.price})`,
    a.details && `Notes: ${a.details}`,
  ].filter(Boolean).join("\n");
}
