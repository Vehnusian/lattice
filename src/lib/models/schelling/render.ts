import type { Schelling } from './engine';

export function render(
	ctx: CanvasRenderingContext2D,
	sim: Schelling,
	colors: { bg: string; a: string; b: string }
): void {
	const { width, height } = ctx.canvas;
	const size = sim.params.size;
	const cell = width / size;

	ctx.fillStyle = colors.bg;
	ctx.fillRect(0, 0, width, height);

	for (let i = 0; i < sim.grid.length; i++) {
		const type = sim.grid[i];
		if (type === 0) continue;
		const x = (i % size) * cell;
		const y = Math.floor(i / size) * cell;
		ctx.fillStyle = type === 1 ? colors.a : colors.b;
		ctx.fillRect(x, y, cell, cell);
	}
}
