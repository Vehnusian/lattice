<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { createNoise3D } from 'simplex-noise';

	let canvas: HTMLCanvasElement;
	let wrap: HTMLDivElement;
	let raf = 0;
	let stopped = false;

	const PARTICLE_COUNT = 180;
	const NOISE_SCALE = 0.0022;
	const TIME_SCALE = 0.00035;
	const SPEED = 0.45;

	interface Particle {
		x: number;
		y: number;
		hue: 'ink' | 'accent';
		age: number;
		life: number;
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
		p.age = 0;
		p.life = 200 + Math.random() * 400;
	}

	function initParticles() {
		particles = [];
		for (let i = 0; i < PARTICLE_COUNT; i++) {
			const p: Particle = {
				x: Math.random() * W,
				y: Math.random() * H,
				hue: Math.random() < 0.05 ? 'accent' : 'ink',
				age: 0,
				life: 200 + Math.random() * 400
			};
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
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		initParticles();
		// Fill with paper background once
		if (ctx) {
			ctx.fillStyle = '#F9F6F0';
			ctx.fillRect(0, 0, W, H);
		}
	}

	function step() {
		t += 1;
		const tn = t * TIME_SCALE;
		for (const p of particles) {
			const angle = noise(p.x * NOISE_SCALE, p.y * NOISE_SCALE, tn) * Math.PI * 2.5;
			p.x += Math.cos(angle) * SPEED;
			p.y += Math.sin(angle) * SPEED;
			p.age += 1;
			if (
				p.age > p.life ||
				p.x < -20 ||
				p.x > W + 20 ||
				p.y < -20 ||
				p.y > H + 20
			) {
				resetParticle(p);
			}
		}
	}

	function render() {
		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Fade existing trails toward paper color
		ctx.fillStyle = 'rgba(249, 246, 240, 0.035)';
		ctx.fillRect(0, 0, W, H);

		for (const p of particles) {
			const color = p.hue === 'accent' ? 'rgba(181, 69, 11, 0.35)' : 'rgba(22, 21, 19, 0.18)';
			ctx.fillStyle = color;
			ctx.beginPath();
			ctx.arc(p.x, p.y, 1, 0, Math.PI * 2);
			ctx.fill();
		}
	}

	function loop() {
		if (stopped) return;
		step();
		render();
		raf = requestAnimationFrame(loop);
	}

	onMount(() => {
		noise = createNoise3D();
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(wrap);

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (!reduced) {
			// Warm-up: develop initial trails so the page lands looking populated
			for (let i = 0; i < 300; i++) {
				step();
				render();
			}
			raf = requestAnimationFrame(loop);
		}

		return () => {
			stopped = true;
			ro.disconnect();
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
		mask-image: radial-gradient(ellipse 80% 110% at 85% 50%, black 20%, transparent 85%);
		-webkit-mask-image: radial-gradient(ellipse 80% 110% at 85% 50%, black 20%, transparent 85%);
	}

	canvas {
		display: block;
		width: 100%;
		height: 100%;
	}
</style>
