import { useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import { PACKAGES } from "@/data/site";
import { trackEvent } from "@/lib/analytics";
import { GlowButton, Reveal, openQuote } from "./primitives";

// Each row uses the exact feature wording from PACKAGES; null = not included.
const f = (i: number, n: number) => PACKAGES[i]!.features[n]!;
const ROWS: { label: string; v: (string | null)[] }[] = [
  { label: "Social content", v: [f(0, 0), f(1, 0), f(2, 0)] },
  { label: "Platforms", v: [f(0, 1), f(1, 1), "All platforms"] },
  { label: "Email", v: [f(0, 2), f(1, 2), null] },
  { label: "Video", v: [null, f(1, 3), null] },
  { label: "Design", v: [f(0, 3), f(1, 4), f(2, 4)] },
  { label: "Launch campaigns", v: [null, null, `${f(2, 1)} · ${f(2, 2)}`] },
  { label: "Website", v: [null, null, f(2, 3)] },
  { label: "Support", v: [f(0, 4), f(1, 5), f(2, 5)] },
];

const Cell = ({ v }: { v: string | null }) => v
  ? <span className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" aria-hidden="true" />{v}</span>
  : <span className="flex items-center gap-2 text-muted-foreground"><Minus className="h-4 w-4" aria-hidden="true" /><span className="sr-only">Not included</span></span>;

export function PackageCompare() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e?.isIntersecting) { trackEvent("package_compare_view"); io.disconnect(); } }, { threshold: 0.3 });
    io.observe(el); return () => io.disconnect();
  }, []);
  const choose = (name: string) => { trackEvent("cta_click", { cta: "compare_choose", package: name }); openQuote(name); };

  return (
    <Reveal className="mx-auto mt-24 max-w-6xl">
      <div ref={ref} className="mb-8 text-center">
        <h3 className="text-3xl font-semibold sm:text-4xl">Compare the <span className="text-gold-gradient">plans</span></h3>
        <p className="mt-2 text-muted-foreground">See what each monthly plan includes, side by side.</p>
      </div>
      <div className="glass hidden overflow-hidden rounded-3xl md:block">
        <table className="w-full text-left text-sm">
          <caption className="sr-only">Monthly package comparison</caption>
          <thead><tr className="border-b">
            <th scope="col" className="p-4"><span className="sr-only">Feature</span></th>
            {PACKAGES.map((p) => <th key={p.id} scope="col" className="p-4 align-bottom"><p className="font-serif text-xl">{p.name}</p><p className="font-serif text-3xl text-gold-gradient">{p.price}<span className="text-sm text-muted-foreground">{p.period}</span></p></th>)}
          </tr></thead>
          <tbody>
            {ROWS.map((r) => <tr key={r.label} className="border-b border-foreground/5">
              <th scope="row" className="p-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">{r.label}</th>
              {r.v.map((v, i) => <td key={i} className="p-4 align-top"><Cell v={v} /></td>)}
            </tr>)}
            <tr><td />{PACKAGES.map((p) => <td key={p.id} className="p-4"><GlowButton variant={p.popular ? "gold" : "ghost"} className="w-full" onClick={() => choose(p.name)}>Choose this</GlowButton></td>)}</tr>
          </tbody>
        </table>
      </div>
      <div className="grid gap-4 md:hidden">
        {PACKAGES.map((p, i) => (
          <div key={p.id} className="glass rounded-2xl p-5">
            <p className="font-serif text-xl">{p.name}</p>
            <p className="font-serif text-3xl text-gold-gradient">{p.price}<span className="text-sm text-muted-foreground">{p.period}</span></p>
            <dl className="mt-4 space-y-3 text-sm">
              {ROWS.map((r) => <div key={r.label}><dt className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{r.label}</dt><dd className="mt-1"><Cell v={r.v[i] ?? null} /></dd></div>)}
            </dl>
            <GlowButton variant={p.popular ? "gold" : "ghost"} className="mt-5 w-full" onClick={() => choose(p.name)}>Choose this</GlowButton>
          </div>
        ))}
      </div>
    </Reveal>
  );
}
