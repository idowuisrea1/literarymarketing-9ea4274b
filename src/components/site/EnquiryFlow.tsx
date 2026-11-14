import { useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, CheckCircle2, Copy } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { CONTACT, GENRES, ORDER_OPTIONS, SERVICES_LIST } from "@/data/site";
import { BUDGETS, STAGES, TIMELINES, buildBrief, suggestPackage, type Answers } from "@/lib/enquiry";
import { trackEvent } from "@/lib/analytics";
import { sendToFormspree } from "@/lib/formspree";
import { GlowButton } from "./primitives";
import { fieldCls } from "./Pricing";
import { cn } from "@/lib/utils";

const STEPS = ["About you", "Your book", "What you need", "Budget & timeline", "Review & send"];

const stepSchemas: z.ZodTypeAny[] = [
  z.object({ name: z.string().trim().min(1, "Please enter your name").max(120), email: z.string().trim().email("Please enter a valid email").max(255) }),
  z.object({ genre: z.string().min(1, "Please choose a genre").max(100), stage: z.string().min(1, "Please choose where your book is").max(100), title: z.string().trim().max(200) }),
  z.object({ services: z.array(z.string().max(100)).min(1, "Pick at least one service"), details: z.string().trim().max(1500) }),
  z.object({ budget: z.string().min(1, "Please choose a budget"), timeline: z.string().min(1, "Please choose a timeline") }),
];

const EMPTY: Answers = { name: "", email: "", genre: "", stage: "", title: "", services: [], interest: "", budget: "", timeline: "", details: "" };

