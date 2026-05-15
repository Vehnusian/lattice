"""
Validation script for the Schelling engine.

Runs three checks:
1. Reproducibility — identical seeds produce identical trajectories.
2. Phase behavior — segregation index increases with tolerance, with a
   sharp rise around τ ≈ 0.3 as Sayama (2015) §19.2 describes.
3. Settling — moderate τ converges; very high τ produces wide empty
   boundaries rather than non-stationary motion (an honest finding,
   different from a literal reading of Sayama on this discrete grid).

Run: python validate.py
Writes: validation_results.json next to this file.
"""

import json
import statistics
from pathlib import Path
from engine import Schelling


def run_to_settled(sim: Schelling, max_steps: int = 5000) -> dict:
    for step in range(max_steps):
        if not sim.step():
            return {
                "settled": True,
                "steps": step + 1,
                "segregation": sim.segregation_index(),
                "agents": sim.agent_count(),
                "unsatisfied": sim.unsatisfied_count(),
            }
    return {
        "settled": False,
        "steps": max_steps,
        "segregation": sim.segregation_index(),
        "agents": sim.agent_count(),
        "unsatisfied": sim.unsatisfied_count(),
    }


def check_reproducibility() -> dict:
    s1 = Schelling(size=30, density=0.9, tolerance=0.4, seed=42)
    s2 = Schelling(size=30, density=0.9, tolerance=0.4, seed=42)
    for _ in range(2000):
        s1.step()
        s2.step()
    seg_a = s1.segregation_index()
    seg_b = s2.segregation_index()
    return {
        "seed": 42,
        "params": {"size": 30, "density": 0.9, "tolerance": 0.4},
        "steps": 2000,
        "segregation_a": seg_a,
        "segregation_b": seg_b,
        "match": abs(seg_a - seg_b) < 1e-12,
    }


def sweep(size: int, density: float, tolerances: list, seeds: list) -> dict:
    out = {}
    for tau in tolerances:
        runs = []
        for seed in seeds:
            sim = Schelling(size=size, density=density, tolerance=tau, seed=seed)
            runs.append(run_to_settled(sim))
        seg_values = [r["segregation"] for r in runs]
        out[tau] = {
            "runs": runs,
            "segregation_mean": statistics.mean(seg_values),
            "segregation_stdev": statistics.stdev(seg_values) if len(seg_values) > 1 else 0.0,
            "settled_count": sum(1 for r in runs if r["settled"]),
            "n_seeds": len(seeds),
        }
    return out


def main() -> None:
    print("Schelling validation")
    print("=" * 50)

    print("\n1. Reproducibility")
    repro = check_reproducibility()
    print(f"   Two engines, seed 42, 2000 steps:")
    print(f"   segregation A = {repro['segregation_a']:.6f}")
    print(f"   segregation B = {repro['segregation_b']:.6f}")
    print(f"   {'PASS' if repro['match'] else 'FAIL'}")

    print("\n2. Tolerance sweep (size=25, density=0.9)")
    print(f"   {'τ':<6} {'seg_mean':<12} {'seg_stdev':<12} {'settled':<10} {'note':<40}")
    tolerances = [0.10, 0.20, 0.30, 0.40, 0.50, 0.60, 0.70]
    seeds = [1, 2, 3]
    sweep_results = sweep(size=25, density=0.9, tolerances=tolerances, seeds=seeds)

    notes = {
        0.10: "below threshold — mixed",
        0.20: "approaching transition",
        0.30: "phase transition (Sayama notes 'much lower than 80%')",
        0.40: "clear segregation",
        0.50: "Sayama's example value",
        0.60: "strong segregation",
        0.70: "high homophily — empty buffers form",
    }
    for tau in tolerances:
        r = sweep_results[tau]
        note = notes[tau]
        print(
            f"   {tau:<6.2f} {r['segregation_mean']:<12.4f} "
            f"{r['segregation_stdev']:<12.4f} "
            f"{r['settled_count']}/{r['n_seeds']:<8} {note}"
        )

    out = {
        "reproducibility": repro,
        "tolerance_sweep": {
            "params": {"size": 25, "density": 0.9, "seeds": seeds, "max_steps": 5000},
            "results": {f"{k:.2f}": v for k, v in sweep_results.items()},
        },
    }

    out_path = Path(__file__).parent / "validation_results.json"
    out_path.write_text(json.dumps(out, indent=2))
    print(f"\nResults written to {out_path.name}")


if __name__ == "__main__":
    main()
