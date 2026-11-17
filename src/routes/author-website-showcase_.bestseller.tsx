import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, Menu, Play, X } from "lucide-react";
import { Reveal, Tilt } from "@/components/site/primitives";
import { BookCover } from "@/components/showcase/BookCover";
import { NewsletterDemo } from "@/components/showcase/NewsletterDemo";
import { INDEXABLE, SITE_ORIGIN } from "@/data/showcase";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const TITLE = "Bestseller Author Website concept | Literary Marketing";
const DESC = "A working demo of a bold website for a bestselling commercial fiction author, with fictional content. Built by Literary Marketing.";
const URL = `${SITE_ORIGIN}/author-website-showcase/bestseller`;

export const Route = createFileRoute("/author-website-showcase_/bestseller")({
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
  component: BestsellerDemo,
});

/* Sample 01 identity: ink black, signal red, warm cream. Separate from the Literarymarketing gold theme. */
const RED = "bg-[#e5322d] text-white hover:bg-[#ff4a44]";
const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5322d]";
const BTN = cn("inline-flex min-h-11 items-center justify-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider transition-colors", FOCUS);
const RETAILERS = ["Amazon", "Barnes & Noble", "Apple Books", "Bookshop.org"];

const LATEST = { title: "Ninety Days to Midnight", author: "Dane Corvin", from: "#7a0f14", to: "#e5322d" };

type Book = { id: string; title: string; series: string; n?: number; year: number; from: string; to: string; blurb: string };
const BOOKS: Book[] = [
  { id: "b1", title: "Cold Harbor Rising", series: "The Harbor Line", n: 1, year: 2019, from: "#0f2a3d", to: "#2e86c1", blurb: "A new inspector finds a body that should not exist." },
  { id: "b2", title: "The Salt Ledger", series: "The Harbor Line", n: 2, year: 2020, from: "#2b2b2b", to: "#8c8c8c", blurb: "A ledger of ships that never docked." },
  { id: "b3", title: "Dead Reckoning at Dusk", series: "The Harbor Line", n: 3, year: 2022, from: "#3b1a4a", to: "#a855f7", blurb: "One night, three suspects, no alibis." },
  { id: "b4", title: "Lowtide Protocol", series: "The Harbor Line", n: 4, year: 2023, from: "#124034", to: "#34d399", blurb: "When the water drops, the secrets surface." },
  { id: "b5", title: "Ninety Days to Midnight", series: "The Harbor Line", n: 5, year: 2026, from: "#7a0f14", to: "#e5322d", blurb: "The ledger is back, and so is the clock." },
  { id: "b6", title: "The Quiet Passenger", series: "Standalone", year: 2021, from: "#4a3410", to: "#f59e0b", blurb: "A night train. A stranger who knows your name." },
  { id: "b7", title: "Glass House Rules", series: "Standalone", year: 2024, from: "#1f2937", to: "#60a5fa", blurb: "Everyone on the street is watching someone." },
  { id: "b8", title: "Last Light Motel", series: "Standalone", year: 2025, from: "#4a1230", to: "#f472b6", blurb: "Check in anytime. Leaving is the hard part." },
];

const REVIEWS = [
  "I read it in one sitting and then checked the locks.",
  "Tight plotting and a lead you will follow anywhere.",
  "The ending lands like a door slamming in a quiet house.",
];

const PRESS = ["Northgate Courier", "Parallax Weekly", "Tidewater Radio Hour", "The Lantern Podcast"];

const LINKS = [["Latest", "s1-latest"], ["Books", "s1-books"], ["Reviews", "s1-reviews"], ["Media", "s1-media"], ["Newsletter", "s1-news"]] as const;

