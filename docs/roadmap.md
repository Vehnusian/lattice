# Roadmap

Lattice publishes one model at a time. A model moves from the catalog to the
live site only after it passes the validation process in
[`rulebook.md`](rulebook.md): an engine, a Python reference or a closed-form
check, a written validation document, and unit tests.

## Live

- **Schelling segregation** (spatial) — [page](https://lattice-gray-one.vercel.app/models/schelling)

## Catalog

77 models are catalogued across 13 disciplines: networks, epidemics, spatial,
dynamics, synchronization, criticality, evolution, automata, morphogenesis,
econophysics, opinion, active matter, and random walks. The full home page is
the browsable catalog, with search and discipline filters.

## Near term

The next models are drawn from the disciplines with the clearest canonical
references and closed-form checks to validate against:

- **Epidemics** — SIR / SIS compartmental models (final-size relation as the
  analytic benchmark).
- **Networks** — Erdős–Rényi random graphs (giant component at mean degree one).
- **Criticality** — the 2D Ising model (critical temperature near 2.269).

These are the current focus, not fixed commitments or a dated schedule. Each
ships when its validation is done.
