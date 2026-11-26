import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import logo from "@/assets/pf/logo.png.asset.json";
import { trackEvent } from "@/lib/analytics";

export function ShowcaseHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <img src={logo.url} alt="" width={32} height={32} className="h-8 w-8" />
          <span className="font-serif text-lg text-foreground">literary<span className="text-gold">marketing</span></span>
        </Link>
        <nav aria-label="Showcase" className="flex items-center gap-4">
          <Link to="/author-website-showcase" activeOptions={{ exact: true }} className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-gold">Our demos</Link>
          <Link to="/author-website-showcase/directory" activeOptions={{ exact: true }} className="inline-flex min-h-11 items-center text-sm text-muted-foreground transition-colors hover:text-gold">125 website examples</Link>
          <a href="/#contact" onClick={() => trackEvent("cta_click", { cta: "showcase_build_header" })} className="btn-glow inline-flex min-h-11 items-center rounded-full bg-gold-gradient px-5 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Build My Author Website
          </a>
        </nav>
      </div>
    </header>
  );
}