function Heading({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 id={id} className="font-serif text-3xl font-bold uppercase tracking-tight sm:text-5xl">{children}</h2>;
}

function BestsellerDemo() {
  const reduce = useReducedMotion();
  const dialog = useRef<HTMLDialogElement>(null);
  const [menu, setMenu] = useState(false);
  const [series, setSeries] = useState("All");
  const [note, setNote] = useState("");
  const seriesList = ["All", ...Array.from(new Set(BOOKS.map((b) => b.series)))];
  const shown = BOOKS.filter((b) => series === "All" || b.series === series);

  const buy = (r: string) => { setNote(`Demo: on a live site this button opens ${r} with your book's real link.`); trackEvent("showcase_sample_buy", { sample: "bestseller", retailer: r }); };
  const openTrailer = () => { dialog.current?.showModal(); trackEvent("showcase_sample_trailer", { sample: "bestseller" }); };

  return (
    <div className="min-h-screen bg-[#0a0a0f] font-sans text-[#f3efe6]">
      <a href="#s1-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>

      {/* Literarymarketing demo bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#f3efe6] px-4 py-2 text-xs text-[#0a0a0f]">
        <Link to="/author-website-showcase" className={cn("inline-flex min-h-11 items-center gap-1 font-semibold underline", FOCUS)}><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the Literarymarketing showcase</Link>
        <span>Sample 01 of Literarymarketing's Author Website Showcase. Fictional author and content.</span>
        <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "sample01_build" })} className={cn("inline-flex min-h-11 items-center bg-[#0a0a0f] px-4 font-semibold text-white", FOCUS)}>Build My Author Website</a>
      </div>

      {/* Site navigation */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0a0a0f]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <a href="#s1-main" className={cn("font-serif text-xl font-bold uppercase tracking-[0.2em]", FOCUS)}>Dane Corvin</a>
          <nav aria-label="Sample site" className="hidden items-center gap-6 md:flex">
            {LINKS.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("text-sm uppercase tracking-wider text-[#f3efe6]/75 hover:text-white", FOCUS)}>{l}</a>)}
          </nav>
          <button type="button" className={cn("grid h-11 w-11 place-items-center md:hidden", FOCUS)} aria-expanded={menu} aria-controls="s1-menu" aria-label={menu ? "Close menu" : "Open menu"} onClick={() => setMenu(!menu)}>
            {menu ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
        {menu && (
          <nav id="s1-menu" aria-label="Sample site mobile" className="border-t border-white/10 px-4 pb-4 md:hidden">
            {LINKS.map(([l, id]) => <a key={id} href={`#${id}`} onClick={() => setMenu(false)} className={cn("flex min-h-11 items-center border-b border-white/10 text-lg uppercase tracking-wider", FOCUS)}>{l}</a>)}
          </nav>
        )}
      </header>

      <main id="s1-main" tabIndex={-1} className="outline-none">
        {/* Hero */}
        <section aria-labelledby="s1-hero" className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-[#e5322d]/25 blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 md:grid-cols-[1fr_0.8fr] md:py-24">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-[#e5322d]">The new Harbor Line thriller</p>
              <motion.h1 id="s1-hero" className="mt-3 font-serif text-5xl font-bold uppercase leading-[0.95] sm:text-7xl" initial={reduce ? false : { opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
                Ninety Days <span className="text-[#e5322d]">to Midnight</span>
              </motion.h1>
              <p className="mt-5 max-w-xl text-lg text-[#f3efe6]/80">A harbor inspector finds a ledger that lists ships before they dock. She has ninety days to learn who wrote it, and who is next.</p>
              <div className="mt-7 flex flex-wrap gap-2" role="group" aria-label="Buy the book">
                {RETAILERS.map((r, i) => <button key={r} type="button" onClick={() => buy(r)} className={cn(BTN, i === 0 ? RED : "border border-white/30 hover:bg-white/10")}>{r}</button>)}
              </div>
              <p role="status" className="mt-3 min-h-6 text-sm text-[#f3efe6]/70">{note}</p>
              <button type="button" onClick={openTrailer} className={cn(BTN, "mt-2 border border-white/30 hover:bg-white/10")}><Play className="h-4 w-4" aria-hidden="true" /> Watch the trailer</button>
            </div>
            <motion.div className="mx-auto w-64 sm:w-72" initial={reduce ? false : { opacity: 0, y: 40, rotate: -3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
              <Tilt max={8}><BookCover {...LATEST} tag="A Harbor Line Thriller" className="shadow-[0_30px_80px_-20px_rgba(229,50,45,0.6)]" /></Tilt>
            </motion.div>
          </div>
        </section>

        {/* Author */}
        <section aria-labelledby="s1-about" className="border-y border-white/10 bg-[#14141c]">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-16 md:grid-cols-[0.5fr_1fr]">
            <Reveal>
              <svg role="img" aria-label="Illustrative author portrait (not a real person)" viewBox="0 0 200 240" className="mx-auto w-48 rounded-2xl border border-white/10 md:w-full md:max-w-xs">
                <defs><linearGradient id="s1g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#2a2a38" /><stop offset="1" stopColor="#0f0f16" /></linearGradient></defs>
                <rect width="200" height="240" fill="url(#s1g)" />
                <circle cx="100" cy="92" r="38" fill="#f3efe6" opacity="0.85" />
                <path d="M30 240c0-52 31-80 70-80s70 28 70 80z" fill="#e5322d" opacity="0.9" />
              </svg>
            </Reveal>
            <Reveal delay={0.1}>
              <Heading id="s1-about">Meet Dane Corvin</Heading>
              <p className="mt-4 max-w-2xl text-lg text-[#f3efe6]/80">Dane writes fast, twisty thrillers about ordinary people who notice the wrong detail at the wrong time. Five Harbor Line novels and three standalones, each built to be read in one go.</p>
              <p className="mt-2 text-xs text-[#f3efe6]/50">Fictional author created for this demonstration.</p>
            </Reveal>
          </div>
        </section>

        {/* Latest release */}
        <section id="s1-latest" aria-labelledby="s1-latest-h" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
          <Reveal>
            <Heading id="s1-latest-h">Latest release</Heading>
            <div className="mt-8 grid gap-8 md:grid-cols-[0.4fr_1fr]">
              <div className="mx-auto w-48 md:w-full"><BookCover {...LATEST} tag="Book 5" /></div>
              <div>
                <h3 className="font-serif text-2xl font-bold">Ninety Days to Midnight</h3>
                <p className="text-sm text-[#f3efe6]/60">The Harbor Line, Book 5 (sample listing)</p>
                <p className="mt-4 max-w-2xl text-[#f3efe6]/85">The ledger Mara Quill buried is back on her desk, with a new page and tomorrow's date. Every entry so far has come true. The last one names her.</p>
                <details className="mt-5 border border-white/15 p-4">
                  <summary className={cn("flex min-h-11 cursor-pointer items-center font-bold uppercase tracking-wider", FOCUS)}>Read a sample</summary>
                  <p className="mt-3 font-serif text-lg italic text-[#f3efe6]/85">The harbor bell rang eleven times, and Mara counted twelve. She did not look up from the ledger. Somewhere below, a ship that did not exist was asking permission to dock.</p>
                  <p className="mt-2 text-xs text-[#f3efe6]/50">Original sample text written for this demo.</p>
                </details>
              </div>
            </div>
          </Reveal>
        </section>

        {/* Reviews */}
        <section id="s1-reviews" aria-labelledby="s1-reviews-h" className="scroll-mt-24 border-y border-white/10 bg-[#14141c]">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <Heading id="s1-reviews-h">What readers say</Heading>
            <p className="mt-2 text-sm text-[#e5322d]">Illustrative sample reviews. They are not real endorsements.</p>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {REVIEWS.map((q, i) => (
                <Reveal key={q} delay={i * 0.08}>
                  <figure className="h-full border border-white/10 p-6">
                    <blockquote className="font-serif text-xl leading-snug">“{q}”</blockquote>
                    <figcaption className="mt-4 text-xs uppercase tracking-widest text-[#f3efe6]/55">Sample reviewer</figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Backlist */}
        <section id="s1-books" aria-labelledby="s1-books-h" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20">
          <Heading id="s1-books-h">The books</Heading>
          <div role="group" aria-label="Filter books by series" className="mt-6 flex flex-wrap gap-2">
            {seriesList.map((s) => (
              <button key={s} type="button" aria-pressed={series === s} onClick={() => { setSeries(s); trackEvent("showcase_sample_filter", { sample: "bestseller", series: s }); }} className={cn("min-h-11 border px-4 text-sm font-bold uppercase tracking-wider", FOCUS, series === s ? "border-[#e5322d] bg-[#e5322d] text-white" : "border-white/25 hover:bg-white/10")}>{s}</button>
            ))}
          </div>
          <p className="mt-3 text-sm text-[#f3efe6]/60" aria-live="polite">Showing {shown.length} book{shown.length === 1 ? "" : "s"}. Titles and years are fictional.</p>
          <ul className="mt-6 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
            {shown.map((b) => (
              <li key={b.id}>
                <Tilt max={6}><BookCover title={b.title} author="Dane Corvin" from={b.from} to={b.to} tag={b.n ? `Harbor Line ${b.n}` : "A Novel"} /></Tilt>
                <p className="mt-3 font-semibold">{b.title}</p>
                <p className="text-sm text-[#f3efe6]/60">{b.series}{b.n ? ` #${b.n}` : ""} · {b.year}</p>
                <p className="mt-1 text-sm text-[#f3efe6]/75">{b.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Media */}
        <section id="s1-media" aria-labelledby="s1-media-h" className="scroll-mt-24 border-y border-white/10 bg-[#14141c]">
          <div className="mx-auto max-w-6xl px-4 py-20">
            <Heading id="s1-media-h">In the media</Heading>
            <p className="mt-2 text-sm text-[#e5322d]">Fictional outlets used for demonstration only.</p>
            <ul className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
              {PRESS.map((p) => <li key={p} className="border border-white/10 p-5 text-center font-serif text-lg italic">{p}</li>)}
            </ul>
          </div>
        </section>

        {/* Newsletter */}
        <section id="s1-news" aria-labelledby="s1-news-h" className="mx-auto max-w-3xl scroll-mt-24 px-4 py-20 text-center">
          <Heading id="s1-news-h">Get the next chapter first</Heading>
          <p className="mt-3 text-[#f3efe6]/75">Join the list for release news and a free short story.</p>
          <NewsletterDemo className="mx-auto mt-6 max-w-xl text-left" inputClass={cn("border border-white/25 bg-transparent px-4 text-[#f3efe6] placeholder:text-[#f3efe6]/40", FOCUS)} buttonClass={cn(BTN, RED)} />
        </section>

        {/* Agency call to action */}
        <section aria-label="Build a site like this" className="bg-[#f3efe6] px-4 py-14 text-center text-[#0a0a0f]">
          <p className="font-serif text-3xl font-bold sm:text-4xl">Want a website like this for your book?</p>
          <p className="mx-auto mt-2 max-w-xl">Literary Marketing designs and builds author websites that put your book first.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "sample01_request" })} className={cn(BTN, "bg-[#0a0a0f] text-white hover:bg-black")}>Request this style</a>
            <Link to="/author-website-showcase" className={cn(BTN, "border border-[#0a0a0f]/40 hover:bg-black/5")}>See more designs</Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-4 py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:justify-between">
          <div>
            <p className="font-serif text-xl font-bold uppercase tracking-[0.2em]">Dane Corvin</p>
            <p className="mt-1 text-sm text-[#f3efe6]/60">Sample social handles (not real): @danecorvin</p>
          </div>
          <nav aria-label="Sample footer" className="flex flex-wrap gap-x-6">
            {LINKS.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("flex min-h-11 items-center text-sm uppercase tracking-wider text-[#f3efe6]/70 hover:text-white", FOCUS)}>{l}</a>)}
          </nav>
        </div>
        <p className="mx-auto mt-6 max-w-6xl text-xs text-[#f3efe6]/45">Demonstration concept by Literary Marketing. All authors, titles, reviews and outlets are fictional.</p>
      </footer>

      {/* Trailer preview dialog */}
      <dialog ref={dialog} aria-labelledby="s1-trailer-h" onClick={(e) => { if (e.target === dialog.current) dialog.current?.close(); }} className="m-auto w-[min(92vw,56rem)] border border-white/20 bg-[#0a0a0f] p-0 text-[#f3efe6] backdrop:bg-black/80">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <h2 id="s1-trailer-h" className="font-serif text-lg font-bold">Book trailer preview</h2>
          <button type="button" autoFocus onClick={() => dialog.current?.close()} className={cn("grid h-11 w-11 place-items-center", FOCUS)} aria-label="Close trailer"><X className="h-5 w-5" /></button>
        </div>
        <div className="grid aspect-video place-items-center bg-gradient-to-br from-[#7a0f14] to-[#0a0a0f] p-6 text-center">
          <div>
            <Play className="mx-auto h-14 w-14 motion-safe:animate-pulse" aria-hidden="true" />
            <p className="mt-3 font-serif text-2xl font-bold uppercase">Ninety Days to Midnight</p>
            <p className="mt-2 text-sm text-[#f3efe6]/75">Trailer slot. On a live site your real YouTube or Vimeo trailer plays here.</p>
          </div>
        </div>
      </dialog>
    </div>
  );
}
