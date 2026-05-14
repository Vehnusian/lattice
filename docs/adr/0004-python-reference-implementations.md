# 0004. Python reference implementations for validation

Status: Accepted

## Context

Most models in the library are stochastic. Bugs in stochastic code rarely produce loud failures; they produce subtly wrong distributions that look plausible. A single implementation cannot self-validate.

Two strategies catch bugs of this kind:

1. Compare simulation output against a closed-form analytic result.
2. Compare two independent implementations of the same model on identical seeds.

Strategy 1 is preferable when an analytic result exists. For many models, it does not.

## Decision

A model with a known closed-form analytic result (Ising critical temperature, percolation threshold, SIR final size, ER giant component) validates against that result and does not require a second implementation.

A model without such a result requires a Python reference implementation at `src/lib/models/<model>/reference.py`. CI runs both the TypeScript engine and the Python reference on the same seeds and compares summary statistics (Kolmogorov-Smirnov or chi-squared at α = 0.01 over N ≥ 30 seeds).

Python reference implementations use NumPy, NetworkX, or Mesa as appropriate. They are written to be readable rather than fast.

## Consequences

- The validation gate is real and uniform across the library.
- For some models, the Python reference doubles the implementation effort; this is the cost of confidence in correctness.
- Python references serve a second purpose: they are useful to academic readers who prefer Python over TypeScript and can cite a reference implementation in their own code.
- CI requires both Node and Python toolchains. Setup overhead is one-time.
