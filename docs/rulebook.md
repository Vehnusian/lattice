# Rulebook

Working rules for engineering, validation, documentation, and design. Every rule exists to serve the positioning: a reference library for university students and professors. Rules that conflict with the positioning are dropped.

---

## Code & architecture

1. Each model lives in `src/lib/models/<model>/`. The engine is a pure-TypeScript module exporting `step()`, `reset(seed)`, `getState()`. UI components import only this interface. No DOM access, no Svelte, no rendering inside the engine.
1b. Engine code is the project's academic artifact. It is written as a textbook implementation — minimal abstraction, idiomatic, readable in a single sitting. Target under 100 lines per engine. A reader should be able to copy the file and adapt it to their own work. Performance optimizations and clever tricks live outside the engine.
2. Every engine accepts a seeded PRNG (`mulberry32` or `seedrandom`) in its constructor. `Math.random()` is forbidden in model code. Reproducibility is non-negotiable.
3. Fixed-timestep simulation, decoupled rendering. `requestAnimationFrame` calls `engine.step(dt)` N times per frame, then renders. Model dynamics never depend on frame rate.
4. TypeScript strict mode. No `any`. Engine state types are exported and reused in tests.
5. Canvas2D is the default rendering target. WebGL (via `regl`) is opt-in for entity counts ≥ 10⁴ or shader-based models like Gray-Scott.
6. Engines that take more than 5 ms per step run in a Web Worker via Comlink.
7. Asserts on all preconditions and invariants. A bug should fail loudly, not produce subtly wrong output.

## Validation

8. Every model is validated. Models with closed-form analytic results validate against those (Ising Tc ≈ 2.269, percolation pc ≈ 0.5927 on the 2D square lattice, ER giant component at ⟨k⟩ = 1, SIR R∞ from the transcendental equation, etc.). Models without closed-form results require a Python reference implementation in `reference.py`; CI runs both and compares summary statistics.
9. Statistical comparison, not bitwise. Use Kolmogorov-Smirnov or chi-squared at α = 0.01 over N ≥ 30 independent seeds. Seeds are documented in the test file.
10. For agent-based models, include a convergence test: doubling N should approximately halve the variance of the mean (central limit sanity).
11. Each engine has a benchmark (`bench/bench.ts`). CI fails on > 20 % performance regression.
12. No model ships without a validation document at `docs/validation/<model>.md` summarizing benchmarks and analytic agreement. The document is the receipt.

## Documentation

13. Architecture documentation follows the arc42 minimal set: Introduction & Goals, Context & Scope, Solution Strategy, Building Block View, Architecture Decisions, Risks & Technical Debt. One file at `docs/architecture.md`.
14. Architecture Decision Records live in `docs/adr/NNNN-kebab-title.md`. Format: Title, Status (proposed / accepted / superseded), Context, Decision, Consequences. Numbers are zero-padded four digits, sequential, never reused.
15. Each model has a README in its folder using these eight headings: What is it, How it works, How to use it, Things to notice, Things to try, Extending the model, Related models, Credits and references.
16. Repository carries a `CITATION.cff` at the root and one per model folder. The per-model file uses `preferred-citation` to point at the original paper, so users can cite the underlying model distinctly from this implementation.
17. `CONTRIBUTING.md` specifies: conventional commit messages, pre-commit hooks (`prettier`, `eslint`, `vitest --run`), and the steps to add a new model. New-model PRs follow a checklist gate.
18. `NOTES.md` at the repo root is updated at the end of every working session with current state, last decisions, next action, and open questions.

## Design & interaction

19. The site is a reference library. Pages are visited for orientation in seconds and depth on demand. They are not narrative explorables.
20. Every model page follows the same section order. A user who has seen one model page knows where to find the math, the citation, the suggested experiments, and the source code on every other page.
21. One main simulation per page. Inline secondary widgets are allowed only when they directly support comprehension of the main simulation. Fragmenting interaction across many small widgets is for narrative pacing; that is the wrong medium.
22. Show the simulation, controls, and explanation simultaneously. Two-column layout on desktop: simulation left, prose right. Stacks on mobile.
23. A universal control bar — Play / Pause / Step / Reset / Speed — appears on every model. Always in the same place. Always keyboard accessible.
24. Only the parameters that change model behavior are exposed as controls. Cosmetic and convenience parameters are hidden.
25. Math is collapsible and collapsed by default. The default state shows behavior; readers who want derivations expand them.
26. Color palettes are colorblind-safe. Use Viridis or Cividis for scalar fields and Okabe-Ito for categorical encodings. Never red-green binary.
27. Respect `prefers-reduced-motion`. Animation does not auto-start for users who have requested reduced motion.
28. The site is information architecture as much as it is models. Tag taxonomy by discipline (networks, epidemics, spatial, dynamics, criticality, evolution, econophysics, etc.), client-side search, and consistent navigation are first-class features built alongside the models, not added after.

## Citation & sources

29. Citations come from textbooks, peer-reviewed papers, and established open educational resources (Sayama at OpenSUNY, Barabási's free networks book, Wolfram's free NKS, and similar). Wikipedia is acceptable for personal orientation but never appears as a citation. Blogs and AI-generated content are never cited.
30. Every model page ends with a citation block: the original paper (with DOI), the canonical textbook (with ISBN), a free alternative when one exists, and "how to cite this page."
31. Deviations from the original paper are disclosed. A short "notes on this implementation" subsection explains any algorithmic choice that diverges from the source (e.g., Glauber vs Metropolis dynamics).
32. Code is linked from every model page with a permalink to the commit hash of the version being shown.
