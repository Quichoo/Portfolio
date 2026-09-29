# AGENTS.md

Context for AI coding agents (OpenCode, Claude Code, etc.) working on this repo.

## Project

Brian Quicho's personal portfolio. React + Vite single-page site. Design direction:
black/charcoal base, green accent, glassmorphism, developer-focused identity.
Sections: Hero → About → Skills → Featured Work → Contact, in that nav order.

## Stack

- **React 19 + Vite** — no Next.js, this is a plain SPA
- **UnoCSS** (`presetWind3`) — Tailwind-compatible utility classes. NOT Tailwind itself; the
  project deliberately uses UnoCSS instead.
- **Three.js + @react-three/fiber (v9) + @react-three/drei** — interactive hero background
- **GSAP + ScrollTrigger** — scroll-triggered entrance animations (Featured Work, Skills)
- **Motion** (`motion/react`, formerly Framer Motion) — mouse-driven interactions (project card tilt)
- **lucide-react** — icon set, EXCEPT brand/logo icons (GitHub, LinkedIn), which come from
  `react-icons/fa` instead — lucide-react v1.x dropped brand icons from its core set.
- **@emailjs/browser** — contact form sends via EmailJS (no backend). Keys live in `.env`
  as `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_TEMPLATE_ID`, `VITE_EMAILJS_PUBLIC_KEY`.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build
- Windows/PowerShell environment — do not suggest bash-only syntax (`rm -rf`, etc.)
  without a PowerShell equivalent (`Remove-Item -Recurse -Force`).

## Folder structure

- src/
- components/ — reusable UI (GlassCard, Navigation, ProjectCard, SkillCard, ThreeTest)
- sections/ — page-specific chunks (Hero, About, Skills, FeaturedWork, Contact)
- layouts/ — AppLayout (sidebar + main content shell)
- context/ — ThemeContext (theme MUST live here, not a plain hook — see below)
- hooks/ — useReducedMotion
- styles/ — tokens.css (design system variables)

## Design system — read before touching any visual code

All colors/glass values are CSS custom properties in `src/styles/tokens.css`, NOT UnoCSS
theme colors. This is intentional: light/dark mode swaps values at runtime via
`html[data-theme="light"]`, which UnoCSS's compile-time theme colors can't do. Reference
them via inline `style={{ background: 'var(--color-green)' }}`, not utility classes, for
anything that needs to change between themes.

Key tokens: `--color-void`, `--color-charcoal`, `--glass-fill`, `--glass-blur-strong`,
`--glass-border`, `--color-green`, `--color-green-dim`, `--text-primary/secondary/muted`.

Fonts (set in `uno.config.js` theme.fontFamily): `font-display` = Space Grotesk (headings),
default sans = Inter (body), `font-mono` = JetBrains Mono (nav, labels, badges, code-styled
elements). Buttons/inputs need explicit `font-family: inherit` (set globally in tokens.css)
— browsers don't inherit page font on form elements by default.

Reusable pattern: `GlassCard` component wraps the blur/border/hover-glow treatment. Use it
for any new card-like UI rather than re-implementing the glass styles inline.

## Theme

`ThemeContext.jsx` (React Context) is the single source of truth for dark/light mode —
NOT a plain custom hook. A plain `useTheme` hook with local `useState` was tried first and
was a real bug: each component got its own independent copy of the theme state instead of
sharing one, so toggling wouldn't propagate everywhere (e.g. Hero's Three.js scene never
saw the change). Any new component reading theme must use `useContext` via this provider.

## Navigation / active-state

`Navigation.jsx` combines two mechanisms:

1. `IntersectionObserver` watching each section's `id` for scroll-driven active-state
2. A direct `onClick` handler setting active state immediately on click

Both are required — the observer alone was unreliable for instant scroll-jumps (a click can
land past the detection band before the observer fires a clean intersection event).

Section IDs required for this to work: `#home` `#about` `#skills` `#projects` `#contact`.

Desktop: floating glass sidebar (`hidden md:block`). Mobile: fixed glass pill bar at bottom
(`md:hidden`), icons only. These are two separate JSX blocks in the same component, not one
responsive layout — the mobile nav is a different structure, not a shrunk sidebar.

## Three.js gotchas

- Canvas must be given an explicit non-negative z-index layer (`z-0`) with page text at
  `z-10` above it. Using `-z-10` on the canvas can put it behind the page's own solid
  background color depending on stacking context — renders correctly but is fully hidden.
- Particle size/opacity/blur values that look right on a black background will likely be
  invisible or too faint against a light background and vice versa — always check both
  themes when tuning any Three.js material.
- `pointsMaterial` renders square sprites by default; circular points require a generated
  `CanvasTexture` (draw a circle on an off-screen 2D canvas) applied as `map`, plus
  `alphaTest` to cut the transparent corners.
- Always gate animation loops (`useFrame`) behind `useReducedMotion()` — check
  `window.matchMedia('(prefers-reduced-motion: reduce)')`, not just a DevTools emulation
  flag (which is separate from and can mask/be masked by the real OS setting).
- Current hero background: `ParticleField` (dark mode, orbiting) vs `FallingField` (light
  mode, falling), selected in `Hero.jsx` based on `theme`.

## Content notes

- Real projects only: Pickle Cave, He[art] 'n Crumbs, Fitness AI — all with real GitHub/live
  URLs. Don't invent placeholder projects.
- External links (GitHub, LinkedIn, project source/demo) always get
  `target="_blank" rel="noopener noreferrer"`.
- Contact section's left panel is a styled fake "code window" (`contact.json` mock) — this
  is intentional design, not a real file being displayed.

## Workflow preferences

- Build one section/feature at a time; don't generate multiple sections unprompted.
- Explain new concepts (this person is learning React/Three.js/GSAP/etc. as we go) —
  don't just hand over code with no explanation of unfamiliar APIs.
- When debugging, ask for the actual console error / current file content before proposing
  a fix — several past bugs came from guessing wrong (e.g. an opening `<a>` tag repeatedly
  dropped on paste, a DevTools emulation flag left on, a stale placeholder path).
