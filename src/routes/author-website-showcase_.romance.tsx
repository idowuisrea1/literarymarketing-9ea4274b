import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Heart } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import { BookMockup, CoverArt, Portrait, type Motif, type Palette } from "@/components/showcase/art";
import { AgencyCta, BuyRow, DemoBar, sampleHead } from "@/components/showcase/shell";
import { NewsletterDemo } from "@/components/showcase/NewsletterDemo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/author-website-showcase_/romance")({
  head: sampleHead("romance", "Romance Author Website concept", "A working demo of a warm, expressive romance author website with a featured series, character cards and reader bonuses. Fictional content by Literary Marketing."),
  component: RomanceDemo,
});

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c2417a]";
const PILL = cn("inline-flex min-h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition-transform hover:scale-[1.03]", FOCUS);
const NAV = [["The series", "s3-series"], ["Characters", "s3-people"], ["Reader bonuses", "s3-bonus"], ["Love notes", "s3-love"], ["Garden club", "s3-club"]] as const;

type Book = { id: string; title: string; motif: Motif; palette: Palette; tropes: string[]; blurb: string };
const BOOKS: Book[] = [
  { id: "b1", title: "Summer at Larkspur", motif: "bloom", palette: ["#4a0f2e", "#c2417a", "#ffd6e4", "#ffffff"], tropes: ["Small town", "Second chance"], blurb: "Juniper swore she would never come home. Then her grandmother's flower shop needed saving, and so did she." },
  { id: "b2", title: "Winter in Larkspur", motif: "orchard", palette: ["#1c2b4a", "#5b7fb5", "#e6f0ff", "#ffffff"], tropes: ["Slow burn", "Snowed in"], blurb: "One blizzard, one closed road, and a carpenter who has been quietly in love with her for six winters." },
  { id: "b3", title: "Letters to Larkspur", motif: "river", palette: ["#3b2433", "#a8576f", "#ffe1cf", "#ffffff"], tropes: ["Second chance", "Pen pals"], blurb: "Twelve unsent letters. One very curious postmistress. A love story told in the margins." },
  { id: "b4", title: "The Last Dance at Larkspur", motif: "deco", palette: ["#2a1230", "#8a3a7d", "#ffd9a0", "#ffffff"], tropes: ["Slow burn", "Grumpy and sunshine"], blurb: "The festival committee needs a miracle. The town's grumpiest man needs a dance partner." },
];
const TROPES = ["All", "Small town", "Second chance", "Slow burn"];

const PEOPLE = [
  { name: "Juniper Hale", role: "The florist who came home", skin: "#e0ac84", hair: "#6b3a24", style: "waves" as const, shirt: "#c2417a", glasses: false, beard: false, bg: ["#ffe3ea", "#ffc2d4"] as [string, string] },
  { name: "Callum Reyes", role: "The carpenter who stayed", skin: "#b97b56", hair: "#1f1510", style: "short" as const, shirt: "#3a5a40", glasses: false, beard: true, bg: ["#fff0d6", "#ffd9a0"] as [string, string] },
  { name: "Marguerite Bloom", role: "The town's matchmaker", skin: "#8a5a3c", hair: "#e8e8e8", style: "curly" as const, shirt: "#7a3a8a", glasses: true, beard: false, bg: ["#efe0ff", "#d8b8f5"] as [string, string] },
];

const LOVE = [
  "I stayed up until 3 a.m. and regret nothing.",
  "The kind of town you want to move into.",
  "Swoony, funny and so full of heart.",
];

