# Literarymarketing — Current animation implementation audit

Updated: 2026-11-03. This replaces historical PR/deployment claims with current source and checks from this session.

## Scope and status vocabulary

Source inspected: existing `/` and `/admin`, site motion components, business-data imports, and leaf-route metadata. No routes, SEO, business copy, pricing, forms or backend/admin logic were changed. No dependency was added and nothing was published.

Statuses: **IMPLEMENTED AND VERIFIED**, **IMPLEMENTED, NOT FULLY VERIFIED**, **NOT APPLICABLE WITH REASON**, **BLOCKED WITH EXACT REASON**. A verified status applies only to the specific browser checks stated in its evidence, not every device or failure mode. All other implemented effects remain NOT FULLY VERIFIED; simply seeing their code is not verification.

## 30-category matrix

| # | Category | Status | Current source evidence and limitations |
|---:|---|---|---|
| 1 | Cinematic scroll storytelling | IMPLEMENTED, NOT FULLY VERIFIED | `CinematicReel` uses a finite pinned desktop horizontal reel and native compact scroll-snap fallback. The image card and its modal were exercised, but the entire chapter progression was not visually reviewed. Existing eight trailers are retained; a ninth existing image project is appended because the previous eight contained no image-type card. Existing “01—08” copy is retained, so it now understates the card count. |
| 2 | Interactive 3D worlds | IMPLEMENTED, NOT FULLY VERIFIED | `Book3D` supplies the hero's lazy R3F book scene. Its full rendering, controls and failure handling were not targeted in this browser run. |
| 3 | Kinetic typography | IMPLEMENTED, NOT FULLY VERIFIED | Hero word entrances and `KineticHeading` real DOM text. No dedicated typography visual test. |
| 4 | Scroll-controlled video / image-sequence alternative | IMPLEMENTED, NOT FULLY VERIFIED | `ScrollStory` is rendered inside `CaseStudy`: existing portfolio images crossfade on a 2D canvas with scroll progress, with stacked static chapters for small/coarse/reduced-motion environments. This is an image sequence, NOT scrubbed video. Browser reported a Motion target-ref hydration error; the sequence was not verified. Literal scroll-controlled video is unavailable because there is no owned video source. |
| 5 | Liquid and fluid transitions | IMPLEMENTED, NOT FULLY VERIFIED | SVG morphology, CSS fluid treatment, and the one-card WebGL ripple/crossfade exist. The ripple rendered, but this broad category was not comprehensively tested. |
| 6 | Magnetic and physics-based interactions | IMPLEMENTED, NOT FULLY VERIFIED | `GlowButton`/`GlowLink` magnetic movement and `Tilt` fine-pointer/reduced-motion gates; not a general physics engine. Not individually tested. |
| 7 | Infinite horizontal worlds | IMPLEMENTED, NOT FULLY VERIFIED | Marquee and horizontally navigable reel/rails. The reel itself is finite; no unbounded world is claimed. |
| 8 | Particle transformations | IMPLEMENTED, NOT FULLY VERIFIED | `ParticleLogo` samples opaque logo pixels into spring-driven canvas particles, pointer repulsion and reformation; wired into `LogoLoader`. Static image on reduced motion/context/image-read failure. Coarse-pointer gating is NOT present despite the source comment, and logo aspect/color fidelity was not checked. |
| 9 | Advanced image reveals | IMPLEMENTED, NOT FULLY VERIFIED | Portfolio clip-path/image styling, reel image entrances and founder mask. Full reveal behavior not individually checked. |
| 10 | Reactive cursor experiences | IMPLEMENTED, NOT FULLY VERIFIED | `MotionDirector`, pointer-aware headings and magnetic controls. No forced custom cursor. Not individually verified. |
| 11 | Cinematic page transitions | IMPLEMENTED, NOT FULLY VERIFIED | Root motion wrapper/AnimatePresence between existing routes. No route-transition browser check this session. |
| 12 | Scroll-to-zoom experiences | IMPLEMENTED, NOT FULLY VERIFIED | Reel images scale on entering view and ScrollStory crossfade scale changes. This is not a continuous 3D camera zoom system; sequence unverified. |
| 13 | 3D image carousels | IMPLEMENTED, NOT FULLY VERIFIED | Portfolio CSS perspective orbit with previous/next controls and reduced-motion handling. Retained untouched; not directly exercised. |
| 14 | Split-screen storytelling | IMPLEMENTED, NOT FULLY VERIFIED | Existing responsive case-study/contact layouts, desktop sticky visual. Not directly exercised. |
| 15 | Image-to-image morphing | IMPLEMENTED, NOT FULLY VERIFIED | Displacement shader blends the first image card's original Mały Przyjaciel asset into the existing Cloak King asset; ScrollStory blends chapters. This is ripple/crossfade, not semantic photo morphing. Full transition endpoints not visually compared. |
| 16 | Interactive lighting and shadows | IMPLEMENTED, NOT FULLY VERIFIED | Book scene lighting, MotionDirector pointer atmosphere and card shadows. Not individually verified. |
| 17 | Morphing SVG illustrations | IMPLEMENTED, NOT FULLY VERIFIED | `MorphRing` has three paths with matching M + four cubic-curve + Z structure, interpolated `d`, plus scroll path drawing behind Process icons. `DrawnDivider` is exported but not rendered. Rings not individually verified; reduced motion suppresses the morph timer but initial path drawing remains. |
| 18 | Liquid typography | IMPLEMENTED, NOT FULLY VERIFIED | `KineticHeading` uses feTurbulence/feDisplacementMap on hover, animating distortion back to zero and retaining DOM text. Fine-pointer/reduced-motion gates. Repeated fixed SVG filter ID may affect multiple headings; not individually verified. |
| 19 | Interactive configurators | IMPLEMENTED, NOT FULLY VERIFIED | Existing quiz, service tabs, package ordering and filters. These are selection flows, not a 3D product configurator. Orders/forms were not submitted. |
| 20 | Layered depth and parallax | IMPLEMENTED, NOT FULLY VERIFIED | Hero layered scene, perspective orbit and Tilt. No broad parallax verification. |
| 21 | Scroll-triggered scene transformations | IMPLEMENTED, NOT FULLY VERIFIED | Reveal, scroll-linked reel, SVG drawing and ScrollStory chapter selection. Sequence ref error prevents a clean whole-site verification claim. |
| 22 | Cinematic loading and logo assembly | IMPLEMENTED, NOT FULLY VERIFIED | `LogoLoader` renders ParticleLogo, schedules dismissal after 1400ms, and accepts click/Enter/Space/Escape to skip. Source confirms this; timing/skip/particle assembly were not individually tested. |
| 23 | Hover-to-video transformations | IMPLEMENTED, NOT FULLY VERIFIED | Existing fine-pointer YouTube hover iframe previews with reduced-motion suppression. Click still opens media modal. Some external resources returned 404; playback not verified. |
| 24 | Infinite visual canvas | IMPLEMENTED AND VERIFIED | Optional React.lazy/Suspense ExploreCanvas; Gallery remains default. Browser exercised toggle, zoom in/out, reset, keyboard pan, item opening existing dialog, Escape back to Gallery, and retained Load More (18 of 35). Mobile 390px canvas rendered with no page horizontal overflow. It is finite portfolio content with freeform panning, not infinite content. Mouse drag and all keyboard-focus paths not exhaustively checked. |
| 25 | Animated bento grids | IMPLEMENTED, NOT FULLY VERIFIED | Existing service grids/reveals and portfolio layout animation. These are ordinary responsive grids rather than a dedicated irregular bento engine. |
| 26 | Interactive typography tracking | IMPLEMENTED, NOT FULLY VERIFIED | `KineticHeading` changes letterSpacing and gentle skew from pointer proximity. No variable font-weight or scroll-driven tracking exists. Not individually verified. |
| 27 | Scroll velocity effects | IMPLEMENTED, NOT FULLY VERIFIED | `MotionDirector` scroll-velocity instrumentation and atmosphere. Visible velocity response not individually verified. |
| 28 | Image displacement and ripple | IMPLEMENTED AND VERIFIED | One lazy R3F image enhancement in the first image-type reel card only; gated by noncompact/fine-pointer/non-reduced-motion/WebGL2 support. Browser rendered a nonblank image canvas, hovered it and opened the existing modal. Deliberate context loss selected the original motion.img fallback; fallback screenshot confirmed the image and label. Mobile/reduced-motion contexts mounted no reel WebGL canvas. Texture/CORS failure handling is present through the error boundary but those failures were not separately injected. |
| 29 | Interactive sound design | IMPLEMENTED, NOT FULLY VERIFIED | `sound.ts` synthesizes hover/select/confirm cues and a soft ambient oscillator; header SoundToggle includes aria-pressed and volume slider. Defaults OFF on fresh storage, stores explicit opt-in, restores previous opt-in. Audio can resume on a later visit after stored opt-in; no audio files. No listening/audio browser verification, and complete audio-context/node teardown is not demonstrated. |
| 30 | Living backgrounds | IMPLEMENTED, NOT FULLY VERIFIED | Hero animation, global atmosphere and grain; accessibility/performance behavior not comprehensively verified. |

