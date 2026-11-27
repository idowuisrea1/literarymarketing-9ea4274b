import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Reveal } from "@/components/site/primitives";
import { BookMockup, CoverArt, Portrait } from "@/components/showcase/art";
import { AgencyCta, BuyRow, DemoBar, TrailerPanel, sampleHead } from "@/components/showcase/shell";
import { NewsletterDemo } from "@/components/showcase/NewsletterDemo";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/author-website-showcase_/fantasy")({
  head: sampleHead("fantasy", "Fantasy and Sci-Fi Author Website concept", "A working demo of an immersive fantasy author website with an interactive realm map, houses, lore and a series guide. Fictional content by Literary Marketing."),
  component: FantasyDemo,
});

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffd27a]";
const NAV = [["The realm", "s4-map"], ["Houses", "s4-houses"], ["The cycle", "s4-cycle"], ["Codex", "s4-codex"], ["The Order", "s4-order"]] as const;
const PAL: [string, string, string, string] = ["#0b0d2e", "#2c2f7a", "#ffd27a", "#ffffff"];

const REGIONS = [
  { id: "ash", name: "The Ashen Peaks", x: 300, y: 90, text: "Where the crown fell. The mountains still smoke, and no map has ever agreed on their height." },
  { id: "mire", name: "Veyra Mire", x: 130, y: 250, text: "A drowned kingdom. Lanterns burn under the water, and the ferrymen will not say why." },
  { id: "port", name: "Port Halcyon", x: 470, y: 230, text: "The last free harbor. Every ship that docks here owes a favor to someone." },
  { id: "vale", name: "The Silver Vale", x: 300, y: 330, text: "Orchards of pale fruit that ripen only at night. Home of House Orme." },
];

const HOUSES = [
  { name: "Ysolde Varn", role: "Heir of House Varn", skin: "#d8a47f", hair: "#c9c9d6", style: "long" as const, shirt: "#4a2a7a", bg: ["#2c2f7a", "#0b0d2e"] as [string, string], beard: false },
  { name: "Torvald Ashe", role: "The Exiled Knight", skin: "#8a5a3c", hair: "#1b1b1b", style: "short" as const, shirt: "#5a1a1a", bg: ["#3a1a2a", "#0b0d2e"] as [string, string], beard: true },
  { name: "Mirel of the Mire", role: "Lantern-keeper", skin: "#e6c19e", hair: "#2a6a5a", style: "bun" as const, shirt: "#1a5a5a", bg: ["#1a4a5a", "#0b0d2e"] as [string, string], beard: false },
];

const CYCLE = [
  { n: 1, t: "Crown of Ash", d: "A kingdom burns, and a crown goes missing.", motif: "crown" as const },
  { n: 2, t: "Throne of Tides", d: "The sea wants what the mountain lost.", motif: "harbor" as const },
  { n: 3, t: "Heir of Embers", d: "The last claimant chooses her side.", motif: "deco" as const },
];

const CODEX = [
  ["What is the Ashen Cycle?", "A three-book epic fantasy about a fallen crown, three rival houses and the cost of remembering."],
  ["Do I need to read in order?", "Yes. Each book ends on a door that the next one opens."],
  ["Is there romance? Dragons?", "A slow-burn thread, and one very old dragon who dislikes being asked."],
  ["Where do I start?", "With Crown of Ash. The map in this site shows where the story begins."],
];

