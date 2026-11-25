import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { Reveal, Tilt } from "@/components/site/primitives";
import { BookCover } from "@/components/showcase/BookCover";
import { NewsletterDemo } from "@/components/showcase/NewsletterDemo";
import { INDEXABLE, SITE_ORIGIN } from "@/data/showcase";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const TITLE = "Literary Fiction Author Website concept | Literary Marketing";
const DESC = "A working demo of an elegant, editorial website for a literary fiction author, with fictional content. Built by Literary Marketing.";
const URL = `${SITE_ORIGIN}/author-website-showcase/literary`;

export const Route = createFileRoute("/author-website-showcase_/literary")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: INDEXABLE ? "index, follow" : "noindex, nofollow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: LiteraryDemo,
});

/* Sample 02 identity: ivory paper, warm ink, sage green. Quiet, editorial, lots of space. */
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2f3b34]";
const LINK = cn("underline decoration-[#2f3b34]/30 underline-offset-4 transition-colors hover:decoration-[#2f3b34]", FOCUS);
const CHIP = (on: boolean) => cn("min-h-11 border-b-2 px-1 text-sm tracking-wide transition-colors", FOCUS, on ? "border-[#2f3b34] text-[#1d1b18]" : "border-transparent text-[#5b564d] hover:text-[#1d1b18]");
const RETAILERS = ["Independent bookstores", "Bookshop.org", "Amazon"];

const NAV = [["About", "s2-about"], ["Books", "s2-books"], ["Publications", "s2-pubs"], ["Reviews", "s2-reviews"], ["Events", "s2-events"], ["Letters", "s2-letters"]] as const;

type Book = { id: string; title: string; kind: string; year: number; from: string; to: string; blurb: string; excerpt: string };
const BOOKS: Book[] = [
  { id: "orchard", title: "The Quiet Orchard", kind: "Novel", year: 2025, from: "#2f3b34", to: "#a8b5a0", blurb: "Three generations, one failing orchard, and a family that has never said what it means. A novel about inheritance, silence and the weather of a house.", excerpt: "My grandmother pruned as if she were forgiving the trees. Each cut was small and exact, and she never looked at what fell. We learned to read her moods by the sound of the shears." },
  { id: "salt", title: "A Season of Salt", kind: "Novel", year: 2022, from: "#3b4a5a", to: "#c9d3dc", blurb: "A widow returns to a coastal town to sell her late husband's boat and finds the town has kept its own account of their marriage.", excerpt: "The harbor smelled the way it always had, of rope and cold iron and other people's weather. She carried the key in her fist the whole length of the pier." },
  { id: "weather", title: "Small Weather", kind: "Stories", year: 2019, from: "#6b4a3a", to: "#e0c9b5", blurb: "Twelve stories about small domestic changes that turn out not to be small: a moved chair, an unanswered letter, a neighbor who stops waving.", excerpt: "Nobody mentioned the chair. It simply stood in the other corner now, facing the window, as if it had made up its mind." },
];

type Pub = { id: string; title: string; venue: string; year: number; type: string };
const PUBS: Pub[] = [
  { id: "p1", title: "The Orchard in Winter", venue: "The Ninth Meridian", year: 2024, type: "Short fiction" },
  { id: "p2", title: "What the Tide Withholds", venue: "Field & Lantern Review", year: 2023, type: "Essay" },
  { id: "p3", title: "Inventory of a Small House", venue: "Marrow Quarterly", year: 2023, type: "Poetry" },
  { id: "p4", title: "A Letter to the Next Tenant", venue: "The Ninth Meridian", year: 2021, type: "Short fiction" },
  { id: "p5", title: "On Reading Slowly", venue: "Field & Lantern Review", year: 2020, type: "Essay" },
  { id: "p6", title: "Salt Hymn", venue: "Marrow Quarterly", year: 2019, type: "Poetry" },
];
const PUB_TYPES = ["All", "Short fiction", "Essay", "Poetry"];

