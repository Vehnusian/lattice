<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createNoise3D } from 'simplex-noise';
	import { readColors } from '$lib/theme/tokens';

	let canvas: HTMLCanvasElement;
	let wrap: HTMLDivElement;
	let raf = 0;
	let stopped = false;

	const PARTICLE_COUNT = 360;
	const NOISE_SCALE = 0.0025;
	const TIME_SCALE = 0.00025;
	const SPEED = 1.2;
	const ANGLE_RANGE = Math.PI * 2.4;
	const STROKE = 1;
	const STROKE_ALPHA = 0.08;

	type RGB = [number, number, number];

	function parseColor(value: string): RGB {
		const v = value.trim();
		if (v.startsWith('#')) {
			const h = v.slice(1);
			const full = h.length === 3 ? [...h].map((c) => c + c).join('') : h;
			const n = parseInt(full, 16);
			return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
		}
		const match = v.match(/\d+(\.\d+)?/g);
		if (match && match.length >= 3) {
			return [parseInt(match[0]), parseInt(match[1]), parseInt(match[2])];
		}
		return [0, 0, 0];
	}

	let paperRGB: RGB = [249, 246, 240];
	let trailFade = 'rgba(249, 246, 240, 0.008)';
	let colorPairs: { from: RGB; to: RGB }[] = [];

	function buildPalette() {
		const c = readColors();
		const ink = parseColor(c.ink);
		const accent = parseColor(c.accent);
		const accentHover = parseColor(c['accent-hover']);
		const inkMuted = parseColor(c['ink-muted']);
		paperRGB = parseColor(c.paper);
		trailFade = `rgba(${paperRGB[0]}, ${paperRGB[1]}, ${paperRGB[2]}, 0.008)`;
		colorPairs = [
			{ from: ink, to: accent },
			{ from: accent, to: accentHover },
			{ from: inkMuted, to: accent },
			{ from: ink, to: inkMuted },
			{ from: accentHover, to: ink }
		];
	}

	interface Particle {
		x: number;
		y: number;
		px: number;
		py: number;
		pair: number;
		jitterR: number;
		jitterG: number;
		jitterB: number;
		life: number;
		age: number;
	}

	let particles: Particle[] = [];
	let noise: ReturnType<typeof createNoise3D>;
	let t = 0;
	let W = 0;
	let H = 0;
	let dpr = 1;

	function resetParticle(p: Particle) {
		p.x = Math.random() * W;
		p.y = Math.random() * H;
		p.px = p.x;
		p.py = p.y;
		p.pair = Math.floor(Math.random() * colorPairs.length);
		p.jitterR = (Math.random() - 0.5) * 10;
		p.jitterG = (Math.random() - 0.5) * 10;
		p.jitterB = (Math.random() - 0.5) * 10;
		p.life = 350 + Math.random() * 550;
		p.age = 0;
	}

	function initParticles() {
		particles = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const p: Particle = {
				x: 0,
				y: 0,
				px: 0,
				py: 0,
				pair: 0,
				jitterR: 0,
				jitterG: 0,
				jitterB: 0,
				life: 0,
				age: 0
			};
			resetParticle(p);
			particles.push(p);
		}
	}

	function resize() {
		if (!wrap || !canvas) return;
		dpr = window.devicePixelRatio || 1;
		W = wrap.clientWidth;
		H = wrap.clientHeight;
		canvas.width = Math.floor(W * dpr);
		canvas.height = Math.floor(H * dpr);
		canvas.style.width = `${W}px`;
		canvas.style.height = `${H}px`;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = `rgb(${paperRGB[0]}, ${paperRGB[1]}, ${paperRGB[2]})`;
			ctx.fillRect(0, 0, W, H);
		}
		initParticles();
	}

	function step() {
		t += 1;
		const tn = t * TIME_SCALE;
		for (const p of particles) {
			p.px = p.x;
			p.py = p.y;
			const n = noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, tn);
			const angle = n * ANGLE_RANGE;
			p.x += Math.cos(angle) * SPEED;
			p.y += Math.sin(angle) * SPEED;
			p.age += 1;
			if (p.age > p.life || p.x < -10 || p.x > W + 10 || p.y < -10 || p.y > H + 10) {
				resetParticle(p);
			}
		}
	}

	function clamp(v: number, lo: number, hi: number) {
		return v < lo ? lo : v > hi ? hi : v;
	}

	function render() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Fade existing pixels toward paper with normal blending
		ctx.globalCompositeOperation = 'source-over';
		ctx.fillStyle = trailFade;
		ctx.fillRect(0, 0, W, H);

		// Strokes use multiply so layers darken-with-hue instead of graying out
		ctx.globalCompositeOperation = 'multiply';
		ctx.lineWidth = STROKE;
		ctx.lineCap = 'round';

		for (const p of particles) {
			const pair = colorPairs[p.pair];
			const u = p.age / p.life;
			const r = clamp(pair.from[0] + (pair.to[0] - pair.from[0]) * u + p.jitterR, 0, 255);
			const g = clamp(pair.from[1] + (pair.to[1] - pair.from[1]) * u + p.jitterG, 0, 255);
			const b = clamp(pair.from[2] + (pair.to[2] - pair.from[2]) * u + p.jitterB, 0, 255);
			ctx.strokeStyle = `rgba(${r.toFixed(0)}, ${g.toFixed(0)}, ${b.toFixed(0)}, ${STROKE_ALPHA})`;
			ctx.beginPath();
			ctx.moveTo(p.px, p.py);
			ctx.lineTo(p.x, p.y);
			ctx.stroke();
		}

		ctx.globalCompositeOperation = 'source-over';
	}

	let visible = true;
	let allowAnimation = false;

	function loop() {
		if (stopped) {
			raf = 0;
			return;
		}
		step();
		render();
		raf = requestAnimationFrame(loop);
	}

	function startLoop() {
		if (raf || stopped || !allowAnimation || !visible) return;
		raf = requestAnimationFrame(loop);
	}

	onMount(() => {
		buildPalette();
		noise = createNoise3D();
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(wrap);

		const io = new IntersectionObserver(
			(entries) => {
				visible = entries.some((e) => e.isIntersecting);
				if (visible) startLoop();
				else if (raf) {
					cancelAnimationFrame(raf);
					raf = 0;
				}
			},
			{ threshold: 0 }
		);
		io.observe(wrap);

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const hidden = wrap.offsetWidth === 0 || wrap.offsetHeight === 0;
		allowAnimation = !reduced && !hidden;
		if (allowAnimation) startLoop();

		return () => {
			stopped = true;
			ro.disconnect();
			io.disconnect();
		};
	});

	onDestroy(() => {
		stopped = true;
		if (raf) cancelAnimationFrame(raf);
	});
</script>

<div bind:this={wrap} class="ambient" aria-hidden="true">
	<canvas bind:this={canvas}></canvas>
</div>

<style>
	.ambient {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 0;
		mask-image: linear-gradient(to bottom, transparent 0%, transparent 25%, black 65%, black 100%);
		-webkit-mask-image: linear-gradient(
			to bottom,
			transparent 0%,
			transparent 25%,
			black 65%,
			black 100%
		);
	}

	@media (min-width: 768px) {
		.ambient {
			mask-image: linear-gradient(
				to right,
				transparent 0%,
				transparent 35%,
				black 55%,
				black 96%,
				transparent 100%
			);
			-webkit-mask-image: linear-gradient(
				to right,
				transparent 0%,
				transparent 35%,
				black 55%,
				black 96%,
				transparent 100%
			);
		}
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
