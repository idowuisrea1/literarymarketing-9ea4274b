import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouterState } from "@tanstack/react-router";
import { CheckCircle2, MessageCircle, Sparkles, Star, X } from "lucide-react";
import { NOTICES, NOTICE_CONFIG, type Kind, type Notice } from "@/data/notifications";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const PREF_KEY = "lm-sales-notices";
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const ICON = { project: CheckCircle2, message: MessageCircle, review: Star, service: Sparkles } as const;

/** Pick a different category than last time, then an item that was not shown recently. */
function pick(pool: Notice[], recent: string[], last: Kind | null): Notice | null {
  const fresh = pool.filter((n) => !recent.includes(n.id));
  const candidates = fresh.length ? fresh : pool;
  const kinds = Array.from(new Set(candidates.map((n) => n.kind)));
  const otherKinds = kinds.filter((k) => k !== last);
  const kindList = otherKinds.length ? otherKinds : kinds;
  const kind = kindList[Math.floor(Math.random() * kindList.length)];
  const items = candidates.filter((n) => n.kind === kind);
  return items[Math.floor(Math.random() * items.length)] ?? null;
}

function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]!.toUpperCase()).join("");
}

function Badge({ n }: { n: Notice }) {
  const text = n.kind === "service" ? "Service" : n.verified ? "Verified" : n.kind === "review" ? "Sample testimonial" : "Sample";
  return <span className="rounded-full border border-gold/40 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-gold">{text}</span>;
}

function Card({ n, reduce, onClose, onOff, onEnter, onLeave }: { n: Notice; reduce: boolean; onClose: () => void; onOff: () => void; onEnter: () => void; onLeave: () => void }) {
  const Icon = ICON[n.kind];
  return (
    <motion.div
      onMouseEnter={onEnter} onMouseLeave={onLeave} onFocusCapture={onEnter} onBlurCapture={onLeave}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
      transition={{ duration: reduce ? 0.15 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="glass pointer-events-auto relative overflow-hidden rounded-2xl border p-3.5 pr-10 shadow-[0_18px_50px_-18px_rgba(0,0,0,0.7)]"
    >
      <button type="button" onClick={onClose} aria-label="Close notification" className="absolute right-0 top-0 grid h-11 w-11 place-items-center text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
        <X className="h-4 w-4" aria-hidden="true" />
      </button>
      <div className="flex gap-3">
        {n.kind === "review" && n.name ? (
          <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold-gradient text-sm font-semibold text-primary-foreground">{initials(n.name)}</span>
        ) : (
          <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold"><Icon className="h-5 w-5" /></span>
        )}
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-snug">{n.title}</p>
          {n.kind === "review" && (
            <span role="img" aria-label={`${n.rating ?? 5} out of 5 stars`} className="mt-0.5 flex gap-0.5 text-gold">
              {Array.from({ length: n.rating ?? 5 }).map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />)}
            </span>
          )}
          <p className="mt-1 line-clamp-3 text-sm text-muted-foreground">{n.kind === "review" || n.kind === "message" ? `“${n.text}”` : n.text}</p>
          {n.kind === "review" && n.name && <p className="mt-1 text-xs text-foreground/80">— {n.name}</p>}
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1">
            <Badge n={n} />
            <a href="/#contact" onClick={() => trackEvent("sales_notice_click", { kind: n.kind, id: n.id })} className="inline-flex min-h-8 items-center text-xs font-semibold text-gold underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Start an enquiry</a>
            <button type="button" onClick={onOff} className="inline-flex min-h-8 items-center text-xs text-muted-foreground underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Turn off</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SalesNotifications() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const reduce = useReducedMotion() ?? false;
  const [enabled, setEnabled] = useState(false);
  const [current, setCurrent] = useState<Notice | null>(null);
  const currentRef = useRef<Notice | null>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const blocked = useRef(false);
  const hovering = useRef(false);
  const mem = useRef({ shown: 0, last: null as Kind | null, recent: [] as string[] });
  // Notifications stay off the admin area and inside the standalone sample websites.
  const hidden = pathname.startsWith("/admin") || pathname.startsWith("/author-website-showcase/");

  useEffect(() => {
    try { setEnabled(localStorage.getItem(PREF_KEY) !== "off"); } catch { setEnabled(true); }
  }, []);

  const dismissAfter = useCallback((ms: number) => {
    clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => { currentRef.current = null; setCurrent(null); }, ms);
  }, []);

  // Stay out of the way while the enquiry section is on screen.
  useEffect(() => {
    blocked.current = false;
    const el = document.getElementById("contact");
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      blocked.current = !!e?.isIntersecting;
      if (blocked.current && currentRef.current) dismissAfter(300);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [pathname, dismissAfter]);

  useEffect(() => {
    if (!enabled || hidden || NOTICES.length === 0) return;
    const cfg = NOTICE_CONFIG;
    const slow = reduce ? 1.5 : 1;
    let timer: ReturnType<typeof setTimeout>;

    const canShow = () => {
      if (document.hidden || blocked.current || hovering.current || currentRef.current) return false;
      if (document.body.style.overflow === "hidden" || document.querySelector("dialog[open]")) return false;
      const a = document.activeElement as HTMLElement | null;
      if (a && (/^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName) || a.isContentEditable)) return false;
      return true;
    };

    const tick = () => {
      const m = mem.current;
      if (m.shown >= cfg.maxPerSession) return;
      if (!canShow()) { timer = setTimeout(tick, 4000); return; }
      const n = pick(NOTICES, m.recent, m.last);
      if (!n) return;
      m.recent.push(n.id);
      if (m.recent.length > Math.min(cfg.recentMemory, NOTICES.length - 1)) m.recent.shift();
      m.last = n.kind;
      m.shown += 1;
      currentRef.current = n;
      setCurrent(n);
      trackEvent("sales_notice_view", { kind: n.kind, id: n.id });
      dismissAfter(cfg.durationMs);
      timer = setTimeout(tick, (cfg.durationMs + rand(cfg.minGapMs, cfg.maxGapMs)) * slow);
    };

    timer = setTimeout(tick, cfg.initialDelayMs * slow);
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer.current);
      currentRef.current = null;
      setCurrent(null);
    };
  }, [enabled, hidden, reduce, dismissAfter]);

  const close = () => { clearTimeout(hideTimer.current); hovering.current = false; currentRef.current = null; setCurrent(null); trackEvent("sales_notice_dismiss"); };
  const turnOff = () => {
    try { localStorage.setItem(PREF_KEY, "off"); } catch { /* ignore */ }
    close(); setEnabled(false); trackEvent("sales_notice_off");
  };

  if (!enabled || hidden) return null;
  return (
    <section aria-label="Sample activity notifications" className={cn("pointer-events-none fixed bottom-[5.5rem] left-3 z-30 w-[calc(100vw-6.5rem)] max-w-sm md:bottom-6 md:left-6 md:w-[22rem]")}>
      <AnimatePresence>
        {current && (
          <Card key={current.id} n={current} reduce={reduce} onClose={close} onOff={turnOff}
            onEnter={() => { hovering.current = true; clearTimeout(hideTimer.current); }}
            onLeave={() => { hovering.current = false; dismissAfter(2500); }} />
        )}
      </AnimatePresence>
    </section>
  );
}
