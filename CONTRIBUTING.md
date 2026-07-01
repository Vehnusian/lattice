# Contributing

Lattice is a personal, source-available reference library. It is not structured to take outside code contributions, but the process for adding a model is written down here because it is the same standard every published model has to meet, and because the discipline is part of the point.

## Ground rules

- The bar for publishing a model is [`docs/rulebook.md`](docs/rulebook.md). A change that contradicts it is out of scope.
- The project is licensed for noncommercial use only: PolyForm Noncommercial for code, CC BY-NC 4.0 for prose and figures. See [`LICENSE`](LICENSE) and [`docs/LICENSE-DOCS.txt`](docs/LICENSE-DOCS.txt).
- Sources must be textbooks, peer-reviewed papers, or established open educational resources. Wikipedia and AI-generated content are never cited.

## Commit style

Commits are short imperative summaries, no scope prefix required. Example: `Auto-pause on settled state; tick counts real work only`. If a commit needs a body, keep it to two or three sentences focused on the _why_.

## How a model is added

Every model page ships an engine, a page, validation, and citations. The checklist:

1. `src/lib/models/<slug>/engine.ts` — pure TypeScript, textbook style, seeded PRNG in the constructor (never `Math.random()`), a `step()` that returns `boolean`, a `reset(seed)`, and a `metrics()`.
2. `src/lib/models/<slug>/engine.py` — Python mirror of the engine used as the validation reference. Same algorithm, same neighborhood rule, same update policy. It does not need identical seeded trajectories; statistical equivalence is enough.
3. `src/lib/models/<slug>/engine.test.ts` — vitest cases gating the browser engine on reproducibility, per-parameter behavior, and settled-state invariants.
4. `src/lib/models/<slug>/validate.py` and `validation.md` — the Python validation harness and an honest write-up of its results. Where a closed-form analytic result exists, check against it. Where it does not, describe the properties checked and note honest deviations from the source paper.
5. `src/lib/models/<slug>/page.svelte` — the model page, using `ModelPageLayout` and the shared sim primitives. Section order matches every other model page.
6. `src/lib/models/<slug>/content.ts` — presets and the citation block for the original paper.
7. Register in `src/lib/models/registry.ts` with status `published` only after the validation is written.

## Local checks

```sh
pnpm run check      # types
pnpm run lint       # prettier + eslint
pnpm run test       # vitest
```

CI runs the same checks on every push and pull request.