## Checks actually executed

- **Automatic harness typecheck/build:** not invoked manually (environment requires automatic checks). Latest observed diagnostics after source changes report `build OK`. Initial introduced override-modifier errors in VisualErrorBoundary were observed and corrected. This is not a separately observed production `vite build` command.
- **`bun run lint`: FAILED**, exit 1; 683 reported problems (672 errors, 11 warnings) on the first run, predominantly existing Prettier formatting errors across the repository. No unrelated files were reformatted.
- **`bunx prettier --write src/components/site/Portfolio.tsx src/components/site/CinematicReel.tsx src/components/site/DisplacementImage.tsx src/components/site/VisualErrorBoundary.tsx`: completed.** Formatting only in the changed TSX files.
- **`bunx eslint src/components/site/Portfolio.tsx src/components/site/CinematicReel.tsx src/components/site/DisplacementImage.tsx src/components/site/VisualErrorBoundary.tsx`: PASSED**, exit 0; zero errors, one existing react-refresh export warning for Portfolio's cleanTitle helper.
- **`bunx vitest run`: FAILED**, exit 1; 2 test files passed, 1 failed; 10 tests passed, 1 failed. Existing cleanTitle test expects “The Rose of Death” but receives “The Rose of Death —”. The unchanged title-normalization regex omits the em dash. Left unchanged because the scope prohibits rewriting existing copy/content behavior.
- **`python3 /tmp/browser/motion/check_motion.py`: final run PASSED**, exit 0. Fresh Chromium at 1280×1800, separate reduced-motion 1280×1800 and touch/mobile 390×844 contexts. Software WebGL flags enabled for graphics verification. Exercised the central new view/modal/reel failure paths described in categories 24 and 28. Screenshots inspected for mobile canvas, dialog, ripple and recovered image.
- Manual `bunx tsgo --noEmit` / `bun run build`: **NOT RUN**, because this environment delegates those checks to the automatic harness.

## Known remaining limitations

- Browser page-error event: `Target ref is defined but not hydrated` from Motion scroll-ref handling. Existing ScrollStory conditionally omits its target while displaying static chapters; source supports this as a likely cause, but no stack-based repair was performed in this narrowly scoped pass.
- Browser console also recorded hydration-attribute mismatch warnings and external-resource 404 responses. Deliberate WebGL context loss generated an expected caught React error; the fallback recovered successfully. The session is NOT console-error-free.
- Gallery title-normalization test failure and repository-wide formatting lint failures remain as reported above.
- Gallery canvas Escape also exits the canvas when bubbling from the existing modal; Escape closes the modal and returns to gallery in the exercised flow. No existing lightbox behavior was rewritten.
- First image appended to the reel uses two existing asset-map URLs; original eight reel entries, card actions, labels, orbit, lightbox and Load More are retained.
- No database submissions, authenticated admin readback, booking navigation, checklist email delivery, full screen-reader audit, Lighthouse run, low-power hardware test, exhaustive drag test or production deployment was performed.
- Current leaf metadata was source-inspected: `/` and `/admin` each retain unique title, description, og:title, og:description, og:type and twitter:card. Neither uses a meaningful absolute hero asset URL requiring image tags. No SEO edits were made.
