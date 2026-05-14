# lattice

A reference library of validated complex systems models. Each model has an interactive simulation, a plain-language explanation, the underlying math, and a citation back to the original literature.

The project is in early infrastructure. No models published yet.

## What this is

A modern, searchable, mobile-friendly reference for complex systems models — segregation, epidemics, networks, cellular automata, reaction-diffusion, self-organized criticality, and more.

Built for university students through professors. Use it to quickly grasp an unfamiliar model, reference one while teaching, or play with parameters to build intuition.

## What this is not

- A storytelling explorable
- A long-form essay journal
- A textbook replacement
- A teaching curriculum

## Stack

SvelteKit, TypeScript, Tailwind, Vite. Python (NumPy / NetworkX) for reference implementations. Deployed on Vercel.

## Development

```sh
pnpm install
pnpm run dev
```

```sh
pnpm run build
pnpm run preview
```

## Documentation

- [`docs/positioning.md`](docs/positioning.md) — what this project is and is not
- [`docs/rulebook.md`](docs/rulebook.md) — engineering, validation, and design rules
- [`docs/research-notes.md`](docs/research-notes.md) — research informing the design
- [`docs/adr/`](docs/adr/) — architecture decision records

## License

- Code: [MIT](LICENSE)
- Documentation and prose: [CC-BY-4.0](docs/LICENSE-DOCS.txt)
