# Working Notes

Living document. Update at the end of every session: what was just done, what was decided, next action, open questions.

---

## Current state

SvelteKit + TypeScript + Tailwind v4 in place. Deployed on Vercel at `lattice-gray-one.vercel.app`. Auto-deploy on push to main.

Design direction locked: contemporary editorial-scientific. Warm paper background (`#F9F6F0`), deep ink text, single burnt-ochre accent (`#B5450B`). Geist and Geist Mono throughout (via `@fontsource-variable`).

Home page is a discipline-filtered card grid pulling from a typed model registry (`src/lib/models/registry.ts`). Ten models seeded, all status `planned`. Each card has a geometric SVG preview keyed to the model's discipline.

Components in place: `SiteHeader`, `SiteFooter`, `TabBar`, `ModelCard`, `CardPreview`. About page rewritten.

## Last decisions

- Aesthetic: contemporary editorial-scientific (after rejecting generic system-ui slate-50, A-Quanta, B-monospace-brutalist, C-Swiss-Bauhaus directions).
- Fonts: Geist + Geist Mono. No Inter.
- Palette: warm paper, deep ink, one burnt-ochre accent. Restrained.
- Home page identity: filterable card grid with abstract per-discipline previews. Live mini-simulations replace static SVGs once engines exist.
- Model registry as the source of truth for what exists, what's planned, what's published.

## Next action

1. Build the model page template using Schelling as the example. Engine can be a placeholder for now — focus on the page layout, primitives, and citation block.
2. Build component primitives needed for model pages: `Slider`, `Toggle`, `Select`, `ParamPanel`, `CitationBlock`, `ValidationBadge`, `CanvasViewport`.
3. Add `/_kit` route showing each primitive in isolation for visual review.
4. Once template is locked, drop in the real Schelling engine + Python reference + validation.

## Open questions

- Project name and domain — currently using `lattice` as placeholder.
- Math rendering library: KaTeX (likely).
- Analytics: Plausible (likely) vs none.
- How to handle the `live` preview animation on cards once we have engines — same engine code at a smaller scale, or a separate "preview" mode that runs cheaper?
