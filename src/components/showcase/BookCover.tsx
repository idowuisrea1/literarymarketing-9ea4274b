import { cn } from "@/lib/utils";

/** Original, CSS-drawn fictional cover. No real artwork. Sizes itself from its container width. */
export function BookCover({ title, author, from, to, tag = "A Novel", className }: { title: string; author: string; from: string; to: string; tag?: string; className?: string }) {
  return (
    <div
      role="img"
      aria-label={`Fictional book cover: ${title} by ${author}`}
      className={cn("relative aspect-[2/3] w-full overflow-hidden rounded-[4px] shadow-2xl [container-type:inline-size]", className)}
      style={{ background: `linear-gradient(160deg, ${from}, ${to})` }}
    >
      <div aria-hidden="true" className="absolute inset-0 opacity-35 mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 72% 18%, #fff 0, transparent 46%)" }} />
      <div aria-hidden="true" className="absolute inset-y-0 left-0 w-[6%] bg-black/30" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/45 to-transparent" />
      <div aria-hidden="true" className="absolute inset-0 flex flex-col justify-between p-[9%] pl-[14%] text-white">
        <p className="text-[length:5cqw] uppercase tracking-[0.3em] opacity-80">{tag}</p>
        <p className="font-serif text-[length:15cqw] font-bold uppercase leading-[1.02]">{title}</p>
        <p className="text-[length:5.5cqw] uppercase tracking-[0.22em]">{author}</p>
      </div>
    </div>
  );
}
