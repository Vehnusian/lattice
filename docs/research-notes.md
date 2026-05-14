# Research Notes: Interactive Complex Systems Library

A synthesized rulebook and source review for a SvelteKit + TypeScript interactive simulation library.

---

## 1. RULEBOOK (draft)

### Code & architecture
1. **Separate engine from UI.** Each model lives in `src/lib/models/<model>/` with a pure-TS engine (`engine.ts`) exporting `step()`, `reset(seed)`, `getState()`. UI components import only this interface. No DOM, no Svelte, no rendering inside the engine.
2. **Seeded RNG everywhere.** Use a single seedable PRNG (`mulberry32` or `seedrandom`) injected into every engine constructor. No `Math.random()` in model code. This makes runs reproducible and validation possible.
3. **Fixed-timestep simulation, decoupled render.** `requestAnimationFrame` calls `engine.step(dt)` N times then renders once. Never tie model dynamics to frame rate.
4. **One file per ADR, one folder per model.** Each model folder contains: `engine.ts`, `engine.test.ts`, `reference.py`, `bench/`, `README.md`, `CITATION.cff`, `Component.svelte`.
5. **WebGL/Canvas only for >=10^4 entities.** Below that, SVG is debuggable and accessible. Don't over-engineer Boids with 200 agents in WebGL.
6. **TypeScript strict mode, no `any`.** Engine state types are exported and reused in tests.
7. **Web Worker for engines > 5ms/step.** Ising at 256x256, Gray-Scott, large networks. Use Comlink to keep API ergonomic.

### Validation
8. **Every stochastic model has a Python reference** in `reference.py` using NumPy / Mesa / NetworkX. CI runs both, compares summary statistics.
9. **Validate against known analytic results.** Ising 2D: critical temperature ~2.269 J/kB. SIR: R_inf matches transcendental equation. ER networks: giant component appears at <k>=1. Percolation: pc on square lattice = 0.5927. Encode these as test assertions with tolerance.
10. **Statistical equality, not bitwise.** Compare distributions via Kolmogorov-Smirnov or chi-squared at alpha=0.01 over N>=30 independent seeds. Document seeds in tests.
11. **Convergence tests.** For ABMs, assert that doubling N halves variance of the mean (CLT sanity).
12. **Benchmark each engine.** `bench/bench.ts` using `tinybench` reports steps/sec; commit results to `bench/results.json`. Fail CI on >20% regression.

### Documentation
13. **arc42 minimal set:** sections 1 (Introduction & Goals), 3 (Context), 4 (Solution Strategy), 5 (Building Block View), 9 (Architecture Decisions), 11 (Risks). Skip 2, 6, 7, 8, 10, 12 unless they earn their keep.
14. **ADRs in `docs/adr/NNNN-kebab-title.md`,** zero-padded 4-digit. Nygard template: Title, Status, Context, Decision, Consequences.
15. **Per-model README** with sections: One-sentence definition, Equations, Parameters table, References (paper + textbook), Validation checklist, Known limitations.
16. **CITATION.cff at repo root** plus one per model folder for the original paper.
17. **CONTRIBUTING.md** specifies: conventional commits, pre-commit hook (`prettier`, `eslint`, `vitest --run`), how to add a new model (copy template folder, 8-step checklist).

### Design & interaction
18. **Three-tier interactivity:** (a) read with auto-animated example, (b) tweak parameters with sliders, (c) intervene directly (paint cells, drop agents). Every model exposes all three.
19. **Show state, controls, explanation simultaneously.** Two-column layout: simulation left, prose right. No modal dialogs, no hidden controls.
20. **Reset, pause, step-once, speed slider on every model.** Universal control bar component.
21. **Annotate the canvas.** Hover reveals cell state; clicking pins a tooltip.
22. **Inline plots update live** alongside the simulation (e.g., SIR curves, magnetization vs time). Same color palette as the canvas.
23. **Colorblind-safe palette** (Viridis/Cividis for scalar, Okabe-Ito for categorical). Never red/green binary.
24. **Prefers-reduced-motion** stops animation by default; user opts in.

