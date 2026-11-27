import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Original vector artwork for the showcase demos. Everything here is drawn in code (SVG), so it is
 * resolution independent and stays sharp at any size. It is illustration, not photography.
 * Palette order: [dark, mid, light/accent, text].
 */
export type Palette = [string, string, string, string];
export type Motif = "harbor" | "orchard" | "bloom" | "crown" | "glass" | "steps" | "moon" | "river" | "deco" | "map";

const STARS = Array.from({ length: 70 }, (_, i) => ({ x: (i * 97) % 600, y: (i * 53) % 520, r: ((i * 7) % 3) * 0.7 + 0.7 }));
const SERIF = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "'DM Sans', system-ui, sans-serif";

function wrap(t: string, max = 13) {
  const lines: string[] = [];
  let cur = "";
  for (const w of t.split(" ")) {
    if ((cur + " " + w).trim().length > max && cur) { lines.push(cur); cur = w; } else cur = (cur + " " + w).trim();
  }
  if (cur) lines.push(cur);
  return lines;
}

function Motifs({ motif, p }: { motif: Motif; p: Palette }) {
  const [d, m, l] = p;
  switch (motif) {
    case "harbor":
      return (
        <g>
          {STARS.slice(0, 40).map((s, i) => <circle key={i} cx={s.x} cy={s.y * 0.8} r={s.r * 0.7} fill={l} opacity=".55" />)}
          <circle cx="420" cy="250" r="200" fill={l} opacity=".1" />
          <circle cx="420" cy="250" r="130" fill={l} opacity=".18" />
          <circle cx="420" cy="250" r="92" fill={l} />
          <path d="M0 470H60V420H74V470H130V440H200V470H258V380H268V470H330V450H420V470H470V400H480V470H600V580H0Z" fill={d} />
          <path d="M268 382L360 336L364 344L272 392Z" fill={d} />
          <path d="M80 580L98 350H126L144 580Z" fill={d} />
          <rect x="96" y="330" width="32" height="24" fill={l} />
          <path d="M112 330L40 300M112 330L184 300" stroke={l} strokeWidth="3" opacity=".7" />
          <rect y="580" width="600" height="140" fill={m} />
          {Array.from({ length: 8 }, (_, i) => <rect key={i} x={300 - (150 - i * 9)} y={594 + i * 16} width={(150 - i * 9) * 2} height="4" rx="2" fill={l} opacity={0.5 - i * 0.05} />)}
        </g>
      );
    case "orchard":
      return (
        <g>
          <circle cx="300" cy="250" r="150" fill={l} opacity=".35" />
          <circle cx="300" cy="250" r="96" fill={l} opacity=".85" />
          <path d="M0 420C140 380 280 400 600 360V720H0Z" fill={m} opacity=".55" />
          {[[90, 450, 0.7], [250, 470, 0.7], [430, 455, 0.7], [520, 480, 0.7], [160, 540, 1], [370, 560, 1]].map(([x, y, s], i) => (
            <g key={i} transform={`translate(${x} ${y}) scale(${s})`}>
              <rect x="-7" y="0" width="14" height="70" fill={d} />
              <circle cx="0" cy="-10" r="48" fill={d} opacity=".92" />
              <circle cx="-30" cy="10" r="30" fill={d} opacity=".92" />
              <circle cx="30" cy="10" r="30" fill={d} opacity=".92" />
              {[[-14, -24], [18, -4], [-24, 14], [8, 22]].map(([cx, cy], j) => <circle key={j} cx={cx} cy={cy} r="5" fill={l} />)}
            </g>
          ))}
          <path d="M0 620C160 590 340 650 600 600V720H0Z" fill={d} opacity=".5" />
        </g>
      );
    case "bloom":
      return (
        <g transform="translate(300 300)">
          {Array.from({ length: 12 }, (_, i) => <ellipse key={i} cx="0" cy="-132" rx="46" ry="128" transform={`rotate(${i * 30})`} fill={l} opacity=".28" />)}
          {Array.from({ length: 10 }, (_, i) => <ellipse key={i} cx="0" cy="-98" rx="44" ry="96" transform={`rotate(${i * 36 + 18})`} fill={m} opacity=".85" />)}
          {Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="0" cy="-60" rx="32" ry="62" transform={`rotate(${i * 45})`} fill={l} opacity=".95" />)}
          <circle r="38" fill={d} />
          {Array.from({ length: 14 }, (_, i) => <circle key={i} cx={Math.cos(i * 0.45) * 22} cy={Math.sin(i * 0.45) * 22} r="3" fill={l} />)}
          <path d="M-150 280C-90 220 -40 300 0 250C40 300 90 220 150 280" stroke={d} strokeWidth="4" fill="none" opacity=".4" />
        </g>
      );
    case "crown":
      return (
        <g>
          {STARS.map((s, i) => <circle key={i} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity=".8" />)}
          <path d="M-20 330C120 250 240 340 360 260S560 300 640 240" stroke={l} strokeWidth="34" fill="none" opacity=".28" />
          <path d="M-20 380C140 300 260 380 380 310S560 340 640 290" stroke={m} strokeWidth="22" fill="none" opacity=".4" />
          <circle cx="300" cy="270" r="130" fill={l} opacity=".18" />
          <path d="M0 520L110 400L190 470L300 340L410 470L490 410L600 520V720H0Z" fill={m} />
          <path d="M0 600L90 520L180 580L300 470L420 580L520 520L600 590V720H0Z" fill={d} />
          <path d="M222 330L240 250L274 300L300 226L326 300L360 250L378 330Z" fill={l} />
          <rect x="222" y="330" width="156" height="22" rx="4" fill={l} />
          {[[240, 250], [300, 226], [360, 250]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="7" fill="#fff" />)}
        </g>
      );
    case "glass":
      return (
        <g>
          {Array.from({ length: 16 }, (_, i) => <rect key={i} x={i * 40 + 6} y={120 + ((i * 53) % 220)} width="28" height={500 - ((i * 53) % 220)} fill={m} opacity={0.35 + (i % 3) * 0.1} />)}
          {Array.from({ length: 16 }, (_, i) => { const a = (i / 16) * Math.PI * 2; const r1 = 60 + (i % 3) * 40; const r2 = 250 + ((i * 37) % 160); return <line key={i} x1={300 + Math.cos(a) * r1 * 0.3} y1={300 + Math.sin(a) * r1 * 0.3} x2={300 + Math.cos(a) * r2} y2={300 + Math.sin(a) * r2} stroke={l} strokeWidth={i % 2 ? 1.5 : 3} opacity=".8" />; })}
          {[70, 120, 180].map((r, i) => <polygon key={i} points={Array.from({ length: 9 }, (_, k) => `${300 + Math.cos(k * 0.7 + i) * r},${300 + Math.sin(k * 0.7 + i) * r}`).join(" ")} fill="none" stroke={l} strokeWidth="1.5" opacity=".6" />)}
          <circle cx="300" cy="300" r="14" fill={l} />
          <circle cx="300" cy="520" r="26" fill={d} />
          <path d="M262 720L270 560Q300 530 330 560L338 720Z" fill={d} />
          {Array.from({ length: 22 }, (_, i) => <line key={i} x1={(i * 29) % 600} y1={(i * 71) % 400} x2={((i * 29) % 600) - 30} y2={((i * 71) % 400) + 80} stroke={l} opacity=".18" />)}
        </g>
      );
    case "steps":
      return (
        <g>
          {[0, 1, 2, 3].map((i) => <line key={i} x1="60" x2="540" y1={180 + i * 120} y2={180 + i * 120} stroke={l} opacity=".25" />)}
          {[110, 190, 270, 360, 460].map((h, i) => <rect key={i} x={70 + i * 98} y={640 - h} width="78" height={h} rx="6" fill={i === 4 ? l : m} opacity={i === 4 ? 1 : 0.55 + i * 0.1} />)}
          <path d="M70 560C190 520 300 470 420 370L520 250" stroke={l} strokeWidth="6" fill="none" strokeLinecap="round" />
          <path d="M492 250H524V282" stroke={l} strokeWidth="6" fill="none" strokeLinecap="round" />
          <circle cx="470" cy="140" r="60" fill={l} opacity=".9" />
        </g>
      );
    case "moon":
      return (
        <g>
          {[[80, 110], [500, 90], [130, 280], [520, 300], [300, 60]].map(([x, y], i) => <path key={i} transform={`translate(${x} ${y})`} d="M0 -18L5 -5L18 0L5 5L0 18L-5 5L-18 0L-5 -5Z" fill="#fff" opacity=".9" />)}
          <circle cx="300" cy="270" r="170" fill={l} />
          {[[250, 220, 30], [350, 300, 40], [290, 340, 22], [360, 200, 18]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} fill={m} opacity=".35" />)}
          <ellipse cx="150" cy="430" rx="110" ry="34" fill="#fff" opacity=".95" />
          <ellipse cx="450" cy="380" rx="96" ry="28" fill="#fff" opacity=".95" />
          <path d="M0 560C120 500 240 580 360 540S520 520 600 560V720H0Z" fill={m} />
          <path d="M0 640C140 600 300 660 600 620V720H0Z" fill={d} />
          <rect x="430" y="500" width="70" height="56" fill="#fff" />
          <path d="M420 500L465 462L510 500Z" fill={l} />
          <rect x="456" y="522" width="18" height="34" fill={d} />
          <path d="M180 560L200 500L220 560Z" fill={d} />
        </g>
      );
    case "river":
      return (
        <g>
          <circle cx="420" cy="230" r="96" fill={l} opacity=".85" />
          <path d="M0 400C120 330 240 380 330 320S520 330 600 300V720H0Z" fill={m} opacity=".6" />
          <path d="M0 470C160 420 260 480 380 430S540 440 600 410V720H0Z" fill={d} opacity=".55" />
          <path d="M250 720C250 640 360 640 330 560C310 500 200 500 240 440C262 410 330 420 360 400L380 420C330 440 280 450 290 480C300 520 420 540 430 600C440 660 380 680 400 720Z" fill={l} opacity=".8" />
          {[[80, 520], [150, 560], [500, 500]].map(([x, y], i) => <g key={i} transform={`translate(${x} ${y})`}><rect x="-4" width="8" height="50" fill={d} /><path d="M0 -50L30 10H-30Z" fill={d} /></g>)}
          <path d="M300 612Q330 590 360 612M300 612V640M360 612V640M300 640H360" stroke={d} strokeWidth="4" fill="none" />
        </g>
      );
    case "deco":
      return (
        <g transform="translate(300 560)">
          {Array.from({ length: 19 }, (_, i) => { const a = Math.PI + (i / 18) * Math.PI; return <line key={i} x1={Math.cos(a) * 70} y1={Math.sin(a) * 70} x2={Math.cos(a) * 420} y2={Math.sin(a) * 420} stroke={l} strokeWidth="2" opacity=".85" />; })}
          {[110, 170, 230, 290, 350].map((r, i) => <path key={i} d={`M${-r} 0A${r} ${r} 0 0 1 ${r} 0`} fill="none" stroke={l} strokeWidth={i % 2 ? 1.5 : 3} opacity=".9" />)}
          <path d="M-70 0A70 70 0 0 1 70 0Z" fill={l} />
          <rect x="-260" y="0" width="520" height="6" fill={l} />
        </g>
      );
    case "map":
      return (
        <g>
          {[300, 250, 205, 160].map((r, i) => <path key={i} d={`M${300 - r} 300C${300 - r} ${220 - i * 10} ${300 - r / 2} ${150 + i * 12} 300 ${160 + i * 12}S${300 + r} ${230 - i * 10} ${300 + r} 300S${300 + r / 2} ${460 - i * 6} 300 ${450 - i * 12}S${300 - r} 380 ${300 - r} 300Z`} fill="none" stroke={l} strokeWidth="2" opacity={0.7 - i * 0.12} />)}
          <circle cx="300" cy="305" r="120" fill={d} opacity=".85" stroke={l} strokeWidth="4" />
          {Array.from({ length: 12 }, (_, i) => <line key={i} x1={300 + Math.cos((i * Math.PI) / 6) * 104} y1={305 + Math.sin((i * Math.PI) / 6) * 104} x2={300 + Math.cos((i * Math.PI) / 6) * 116} y2={305 + Math.sin((i * Math.PI) / 6) * 116} stroke={l} strokeWidth="4" />)}
          <path d="M300 305V236M300 305L350 330" stroke={l} strokeWidth="6" strokeLinecap="round" />
          <circle cx="300" cy="305" r="9" fill={l} />
          {[[120, 520], [470, 560], [90, 150], [520, 170]].map(([x, y], i) => <g key={i}><circle cx={x} cy={y} r="8" fill={l} /><circle cx={x} cy={y} r="20" fill="none" stroke={l} opacity=".5" /></g>)}
        </g>
      );
  }
}

