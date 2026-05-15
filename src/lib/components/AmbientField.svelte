<script lang="ts">
	import { onMount, onDestroy } from 'svelte';

	let canvas: HTMLCanvasElement;
	let raf = 0;
	let stopped = false;

	// Gray-Scott reaction-diffusion. Parameters here produce coral-like patterns.
	const W = 180;
	const H = 140;
	const Du = 1.0;
	const Dv = 0.5;
	const F = 0.0545;
	const k = 0.062;
	const stepsPerFrame = 8;

	let u = new Float32Array(W * H);
	let v = new Float32Array(W * H);
	let uNext = new Float32Array(W * H);
	let vNext = new Float32Array(W * H);

	function seed() {
		for (let i = 0; i < W * H; i++) {
			u[i] = 1;
			v[i] = 0;
		}
		// Sprinkle a few seed regions
		const seeds = 18;
		for (let s = 0; s < seeds; s++) {
			const cx = Math.floor(Math.random() * (W - 20)) + 10;
			const cy = Math.floor(Math.random() * (H - 20)) + 10;
			const r = 3 + Math.floor(Math.random() * 4);
			for (let dy = -r; dy <= r; dy++) {
				for (let dx = -r; dx <= r; dx++) {
					const x = cx + dx;
					const y = cy + dy;
					if (x < 0 || x >= W || y < 0 || y >= H) continue;
					if (dx * dx + dy * dy > r * r) continue;
					v[y * W + x] = 0.5 + Math.random() * 0.4;
				}
			}
		}
	}

	function step() {
		for (let y = 1; y < H - 1; y++) {
			for (let x = 1; x < W - 1; x++) {
				const i = y * W + x;
				const ui = u[i];
				const vi = v[i];
				const lapU =
					u[i - 1] + u[i + 1] + u[i - W] + u[i + W] - 4 * ui;
				const lapV =
					v[i - 1] + v[i + 1] + v[i - W] + v[i + W] - 4 * vi;
				const uvv = ui * vi * vi;
				uNext[i] = ui + Du * lapU - uvv + F * (1 - ui);
				vNext[i] = vi + Dv * lapV + uvv - (F + k) * vi;
			}
		}
		[u, uNext] = [uNext, u];
		[v, vNext] = [vNext, v];
	}

	function render() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		const img = ctx.createImageData(W, H);
		for (let i = 0; i < W * H; i++) {
			const value = Math.max(0, Math.min(1, v[i] * 2.6));
			// Warm ochre tint: blend toward accent color
			const r = Math.floor(181 * value);
			const g = Math.floor(69 * value);
			const b = Math.floor(11 * value);
			img.data[i * 4 + 0] = r;
			img.data[i * 4 + 1] = g;
			img.data[i * 4 + 2] = b;
			img.data[i * 4 + 3] = Math.floor(value * 255);
		}
		ctx.putImageData(img, 0, 0);
	}

	function loop() {
		if (stopped) return;
		for (let s = 0; s < stepsPerFrame; s++) step();
		render();
		raf = requestAnimationFrame(loop);
	}

	onMount(() => {
		canvas.width = W;
		canvas.height = H;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		seed();
		render();
		if (!reduced) {
			// Run a burst to develop the pattern before animating visibly
			for (let s = 0; s < 600; s++) step();
			render();
			raf = requestAnimationFrame(loop);
		}
	});

	onDestroy(() => {
		stopped = true;
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<div class="ambient" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.ambient {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
		mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%);
		-webkit-mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, black 30%, transparent 80%);
	}

	canvas {
		width: 100%;
		height: 100%;
		image-rendering: pixelated;
		opacity: 0.55;
		filter: blur(2px) saturate(1.1);
	}
</style>
