// Validation gate for the browser engine. Mirrors the properties checked
// by validate.py in this directory (see validation.md). The Python engine
// is the ground truth; this test asserts the TypeScript engine's own
// internal consistency and the qualitative behavior the page describes.

import { describe, expect, it } from 'vitest';
import { Schelling, type SchellingParams } from './engine';
import { defaultParams } from './content';

const baseParams: SchellingParams = { ...defaultParams, size: 20 };

function runUntilSettled(model: Schelling, cap = 5000): { ticks: number; settled: boolean } {
	for (let i = 0; i < cap; i++) {
		if (!model.step()) return { ticks: i, settled: true };
	}
	return { ticks: cap, settled: false };
}

describe('Schelling engine', () => {
	it('reproduces the same trajectory for the same seed', () => {
		const a = new Schelling(baseParams, 42);
		const b = new Schelling(baseParams, 42);
		for (let i = 0; i < 500; i++) {
			a.step();
			b.step();
		}
		expect(Array.from(a.grid)).toEqual(Array.from(b.grid));
		expect(a.segregationIndex()).toEqual(b.segregationIndex());
	});

	it('produces different trajectories for different seeds', () => {
		const a = new Schelling(baseParams, 1);
		const b = new Schelling(baseParams, 2);
		for (let i = 0; i < 500; i++) {
			a.step();
			b.step();
		}
		expect(Array.from(a.grid)).not.toEqual(Array.from(b.grid));
	});

	it('density determines occupied count to within sampling noise', () => {
		const params = { ...baseParams, density: 0.7 };
		const m = new Schelling(params, 7);
		const total = params.size * params.size;
		const occupied = m.agentCount();
		expect(occupied / total).toBeGreaterThan(0.6);
		expect(occupied / total).toBeLessThan(0.8);
	});

	it('low tolerance settles into a mixed state with low segregation', () => {
		const m = new Schelling({ ...baseParams, density: 0.9, tolerance: 0.1 }, 3);
		runUntilSettled(m);
		// τ=0.1 corresponds to "mixed; only initial random clustering" in validation.md.
		expect(m.segregationIndex()).toBeLessThan(0.65);
	});

	it('moderate tolerance produces strong segregation', () => {
		const m = new Schelling({ ...baseParams, density: 0.9, tolerance: 0.5 }, 3);
		const { settled } = runUntilSettled(m);
		expect(settled).toBe(true);
		// Sayama's example value: segregation ≈ 0.85 on the validation table.
		expect(m.segregationIndex()).toBeGreaterThan(0.75);
	});

	it('mean segregation rises monotonically across the phase transition', () => {
		const tolerances = [0.1, 0.3, 0.5];
		const means = tolerances.map((tolerance) => {
			let sum = 0;
			for (const seed of [1, 2, 3]) {
				const m = new Schelling({ ...baseParams, density: 0.9, tolerance }, seed);
				runUntilSettled(m, 3000);
				sum += m.segregationIndex();
			}
			return sum / 3;
		});
		expect(means[0]).toBeLessThan(means[1]);
		expect(means[1]).toBeLessThan(means[2]);
	});

	it('reset with the same seed restores the initial configuration', () => {
		const m = new Schelling(baseParams, 11);
		const initial = Array.from(m.grid);
		for (let i = 0; i < 200; i++) m.step();
		m.reset(11);
		expect(Array.from(m.grid)).toEqual(initial);
	});

	it('settled state has zero unsatisfied agents', () => {
		const m = new Schelling({ ...baseParams, density: 0.85, tolerance: 0.5 }, 5);
		runUntilSettled(m);
		expect(m.unsatisfiedCount()).toBe(0);
	});

	it('step returns false at the settled state', () => {
		const m = new Schelling({ ...baseParams, density: 0.85, tolerance: 0.4 }, 9);
		runUntilSettled(m);
		expect(m.step()).toBe(false);
	});
});
