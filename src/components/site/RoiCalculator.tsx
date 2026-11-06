import { useId, useRef, useState } from "react";
import { PACKAGES } from "@/data/site";
import { calcRoi } from "@/lib/roi";
import { trackEvent } from "@/lib/analytics";
import { Reveal } from "./primitives";
import { fieldCls } from "./Pricing";

const money = (n: number) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export function RoiCalculator() {
  const uid = useId();
  const used = useRef(false);
  const [v, setV] = useState({ price: 4.99, royaltyPct: 70, extraCopies: 0, packageCost: 299 });
  const r = calcRoi(v);
  const upd = (k: keyof typeof v) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!used.current) { used.current = true; trackEvent("calculator_use"); }
    setV((p) => ({ ...p, [k]: Number(e.target.value) || 0 }));
  };
  const fields: [keyof typeof v, string, number, string][] = [
    ["price", "Book price ($)", 0.01, "0.99"],
    ["royaltyPct", "Royalty rate (%)", 1, "70"],
    ["extraCopies", "Extra copies sold per month (your guess)", 1, "0"],
    ["packageCost", "Package cost per month ($)", 1, "299"],
  ];

  return (
    <Reveal className="mx-auto mt-24 max-w-5xl">
      <div className="mb-8 text-center">
        <h3 className="text-3xl font-semibold sm:text-4xl">Royalty <span className="text-gold-gradient">calculator</span></h3>
        <p className="mt-2 text-muted-foreground">How many extra copies would cover a plan? <strong className="text-foreground">An estimate, not a guarantee.</strong></p>
      </div>
      <div className="glass grid gap-8 rounded-3xl p-6 sm:p-8 md:grid-cols-[1.1fr_1fr]">
        <div className="grid gap-4">
          {fields.map(([k, l, step]) => (
            <div key={k}>
              <label htmlFor={`${uid}-${k}`} className="mb-1.5 block text-sm font-medium">{l}</label>
              <input id={`${uid}-${k}`} type="number" inputMode="decimal" min={0} step={step} value={v[k]} onChange={upd(k)} className={fieldCls} />
            </div>
          ))}
          <div className="flex flex-wrap gap-2" aria-label="Use a package price">
            {PACKAGES.map((p) => <button key={p.id} type="button" onClick={() => setV((s) => ({ ...s, packageCost: Number(p.price.replace(/[^0-9.]/g, "")) }))} className="min-h-11 rounded-full border px-3 text-xs hover:border-gold hover:text-gold">{p.name.replace(/^The /, "")} {p.price}</button>)}
          </div>
        </div>
        <div className="flex flex-col gap-4" aria-live="polite">
          <div className="rounded-2xl border border-gold/40 bg-gold/5 p-5">
            <p className="text-sm text-muted-foreground">Break-even point</p>
            <p className="font-serif text-4xl text-gold-gradient">{r.breakEven === null ? "—" : `${r.breakEven.toLocaleString()} copies`}</p>
            <p className="text-sm text-muted-foreground">per month to cover {money(v.packageCost)}</p>
          </div>
          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-muted-foreground">You earn per copy</dt><dd className="font-mono text-lg">{money(r.perCopy)}</dd></div>
            <div><dt className="text-muted-foreground">Extra royalties / month</dt><dd className="font-mono text-lg">{money(r.extraRoyalties)}</dd></div>
            <div className="col-span-2"><dt className="text-muted-foreground">After package cost</dt><dd className={`font-mono text-lg ${r.net >= 0 ? "text-cyan" : "text-destructive"}`}>{money(r.net)}</dd></div>
          </dl>
          <div className="text-xs leading-relaxed text-muted-foreground">
            <p className="font-semibold text-foreground">Assumptions</p>
            <ul className="mt-1 list-disc space-y-1 pl-4">
              <li>Starting values are examples. Change them to your own numbers.</li>
              <li>Earnings per copy = price × royalty rate. Amazon KDP ebooks offer a 35% or 70% option; print and other stores differ.</li>
              <li>"Extra copies" is your own guess. We do not promise any sales number.</li>
              <li>Delivery fees, taxes, ad spend and page-read income are not included.</li>
            </ul>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
