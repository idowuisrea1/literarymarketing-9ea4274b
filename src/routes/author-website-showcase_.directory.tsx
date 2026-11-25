import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Eye, X } from "lucide-react";
import { ShowcaseHeader } from "@/components/showcase/ShowcaseHeader";
import { AUTHOR_REFS, AUTHORS_SOURCE, WRITER_CATEGORIES, WRITER_REFS, WRITERS_SOURCE, previewUrl, type Ref } from "@/data/references";
import { INDEXABLE, SITE_ORIGIN } from "@/data/showcase";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const TITLE = "125 Author and Writer Website Examples | Literary Marketing";
const DESC = "Browse 25 author websites and 100 websites for writers in 10 categories. Visit each live site or preview it here, then ask Literary Marketing to build yours.";
const URL = `${SITE_ORIGIN}/author-website-showcase/directory`;

export const Route = createFileRoute("/author-website-showcase_/directory")({
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
  component: Directory,
});

const RING = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const PAGE = 24;

function hue(s: string) {
  let h = 0;
  for (const c of s) h = (h * 31 + c.charCodeAt(0)) % 360;
  return h;
}
function initials(name: string) {
  return name.replace(/\(.*\)/, "").split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}
function host(url: string) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

function RefCard({ r, onPreview }: { r: Ref; onPreview: (r: Ref) => void }) {
  const h = hue(r.name);
  return (
    <article className="glass flex h-full flex-col overflow-hidden rounded-2xl">
      <div aria-hidden="true" className="grid h-24 place-items-center font-serif text-4xl text-white/90" style={{ background: `linear-gradient(135deg, hsl(${h} 45% 24%), hsl(${(h + 40) % 360} 55% 40%))` }}>{initials(r.name)}</div>
      <div className="flex flex-1 flex-col p-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-cyan">{r.category}</p>
        <h3 className="mt-1 font-serif text-xl leading-snug">{r.name}</h3>
        <p className="mt-1 break-all text-xs text-muted-foreground">{host(r.url)}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-4">
          <a href={r.url} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent("directory_visit", { id: r.id })} className={cn("btn-glow inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gold-gradient px-4 text-sm font-semibold text-primary-foreground", RING)}>
            Visit website <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /><span className="sr-only"> (opens {r.name} in a new tab)</span>
          </a>
          {!r.noEmbed && (
            <button type="button" onClick={() => onPreview(r)} className={cn("glass inline-flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold", RING)}>
              <Eye className="h-3.5 w-3.5" aria-hidden="true" /> Live preview<span className="sr-only"> of {r.name}</span>
            </button>
          )}
        </div>
      </div>
    </article>
  );
}

