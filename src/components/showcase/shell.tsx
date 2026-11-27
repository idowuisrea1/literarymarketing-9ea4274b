import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";
import { ArrowLeft, Play, X } from "lucide-react";
import { INDEXABLE, SITE_ORIGIN } from "@/data/showcase";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

/** Shared pieces for every showcase demo. Each demo has its own layout and design on top of these. */

export const sampleHead = (slug: string, title: string, description: string) => () => ({
  meta: [
    { title: `${title} | Literary Marketing` },
    { name: "description", content: description },
    { name: "robots", content: INDEXABLE ? "index, follow" : "noindex, nofollow" },
    { property: "og:title", content: `${title} | Literary Marketing` },
    { property: "og:description", content: description },
    { property: "og:type", content: "website" },
    { property: "og:url", content: `${SITE_ORIGIN}/author-website-showcase/${slug}` },
  ],
  links: [{ rel: "canonical", href: `${SITE_ORIGIN}/author-website-showcase/${slug}` }],
});

export function DemoBar({ n, className, btnClass }: { n: string; className: string; btnClass: string }) {
  return (
    <div className={cn("flex flex-wrap items-center justify-between gap-2 px-4 py-2 text-xs", className)}>
      <Link to="/author-website-showcase" activeOptions={{ exact: true }} className="inline-flex min-h-11 items-center gap-1 font-semibold underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-current">
        <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to the Literarymarketing showcase
      </Link>
      <span>Sample {n} of Literarymarketing's Author Website Showcase. Fictional author, artwork and content.</span>
      <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: `sample${n}_build` })} className={cn("inline-flex min-h-11 items-center px-4 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-current", btnClass)}>
        Build My Author Website
      </a>
    </div>
  );
}

export function AgencyCta({ n, heading, className, btnClass, ghostClass }: { n: string; heading: string; className: string; btnClass: string; ghostClass: string }) {
  return (
    <section aria-label="Build a site like this" className={cn("px-5 py-16 text-center", className)}>
      <p className="font-serif text-3xl font-semibold sm:text-4xl">{heading}</p>
      <p className="mx-auto mt-2 max-w-xl opacity-85">Literary Marketing designs and builds author websites tailored to your book and your readers.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: `sample${n}_request` })} className={cn("inline-flex min-h-11 items-center px-6 text-sm font-semibold", btnClass)}>Request this style</a>
        <Link to="/author-website-showcase" activeOptions={{ exact: true }} className={cn("inline-flex min-h-11 items-center px-6 text-sm font-semibold", ghostClass)}>See more designs</Link>
      </div>
    </section>
  );
}

const RETAILERS = ["Amazon", "Barnes & Noble", "Apple Books", "Bookshop.org"];

/** Demo retailer buttons. No real links exist for fictional books, so each shows an honest note. */
export function BuyRow({ sample, btnClass, primaryClass, noteClass, retailers = RETAILERS }: { sample: string; btnClass: string; primaryClass?: string; noteClass?: string; retailers?: string[] }) {
  const [note, setNote] = useState("");
  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Where to buy">
        {retailers.map((r, i) => (
          <button key={r} type="button" className={cn("min-h-11", i === 0 && primaryClass ? primaryClass : btnClass)} onClick={() => { setNote(`Demo: on a live site this button opens ${r} with your book's real link.`); trackEvent("showcase_sample_buy", { sample, retailer: r }); }}>{r}</button>
        ))}
      </div>
      <p role="status" className={cn("mt-2 min-h-6 text-sm", noteClass)}>{note}</p>
    </div>
  );
}

/** Trailer / video preview. The poster is original artwork. It says plainly that no video is playing. */
export function TrailerPanel({ poster, title, btnClass, className, sample }: { poster: ReactNode; title: string; btnClass: string; className?: string; sample: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  return (
    <>
      <button type="button" onClick={() => { ref.current?.showModal(); trackEvent("showcase_sample_trailer", { sample }); }} className={cn("group relative block w-full overflow-hidden text-left", className)} aria-label={`Open the trailer preview for ${title}`}>
        {poster}
        <span className="absolute inset-0 grid place-items-center bg-black/25 transition-colors group-hover:bg-black/10">
          <span className={cn("grid h-16 w-16 place-items-center rounded-full", btnClass)}><Play className="ml-1 h-7 w-7" aria-hidden="true" /></span>
        </span>
        <span className="absolute bottom-3 left-3 rounded bg-black/70 px-2 py-1 text-[11px] uppercase tracking-widest text-white">Trailer preview (poster)</span>
      </button>
      <dialog ref={ref} aria-labelledby={`${sample}-tr-h`} onClick={(e) => { if (e.target === ref.current) ref.current?.close(); }} className="m-auto w-[min(92vw,56rem)] overflow-hidden rounded-lg border border-white/20 bg-neutral-950 p-0 text-white backdrop:bg-black/85">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <h2 id={`${sample}-tr-h`} className="font-serif text-lg font-bold">{title}: trailer preview</h2>
          <button type="button" autoFocus onClick={() => ref.current?.close()} className="grid h-11 w-11 place-items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-white" aria-label="Close trailer preview"><X className="h-5 w-5" /></button>
        </div>
        <div className="relative">{poster}<span className="absolute inset-x-0 bottom-0 bg-black/75 p-3 text-center text-sm">Poster artwork. No video is playing here. On a live site your real YouTube or Vimeo trailer plays in this window.</span></div>
      </dialog>
    </>
  );
}
