import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/primitives";
import { BookMockup, CoverArt, Portrait } from "@/components/showcase/art";
import { AgencyCta, BuyRow, DemoBar, TrailerPanel, sampleHead } from "@/components/showcase/shell";
import { NewsletterDemo } from "@/components/showcase/NewsletterDemo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/author-website-showcase_/thriller")({
  head: sampleHead("thriller", "Thriller and Mystery Author Website concept", "A working demo of a suspenseful thriller author website with case files, a classified teaser and witness statements. Fictional content by Literary Marketing."),
  component: ThrillerDemo,
});

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f2c230]";
const NAV = [["Case files", "s5-cases"], ["The teaser", "s5-teaser"], ["Statements", "s5-stmts"], ["In the press", "s5-press"], ["The briefing", "s5-brief"]] as const;
const PAL: [string, string, string, string] = ["#0b0f13", "#26323c", "#b9c8d4", "#f2f6f9"];

const CASES = [
  { id: "c1", file: "CASE 001", title: "The Glass Alibi", motif: "glass" as const, pal: PAL, text: "Detective Mara Voss has a confession, a witness and a perfect alibi. Only one of them can be lying." },
  { id: "c2", file: "CASE 002", title: "Cold Light", motif: "harbor" as const, pal: ["#10141c", "#2a3a5a", "#9cc4ff", "#f2f6f9"] as [string, string, string, string], text: "A body in the harbor, a missing ledger, and a city that suddenly remembers nothing." },
  { id: "c3", file: "CASE 003", title: "Nine Silent Floors", motif: "steps" as const, pal: ["#150f10", "#4a2a2a", "#ff9a8a", "#f2f6f9"] as [string, string, string, string], text: "Nine floors, one elevator, and a tenant who vanished between the seventh and the eighth." },
];

const STMTS = ["I locked every door and I still looked over my shoulder.", "The twist is fair, and that is what makes it unbearable.", "Voss is the detective I did not know I was waiting for."];
const PRESS = [["The Night Edition", "Author interview"], ["Foxglove Radio", "Live conversation"], ["The Crime Shelf Podcast", "Episode guest"], ["Granite City Courier", "Feature profile"]];