export function CoverArt({ motif, title, author, tag = "A Novel", palette, className, label }: { motif: Motif; title: string; author: string; tag?: string; palette: Palette; className?: string; label?: string }) {
  const uid = useId().replace(/:/g, "");
  const [d, m, l, ink] = palette;
  const lines = wrap(title);
  const longest = Math.max(...lines.map((x) => x.length));
  const size = Math.min(88, 500 / (longest * 0.56));
  const startY = 735 - (lines.length - 1) * size * 0.5;
  return (
    <svg viewBox="0 0 600 900" role="img" aria-label={label ?? `Illustrated cover artwork for ${title} by ${author}`} className={cn("block h-auto w-full", className)}>
      <defs>
        <linearGradient id={`${uid}g`} x1="0" y1="0" x2="0.3" y2="1"><stop offset="0" stopColor={m} /><stop offset="1" stopColor={d} /></linearGradient>
        <linearGradient id={`${uid}f`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={d} stopOpacity="0" /><stop offset=".55" stopColor={d} stopOpacity=".88" /><stop offset="1" stopColor={d} /></linearGradient>
        <linearGradient id={`${uid}s`} x1="0" x2="1"><stop offset="0" stopColor="#000" stopOpacity=".5" /><stop offset=".08" stopColor="#fff" stopOpacity=".16" /><stop offset=".12" stopColor="#000" stopOpacity=".12" /><stop offset="1" stopColor="#000" stopOpacity="0" /></linearGradient>
        <filter id={`${uid}n`}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="4" /><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .09 0" /></filter>
      </defs>
      <rect width="600" height="900" fill={`url(#${uid}g)`} />
      <Motifs motif={motif} p={palette} />
      <rect y="430" width="600" height="470" fill={`url(#${uid}f)`} />
      <text x="300" y="74" textAnchor="middle" fill={ink} opacity=".85" fontFamily={SANS} fontSize="21" letterSpacing="7">{tag.toUpperCase()}</text>
      <text textAnchor="middle" fill={ink} fontFamily={SERIF} fontWeight="700" fontSize={size}>
        {lines.map((ln, i) => <tspan key={i} x="300" y={startY + i * size * 1.02}>{ln.toUpperCase()}</tspan>)}
      </text>
      <rect x="230" y="818" width="140" height="3" fill={l} />
      <text x="300" y="862" textAnchor="middle" fill={ink} fontFamily={SANS} fontSize="26" letterSpacing="8">{author.toUpperCase()}</text>
      <rect width="600" height="900" filter={`url(#${uid}n)`} />
      <rect width="600" height="900" fill={`url(#${uid}s)`} />
      <rect x="16" y="16" width="568" height="868" fill="none" stroke={l} strokeOpacity=".35" />
    </svg>
  );
}

export type HairStyle = "short" | "long" | "curly" | "bun" | "bald" | "waves";

/** Illustrated author portrait (vector illustration, not a photograph). */
export function Portrait({ skin = "#c68642", hair = "#2b1d14", style = "short", shirt = "#2f3b34", bg = ["#e9e1d0", "#c9bfa8"], glasses = false, beard = false, name, className }: { skin?: string; hair?: string; style?: HairStyle; shirt?: string; bg?: [string, string]; glasses?: boolean; beard?: boolean; name: string; className?: string }) {
  const uid = useId().replace(/:/g, "");
  const front = style === "waves" ? "M108 215C100 130 160 104 205 108C262 112 300 150 292 215C276 176 240 150 196 156C158 160 126 180 108 215Z" : "M112 205C112 130 160 112 200 112C245 112 290 135 288 205C270 170 240 160 200 160C160 160 130 170 112 205Z";
  return (
    <svg viewBox="0 0 400 500" role="img" aria-label={`Illustrated portrait of ${name} (artwork, not a photograph)`} className={cn("block h-auto w-full", className)}>
      <defs>
        <linearGradient id={`${uid}b`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={bg[0]} /><stop offset="1" stopColor={bg[1]} /></linearGradient>
        <linearGradient id={`${uid}k`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity=".16" /><stop offset=".5" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".16" /></linearGradient>
      </defs>
      <rect width="400" height="500" fill={`url(#${uid}b)`} />
      <circle cx="320" cy="90" r="120" fill="#fff" opacity=".16" />
      <circle cx="60" cy="430" r="150" fill="#000" opacity=".06" />
      {(style === "long") && <path d="M100 230C84 120 150 96 200 96C252 96 316 120 300 230L314 430H86Z" fill={hair} />}
      {style === "curly" && Array.from({ length: 16 }, (_, i) => { const a = Math.PI + (i / 15) * Math.PI; return <circle key={i} cx={200 + Math.cos(a) * 92} cy={205 + Math.sin(a) * 100} r="34" fill={hair} />; })}
      {style === "bun" && <circle cx="200" cy="92" r="42" fill={hair} />}
      <path d="M30 500C30 420 100 384 200 384C300 384 370 420 370 500Z" fill={shirt} />
      <path d="M150 384L200 440L250 384" fill="#fff" opacity=".9" />
      <path d="M150 384L200 440L250 384" fill="none" stroke="#000" strokeOpacity=".15" />
      <rect x="168" y="296" width="64" height="100" rx="24" fill={skin} />
      <rect x="168" y="296" width="64" height="100" rx="24" fill={`url(#${uid}k)`} />
      <path d="M168 340C190 372 210 372 232 340V320H168Z" fill="#000" opacity=".12" />
      <ellipse cx="114" cy="236" rx="14" ry="24" fill={skin} />
      <ellipse cx="286" cy="236" rx="14" ry="24" fill={skin} />
      <ellipse cx="200" cy="232" rx="88" ry="106" fill={skin} />
      <ellipse cx="200" cy="232" rx="88" ry="106" fill={`url(#${uid}k)`} />
      {style !== "bald" && style !== "curly" && <path d={front} fill={hair} />}
      {style === "curly" && <path d="M118 190C130 150 170 140 200 140C240 140 272 152 284 190C260 170 230 164 200 164C170 164 142 170 118 190Z" fill={hair} />}
      <ellipse cx="165" cy="236" rx="12" ry="7.5" fill="#fff" />
      <ellipse cx="235" cy="236" rx="12" ry="7.5" fill="#fff" />
      <circle cx="166" cy="236" r="5.5" fill="#2a1a12" /><circle cx="236" cy="236" r="5.5" fill="#2a1a12" />
      <circle cx="168" cy="234" r="1.8" fill="#fff" /><circle cx="238" cy="234" r="1.8" fill="#fff" />
      <path d="M146 214Q165 204 184 212M216 212Q235 204 254 214" stroke={hair === "#e8e8e8" ? "#999" : hair} strokeWidth="6" strokeLinecap="round" fill="none" />
      <path d="M200 240Q190 272 204 278" stroke="#000" strokeOpacity=".28" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="148" cy="272" r="14" fill="#e07a6a" opacity=".22" /><circle cx="252" cy="272" r="14" fill="#e07a6a" opacity=".22" />
      {beard ? <path d="M118 258C122 330 160 352 200 352C240 352 278 330 282 258C270 292 240 300 200 296C160 300 130 292 118 258Z" fill={hair} /> : null}
      <path d="M172 306Q200 326 228 306" stroke={beard ? "#f3d9d0" : "#8a3b3b"} strokeWidth="5" strokeLinecap="round" fill="none" />
      {glasses && <g fill="none" stroke="#2a2a2a" strokeWidth="4"><rect x="134" y="218" width="62" height="44" rx="16" /><rect x="204" y="218" width="62" height="44" rx="16" /><path d="M196 238H204M134 234L116 228M266 234L284 228" /></g>}
    </svg>
  );
}

/** A 3D hardcover mockup around any cover artwork (pure CSS, no images needed). */
export function BookMockup({ children, className, tilt = -24 }: { children: ReactNode; className?: string; tilt?: number }) {
  return (
    <div className={cn("[perspective:1200px]", className)}>
      <div className="relative mx-auto w-full [transform-style:preserve-3d] transition-transform duration-700 motion-reduce:transition-none" style={{ transform: `rotateY(${tilt}deg) rotateX(3deg)` }}>
        <div className="relative overflow-hidden rounded-[3px] shadow-[18px_28px_40px_-12px_rgba(0,0,0,.55)]">{children}</div>
        <div aria-hidden="true" className="absolute inset-y-[1.5%] -right-[5%] w-[5%] origin-left [transform:rotateY(90deg)] bg-[repeating-linear-gradient(90deg,#f4efe6_0_2px,#d9d2c3_2px_3px)]" />
      </div>
    </div>
  );
}