const REVIEWS = [
  { q: "Quiet, exact, and quietly devastating.", s: "Sample review of The Quiet Orchard" },
  { q: "A prose style so patient it feels like being told a secret.", s: "Sample review of A Season of Salt" },
  { q: "These stories do not shout. They wait, and then they stay with you.", s: "Sample review of Small Weather" },
  { q: "Lowe writes the kind of sentence you read twice, on purpose.", s: "Sample review of The Quiet Orchard" },
];

type Ev = { id: string; mon: string; day: string; title: string; place: string; type: string };
const EVENTS: Ev[] = [
  { id: "e1", mon: "Mar", day: "14", title: "An Evening of Readings", place: "Marlow Library (fictional venue)", type: "Reading" },
  { id: "e2", mon: "Apr", day: "02", title: "In Conversation: Writing the Ordinary", place: "Harbour Books (fictional venue)", type: "Conversation" },
  { id: "e3", mon: "Apr", day: "26", title: "Slow Fiction Workshop", place: "The Lantern Room (fictional venue)", type: "Workshop" },
  { id: "e4", mon: "May", day: "09", title: "Orchard Notes: A Reading", place: "Elm Street Theatre (fictional venue)", type: "Reading" },
];
const EV_TYPES = ["All", "Reading", "Conversation", "Workshop"];

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return <h2 id={id} className="font-serif text-4xl font-medium leading-tight sm:text-5xl">{children}</h2>;
}
function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-[#2f3b34]">{children}</p>;
}