function ThrillerDemo() {
  const [c, setC] = useState(CASES[0]!);
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#07090c] font-sans text-[#e8edf2]">
      <a href="#s5-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <DemoBar n="05" className="bg-[#f2c230] text-black" btnClass="bg-black text-[#f2c230]" />
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
          <a href="#s5-main" className={cn("font-serif text-xl font-bold uppercase tracking-[0.3em]", FOCUS)}>R. J. Castellan</a>
          <nav aria-label="Sample site" className="flex flex-wrap gap-x-5">{NAV.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("flex min-h-11 items-center text-xs uppercase tracking-[0.25em] text-[#9fb0bf] hover:text-white", FOCUS)}>{l}</a>)}</nav>
        </div>
      </header>

      <main id="s5-main" tabIndex={-1} className="outline-none">
        <section aria-labelledby="s5-hero" className="relative overflow-hidden border-b border-white/10">
          <CoverArt motif="glass" title="" author="" tag="" palette={PAL} className="absolute inset-0 h-full w-full scale-150 object-cover opacity-35" label="Decorative noir artwork" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.2fr_0.6fr] md:py-28">
            <div>
              <p className="mb-4 inline-block border border-[#f2c230] px-3 py-1 text-xs font-bold uppercase tracking-[0.3em] text-[#f2c230]">New release</p>
              <h1 id="s5-hero" className="font-serif text-6xl font-bold uppercase leading-[0.92] sm:text-8xl">Everyone has an alibi.</h1>
              <p className="mt-5 max-w-xl text-lg text-[#b9c8d4]">The Glass Alibi, a Detective Mara Voss thriller. Read it with the lights on.</p>
              <div className="mt-6"><BuyRow sample="thriller" primaryClass="bg-[#f2c230] px-5 text-sm font-bold uppercase tracking-wider text-black" btnClass="border border-white/40 px-5 text-sm font-bold uppercase tracking-wider hover:bg-white/10" noteClass="text-[#b9c8d4]" /></div>
              <p className="text-xs text-[#7e8e9c]">Fictional author and books created for this demonstration.</p>
            </div>
            <Reveal><div className="mx-auto w-60 sm:w-72"><BookMockup tilt={-16}><CoverArt motif="glass" title="The Glass Alibi" author="R. J. Castellan" tag="A Mara Voss Thriller" palette={PAL} /></BookMockup></div></Reveal>
          </div>
        </section>

        <section id="s5-cases" aria-labelledby="s5-cases-h" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <h2 id="s5-cases-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">The case files</h2>
          <div role="tablist" aria-label="Mara Voss series" className="mt-6 flex flex-wrap gap-2">
            {CASES.map((k) => <button key={k.id} role="tab" type="button" aria-selected={c.id === k.id} onClick={() => setC(k)} className={cn("min-h-11 border px-4 text-xs font-bold uppercase tracking-[0.25em]", FOCUS, c.id === k.id ? "border-[#f2c230] bg-[#f2c230] text-black" : "border-white/25")}>{k.file}</button>)}
          </div>
          <div role="tabpanel" className="mt-6 grid items-center gap-8 border border-white/15 bg-[#0d1217] p-6 md:grid-cols-[14rem_1fr]">
            <CoverArt motif={c.motif} title={c.title} author="R. J. Castellan" tag="A Mara Voss Thriller" palette={c.pal} />
            <div><p className="text-xs font-bold uppercase tracking-[0.3em] text-[#f2c230]">{c.file}</p><h3 className="mt-1 font-serif text-4xl font-bold uppercase">{c.title}</h3><p className="mt-3 max-w-xl text-[#b9c8d4]">{c.text}</p>{c.id !== "c1" && <p className="mt-2 text-xs uppercase tracking-widest text-[#7e8e9c]">Concept cover, sample series</p>}</div>
          </div>
        </section>

        <section id="s5-teaser" aria-labelledby="s5-teaser-h" className="scroll-mt-6 border-y border-white/10 bg-[#0d1217] px-5 py-16">
          <div className="mx-auto grid max-w-6xl items-start gap-10 md:grid-cols-2">
            <div>
              <h2 id="s5-teaser-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">Classified: chapter one</h2>
              <p className="mt-4 font-serif text-xl leading-relaxed">The witness described the man in <span className={cn("px-1", open ? "bg-transparent text-[#f2c230]" : "bg-white text-white select-none")}>a grey coat and a green scarf</span> with perfect confidence. That was the first problem. Mara Voss had been at the scene for ninety seconds before the rain started, and <span className={cn("px-1", open ? "bg-transparent text-[#f2c230]" : "bg-white text-white select-none")}>nobody had been wearing a scarf at all</span>.</p>
              <button type="button" aria-pressed={open} onClick={() => setOpen(!open)} className={cn("mt-6 min-h-11 border border-[#f2c230] px-5 text-xs font-bold uppercase tracking-[0.25em] text-[#f2c230] hover:bg-[#f2c230] hover:text-black", FOCUS)}>{open ? "Redact again" : "Declassify"}</button>
              <p className="mt-2 text-xs text-[#7e8e9c]">Original sample text written for this demo.</p>
            </div>
            <TrailerPanel sample="thriller" title="The Glass Alibi" btnClass="bg-[#f2c230] text-black" className="border border-white/15" poster={<CoverArt motif="glass" title="The Glass Alibi" author="R. J. Castellan" tag="Official trailer" palette={PAL} className="aspect-video w-full object-cover object-top" label="Trailer poster artwork for The Glass Alibi" />} />
          </div>
        </section>

        <section id="s5-stmts" aria-labelledby="s5-stmts-h" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <h2 id="s5-stmts-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">Witness statements</h2>
          <p className="mt-2 text-sm text-[#f2c230]">Illustrative sample reviews, not real endorsements.</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">{STMTS.map((s, i) => <figure key={s} className="border border-white/15 p-5"><figcaption className="text-xs font-bold uppercase tracking-[0.25em] text-[#7e8e9c]">Statement {String(i + 1).padStart(2, "0")}</figcaption><blockquote className="mt-3 font-serif text-2xl">“{s}”</blockquote></figure>)}</div>
        </section>

        <section id="s5-press" aria-labelledby="s5-press-h" className="scroll-mt-6 border-y border-white/10 bg-[#0d1217] px-5 py-16">
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.5fr_1fr]">
            <div><Portrait name="R. J. Castellan" skin="#d6a581" hair="#9a9a9a" style="short" shirt="#1c242c" glasses beard bg={["#26323c", "#0b0f13"]} /><p className="mt-2 text-xs text-[#7e8e9c]">Illustrated portrait, not a photograph.</p></div>
            <div><h2 id="s5-press-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">In the press</h2><p className="mt-2 text-sm text-[#f2c230]">Fictional outlets for demonstration.</p><ul className="mt-6 divide-y divide-white/10 border-y border-white/10">{PRESS.map(([o, k]) => <li key={o} className="flex items-baseline justify-between gap-4 py-4"><span className="font-serif text-2xl">{o}</span><span className="text-xs uppercase tracking-[0.25em] text-[#7e8e9c]">{k}</span></li>)}</ul></div>
          </div>
        </section>

        <section id="s5-brief" aria-labelledby="s5-brief-h" className="mx-auto max-w-2xl scroll-mt-6 px-5 py-16 text-center">
          <h2 id="s5-brief-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">Get the briefing</h2>
          <p className="mt-3 text-[#b9c8d4]">New cases, early chapters and one very unsettling short story.</p>
          <NewsletterDemo className="mt-6 text-left" inputClass="border border-white/30 bg-transparent px-4 text-white placeholder:text-[#7e8e9c]" buttonClass="bg-[#f2c230] px-6 text-sm font-bold uppercase tracking-wider text-black" />
        </section>
      </main>

      <AgencyCta n="05" heading="Build a website that keeps readers up at night." className="bg-[#f2c230] text-black" btnClass="bg-black text-[#f2c230]" ghostClass="border border-black/60 hover:bg-black/5" />
      <footer className="px-5 py-8 text-center text-xs text-[#7e8e9c]">Demonstration concept by Literary Marketing. All authors, titles, outlets, quotes and artwork are fictional. Sample handle (not real): @rjcastellan</footer>
    </div>
  );
}