function FantasyDemo() {
  const [region, setRegion] = useState(REGIONS[0]!);
  return (
    <div className="min-h-screen bg-[#070820] font-sans text-[#e9e6ff]">
      <a href="#s4-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2 focus:text-black">Skip to content</a>
      <DemoBar n="04" className="bg-[#ffd27a] text-[#0b0d2e]" btnClass="bg-[#0b0d2e] text-[#ffd27a]" />

      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-5">
        <a href="#s4-main" className={cn("font-serif text-2xl font-bold uppercase tracking-[0.25em] text-[#ffd27a]", FOCUS)}>Tavish Orme</a>
        <nav aria-label="Sample site" className="flex flex-wrap gap-x-5">
          {NAV.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("flex min-h-11 items-center text-sm uppercase tracking-widest text-[#cfcaff] hover:text-white", FOCUS)}>{l}</a>)}
        </nav>
      </header>

      <main id="s4-main" tabIndex={-1} className="outline-none">
        <section aria-labelledby="s4-hero" className="relative overflow-hidden">
          <CoverArt motif="crown" title="" author="" tag="" palette={PAL} className="absolute inset-0 h-full w-full scale-150 object-cover opacity-40" label="Decorative fantasy landscape" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1.1fr_0.7fr] md:py-28">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-[#ffd27a]">Book One of the Ashen Cycle</p>
              <h1 id="s4-hero" className="font-serif text-5xl font-bold uppercase leading-[0.98] sm:text-7xl">A crown fell. A kingdom remembers.</h1>
              <p className="mt-5 max-w-xl text-lg text-[#cfcaff]">An epic of rival houses, drowned kingdoms and a magic that always asks for something back.</p>
              <div className="mt-6"><BuyRow sample="fantasy" primaryClass="bg-[#ffd27a] px-5 text-sm font-bold uppercase tracking-wider text-[#0b0d2e]" btnClass="border border-[#ffd27a]/60 px-5 text-sm font-bold uppercase tracking-wider text-[#ffd27a] hover:bg-white/10" noteClass="text-[#cfcaff]" /></div>
              <p className="text-xs text-[#9b97d6]">Fictional author and books created for this demonstration.</p>
            </div>
            <Reveal><div className="mx-auto w-60 sm:w-72"><BookMockup tilt={-18}><CoverArt motif="crown" title="Crown of Ash" author="Tavish Orme" tag="Book One" palette={PAL} /></BookMockup></div></Reveal>
          </div>
        </section>

        <section id="s4-map" aria-labelledby="s4-map-h" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <h2 id="s4-map-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">The realm of Varenthal</h2>
          <p className="mt-2 text-sm text-[#9b97d6]">Select a place on the map. Fictional world created for this demo.</p>
          <div className="mt-8 grid gap-8 md:grid-cols-[1.3fr_1fr]">
            <svg viewBox="0 0 600 420" role="group" aria-label="Interactive map of the realm" className="w-full rounded-2xl border border-[#ffd27a]/30 bg-[#0e1038]">
              <path d="M60 220C40 140 130 70 230 80C300 40 410 60 470 110C560 130 570 230 520 290C490 360 380 380 300 360C230 400 110 370 90 300C70 280 60 250 60 220Z" fill="#1b1f5a" stroke="#ffd27a" strokeOpacity=".6" strokeWidth="2" />
              <path d="M120 240C180 200 220 260 300 230S430 250 490 210" stroke="#6f77d6" strokeWidth="3" fill="none" strokeDasharray="6 6" />
              {[[200, 150], [380, 140], [250, 300], [420, 300]].map(([x, y], i) => <path key={i} d={`M${x! - 30} ${y! + 14}L${x} ${y! - 22}L${x! + 30} ${y! + 14}Z`} fill="#2c2f7a" opacity=".8" />)}
              {REGIONS.map((r) => (
                <g key={r.id} transform={`translate(${r.x} ${r.y})`}>
                  <circle r={region.id === r.id ? 22 : 14} fill="#ffd27a" opacity={region.id === r.id ? 0.35 : 0.2} />
                  <circle r="9" fill={region.id === r.id ? "#fff" : "#ffd27a"} />
                </g>
              ))}
              <text x="300" y="405" textAnchor="middle" fill="#ffd27a" opacity=".7" fontSize="14" letterSpacing="6">VARENTHAL</text>
            </svg>
            <div>
              <div role="group" aria-label="Places on the map" className="flex flex-wrap gap-2">
                {REGIONS.map((r) => <button key={r.id} type="button" aria-pressed={region.id === r.id} onClick={() => setRegion(r)} className={cn("min-h-11 border px-4 text-sm uppercase tracking-wider", FOCUS, region.id === r.id ? "border-[#ffd27a] bg-[#ffd27a] text-[#0b0d2e]" : "border-[#ffd27a]/40")}>{r.name}</button>)}
              </div>
              <div aria-live="polite" className="mt-5 rounded-2xl border border-[#ffd27a]/30 bg-[#0e1038] p-5"><h3 className="font-serif text-2xl font-bold text-[#ffd27a]">{region.name}</h3><p className="mt-2 text-[#cfcaff]">{region.text}</p></div>
            </div>
          </div>
        </section>

        <section id="s4-houses" aria-labelledby="s4-houses-h" className="scroll-mt-6 bg-[#0b0d2e] px-5 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 id="s4-houses-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">The houses and their heirs</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-3">
              {HOUSES.map((h) => <li key={h.name} className="overflow-hidden rounded-2xl border border-[#ffd27a]/25"><Portrait name={h.name} skin={h.skin} hair={h.hair} style={h.style} shirt={h.shirt} bg={h.bg} beard={h.beard} /><div className="p-4"><p className="font-serif text-2xl font-bold">{h.name}</p><p className="text-sm text-[#ffd27a]">{h.role}</p></div></li>)}
            </ul>
          </div>
        </section>

        <section id="s4-cycle" aria-labelledby="s4-cycle-h" className="mx-auto max-w-6xl scroll-mt-6 px-5 py-16">
          <h2 id="s4-cycle-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">The Ashen Cycle</h2>
          <ol className="mt-8 grid gap-6 md:grid-cols-3">
            {CYCLE.map((b) => (
              <li key={b.n} className="rounded-2xl border border-[#ffd27a]/25 p-4">
                <CoverArt motif={b.motif} title={b.t} author="Tavish Orme" tag={`Book ${b.n}`} palette={b.n === 1 ? PAL : b.n === 2 ? ["#06222e", "#1a6a8a", "#aef0ff", "#fff"] : ["#2a0a1a", "#8a2a4a", "#ffb27a", "#fff"]} className="rounded" />
                <p className="mt-3 font-serif text-2xl font-bold">{b.n}. {b.t}</p><p className="text-sm text-[#cfcaff]">{b.d}</p>
                {b.n > 1 && <p className="mt-1 text-xs uppercase tracking-widest text-[#9b97d6]">Concept cover, sample series</p>}
              </li>
            ))}
          </ol>
          <div className="mt-10 max-w-3xl"><TrailerPanel sample="fantasy" title="Crown of Ash" btnClass="bg-[#ffd27a] text-[#0b0d2e]" className="rounded-2xl border border-[#ffd27a]/30" poster={<CoverArt motif="crown" title="Crown of Ash" author="Tavish Orme" tag="Official trailer" palette={PAL} className="aspect-video w-full object-cover object-top" label="Trailer poster artwork for Crown of Ash" />} /></div>
        </section>

        <section id="s4-codex" aria-labelledby="s4-codex-h" className="mx-auto max-w-3xl scroll-mt-6 px-5 py-12">
          <h2 id="s4-codex-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">The codex</h2>
          <div className="mt-6">{CODEX.map(([q, a]) => <details key={q} className="border-b border-[#ffd27a]/25 py-3"><summary className={cn("flex min-h-11 cursor-pointer items-center font-semibold", FOCUS)}>{q}</summary><p className="pb-2 text-[#cfcaff]">{a}</p></details>)}</div>
        </section>

        <section id="s4-order" aria-labelledby="s4-order-h" className="mx-auto max-w-2xl scroll-mt-6 px-5 py-16 text-center">
          <h2 id="s4-order-h" className="font-serif text-4xl font-bold uppercase sm:text-5xl">Join the Order</h2>
          <p className="mt-3 text-[#cfcaff]">Map updates, lore drops and early chapters.</p>
          <NewsletterDemo className="mt-6 text-left" inputClass="border border-[#ffd27a]/50 bg-[#0e1038] px-4 text-white placeholder:text-[#9b97d6]" buttonClass="bg-[#ffd27a] px-6 text-sm font-bold uppercase tracking-wider text-[#0b0d2e]" />
        </section>
      </main>

      <AgencyCta n="04" heading="Give your universe a home worth exploring." className="bg-[#ffd27a] text-[#0b0d2e]" btnClass="bg-[#0b0d2e] text-[#ffd27a]" ghostClass="border border-[#0b0d2e]/60 hover:bg-black/5" />
      <footer className="px-5 py-8 text-center text-xs text-[#9b97d6]">Demonstration concept by Literary Marketing. All authors, titles, maps, characters and artwork are fictional. Sample handle (not real): @tavishorme</footer>
    </div>
  );
}
