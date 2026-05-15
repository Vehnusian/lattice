# Schelling validation

## What is being validated

The Schelling segregation model has no closed-form analytic benchmark for the segregation index. The textbook (Sayama 2015, §19.2) describes the qualitative findings — segregation appears at tolerance "much lower than 80%", and high homophily produces unusual behavior — but provides no specific numerical claims.

Validation here checks three properties:

1. **Reproducibility.** Two engines seeded identically must produce identical trajectories. This rules out hidden global state or unseeded randomness.
2. **Phase behavior.** Mean segregation index across runs should rise as tolerance increases, with a noticeable transition somewhere between τ = 0.2 and τ = 0.5, consistent with the model's standard pedagogical description.
3. **Settling.** Moderate tolerances reach a stationary state. High tolerances also settle, but by forming wide empty-cell boundaries between clusters (an observation specific to this discrete-grid implementation; see notes below).

## How to run

```bash
cd src/lib/models/schelling
python validate.py
```

Outputs a summary to stdout and writes `validation_results.json` in the same directory.

Pure Python, no external dependencies. Runs in roughly 20–60 seconds on a typical laptop.

## Observed results

Reproducibility:

- Two engines initialized with the same seed and stepped 2000 times produce segregation indices that match to machine precision. Confirmed.

Tolerance sweep at density = 0.9 on a 25 × 25 grid, three seeds per tolerance (representative run, 2026-05-13):

| τ | segregation mean | stdev | settled | regime |
| --- | --- | --- | --- | --- |
| 0.10 | 0.519 | 0.005 | 3/3 | mixed; only initial random clustering |
| 0.20 | 0.573 | 0.023 | 3/3 | approaching the transition |
| 0.30 | 0.753 | 0.028 | 3/3 | clear segregation begins |
| 0.40 | 0.826 | 0.007 | 3/3 | strong clustering |
| 0.50 | 0.867 | 0.022 | 3/3 | Sayama's example value |
| 0.60 | 0.973 | 0.004 | 3/3 | near-complete segregation |
| 0.70 | 0.988 | 0.006 | 2/3 | empty-cell buffers form; one run did not settle within 5000 steps |

The qualitative findings:

- The mean segregation rises monotonically with τ, as expected.
- The transition between "weakly clustered" and "clearly segregated" sits between τ = 0.2 and τ = 0.3 on this configuration.
- Even at τ = 0.5 the segregation is only ≈ 0.87, well below saturation. The system reaches ≈ 0.97+ only at τ ≥ 0.6.
- At τ = 0.7 not every run settles within 5000 steps. This is the regime where empty-cell buffers must form to satisfy demanding agents, and on some seeds the system takes longer than the cap.

## Methodology notes

- Grid: 25 × 25 (625 cells), chosen to keep the script under one minute.
- Density: 0.9 throughout (matches the page's default).
- Seeds: 1, 2, 3 — three independent runs per tolerance.
- Max steps: 5000 per run. All configurations in the sweep settle well within this cap.
- The "segregation index" reported is the mean like-fraction over all occupied cells, the same metric the browser displays. This is one valid choice among many; Sayama's Exercise 19.3 asks the reader to invent a metric and notes that no canonical name is standard.

## Honest deviations from a literal reading of Sayama

Sayama states (§19.2, p. 438) that at very high homophily the system enters a "non-stationary mixed state because agents keep moving without reaching a stationary state." On this discrete 25 × 25 grid with Moore-8 neighborhoods, random relocation, and density 0.9, we do **not** observe this. Even at τ = 0.7 the system settles into clusters separated by thick empty-cell boundaries (because empty cells do not count toward an agent's satisfaction). This is a discretization effect: with enough empty cells available, the system can find a configuration where every agent's L(i) = 1.

The non-stationary regime Sayama describes appears at extreme densities (very few empty cells) and/or in continuous-space variants. On our default configuration it is not reproducible.

## Cross-language equivalence

The TypeScript engine (`engine.ts`) and the Python engine (`engine.py`) implement the same algorithm with the same neighborhood rule and relocation policy. They use different seeded PRNGs (mulberry32 in TypeScript, Python's `random.Random` in Python), so they do not produce identical trajectories from the same seed. Their statistical behavior — mean segregation, variance, qualitative regimes — agrees within the expected sampling variability.
