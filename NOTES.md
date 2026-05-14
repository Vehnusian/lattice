# Working Notes

Living document. Update at the end of every session: what was just done, what was decided, next action, open questions.

---

## Current state

SvelteKit + TypeScript scaffolded with the `sv` CLI (template: minimal). Prettier, ESLint, and Vitest enabled. Playwright skipped.

Tailwind CSS v4 wired via `@tailwindcss/vite`. Global stylesheet at `src/app.css` imports Tailwind. Root layout imports the stylesheet.

Home page (`src/routes/+page.svelte`) is a minimal placeholder using Tailwind classes. Confirmed rendering in `pnpm run dev`.

Foundational docs intact at `docs/` and repo root.

## Last decisions

- Positioning: reference library, university audience, Brockmann content + Distill polish + real information architecture.
- License: MIT for code, CC-BY-4.0 for prose and figures.
- Stack: SvelteKit + TypeScript + Tailwind v4 + Vite.
- Default rendering: Canvas2D. WebGL only when entity count or perf demands it.
- Python reference implementations required for models without closed-form analytic benchmarks. Optional otherwise.
- Sources: textbooks, peer-reviewed papers, and established open educational resources only. No Wikipedia, no blogs as citations.
- Package manager: pnpm.
- Repo visibility: private until first model is deployed.

## Next action

1. Commit current state and push to GitHub.
2. Set up Vercel deployment from the GitHub repo so every push auto-deploys.
3. Design tokens: pick a small palette, type scale, spacing scale. Add to `src/app.css`.
4. Site shell: header with project name, navigation placeholder, footer with license and source link.
5. Component primitives: `Slider`, `Toggle`, `Select`, `ParamPanel`, `CitationBlock`, `ValidationBadge`, `CanvasViewport`.
6. Demo page at `/_kit` showing each primitive in isolation (not linked from main nav).

## Open questions

- Project name and domain — currently using `lattice` as placeholder. Revisit before public launch.
- First model: Schelling segregation (tentative, not locked).
- Math rendering: KaTeX (likely) vs MathJax.
- Analytics: Plausible (likely) vs none.
- Color palette direction: academic-clean (slate / off-white / one accent) vs something with more character. Decide before shell work.
