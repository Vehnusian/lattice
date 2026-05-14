# 0002. Frontend stack: SvelteKit + TypeScript + Tailwind

Status: Accepted

## Context

The project is a static-leaning, content-heavy reference site with interactive simulations on most pages. Each model page is a route. The deployment target is Vercel.

Candidate frameworks: SvelteKit, Next.js (React), Astro.

## Decision

SvelteKit with TypeScript and Tailwind CSS.

## Consequences

- Svelte's reactivity model maps cleanly to live simulations driven by parameter changes.
- Lower runtime overhead than React for canvas-heavy pages.
- Smaller and faster to learn than Next.js for a developer new to frontend frameworks.
- Static site generation works out of the box, which keeps Vercel hosting on the free tier.
- TypeScript strict mode applies to both engines and components, which is required by the rulebook.
- Tailwind enforces a consistent visual language without a hand-rolled CSS framework.
- Trade-off: the Svelte ecosystem is smaller than React's. A few specific libraries (e.g., complex graph layouts) may need wrapper components.
