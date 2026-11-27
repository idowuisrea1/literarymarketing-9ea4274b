import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal } from "@/components/site/primitives";
import { BookMockup, CoverArt, Portrait } from "@/components/showcase/art";
import { AgencyCta, BuyRow, DemoBar, sampleHead } from "@/components/showcase/shell";
import { NewsletterDemo } from "@/components/showcase/NewsletterDemo";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/author-website-showcase_/nonfiction")({
  head: sampleHead("nonfiction", "Nonfiction and Thought Leader Website concept", "A working demo of an authoritative nonfiction author website with key ideas, speaking enquiries and resources. Fictional content by Literary Marketing."),
  component: NonfictionDemo,
});

const FOCUS = "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f6fa8]";
const NAV = [["The book", "s6-book"], ["Key ideas", "s6-ideas"], ["Speaking", "s6-speak"], ["Resources", "s6-res"], ["Newsletter", "s6-news"]] as const;
const PAL: [string, string, string, string] = ["#08263f", "#1f6fa8", "#8fd0ff", "#ffffff"];

const IDEAS = [
  ["Speed is a decision, not a strategy", "Teams that move fastest first decide what they will not do. Slowness at the start buys speed everywhere else."],
  ["Compounding beats heroics", "Small, repeatable improvements outperform dramatic pushes, because they are still running next quarter."],
  ["Protect the thinking hour", "One unbroken hour of deep work, defended, changes more than a week of scattered meetings."],
  ["Measure what you want more of", "Pick two numbers that reflect real progress and ignore the rest of the dashboard."],
];
const TOPICS = ["Keynote: The Slow Advantage", "Workshop: Designing a thinking hour", "Fireside chat: Leading without hurry"];
const RESOURCES = [["The Thinking Hour planner", "One-page weekly planner"], ["Team decision checklist", "Seven questions before any project"], ["Chapter one, free", "Read the opening chapter"]];
const ARTICLES = ["Why your calendar is lying to you", "The two numbers every team needs", "What slow companies understand"];