### Citation & rigor
25. **Every model page ends with a citation block:** original paper (DOI), canonical textbook (ISBN), this implementation (CITATION.cff snippet).
26. **Link to source code on GitHub** with permalink-by-commit-hash for the version shown.
27. **Disclose deviations from the paper.** A "Notes on this implementation" subsection explaining e.g. "we use Glauber not Metropolis dynamics."
28. **Open-source under MIT** for code, CC-BY-4.0 for prose/figures.

---

## 2. SOURCES (annotated)

| # | Source | URL | Why it matters |
|---|--------|-----|---|
| 1 | Distill.pub | https://distill.pub/about, https://distill.pub/journal/ | Gold standard for interactive scientific writing |
| 2 | Complexity Explorables | https://www.complexity-explorables.org | Direct genre match |
| 3 | Nicky Case | https://ncase.me/polygons/, https://ncase.me/crowds/ | Narrative + interaction craft |
| 4 | Bret Victor | https://worrydream.com/ExplorableExplanations/ | Founding philosophy |
| 5 | arc42 | https://arc42.org/overview | Architecture documentation template |
| 6 | ADR | https://github.com/joelparkerhenderson/architecture-decision-record | Decision logging |
| 7 | Mesa | https://github.com/projectmesa/mesa | ABM validation patterns |
| 8 | CITATION.cff | https://citation-file-format.github.io | Standard machine-readable citation |

---

## 3. KEY INSIGHTS

### Distill.pub
- Editorial criteria: clarity, correctness, novel presentation, scholarly citation. Peer review with explicit rubric.
- Copy: sidenotes (Tufte-style margin annotations), live-updating figures that respond to scroll, persistent URL state for figure parameters, MathJax for equations, citation hover-cards.
- Avoid: their custom build system (deprecated). Use vanilla SvelteKit. Don't try to look exactly like Distill — derivative.

### Complexity Explorables (Brockmann)
- Structure per page: title, animated hero canvas, "How to play" controls list, "The Story" prose section, "The Facts" equations, "The References" bibliography.
- Copy: the four-section template; consistent control affordances (play/pause/reset always top-left); generous use of presets ("Try this scenario").
- Avoid: Flash-era aesthetic, inconsistent typography across pages, weak mobile support, no source code linked from most pages.
- Missing (opportunity): no test/validation discussion, no code link, no reproducibility info. A modern competitor differentiates here.

### Nicky Case
- Narrative arc: problem -> toy -> twist -> reflection -> call-to-action. "Parable of the Polygons" runs ~15 min and never lets the reader idle for >30s without interaction.
- Copy: conversational second-person voice; tiny interactive widgets inline in prose (not just one big canvas); deliberate emotional beats; "remix this" / source-available at end.
- Avoid: the cuteness can undermine perceived rigor for an academic portfolio. Use the structure, dial back the tone.

### Bret Victor — Explorable Explanations
- Three principles: reactive documents (change one number, everything updates), explorable examples (concrete instances of abstract ideas), contextual information (definitions on hover, not in glossaries).
- The reader should never need to imagine what would happen — they should be able to try it.

### arc42
- 12 sections total; for a portfolio project ship: section 1 Intro & Goals, 3 Context & Scope, 4 Solution Strategy, 5 Building Block View, 9 ADRs, 11 Risks & Technical Debt. ~5 pages total.
- Keep it in `docs/architecture.md` as one file with H2 per section.

### ADRs
- Nygard format: Title (NNNN-decision-name), Status (proposed/accepted/superseded), Context, Decision, Consequences. ~1 page each.
- Layout: `docs/adr/0001-use-sveltekit.md`, `0002-typescript-strict.md`, etc. Sequential, never reused.

### NetLogo 8-heading per-model template (adopt verbatim)
1. WHAT IS IT?
2. HOW IT WORKS
3. HOW TO USE IT
4. THINGS TO NOTICE
5. THINGS TO TRY
6. EXTENDING THE MODEL
7. RELATED MODELS
8. CREDITS AND REFERENCES

### Validation patterns for stochastic sims
- Playbook: unit tests on deterministic helpers, statistical tests on stochastic outputs with fixed seeds, regression tests pinning summary statistics.
- Compare against closed-form results wherever they exist.
- For ABMs without closed forms: cross-validate two independent implementations (TS engine vs Python reference) on identical seeds.

