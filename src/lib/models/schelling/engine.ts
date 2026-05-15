// Schelling segregation model.
// Schelling, T. C. (1971). "Dynamic Models of Segregation." J. Math. Sociol. 1, 143–186.
//
// Two agent types occupy a fraction of a square lattice.
// Each step, one unsatisfied agent moves to a random empty cell.
// An agent is unsatisfied if the fraction of like-type neighbors
// in its Moore (8-cell) neighborhood is below the tolerance threshold.

import { mulberry32 } from '$lib/sim/rng';

export type Cell = 0 | 1 | 2; // 0 = empty, 1 = type A, 2 = type B

export interface SchellingParams {
	size: number;
	density: number;
	tolerance: number;
}

export class Schelling {
	grid: Uint8Array;
	private rng: () => number;
	private seed: number;

	constructor(public params: SchellingParams, seed = 1) {
		this.seed = seed;
		this.rng = mulberry32(seed);
		this.grid = new Uint8Array(params.size * params.size);
		this.populate();
	}

	private populate(): void {
		for (let i = 0; i < this.grid.length; i++) {
			if (this.rng() < this.params.density) {
				this.grid[i] = this.rng() < 0.5 ? 1 : 2;
			} else {
				this.grid[i] = 0;
			}
		}
	}

	step(): boolean {
		const unsatisfied = this.findUnsatisfied();
		if (unsatisfied.length === 0) return false;

		const empties: number[] = [];
		for (let i = 0; i < this.grid.length; i++) {
			if (this.grid[i] === 0) empties.push(i);
		}
		if (empties.length === 0) return false;

		const agent = unsatisfied[Math.floor(this.rng() * unsatisfied.length)];
		const target = empties[Math.floor(this.rng() * empties.length)];
		this.grid[target] = this.grid[agent];
		this.grid[agent] = 0;
		return true;
	}

	reset(seed: number): void {
		this.seed = seed;
		this.rng = mulberry32(seed);
		this.populate();
	}

	private likeFraction(idx: number): number {
		const type = this.grid[idx];
		if (type === 0) return 1;

		const size = this.params.size;
		const x = idx % size;
		const y = (idx - x) / size;
		let like = 0;
		let total = 0;

		for (let dy = -1; dy <= 1; dy++) {
			for (let dx = -1; dx <= 1; dx++) {
				if (dx === 0 && dy === 0) continue;
				const nx = x + dx;
				const ny = y + dy;
				if (nx < 0 || nx >= size || ny < 0 || ny >= size) continue;
				const neighbor = this.grid[ny * size + nx];
				if (neighbor === 0) continue;
				total++;
				if (neighbor === type) like++;
			}
		}

		return total === 0 ? 1 : like / total;
	}

	private findUnsatisfied(): number[] {
		const out: number[] = [];
		for (let i = 0; i < this.grid.length; i++) {
			if (this.grid[i] === 0) continue;
			if (this.likeFraction(i) < this.params.tolerance) out.push(i);
		}
		return out;
	}

	// Metrics for display.

	unsatisfiedCount(): number {
		return this.findUnsatisfied().length;
	}

	segregationIndex(): number {
		let same = 0;
		let total = 0;
		for (let i = 0; i < this.grid.length; i++) {
			if (this.grid[i] === 0) continue;
			total++;
			same += this.likeFraction(i);
		}
		return total === 0 ? 0 : same / total;
	}

	agentCount(): number {
		let n = 0;
		for (let i = 0; i < this.grid.length; i++) {
			if (this.grid[i] !== 0) n++;
		}
		return n;
	}

	metrics() {
		return {
			unsatisfied: this.unsatisfiedCount(),
			segregation: this.segregationIndex(),
			agents: this.agentCount()
		};
	}
}
