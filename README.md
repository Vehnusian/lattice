# lattice

A reference library of validated complex systems models. Each model has an interactive simulation, a plain-language explanation, the underlying math, and a citation back to the original literature.

Live: [lattice-gray-one.vercel.app](https://lattice-gray-one.vercel.app)

## What this is

A modern, searchable, mobile-friendly reference for complex systems models — segregation, epidemics, networks, cellular automata, reaction-diffusion, self-organized criticality, and more.

Built for university students through professors. Use it to quickly grasp an unfamiliar model, reference one while teaching, or play with parameters to build intuition.

Current status: one model published ([Schelling segregation](https://lattice-gray-one.vercel.app/models/schelling)), sixty-plus in the catalog.

## What this is not

- A storytelling explorable
- A long-form essay journal
- A textbook replacement
- A teaching curriculum

## Stack

SvelteKit, TypeScript, Tailwind, Vite. Python (NumPy / NetworkX) for reference implementations. Deployed on Vercel.

Requires Node 20+ and pnpm.

## Development

```sh
pnpm install
pnpm run dev        # dev server at localhost:5173
pnpm run build      # production build
pnpm run preview    # preview the production build
```

Quality gates run on every commit:

```sh
pnpm run check      # svelte-check (types)
pnpm run lint       # prettier + eslint
pnpm run test       # vitest (engine validation)
```

## Documentation

- [`docs/positioning.md`](docs/positioning.md) — what this project is and is not
- [`docs/rulebook.md`](docs/rulebook.md) — engineering, validation, and design rules
- [`docs/research-notes.md`](docs/research-notes.md) — research informing the design
- [`docs/catalog.md`](docs/catalog.md) — master list of models being tracked
- [`docs/adr/`](docs/adr/) — architecture decision records
- [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to add a new model

Every published model also ships a validation document in its own folder (e.g. [`src/lib/models/schelling/validation.md`](src/lib/models/schelling/validation.md)).

## Citation

If you use or reference this library, see [`CITATION.cff`](CITATION.cff). Model pages also carry a "Cite this page" block alongside the original paper citation.

## License

- Code: [MIT](LICENSE)
- Documentation and prose: [CC-BY-4.0](docs/LICENSE-DOCS.txt)