function LiteraryDemo() {
  const [menu, setMenu] = useState(false);
  const [pubType, setPubType] = useState("All");
  const [evType, setEvType] = useState("All");
  const [rev, setRev] = useState(0);
  const [note, setNote] = useState("");
  const pubs = PUBS.filter((p) => pubType === "All" || p.type === pubType);
  const events = EVENTS.filter((e) => evType === "All" || e.type === evType);
  const buy = (r: string) => { setNote(`Demo: on a live site this opens ${r} with your book's real link.`); trackEvent("showcase_sample_buy", { sample: "literary", retailer: r }); };

  return (
    <div className="min-h-screen bg-[#f6f1e7] font-sans text-[#1d1b18]">
      <a href="#s2-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>

      {/* Literarymarketing demo bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#1d1b18] px-4 py-2 text-xs text-[#f6f1e7]">
        <Link to="/author-website-showcase" activeOptions={{ exact: true }} className="inline-flex min-h-11 items-center gap-1 font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the Literarymarketing showcase</Link>
        <span>Sample 02 of Literarymarketing's Author Website Showcase. Fictional author and content.</span>
        <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "sample02_build" })} className="inline-flex min-h-11 items-center bg-[#f6f1e7] px-4 font-semibold text-[#1d1b18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Build My Author Website</a>
      </div>

      <div className="mx-auto max-w-6xl px-5 lg:grid lg:grid-cols-[13rem_1fr] lg:gap-20">
        {/* Left rail (desktop) / header (mobile) */}
        <header className="flex flex-wrap items-center justify-between py-5 lg:sticky lg:top-0 lg:block lg:h-screen lg:self-start lg:py-14">
          <a href="#s2-main" className={cn("font-serif text-3xl font-medium tracking-wide", FOCUS)}>Imani Lowe</a>
          <p className="hidden text-sm text-[#5b564d] lg:mt-2 lg:block">Novelist and essayist</p>
          <button type="button" className={cn("grid h-11 w-11 place-items-center lg:hidden", FOCUS)} aria-expanded={menu} aria-controls="s2-nav" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu(!menu)}>
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <nav id="s2-nav" aria-label="Sample site" className={cn("w-full lg:mt-12 lg:block", menu ? "block" : "hidden")}>
            <ul className="grid gap-0 lg:gap-1">
              {NAV.map(([l, id]) => (
                <li key={id}><a href={`#${id}`} onClick={() => setMenu(false)} className={cn("flex min-h-11 items-center text-lg text-[#3d3a34] hover:text-[#1d1b18] lg:text-base", FOCUS)}>{l}</a></li>
              ))}
            </ul>
          </nav>
        </header>

        <main id="s2-main" tabIndex={-1} className="outline-none">
          {/* Hero */}
          <section aria-labelledby="s2-hero" className="py-16 lg:py-24">
            <Eyebrow>New novel</Eyebrow>
            <Reveal>
              <h1 id="s2-hero" className="max-w-3xl font-serif text-5xl font-medium italic leading-[1.05] sm:text-7xl">Fiction for the slow hours.</h1>
            </Reveal>
            <div className="mt-12 grid items-end gap-10 md:grid-cols-[0.6fr_1fr]">
              <Reveal delay={0.1}>
                <div className="mx-auto w-52 sm:w-60"><Tilt max={5}><BookCover title="The Quiet Orchard" author="Imani Lowe" from="#2f3b34" to="#a8b5a0" tag="A Novel" className="shadow-[0_30px_60px_-25px_rgba(29,27,24,0.55)]" /></Tilt></div>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="max-w-md text-lg leading-relaxed text-[#3d3a34]">The Quiet Orchard follows three generations of a family who keep an orchard, and a silence, alive. It is a book about what we inherit without being told.</p>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-1">
                  <a href="#s2-books" className={cn("inline-flex min-h-11 items-center text-lg", LINK)}>Read an excerpt</a>
                  <a href="#s2-books" className={cn("inline-flex min-h-11 items-center text-lg", LINK)}>Where to buy</a>
                </div>
                <p className="mt-2 text-xs text-[#5b564d]">Fictional author and book created for this demonstration.</p>
              </Reveal>
            </div>
          </section>

          <hr className="border-[#1d1b18]/15" />

          {/* About */}
          <section id="s2-about" aria-labelledby="s2-about-h" className="scroll-mt-6 py-20">
            <div className="grid gap-10 md:grid-cols-[0.45fr_1fr]">
              <Reveal>
                <svg role="img" aria-label="Illustrative author portrait (not a real person)" viewBox="0 0 200 240" className="mx-auto w-44 md:w-full md:max-w-[14rem]">
                  <rect width="200" height="240" fill="#e9e1d0" />
                  <circle cx="100" cy="96" r="40" fill="none" stroke="#2f3b34" strokeWidth="2" />
                  <path d="M28 240c0-56 33-86 72-86s72 30 72 86" fill="none" stroke="#2f3b34" strokeWidth="2" />
                  <path d="M70 86c10-26 50-30 62-2" fill="none" stroke="#2f3b34" strokeWidth="2" />
                </svg>
              </Reveal>
              <Reveal delay={0.1}>
                <Eyebrow>About</Eyebrow>
                <H2 id="s2-about-h">Writing about the things people do not say.</H2>
                <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#3d3a34]">Imani Lowe writes novels and essays about families, houses and the long afterlife of small decisions. Her fiction has appeared in literary magazines and has been read aloud in libraries, bookshops and kitchens.</p>
                <p className="mt-4 max-w-xl text-lg leading-relaxed text-[#3d3a34]">She teaches slow-reading workshops and lives somewhere with a very old tree.</p>
                <p className="mt-3 text-xs text-[#5b564d]">Fictional biography written for this demonstration.</p>
              </Reveal>
            </div>
          </section>

          <hr className="border-[#1d1b18]/15" />

          {/* Books */}
          <section id="s2-books" aria-labelledby="s2-books-h" className="scroll-mt-6 py-20">
            <Eyebrow>The books</Eyebrow>
            <H2 id="s2-books-h">Novels and stories</H2>
            <div className="mt-12 grid gap-16">
              {BOOKS.map((b, i) => (
                <Reveal key={b.id}>
                  <article aria-labelledby={`s2-${b.id}`} className="grid gap-8 md:grid-cols-[11rem_1fr]">
                    <div className={cn("mx-auto w-40 md:w-full", i % 2 && "md:order-2")}><BookCover title={b.title} author="Imani Lowe" from={b.from} to={b.to} tag={b.kind === "Stories" ? "Stories" : "A Novel"} /></div>
                    <div className={cn(i % 2 && "md:order-1")}>
                      <p className="text-xs uppercase tracking-[0.24em] text-[#5b564d]">{b.kind} · {b.year} (sample)</p>
                      <h3 id={`s2-${b.id}`} className="mt-1 font-serif text-3xl font-medium">{b.title}</h3>
                      <p className="mt-3 max-w-xl text-[#3d3a34]">{b.blurb}</p>
                      <details className="mt-4 max-w-xl border-l-2 border-[#2f3b34]/40 pl-4">
                        <summary className={cn("flex min-h-11 cursor-pointer items-center text-[#2f3b34]", FOCUS)}>Read an excerpt</summary>
                        <p className="mt-2 font-serif text-xl italic leading-relaxed">{b.excerpt}</p>
                        <p className="mt-2 text-xs text-[#5b564d]">Original sample text written for this demo.</p>
                      </details>
                      <div className="mt-4 flex flex-wrap gap-x-5" role="group" aria-label={`Where to buy ${b.title}`}>
                        {RETAILERS.map((r) => <button key={r} type="button" onClick={() => buy(r)} className={cn("min-h-11 text-sm", LINK)}>{r}</button>)}
                      </div>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <p role="status" className="mt-8 min-h-6 text-sm text-[#5b564d]">{note}</p>
          </section>

          <hr className="border-[#1d1b18]/15" />

          {/* Selected publications */}
          <section id="s2-pubs" aria-labelledby="s2-pubs-h" className="scroll-mt-6 py-20">
            <Eyebrow>Selected publications</Eyebrow>
            <H2 id="s2-pubs-h">In magazines and journals</H2>
            <p className="mt-2 text-sm text-[#5b564d]">Fictional publications for demonstration.</p>
            <div role="group" aria-label="Filter publications by type" className="mt-6 flex flex-wrap gap-x-5">
              {PUB_TYPES.map((t) => <button key={t} type="button" aria-pressed={pubType === t} onClick={() => { setPubType(t); trackEvent("showcase_sample_filter", { sample: "literary", pub: t }); }} className={CHIP(pubType === t)}>{t}</button>)}
            </div>
            <p className="mt-3 text-sm text-[#5b564d]" aria-live="polite">Showing {pubs.length} of {PUBS.length}.</p>
            <ul className="mt-4 divide-y divide-[#1d1b18]/15 border-y border-[#1d1b18]/15">
              {pubs.map((p) => (
                <li key={p.id} className="grid gap-1 py-4 sm:grid-cols-[4rem_1fr_auto] sm:items-baseline sm:gap-6">
                  <span className="text-sm text-[#5b564d]">{p.year}</span>
                  <span><span className="font-serif text-xl">{p.title}</span> <span className="text-[#5b564d]">in {p.venue}</span></span>
                  <span className="text-xs uppercase tracking-[0.2em] text-[#2f3b34]">{p.type}</span>
                </li>
              ))}
            </ul>
          </section>

          <hr className="border-[#1d1b18]/15" />

          {/* Reviews */}
          <section id="s2-reviews" aria-labelledby="s2-reviews-h" className="scroll-mt-6 py-20">
            <Eyebrow>Reviews</Eyebrow>
            <H2 id="s2-reviews-h">What readers and critics say</H2>
            <p className="mt-2 text-sm text-[#5b564d]">Illustrative sample reviews. They are not real endorsements.</p>
            <div role="group" aria-roledescription="carousel" aria-label="Reviews" className="mt-10 max-w-2xl">
              <figure aria-live="polite" className="min-h-40">
                <blockquote className="font-serif text-3xl font-medium italic leading-snug sm:text-4xl">“{REVIEWS[rev]!.q}”</blockquote>
                <figcaption className="mt-4 text-xs uppercase tracking-[0.22em] text-[#5b564d]">{REVIEWS[rev]!.s}</figcaption>
              </figure>
              <div className="mt-6 flex items-center gap-3">
                <button type="button" aria-label="Previous review" onClick={() => setRev((rev + REVIEWS.length - 1) % REVIEWS.length)} className={cn("grid h-11 w-11 place-items-center border border-[#1d1b18]/30 hover:bg-[#1d1b18]/5", FOCUS)}><ChevronLeft className="h-5 w-5" /></button>
                <span className="text-sm text-[#5b564d]">{rev + 1} / {REVIEWS.length}</span>
                <button type="button" aria-label="Next review" onClick={() => setRev((rev + 1) % REVIEWS.length)} className={cn("grid h-11 w-11 place-items-center border border-[#1d1b18]/30 hover:bg-[#1d1b18]/5", FOCUS)}><ChevronRight className="h-5 w-5" /></button>
              </div>
            </div>
          </section>

          <hr className="border-[#1d1b18]/15" />

          {/* Events */}
          <section id="s2-events" aria-labelledby="s2-events-h" className="scroll-mt-6 py-20">
            <Eyebrow>Events</Eyebrow>
            <H2 id="s2-events-h">Readings and conversations</H2>
            <p className="mt-2 text-sm text-[#5b564d]">Sample dates and fictional venues for demonstration.</p>
            <div role="group" aria-label="Filter events by type" className="mt-6 flex flex-wrap gap-x-5">
              {EV_TYPES.map((t) => <button key={t} type="button" aria-pressed={evType === t} onClick={() => { setEvType(t); trackEvent("showcase_sample_filter", { sample: "literary", event: t }); }} className={CHIP(evType === t)}>{t}</button>)}
            </div>
            <ul className="mt-4 divide-y divide-[#1d1b18]/15 border-y border-[#1d1b18]/15">
              {events.map((e) => (
                <li key={e.id} className="grid grid-cols-[4rem_1fr] items-center gap-5 py-5">
                  <span className="text-center"><span className="block font-serif text-3xl leading-none">{e.day}</span><span className="text-xs uppercase tracking-[0.2em] text-[#5b564d]">{e.mon}</span></span>
                  <span><span className="block font-serif text-xl">{e.title}</span><span className="text-sm text-[#5b564d]">{e.place} · {e.type}</span></span>
                </li>
              ))}
            </ul>
            {events.length === 0 && <p className="mt-4 text-[#5b564d]">No events of that type right now.</p>}
          </section>

          <hr className="border-[#1d1b18]/15" />

          {/* Newsletter */}
          <section id="s2-letters" aria-labelledby="s2-letters-h" className="scroll-mt-6 py-20">
            <Eyebrow>Letters</Eyebrow>
            <H2 id="s2-letters-h">An occasional letter</H2>
            <p className="mt-3 max-w-xl text-lg text-[#3d3a34]">Notes on reading, writing and new work, a few times a year. Nothing more.</p>
            <NewsletterDemo className="mt-6 max-w-xl" inputClass={cn("border-0 border-b border-[#1d1b18]/50 bg-transparent px-0 text-[#1d1b18] placeholder:text-[#5b564d]", FOCUS)} buttonClass={cn("border border-[#1d1b18] px-6 text-sm tracking-wide hover:bg-[#1d1b18] hover:text-[#f6f1e7]", FOCUS)} />
          </section>
        </main>
      </div>

      {/* Agency call to action */}
      <section aria-label="Build a site like this" className="bg-[#2f3b34] px-5 py-16 text-center text-[#f6f1e7]">
        <p className="font-serif text-3xl font-medium sm:text-4xl">Want a quiet, beautiful website for your books?</p>
        <p className="mx-auto mt-2 max-w-xl text-[#f6f1e7]/85">Literary Marketing designs and builds author websites that let the writing lead.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "sample02_request" })} className="inline-flex min-h-11 items-center bg-[#f6f1e7] px-6 text-sm font-semibold text-[#1d1b18] focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">Request this style</a>
          <Link to="/author-website-showcase" activeOptions={{ exact: true }} className="inline-flex min-h-11 items-center border border-[#f6f1e7]/60 px-6 text-sm font-semibold hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white">See more designs</Link>
        </div>
      </section>

      <footer className="px-5 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 md:flex-row md:justify-between">
          <div>
            <p className="font-serif text-xl">Imani Lowe</p>
            <p className="mt-1 text-sm text-[#5b564d]">Sample social handles (not real): @imanilowewrites</p>
          </div>
          <nav aria-label="Sample footer" className="flex flex-wrap gap-x-6">
            {NAV.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("flex min-h-11 items-center text-sm text-[#3d3a34] hover:text-[#1d1b18]", FOCUS)}>{l}</a>)}
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-xs text-[#5b564d]">Demonstration concept by Literary Marketing. All authors, titles, reviews, publications, events and venues are fictional.</p>
      </footer>
    </div>
  );
}