function RomanceDemo() {
  const [trope, setTrope] = useState("All");
  const [bonus, setBonus] = useState<string | null>(null);
  const books = BOOKS.filter((b) => trope === "All" || b.tropes.includes(trope));
  return (
    <div className="min-h-screen bg-[#fff6f3] font-sans text-[#3a1f2b]">
      <a href="#s3-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <DemoBar n="03" className="bg-[#3a1f2b] text-[#fff6f3]" btnClass="rounded-full bg-[#ffd6e4] text-[#3a1f2b]" />

      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
        <a href="#s3-main" className={cn("font-serif text-3xl font-semibold italic text-[#c2417a]", FOCUS)}>Nell Hartley</a>
        <nav aria-label="Sample site" className="flex flex-wrap gap-x-5">
          {NAV.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("flex min-h-11 items-center text-sm font-medium hover:text-[#c2417a]", FOCUS)}>{l}</a>)}
        </nav>
      </header>

      <main id="s3-main" tabIndex={-1} className="outline-none">
        <section aria-labelledby="s3-hero" className="relative overflow-hidden">
          <div aria-hidden="true" className="absolute -left-24 top-10 h-96 w-96 rounded-full bg-[#ffd6e4] blur-3xl" />
          <div aria-hidden="true" className="absolute -right-20 bottom-0 h-96 w-96 rounded-full bg-[#ffe9c9] blur-3xl" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-2 md:py-24">
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#c2417a]"><Heart className="h-3.5 w-3.5" aria-hidden="true" /> The Larkspur Series</p>
              <h1 id="s3-hero" className="font-serif text-5xl font-semibold italic leading-[1.02] sm:text-7xl">Small towns. Big feelings. Happily ever after.</h1>
              <p className="mt-5 max-w-lg text-lg text-[#5a3a47]">Four swoony, funny, heart-on-sleeve romances set in one very nosy little town. Start anywhere. Fall for everyone.</p>
              <div className="mt-6"><BuyRow sample="romance" primaryClass={cn(PILL, "bg-[#c2417a] text-white hover:bg-[#a8336a]")} btnClass={cn(PILL, "border border-[#c2417a] text-[#c2417a] hover:bg-[#ffe3ea]")} noteClass="text-[#5a3a47]" /></div>
              <p className="text-xs text-[#5a3a47]">Fictional author and books created for this demonstration.</p>
            </div>
            <Reveal>
              <div className="relative mx-auto w-64 sm:w-72">
                <BookMockup tilt={-14}><CoverArt motif="bloom" title="Summer at Larkspur" author="Nell Hartley" tag="Book One" palette={BOOKS[0]!.palette} /></BookMockup>
                <span aria-hidden="true" className="absolute -right-6 -top-4 grid h-20 w-20 rotate-12 place-items-center rounded-full bg-[#ffd9a0] text-center text-[11px] font-bold uppercase leading-tight text-[#3a1f2b] shadow-lg">Book 1<br />of 4</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section id="s3-series" aria-labelledby="s3-series-h" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <h2 id="s3-series-h" className="font-serif text-4xl font-semibold italic sm:text-5xl">Meet the series</h2>
          <div role="group" aria-label="Filter by trope" className="mt-6 flex flex-wrap gap-2">
            {TROPES.map((t) => <button key={t} type="button" aria-pressed={trope === t} onClick={() => setTrope(t)} className={cn(PILL, "border", trope === t ? "border-[#c2417a] bg-[#c2417a] text-white" : "border-[#c2417a]/40 bg-white text-[#c2417a]")}>{t}</button>)}
          </div>
          <p className="mt-3 text-sm text-[#5a3a47]" aria-live="polite">Showing {books.length} of {BOOKS.length} books.</p>
          <ul className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((b) => (
              <li key={b.id} className="rounded-3xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(194,65,122,.6)]">
                <CoverArt motif={b.motif} title={b.title} author="Nell Hartley" tag="Larkspur" palette={b.palette} className="rounded-xl" />
                <p className="mt-3 font-serif text-xl font-semibold">{b.title}</p>
                <p className="mt-1 flex flex-wrap gap-1">{b.tropes.map((t) => <span key={t} className="rounded-full bg-[#ffe3ea] px-2 py-0.5 text-xs text-[#a8336a]">{t}</span>)}</p>
                <p className="mt-2 text-sm text-[#5a3a47]">{b.blurb}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="s3-people" aria-labelledby="s3-people-h" className="scroll-mt-6 bg-[#ffe9ee] px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 id="s3-people-h" className="font-serif text-4xl font-semibold italic sm:text-5xl">The people of Larkspur</h2>
            <p className="mt-2 text-sm text-[#5a3a47]">Illustrated character portraits created for this demo.</p>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {PEOPLE.map((p) => (
                <li key={p.name} className="overflow-hidden rounded-3xl bg-white shadow-md">
                  <Portrait name={p.name} skin={p.skin} hair={p.hair} style={p.style} shirt={p.shirt} glasses={p.glasses} beard={p.beard} bg={p.bg} />
                  <div className="p-4"><p className="font-serif text-2xl font-semibold">{p.name}</p><p className="text-sm text-[#5a3a47]">{p.role}</p></div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="s3-bonus" aria-labelledby="s3-bonus-h" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <h2 id="s3-bonus-h" className="font-serif text-4xl font-semibold italic sm:text-5xl">Reader bonuses</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[["Bonus epilogue", "Juniper and Callum, one year later."], ["Printable bookmarks", "Four hand-lettered designs."], ["The Larkspur playlist", "Songs the characters would play on repeat."]].map(([t, d]) => (
              <div key={t} className="rounded-3xl border border-[#c2417a]/25 bg-white p-6">
                <p className="font-serif text-2xl font-semibold">{t}</p>
                <p className="mt-1 text-sm text-[#5a3a47]">{d}</p>
                <button type="button" onClick={() => setBonus(t!)} className={cn(PILL, "mt-4 bg-[#c2417a] text-white")}>Unlock for free</button>
              </div>
            ))}
          </div>
          {bonus && <p role="status" className="mt-5 rounded-2xl bg-[#fff0d6] p-4 text-sm">Demo: "{bonus}" is unlocked after joining the Garden Club below. On a live site the download is sent to the reader's email.</p>}
        </section>

        <section id="s3-love" aria-labelledby="s3-love-h" className="scroll-mt-6 bg-[#3a1f2b] px-5 py-16 text-[#fff6f3]">
          <div className="mx-auto max-w-6xl">
            <h2 id="s3-love-h" className="font-serif text-4xl font-semibold italic sm:text-5xl">Love notes from readers</h2>
            <p className="mt-2 text-sm text-[#ffd6e4]">Illustrative sample reviews, not real endorsements.</p>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {LOVE.map((q) => <figure key={q} className="rounded-3xl bg-white/10 p-6"><p aria-label="Five out of five hearts" className="flex gap-1 text-[#ffd6e4]">{Array.from({ length: 5 }, (_, i) => <Heart key={i} className="h-4 w-4 fill-current" aria-hidden="true" />)}</p><blockquote className="mt-3 font-serif text-2xl italic">“{q}”</blockquote><figcaption className="mt-3 text-xs uppercase tracking-widest text-[#ffd6e4]">Sample reader</figcaption></figure>)}
            </div>
          </div>
        </section>

        <section id="s3-club" aria-labelledby="s3-club-h" className="mx-auto max-w-2xl scroll-mt-6 px-5 py-16 text-center">
          <h2 id="s3-club-h" className="font-serif text-4xl font-semibold italic sm:text-5xl">Join the Garden Club</h2>
          <p className="mt-3 text-[#5a3a47]">New releases, bonus scenes and cover reveals, straight to your inbox.</p>
          <NewsletterDemo className="mt-6 text-left" inputClass="rounded-full border border-[#c2417a]/40 bg-white px-5 text-[#3a1f2b]" buttonClass={cn(PILL, "bg-[#c2417a] text-white")} />
        </section>
      </main>

      <AgencyCta n="03" heading="Ready for a website your readers will swoon over?" className="bg-[#c2417a] text-white" btnClass="rounded-full bg-white text-[#3a1f2b]" ghostClass="rounded-full border border-white/70 hover:bg-white/10" />
      <footer className="px-5 py-8 text-center text-xs text-[#5a3a47]">Demonstration concept by Literary Marketing. All authors, titles, characters, reviews and artwork are fictional. Sample handle (not real): @nellhartleywrites</footer>
    </div>
  );
}