function NonfictionDemo() {
  const [open, setOpen] = useState(0);
  const [form, setForm] = useState({ name: "", email: "", topic: TOPICS[0]!, msg: "" });
  const [err, setErr] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const x: Record<string, string> = {};
    if (!form.name.trim()) x.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) x.email = "Please enter a valid email address.";
    if (form.msg.trim().length < 10) x.msg = "Please add a short message (10 characters or more).";
    setErr(x);
    if (!Object.keys(x).length) { setSent(true); trackEvent("showcase_sample_form", { sample: "nonfiction" }); }
  };
  const field = "w-full min-h-11 rounded-md border border-[#08263f]/30 bg-white px-3";
  return (
    <div className="min-h-screen bg-[#f4f8fb] font-sans text-[#0b2236]">
      <a href="#s6-main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[60] focus:bg-white focus:px-4 focus:py-2">Skip to content</a>
      <DemoBar n="06" className="bg-[#08263f] text-white" btnClass="rounded bg-[#8fd0ff] text-[#08263f]" />
      <header className="border-b border-[#08263f]/10 bg-white"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <a href="#s6-main" className={cn("text-xl font-bold tracking-tight", FOCUS)}>Dr. Amara Quinn</a>
        <nav aria-label="Sample site" className="flex flex-wrap gap-x-5">{NAV.map(([l, id]) => <a key={id} href={`#${id}`} className={cn("flex min-h-11 items-center text-sm font-medium text-[#33526b] hover:text-[#08263f]", FOCUS)}>{l}</a>)}</nav>
      </div></header>

      <main id="s6-main" tabIndex={-1} className="outline-none">
        <section aria-labelledby="s6-hero" className="bg-white"><div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:py-20">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-[#1f6fa8]">Author, speaker, advisor</p>
            <h1 id="s6-hero" className="text-5xl font-bold leading-[1.03] tracking-tight sm:text-6xl">The fastest teams know when to slow down.</h1>
            <p className="mt-5 max-w-xl text-lg text-[#33526b]">Amara Quinn helps leaders build calmer, faster, more focused organisations, and wrote the book on how.</p>
            <div className="mt-6 flex flex-wrap gap-3"><a href="#s6-book" className={cn("inline-flex min-h-11 items-center rounded bg-[#1f6fa8] px-6 font-semibold text-white", FOCUS)}>Get the book</a><a href="#s6-speak" className={cn("inline-flex min-h-11 items-center rounded border border-[#1f6fa8] px-6 font-semibold text-[#1f6fa8]", FOCUS)}>Book Amara to speak</a></div>
            <p className="mt-3 text-xs text-[#5a768c]">Fictional author and book created for this demonstration.</p>
          </div>
          <div className="mx-auto w-64 md:w-full"><Portrait name="Dr. Amara Quinn" skin="#8a5a3c" hair="#1b1b1b" style="waves" shirt="#08263f" glasses bg={["#dbeeff", "#9ecbff"]} className="rounded-2xl shadow-xl" /></div>
        </div></section>

        <section id="s6-book" aria-labelledby="s6-book-h" className="mx-auto grid max-w-6xl scroll-mt-6 items-center gap-10 px-5 py-16 md:grid-cols-[0.6fr_1fr]">
          <Reveal><div className="mx-auto w-56 sm:w-64"><BookMockup tilt={-18}><CoverArt motif="steps" title="The Slow Advantage" author="Dr. Amara Quinn" tag="Nonfiction" palette={PAL} /></BookMockup></div></Reveal>
          <div>
            <h2 id="s6-book-h" className="text-4xl font-bold tracking-tight">The Slow Advantage</h2>
            <p className="mt-1 text-[#33526b]">Why the most productive organisations protect time to think.</p>
            <p className="mt-4 max-w-xl text-lg">Backed by case studies and a practical four-part method, this book shows leaders how to trade busyness for results.</p>
            <div className="mt-5"><BuyRow sample="nonfiction" primaryClass="rounded bg-[#1f6fa8] px-5 text-sm font-semibold text-white" btnClass="rounded border border-[#1f6fa8] px-5 text-sm font-semibold text-[#1f6fa8] hover:bg-[#dbeeff]" noteClass="text-[#33526b]" /></div>
          </div>
        </section>

        <section id="s6-ideas" aria-labelledby="s6-ideas-h" className="scroll-mt-6 bg-white px-5 py-16"><div className="mx-auto max-w-3xl">
          <h2 id="s6-ideas-h" className="text-4xl font-bold tracking-tight">Four ideas from the book</h2>
          <ul className="mt-6 divide-y divide-[#08263f]/10 border-y border-[#08263f]/10">
            {IDEAS.map(([t, d], i) => (
              <li key={t}>
                <button type="button" aria-expanded={open === i} aria-controls={`s6-i${i}`} onClick={() => setOpen(open === i ? -1 : i)} className={cn("flex min-h-14 w-full items-center justify-between gap-4 py-3 text-left text-xl font-semibold", FOCUS)}><span><span className="mr-3 text-[#1f6fa8]">0{i + 1}</span>{t}</span><ChevronDown className={cn("h-5 w-5 shrink-0 transition-transform", open === i && "rotate-180")} aria-hidden="true" /></button>
                {open === i && <p id={`s6-i${i}`} className="pb-4 pl-9 text-[#33526b]">{d}</p>}
              </li>
            ))}
          </ul>
        </div></section>

        <section id="s6-speak" aria-labelledby="s6-speak-h" className="mx-auto grid max-w-6xl scroll-mt-6 gap-10 px-5 py-16 md:grid-cols-2">
          <div>
            <h2 id="s6-speak-h" className="text-4xl font-bold tracking-tight">Speaking and consulting</h2>
            <ul className="mt-5 space-y-3">{TOPICS.map((t) => <li key={t} className="rounded-lg border border-[#08263f]/15 bg-white p-4 font-semibold">{t}</li>)}</ul>
            <p className="mt-4 text-sm text-[#5a768c]">Fictional topics for demonstration.</p>
          </div>
          <form onSubmit={submit} noValidate className="rounded-2xl border border-[#08263f]/15 bg-white p-6">
            {sent ? <p role="status" className="font-semibold">Thanks, {form.name}. Demo only: nothing was sent. On a live site this goes to your inbox.</p> : <>
              <p className="text-xl font-bold">Enquire about a booking</p>
              {([["name", "Your name", "text"], ["email", "Email address", "email"]] as const).map(([k, l, t]) => <div key={k} className="mt-3"><label htmlFor={`s6-${k}`} className="text-sm font-medium">{l}</label><input id={`s6-${k}`} type={t} value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} aria-invalid={!!err[k]} className={field} />{err[k] && <p role="alert" className="text-sm text-red-700">{err[k]}</p>}</div>)}
              <div className="mt-3"><label htmlFor="s6-topic" className="text-sm font-medium">Topic</label><select id="s6-topic" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })} className={field}>{TOPICS.map((t) => <option key={t}>{t}</option>)}</select></div>
              <div className="mt-3"><label htmlFor="s6-msg" className="text-sm font-medium">Message</label><textarea id="s6-msg" rows={3} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} aria-invalid={!!err.msg} className={cn(field, "py-2")} />{err.msg && <p role="alert" className="text-sm text-red-700">{err.msg}</p>}</div>
              <button type="submit" className={cn("mt-4 min-h-11 rounded bg-[#1f6fa8] px-6 font-semibold text-white", FOCUS)}>Send enquiry</button>
            </>}
          </form>
        </section>

        <section id="s6-res" aria-labelledby="s6-res-h" className="scroll-mt-6 bg-[#08263f] px-5 py-16 text-white"><div className="mx-auto max-w-6xl">
          <h2 id="s6-res-h" className="text-4xl font-bold tracking-tight">Resources and articles</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{RESOURCES.map(([t, d]) => <div key={t} className="rounded-lg bg-white/10 p-5"><p className="text-xl font-semibold">{t}</p><p className="text-sm text-[#cfe6ff]">{d}</p><p className="mt-2 text-xs uppercase tracking-widest text-[#8fd0ff]">Download available on a live site</p></div>)}</div>
          <ul className="mt-8 space-y-2 text-lg">{ARTICLES.map((a) => <li key={a} className="border-b border-white/15 py-2">{a}</li>)}</ul>
        </div></section>

        <section id="s6-news" aria-labelledby="s6-news-h" className="mx-auto max-w-2xl scroll-mt-6 px-5 py-16 text-center">
          <h2 id="s6-news-h" className="text-4xl font-bold tracking-tight">The Thinking Hour newsletter</h2>
          <p className="mt-3 text-[#33526b]">One practical idea every week for leaders who want to do less, better.</p>
          <NewsletterDemo className="mt-6 text-left" inputClass="rounded-md border border-[#08263f]/30 bg-white px-4" buttonClass="rounded bg-[#1f6fa8] px-6 font-semibold text-white" />
        </section>
      </main>
      <AgencyCta n="06" heading="Turn your expertise into a website that wins bookings." className="bg-[#1f6fa8] text-white" btnClass="rounded bg-white text-[#08263f]" ghostClass="rounded border border-white/70 hover:bg-white/10" />
      <footer className="px-5 py-8 text-center text-xs text-[#5a768c]">Demonstration concept by Literary Marketing. All authors, books, topics and artwork are fictional. Sample handle (not real): @amaraquinn</footer>
    </div>
  );
}
