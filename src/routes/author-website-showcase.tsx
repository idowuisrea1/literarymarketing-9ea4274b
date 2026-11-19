import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/primitives";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";
import { BookCover } from "@/components/showcase/BookCover";
import { GENRES, INDEXABLE, REFERENCES, REFERENCE_SOURCE, SAMPLES, SITE_ORIGIN, STYLES, type Sample } from "@/data/showcase";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const TITLE = "Author Website Showcase | Literary Marketing";
const DESC = "Explore working author website concepts for bestselling, literary, romance, fantasy, thriller, nonfiction and children's authors, then hire Literary Marketing to build yours.";
const URL = `${SITE_ORIGIN}/author-website-showcase`;

export const Route = createFileRoute("/author-website-showcase")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: INDEXABLE ? "index, follow" : "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Showcase,
});

const BTN = "btn-glow inline-flex min-h-11 items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" aria-pressed={on} onClick={onClick} className={cn("min-h-11 rounded-full border px-4 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", on ? "border-gold bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground")}>
      {children}
    </button>
  );
}

function Card({ s }: { s: Sample }) {
  const live = s.status === "live" && s.demoPath;
  return (
    <article className="glass flex h-full flex-col overflow-hidden rounded-3xl">
      <div className="relative grid place-items-center p-8" style={{ background: `radial-gradient(120% 90% at 50% 0%, ${s.cover.to}66, #08080c)` }}>
        <span className={cn("absolute left-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-widest", live ? "bg-gold text-primary-foreground" : "border text-muted-foreground")}>{live ? "Live demo" : "In design"}</span>
        <div className="w-28 sm:w-32"><BookCover {...s.cover} /></div>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="font-mono text-xs uppercase tracking-widest text-cyan">Sample {s.number}</p>
        <h3 className="mt-1 text-2xl font-semibold">{s.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{s.audience}</p>
        <p className="mt-3 text-sm">{s.objective}</p>
        <ul className="mt-4 space-y-1 text-sm text-muted-foreground">
          {s.features.map((f) => <li key={f} className="flex gap-2"><span aria-hidden="true" className="text-gold">✦</span>{f}</li>)}
        </ul>
        <div className="mt-auto flex flex-wrap gap-2 pt-6">
          {live ? (
            <Link to={s.demoPath!} onClick={() => trackEvent("showcase_demo_open", { sample: s.id })} className={cn(BTN, "bg-gold-gradient text-primary-foreground")}>View Live Demo</Link>
          ) : (
            <span aria-disabled="true" className={cn(BTN, "cursor-not-allowed border text-muted-foreground")}>Demo in production</span>
          )}
          <a href="#how-it-works" className={cn(BTN, "glass")}>See How It Works</a>
          <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "request_style", sample: s.id })} className={cn(BTN, "glass")}>Request This Style</a>
        </div>
      </div>
    </article>
  );
}

function Showcase() {
  const [genre, setGenre] = useState("all");
  const [style, setStyle] = useState("all");
  const shown = SAMPLES.filter((s) => (genre === "all" || s.genres.includes(genre)) && (style === "all" || s.styles.includes(style)));
  const live = SAMPLES.filter((s) => s.status === "live").length;

  return (
    <div className="min-h-screen">
      <ShowcaseHeader />
      <main>
        <section className="px-5 pb-12 pt-20 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Author Website Showcase</p>
          <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold leading-tight sm:text-6xl">Your Story Deserves a Website as <span className="text-gold-gradient">Extraordinary as Your Book.</span></h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-muted-foreground">Literarymarketing creates custom websites for authors, novelists, publishers and thought leaders. Explore working concepts below, then tell us about your book.</p>
          <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "showcase_build_hero" })} className={cn(BTN, "mt-8 bg-gold-gradient px-7 py-3 text-primary-foreground")}>Build My Author Website</a>
        </section>

        <section aria-label="Browse concepts" className="mx-auto max-w-7xl px-5 pb-20">
          <div className="grid gap-4">
            <div role="group" aria-label="Filter by genre" className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Genre</span>
              <Chip on={genre === "all"} onClick={() => setGenre("all")}>All</Chip>
              {GENRES.map(([id, label]) => <Chip key={id} on={genre === id} onClick={() => { setGenre(id); trackEvent("showcase_filter", { genre: id }); }}>{label}</Chip>)}
            </div>
            <div role="group" aria-label="Filter by visual style" className="flex flex-wrap items-center gap-2">
              <span className="mr-1 font-mono text-xs uppercase tracking-widest text-muted-foreground">Style</span>
              <Chip on={style === "all"} onClick={() => setStyle("all")}>All</Chip>
              {STYLES.map((id) => <Chip key={id} on={style === id} onClick={() => { setStyle(id); trackEvent("showcase_filter", { style: id }); }}><span className="capitalize">{id}</span></Chip>)}
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground" aria-live="polite">Showing {shown.length} of {SAMPLES.length} concepts. {live} live demo{live === 1 ? "" : "s"} available now; the rest are being built one at a time.</p>

          {shown.length === 0 ? (
            <p className="mt-10 text-center text-muted-foreground">No concepts match those filters yet. <button type="button" className="text-gold underline" onClick={() => { setGenre("all"); setStyle("all"); }}>Clear filters</button></p>
          ) : (
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {shown.map((s, i) => <Reveal key={s.id} delay={(i % 3) * 0.08} className="h-full"><Card s={s} /></Reveal>)}
            </div>
          )}
        </section>

        <section id="how-it-works" className="mx-auto max-w-5xl scroll-mt-24 px-5 pb-20">
          <h2 className="text-center text-3xl font-semibold sm:text-4xl">How it works</h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              ["Pick a direction", "Browse the concepts and tell us which style fits your book and readers."],
              ["Share your book", "Send your cover, author bio, links and goals through the enquiry form."],
              ["We design and build", "We adapt the concept to your brand, build it, test it and launch it."],
            ].map(([t, d], i) => (
              <li key={t} className="glass rounded-2xl p-5">
                <span className="font-mono text-gold">0{i + 1}</span>
                <p className="mt-2 font-semibold">{t}</p>
                <p className="mt-1 text-sm text-muted-foreground">{d}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-label="Design research" className="mx-auto max-w-5xl px-5 pb-24">
          <details className="glass rounded-2xl p-5">
            <summary className="min-h-11 cursor-pointer font-semibold">Design research behind Sample 01</summary>
            <p className="mt-3 text-sm text-muted-foreground">These are independent concepts inspired by general design principles noted in <a className="text-gold underline" href={REFERENCE_SOURCE} target="_blank" rel="noopener noreferrer">Scott Lorenz's article on author websites</a>. They are not redesigns of those sites, no code, layout, artwork or text was reused, and Literarymarketing is not affiliated with any author listed. The observations below come from the article's descriptions.</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {REFERENCES.map((r) => (
                <li key={r.name} className="rounded-xl border p-4 text-sm">
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-gold underline">{r.name}</a>
                  <p className="mt-1 text-muted-foreground"><span className="text-foreground">Observed:</span> {r.observed}</p>
                  <p className="mt-1 text-muted-foreground"><span className="text-foreground">Our take:</span> {r.used}</p>
                </li>
              ))}
            </ul>
          </details>
        </section>
      </main>
    </div>
  );
}