function Directory() {
  const [tab, setTab] = useState<"author" | "writers">("author");
  const [cat, setCat] = useState<string>("All");
  const [q, setQ] = useState("");
  const [count, setCount] = useState(PAGE);
  const [preview, setPreview] = useState<Ref | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (preview && !d.open) d.showModal();
    if (!preview && d.open) d.close();
  }, [preview]);

  const pool = tab === "author" ? AUTHOR_REFS : WRITER_REFS;
  const matches = useMemo(
    () => pool.filter((r) => (tab === "author" || cat === "All" || r.category === cat) && r.name.toLowerCase().includes(q.trim().toLowerCase())),
    [pool, tab, cat, q],
  );
  const shown = matches.slice(0, count);
  const reset = () => setCount(PAGE);

  return (
    <div className="min-h-screen">
      <ShowcaseHeader />
      <main className="mx-auto max-w-7xl px-5 pb-24 pt-14">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Website examples</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-semibold leading-tight sm:text-5xl">125 real websites to explore, for authors and writers.</h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">Open any site live, or preview it here without leaving. When you know what you like, tell us and we will build you a website with the features you love.</p>
        <p className="callout mt-5 max-w-3xl rounded-xl border border-gold/40 bg-gold/5 p-4 text-sm">These are other people's websites, shown for inspiration. Literary Marketing did not build them and is not affiliated with them. Each opens on its own site. We link to them and do not copy their images, text, code or branding.</p>

        <div role="group" aria-label="Collection" className="mt-8 flex flex-wrap gap-2">
          <button type="button" aria-pressed={tab === "author"} onClick={() => { setTab("author"); setCat("All"); reset(); }} className={cn("min-h-11 rounded-full border px-5 text-sm", RING, tab === "author" ? "border-gold bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground")}>Author websites ({AUTHOR_REFS.length})</button>
          <button type="button" aria-pressed={tab === "writers"} onClick={() => { setTab("writers"); setCat("All"); reset(); }} className={cn("min-h-11 rounded-full border px-5 text-sm", RING, tab === "writers" ? "border-gold bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground")}>Websites for writers ({WRITER_REFS.length})</button>
        </div>

        {tab === "writers" && (
          <div role="group" aria-label="Category" className="mt-4 flex flex-wrap gap-2">
            {["All", ...WRITER_CATEGORIES].map((c) => (
              <button key={c} type="button" aria-pressed={cat === c} onClick={() => { setCat(c); reset(); trackEvent("directory_filter", { category: c }); }} className={cn("min-h-11 rounded-full border px-4 text-sm", RING, cat === c ? "border-gold bg-gold/10 text-gold" : "text-muted-foreground hover:text-foreground")}>
                {c}{c !== "All" && ` (${WRITER_REFS.filter((r) => r.category === c).length})`}
              </button>
            ))}
          </div>
        )}

        <div className="mt-4">
          <label htmlFor="dir-search" className="sr-only">Search websites</label>
          <input id="dir-search" type="search" value={q} onChange={(e) => { setQ(e.target.value); reset(); }} placeholder="Search by name" className={cn("min-h-11 w-full max-w-md rounded-full border bg-card px-5 text-sm", RING)} />
        </div>
        <p className="mt-3 text-sm text-muted-foreground" aria-live="polite">Showing {shown.length} of {matches.length}.</p>

        {matches.length === 0 ? (
          <p className="mt-10 text-muted-foreground">No websites match that search.</p>
        ) : (
          <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {shown.map((r) => <li key={r.id}><RefCard r={r} onPreview={(x) => { setPreview(x); trackEvent("directory_preview", { id: x.id }); }} /></li>)}
          </ul>
        )}
        {count < matches.length && (
          <p className="mt-8 text-center"><button type="button" onClick={() => setCount(count + PAGE)} className={cn("btn-glow min-h-11 rounded-full bg-gold-gradient px-7 text-sm font-semibold text-primary-foreground", RING)}>Show more</button></p>
        )}

        <section aria-label="Sources" className="mt-16 text-sm text-muted-foreground">
          <p>Lists compiled from <a className="text-gold underline" href={AUTHORS_SOURCE} target="_blank" rel="noopener noreferrer">The 25 Best Author Websites (Copyfolio)</a> and <a className="text-gold underline" href={WRITERS_SOURCE} target="_blank" rel="noopener noreferrer">The 100 Best Websites for Writers in 2021 (The Write Life)</a>. They were published in 2021, so a few sites may have moved or changed.</p>
          <p className="mt-4"><a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "directory_build" })} className={cn("btn-glow inline-flex min-h-11 items-center rounded-full bg-gold-gradient px-6 font-semibold text-primary-foreground", RING)}>Build My Author Website</a></p>
        </section>
      </main>

      <dialog ref={dialog} aria-labelledby="dir-prev-h" onClose={() => setPreview(null)} onClick={(e) => { if (e.target === dialog.current) setPreview(null); }} className="m-auto h-[85vh] w-[min(96vw,72rem)] overflow-hidden rounded-2xl border bg-background p-0 text-foreground backdrop:bg-black/80">
        {preview && (
          <div className="flex h-full flex-col">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2">
              <h2 id="dir-prev-h" className="font-serif text-lg">{preview.name}</h2>
              <div className="flex items-center gap-2">
                <a href={preview.url} target="_blank" rel="noopener noreferrer" className={cn("inline-flex min-h-11 items-center gap-1.5 rounded-full bg-gold-gradient px-4 text-sm font-semibold text-primary-foreground", RING)}>Open in a new tab <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a>
                <button type="button" autoFocus onClick={() => setPreview(null)} aria-label="Close preview" className={cn("grid h-11 w-11 place-items-center rounded-full glass", RING)}><X className="h-5 w-5" /></button>
              </div>
            </div>
            <p className="px-4 py-1 text-xs text-muted-foreground">Loaded from the original site. If this stays blank, that site does not allow previews, so use "Open in a new tab".</p>
            <iframe key={preview.id} src={previewUrl(preview.url)} title={`Live preview of ${preview.name}`} referrerPolicy="no-referrer" sandbox="allow-scripts allow-same-origin allow-forms allow-popups" className="min-h-0 w-full flex-1 bg-white" />
          </div>
        )}
      </dialog>
    </div>
  );
}
