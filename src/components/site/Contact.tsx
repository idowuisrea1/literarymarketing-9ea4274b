import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Camera as Instagram, Briefcase as Linkedin, PlayCircle as Youtube, AtSign as Twitter, Music2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/pf/logo.png.asset.json";
import { BOOKING_URL, CONTACT, isPlaceholder } from "@/data/site";
import { GlowButton, GlowLink, Reveal, SectionHead } from "./primitives";
import { EnquiryFlow } from "./EnquiryFlow";
import { trackEvent } from "@/lib/analytics";
import { fieldCls } from "./Pricing";

export function Contact() {
  return (
    <section id="contact" className="relative px-5 py-24">
      <SectionHead eyebrow="Contact" title={<>Let's talk about <span className="text-gold-gradient">your book</span></>} sub="Answer a few quick steps. We reply within 24 hours." />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="glass relative overflow-hidden rounded-3xl p-8">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan/10 blur-3xl" />
          <img src={logo.url} alt="" className="h-24 w-24 drop-shadow-[0_0_20px_oklch(0.76_0.13_85/0.5)]" loading="lazy" />
          <h3 className="mt-4 text-3xl font-semibold">Prefer to talk first?</h3>
          <p className="mt-2 text-muted-foreground">Book a free 20-minute strategy call. We'll map out what your book needs, no pressure.</p>
          <div className="mt-6 flex flex-col gap-3">
            <GlowLink href={BOOKING_URL} target="_blank" rel="noopener"><Phone className="h-4 w-4" /> Book a Free Strategy Call</GlowLink>
            <GlowLink href={CONTACT.whatsapp} target="_blank" rel="noopener" variant="ghost"><MessageCircle className="h-4 w-4 text-whatsapp" /> WhatsApp {CONTACT.whatsappDisplay}</GlowLink>
            <a href={`mailto:${CONTACT.email}`} className="flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"><Mail className="h-4 w-4 shrink-0" /><span className="min-w-0 break-all">{CONTACT.email}</span></a>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="glass rounded-3xl p-6 sm:p-8">
          <EnquiryFlow />
        </Reveal>
      </div>
    </section>
  );
}

function Newsletter() {
  const [s, setS] = useState<"idle" | "done" | "error">("idle");
  async function sub(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get("website")) return setS("done");
    const r = z.string().trim().email().max(255).safeParse(fd.get("email"));
    if (!r.success) return setS("error");
    const { error } = await supabase.from("newsletter_subscribers").insert({ email: r.data });
    setS(!error || error.code === "23505" ? "done" : "error");
  }
  if (s === "done") return <p className="text-sm text-gold">You're on the list ✦</p>;
  return (
    <form onSubmit={sub} className="flex gap-2">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <input name="email" type="email" required placeholder="Your email" aria-label="Newsletter email" className={fieldCls} />
      <GlowButton type="submit" className="shrink-0 px-5">Join</GlowButton>
    </form>
  );
}

export function Footer() {
  const S = CONTACT.socials;
  const icons = [[Instagram, S.instagram, "Instagram"], [Music2, S.tiktok, "TikTok"], [Twitter, S.x, "X"], [Linkedin, S.linkedin, "LinkedIn"], [Youtube, S.youtube, "YouTube"]] as const;
  const live = icons.filter(([, href]) => !isPlaceholder(href));
  return (
    <footer className="border-t px-5 pb-28 pt-16 md:pb-12">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1.2fr]">
        <div>
          <img src={logo.url} alt="Literary Marketing logo" className="h-20 w-20 drop-shadow-[0_0_14px_oklch(0.76_0.13_85/0.45)]" loading="lazy" />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">Turning stories into social movements for authors, novelists and publishers.</p>
          <div className="mt-4 flex gap-1">
            {live.length > 0 && live.map(([I, href, l]) => <a key={l} href={href} target="_blank" rel="noopener" aria-label={l} className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:text-gold"><I className="h-5 w-5" /></a>)}
          </div>
        </div>
        <nav aria-label="Footer" className="grid grid-cols-2 gap-2 text-sm">
          {([["Services","services"],["Portfolio","portfolio"],["Process","process"],["Pricing","pricing"],["About","about"],["FAQ","faq"],["Contact","contact"]] as const).map(([l, id]) => (
            <a key={id} href={`#${id}`} className="py-2 text-muted-foreground hover:text-gold">{l}</a>
          ))}
        </nav>
        <div>
          <p className="font-serif text-2xl">Reader-growth tips, monthly</p>
          <p className="mb-3 text-sm text-muted-foreground">One short email. No spam.</p>
          <Newsletter />
        </div>
      </div>
      <div className="hairline mx-auto my-8 max-w-6xl" />
      <p className="text-center font-mono text-xs text-muted-foreground">© {new Date().getFullYear()} literarymarketing · Founded by Idowu Isreal Agboola</p>
    </footer>
  );
}

export function FloatingBars() {
  return (
    <>
      <a href={CONTACT.whatsapp} target="_blank" rel="noopener" aria-label="Chat on WhatsApp"
        className="fixed bottom-24 right-4 z-40 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-background shadow-lg transition-transform hover:scale-110 md:bottom-6">
        <MessageCircle className="h-7 w-7" />
      </a>
      <div className="glass fixed inset-x-3 bottom-3 z-40 grid grid-cols-2 gap-2 rounded-full p-2 md:hidden">
        <a href={BOOKING_URL} target="_blank" rel="noopener" onClick={() => trackEvent("cta_click", { cta: "mobile_book_call" })} className="grid min-h-11 place-items-center rounded-full bg-gold-gradient text-sm font-semibold text-primary-foreground">Book a Call</a>
        <a href={CONTACT.whatsapp} target="_blank" rel="noopener" className="grid min-h-11 place-items-center rounded-full border text-sm font-semibold">WhatsApp</a>
      </div>
    </>
  );
}
