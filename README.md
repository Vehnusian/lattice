# lattice

A reference library of validated complex systems models. Every model gets an interactive simulation, a plain-language explanation, the math, and a citation to the source literature.

**[View the live site →](https://lattice-gray-one.vercel.app)**

[![live site](https://img.shields.io/badge/live-lattice--gray--one.vercel.app-B5450B?style=flat-square)](https://lattice-gray-one.vercel.app)
[![check](https://github.com/Vehnusian/lattice/actions/workflows/check.yml/badge.svg)](https://github.com/Vehnusian/lattice/actions/workflows/check.yml)
[![license: PolyForm Noncommercial](https://img.shields.io/badge/license-PolyForm%20Noncommercial-blue?style=flat-square)](LICENSE)

## What it is

Segregation, epidemics, networks, cellular automata, criticality, synchronization: the canonical models of complex systems are scattered across decades of papers, textbooks, and one-off demos. Lattice collects them in one place, with the same layout on every page, so learning one page teaches you where to find things on all the others.

It is built for university students and instructors. Grasp an unfamiliar model in a few minutes, reference a familiar one while teaching, or change the parameters and watch what happens.

## Every model page has the same four parts

- An interactive simulation with the two or three parameters that actually matter.
- A short, plain-language explanation of how it works.
- The underlying math, tucked out of the way until you want it.
- Citations: the original paper, the canonical textbook, and a free alternative when one exists.

## Status

One model is live: [Schelling segregation](https://lattice-gray-one.vercel.app/models/schelling). The catalog tracks 77 models across 13 disciplines, each published one at a time only after it passes the validation process below. See [`docs/roadmap.md`](docs/roadmap.md).

## Validation

Correctness is the whole point, so every model is validated before it is published.

- Where a closed-form analytic result exists, the engine is checked against it (for example, the 2D Ising critical temperature near 2.269, or the site-percolation threshold near 0.593).
- Where none exists, a Python reference implementation runs alongside the browser engine and their statistics are compared over many seeds.

Each published model carries its validation write-up in its own folder, for example [`src/lib/models/schelling/validation.md`](src/lib/models/schelling/validation.md), plus unit tests that gate the engine on reproducibility and known behavior.

## Stack

SvelteKit 2 and Svelte 5, TypeScript (strict mode), Tailwind CSS v4, Vite. KaTeX for math, Fuse.js for search, Canvas2D for rendering. Python (NumPy / NetworkX) for the reference implementations. Deployed on Vercel.

## Running it locally

Requires Node 20+ and pnpm.

```sh
pnpm install
pnpm run dev        # dev server at localhost:5173
```

```sh
pnpm run build      # production build
pnpm run preview    # serve the build
```

Quality gates, also run in CI on every push and pull request:

```sh
pnpm run check      # svelte-check, types
pnpm run lint       # prettier + eslint
pnpm run test       # vitest, engine validation
```

## Repository layout

```
src/lib/models/<model>/   engine.ts, engine.py, engine.test.ts,
                          validate.py, validation.md, page.svelte, content.ts
src/lib/components/       shared UI and simulation primitives
src/routes/              pages (home, about, /models/<slug>)
docs/adr/                architecture decision records
docs/rulebook.md         engineering, validation, and design rules
docs/roadmap.md          what is live and what is next
```

## License

This is a source-available project, not an open-source one. You may read, study, and cite the code and prose, and use them for noncommercial purposes such as research and teaching. Commercial use is not permitted.

- Code: [PolyForm Noncommercial 1.0.0](LICENSE)
- Documentation, prose, and figures: [CC BY-NC 4.0](docs/LICENSE-DOCS.txt)

Any public repository on GitHub can be forked; the licenses above govern what you may legally do with the contents.

## Citation

If you reference the library, see [`CITATION.cff`](CITATION.cff). Each model page also carries a "cite this page" block alongside the original paper's citation.

## Credit

Built by Hashim Khan.