export function EnquiryFlow() {
  const uid = useId();
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const started = useRef(false);
  const honey = useRef<HTMLInputElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);

  const set = <K extends keyof Answers>(k: K, v: Answers[K]) => {
    if (!started.current) { started.current = true; trackEvent("enquiry_start"); }
    setA((p) => ({ ...p, [k]: v }));
  };

  useEffect(() => {
    const on = (e: Event) => {
      const v = (e as CustomEvent<string>).detail;
      setState((s) => (s === "done" ? "idle" : s));
      setA((p) => ({
        ...p,
        services: SERVICES_LIST.includes(v) && !p.services.includes(v) ? [...p.services, v] : p.services,
        interest: !SERVICES_LIST.includes(v) && ORDER_OPTIONS.includes(v) ? v : p.interest,
      }));
    };
    window.addEventListener("lm:service", on);
    return () => window.removeEventListener("lm:service", on);
  }, []);

  const go = (n: number) => { setStep(n); trackEvent("enquiry_step", { step: n + 1 }); requestAnimationFrame(() => headRef.current?.focus()); };

  function next() {
    const r = stepSchemas[step]!.safeParse(a);
    if (!r.success) { setErrors(Object.fromEntries(r.error.issues.map((i) => [String(i.path[0]), i.message]))); return; }
    setErrors({}); go(step + 1);
  }

  async function send() {
    if (honey.current?.value) return setState("done");
    for (const s of stepSchemas) if (!s.safeParse(a).success) { go(stepSchemas.indexOf(s)); return; }
    setState("sending");
    const brief = buildBrief(a);
    const lead = {
      name: a.name.trim(), email: a.email.trim(), genre: a.genre || null,
      service: (a.interest || a.services.join(", ")).slice(0, 100) || null,
      details: brief.slice(0, 3000),
    };
    // Save to the database and email a copy via Formspree. Succeed if either works.
    const [{ error }, mailed] = await Promise.all([
      supabase.from("leads").insert(lead),
      sendToFormspree("enquiry", { ...lead, _subject: `New enquiry from ${lead.name}`, brief, budget: a.budget, timeline: a.timeline, stage: a.stage, book_title: a.title }),
    ]);
    const ok = !error || mailed;
    setState(ok ? "done" : "error");
    if (ok) trackEvent("enquiry_submit", { services: a.services.length });
  }

  const err = (k: string) => errors[k] ? { "aria-invalid": true as const, "aria-describedby": `${uid}-${k}-err` } : {};
  const Err = ({ k }: { k: string }) => errors[k] ? <p id={`${uid}-${k}-err`} className="mt-1 text-xs text-destructive">{errors[k]}</p> : null;
  const label = "mb-1.5 block text-sm font-medium text-foreground";

  if (state === "done") return (
    <div className="py-16 text-center" role="status">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}><CheckCircle2 className="mx-auto h-20 w-20 text-gold" /></motion.div>
      <h3 className="mt-4 text-3xl font-semibold">Enquiry sent!</h3>
      <p className="mt-2 text-muted-foreground">Thank you. We'll be in touch within 24 hours.</p>
      <GlowButton variant="ghost" className="mt-6" onClick={() => { setA(EMPTY); setStep(0); setState("idle"); started.current = false; }}>Start a new enquiry</GlowButton>
    </div>
  );

  const suggestion = suggestPackage(a);
  const brief = buildBrief(a);

  return (
    <form onSubmit={(e) => { e.preventDefault(); step < 4 ? next() : void send(); }} noValidate aria-labelledby={`${uid}-h`}>
      <input ref={honey} type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <ol className="mb-5 flex gap-1.5" aria-label="Progress">
        {STEPS.map((s, i) => (
          <li key={s} className="flex-1" aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full transition-colors", i <= step ? "bg-gold" : "bg-foreground/10")} />
            <span className="sr-only">{s}{i < step ? " (done)" : ""}</span>
          </li>
        ))}
      </ol>
      <p className="font-mono text-xs uppercase tracking-widest text-cyan">Step {step + 1} of {STEPS.length}</p>
      <h3 id={`${uid}-h`} ref={headRef} tabIndex={-1} className="mb-5 mt-1 text-2xl font-semibold outline-none">{STEPS[step]}</h3>
      <div aria-live="polite" className="sr-only">{Object.values(errors)[0] ?? ""}</div>

      <div className="grid gap-4">
        {step === 0 && <>
          <div><label htmlFor={`${uid}-name`} className={label}>Your name</label><input id={`${uid}-name`} value={a.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" maxLength={120} className={fieldCls} {...err("name")} /><Err k="name" /></div>
          <div><label htmlFor={`${uid}-email`} className={label}>Email address</label><input id={`${uid}-email`} type="email" value={a.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" maxLength={255} className={fieldCls} {...err("email")} /><Err k="email" /></div>
        </>}
        {step === 1 && <>
          <div><label htmlFor={`${uid}-title`} className={label}>Book title <span className="text-muted-foreground">(optional)</span></label><input id={`${uid}-title`} value={a.title} onChange={(e) => set("title", e.target.value)} maxLength={200} className={fieldCls} /></div>
          <div><label htmlFor={`${uid}-genre`} className={label}>Genre</label><select id={`${uid}-genre`} value={a.genre} onChange={(e) => set("genre", e.target.value)} className={fieldCls} {...err("genre")}><option value="">Choose a genre</option>{GENRES.map((g) => <option key={g}>{g}</option>)}</select><Err k="genre" /></div>
          <Choice legend="Where is your book now?" k="stage" opts={STAGES} value={a.stage} onPick={(v) => set("stage", v)} err={err("stage")} Err={Err} />
        </>}
        {step === 2 && <>
          <fieldset {...err("services")}>
            <legend className={label}>Which services do you need? <span className="text-muted-foreground">(pick any)</span></legend>
            {a.interest && <p className="mb-2 text-sm text-gold">Chosen package: {a.interest}</p>}
            <div className="grid gap-2 sm:grid-cols-2">
              {SERVICES_LIST.map((s) => {
                const on = a.services.includes(s);
                return (
                  <label key={s} className={cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors focus-within:ring-1 focus-within:ring-gold", on && "border-gold text-gold")}>
                    <input type="checkbox" checked={on} onChange={() => set("services", on ? a.services.filter((x) => x !== s) : [...a.services, s])} className="h-4 w-4 accent-[var(--gold)]" />{s}
                  </label>
                );
              })}
            </div>
            <Err k="services" />
          </fieldset>
          <div><label htmlFor={`${uid}-details`} className={label}>Anything else? <span className="text-muted-foreground">(optional)</span></label><textarea id={`${uid}-details`} rows={3} value={a.details} onChange={(e) => set("details", e.target.value)} maxLength={1500} className={fieldCls} /></div>
        </>}
        {step === 3 && <>
          <Choice legend="Monthly budget" k="budget" opts={BUDGETS} value={a.budget} onPick={(v) => set("budget", v)} err={err("budget")} Err={Err} />
          <Choice legend="When do you want to start?" k="timeline" opts={TIMELINES} value={a.timeline} onPick={(v) => set("timeline", v)} err={err("timeline")} Err={Err} />
        </>}
        {step === 4 && <>
          <div className="rounded-2xl border border-gold/40 bg-gold/5 p-4">
            <p className="text-sm text-muted-foreground">Suggested starting point</p>
            <p className="font-serif text-2xl text-gold-gradient">{suggestion.name}</p>
            <p className="text-sm text-muted-foreground">{suggestion.price} · based on your answers. We confirm the right fit together.</p>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between"><span className={label}>Your project brief</span>
              <button type="button" onClick={() => { void navigator.clipboard?.writeText(brief); setCopied(true); setTimeout(() => setCopied(false), 2000); }} className="inline-flex min-h-11 items-center gap-1.5 px-2 text-sm text-gold">
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy"}
              </button>
            </div>
            <pre className="whitespace-pre-wrap rounded-xl border bg-background/60 p-4 font-sans text-sm text-foreground/90">{brief}</pre>
          </div>
          {state === "error" && <p role="alert" className="text-sm text-destructive">Something went wrong. Please copy your brief and send it on <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="underline">WhatsApp</a> or email <a href={`mailto:${CONTACT.email}`} className="underline">{CONTACT.email}</a>.</p>}
        </>}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {step > 0 && <GlowButton type="button" variant="ghost" onClick={() => { setErrors({}); go(step - 1); }}>Back</GlowButton>}
        <GlowButton type="submit" disabled={state === "sending"} className="flex-1">{step < 4 ? "Next" : state === "sending" ? "Sending…" : "Send Enquiry"}</GlowButton>
      </div>
    </form>
  );
}

function Choice({ legend, k, opts, value, onPick, err, Err }: { legend: string; k: string; opts: string[]; value: string; onPick: (v: string) => void; err: object; Err: (p: { k: string }) => React.ReactNode }) {
  return (
    <fieldset {...err}>
      <legend className="mb-1.5 block text-sm font-medium text-foreground">{legend}</legend>
      <div className="grid gap-2 sm:grid-cols-2">
        {opts.map((o) => (
          <label key={o} className={cn("flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border px-3 py-2 text-sm transition-colors focus-within:ring-1 focus-within:ring-gold", value === o && "border-gold text-gold")}>
            <input type="radio" name={k} checked={value === o} onChange={() => onPick(o)} className="h-4 w-4 accent-[var(--gold)]" />{o}
          </label>
        ))}
      </div>
      <Err k={k} />
    </fieldset>
  );
}