### CITATION.cff
- YAML 1.2 file at repo root. Required fields: `cff-version`, `message`, `title`, `authors`, `version`, `date-released`, `url`. Optional: `preferred-citation` block.
- Per-model `CITATION.cff` with `preferred-citation` pointing to the original paper lets users cite the model implementation distinctly from the model itself.

---

## 4. TEXTBOOKS & PAPERS TO CITE

| Model | Original paper | Canonical textbook | Free alternative |
|---|---|---|---|
| Schelling segregation | Schelling, J. Math. Sociol. (1971) | Easley & Kleinberg, *Networks, Crowds, and Markets* | Free PDF at cs.cornell.edu/home/kleinber/networks-book/ |
| Ising / Monte Carlo | Metropolis et al., J. Chem. Phys. (1953) | Newman & Barkema, *Monte Carlo Methods in Statistical Physics* | Krauth, *Statistical Mechanics: Algorithms and Computations* |
| SIR / epidemics | Kermack & McKendrick (1927) | Keeling & Rohani, *Modeling Infectious Diseases* | Hethcote, SIAM Review (2000) — open access |
| Boids / flocking | Reynolds, SIGGRAPH (1987) | Sumpter, *Collective Animal Behavior* | red3d.com/cwr/boids/ |
| Wolfram CA | Wolfram, Rev. Mod. Phys. (1983) | Wolfram, *A New Kind of Science* | Free at wolframscience.com/nks/ |
| Networks (ER, WS, BA) | Erdős & Rényi (1960); Watts & Strogatz (1998); Barabási & Albert (1999) | Newman, *Networks* 2nd ed. | networksciencebook.com |
| Reaction-diffusion | Turing (1952); Pearson (1993) | Murray, *Mathematical Biology II* | karlsims.com/rd.html |
| SOC (sandpile, forest fire) | Bak, Tang, Wiesenfeld (1987); Drossel & Schwabl (1992) | Jensen, *Self-Organized Criticality* | Bak, *How Nature Works* |
| Percolation | Broadbent & Hammersley (1957) | Stauffer & Aharony, *Introduction to Percolation Theory* | Grimmett notes online |
| Lotka-Volterra | Lotka (1925); Volterra (1926) | Murray, *Mathematical Biology I* | Strogatz, *Nonlinear Dynamics and Chaos* |

General references:
- Mitchell, *Complexity: A Guided Tour*
- Strogatz, *Nonlinear Dynamics and Chaos*
- Sayama, *Introduction to the Modeling and Analysis of Complex Systems* — free PDF at OpenSUNY

---

## 5. OPEN QUESTIONS

1. **Rendering stack:** Canvas2D default, WebGL via regl only for Gray-Scott and large CA. Decide before model #3.
2. **Python reference packaging:** ship in same repo (`reference/`) or separate? Same-repo is simpler.
3. **Math:** KaTeX (faster) vs MathJax (more complete). KaTeX is sufficient.
4. **State persistence in URL:** every parameter encoded as query string? Defer to ADR-0005.
5. **Visual regression testing:** Playwright screenshots vs Chromatic vs skip. Skip until >=5 models.
6. **License:** MIT for code, CC-BY-4.0 for prose/figures.
7. **Accessibility scope:** keyboard for controls, ARIA labels for canvases. Full keyboard simulation interaction is stretch.
8. **Peer review:** ask one professor + one developer to review each model before publishing.
9. **Analytics:** Plausible (privacy-respecting) on Vercel.
10. **Naming:** repo name and site name not decided.

---

## 6. MINIMAL DOCS LAYOUT

```
docs/
  architecture.md          # arc42 sections 1,3,4,5,9,11 in one file
  adr/
    0001-sveltekit-typescript.md
    0002-canvas2d-default-webgl-opt-in.md
    0003-python-reference-impls.md
    0004-seeded-prng-policy.md
    0005-url-state-encoding.md
  research-notes.md        # this document
  model-template/
    README.md              # NetLogo 8-heading template
    CITATION.cff
    engine.ts
    engine.test.ts
    reference.py
    bench/bench.ts
CITATION.cff               # repo-level
CONTRIBUTING.md
LICENSE
LICENSE-docs
```
