# Working Notes

Living document. Update at the end of every session: what was just done, what was decided, next action, open questions.

---

## Current state

Foundational documents in place. No code yet.

Repo contains: README, LICENSE (MIT), LICENSE-docs (CC-BY-4.0), CITATION.cff, positioning.md, rulebook.md, research-notes.md, four ADRs (0001–0004).

## Last decisions

- Positioning: reference library, university audience, Brockmann content + Distill polish + real information architecture.
- License: MIT for code, CC-BY-4.0 for prose and figures.
- Stack: SvelteKit + TypeScript + Tailwind, deployed on Vercel.
- Default rendering: Canvas2D. WebGL only when entity count or perf demands it.
- Python reference implementations required for models without closed-form analytic benchmarks. Optional otherwise.
- Sources: textbooks, peer-reviewed papers, and established open educational resources only. No Wikipedia, no blogs as citations.

## Next action

Week 1 infrastructure:

1. Initialize SvelteKit + TypeScript project in repo root.
2. Add Tailwind, design tokens, base layout shell.
3. Deploy empty site to Vercel.
4. Create the component primitives: `Slider`, `Toggle`, `Select`, `ParamPanel`, `CitationBlock`, `ValidationBadge`, `CanvasViewport`.
5. Build a single demo page showing each primitive in isolation.

## Open questions

- Project name and domain — currently using `lattice` as placeholder. Revisit before public launch.
- First model: Schelling segregation (tentative, not locked).
- Math rendering: KaTeX (likely) vs MathJax.
- Analytics: Plausible (likely) vs none.
- Where Python reference implementations live: same repo (`reference/` folder) is the assumed default.
