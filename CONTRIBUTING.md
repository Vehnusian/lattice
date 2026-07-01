# Contributing

Lattice is a personal reference library. Pull requests are welcome but the bar for merging a new model is deliberately high — every published model has to satisfy the rules in [`docs/rulebook.md`](docs/rulebook.md).

## Ground rules

- Read [`docs/positioning.md`](docs/positioning.md) and [`docs/rulebook.md`](docs/rulebook.md) before proposing changes. If a change contradicts either, the change is out of scope.
- Prose and figures are covered by CC-BY-4.0; code is MIT. Contributions carry the same split.
- Sources must be textbooks, peer-reviewed papers, or established open educational resources. Wikipedia and AI-generated content are never cited.

## Commit style

Commits are short imperative summaries; no scope prefix required. Example: `Auto-pause on settled state; tick counts real work only`. If a commit needs a body, keep it to two or three sentences focused on the _why_.

## Adding a new model

Every model page ships four things: an engine, a page, validation, and citations. The checklist:

1. `src/lib/models/<slug>/engine.ts` — pure TypeScript, textbook style, seeded PRNG in the constructor (never `Math.random()`), a `step()` that returns `boolean`, a `reset(seed)`, a `metrics()`.
2. `src/lib/models/<slug>/engine.py` — Python mirror of the TypeScript engine used as the validation reference. Same algorithm, same neighborhood rule, same relocation policy. Does not need to reproduce identical seeded trajectories; statistical equivalence is enough.
3. `src/lib/models/<slug>/engine.test.ts` — vitest cases gating the browser engine on reproducibility, per-parameter behavior, and settled-state invariants.
4. `src/lib/models/<slug>/validate.py` and `validation.md` — the Python validation harness and the honest write-up of its results. Where a closed-form analytic result exists, cite it. Where it does not, describe the properties checked and note honest deviations from the source paper.
5. `src/lib/models/<slug>/page.svelte` — the model page, using `ModelPageLayout` and the shared sim primitives. Section order matches every other model page.
6. `src/lib/models/<slug>/content.ts` — presets and the citation block for the original paper.
7. Register in `src/lib/models/registry.ts` with status `published` only after validation is written.

## Local checks

Before opening a PR:

```sh
pnpm run check      # types
pnpm run lint       # prettier + eslint
pnpm run test       # vitest
```

CI runs the same three commands.

## Discussion

For a proposal that isn't ready for code, open an issue first with the model name, the canonical paper, and the intended textbook citation. That's usually enough to figure out whether the model fits the library.
