import { Link } from "@tanstack/react-router";
import { Reveal } from "./primitives";

export function ShowcaseTeaser() {
  return (
    <section id="website-designs" className="px-5 py-20">
      <Reveal className="glass mx-auto max-w-5xl rounded-3xl p-8 text-center sm:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan">Author Website Showcase</p>
        <h2 className="mt-3 text-3xl font-semibold sm:text-5xl">Your story deserves a <span className="text-gold-gradient">website as extraordinary</span> as your book</h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Explore 125 real author and writer websites, preview them live, and try our own working demo websites. Then tell us what you love and we will build yours.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link to="/author-website-showcase/directory" className="btn-glow inline-flex min-h-11 items-center rounded-full bg-gold-gradient px-7 py-3 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            Browse 125 Website Examples
          </Link>
          <Link to="/author-website-showcase" className="glass inline-flex min-h-11 items-center rounded-full px-7 py-3 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
            See Our Demo Websites
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
