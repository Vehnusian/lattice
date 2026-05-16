<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		draw: (ctx: CanvasRenderingContext2D) => void;
		tick: number;
		aspect?: number;
		label?: string;
		onVisibilityChange?: (visible: boolean) => void;
	}

	let {
		draw,
		tick,
		aspect = 1,
		label = 'Simulation viewport',
		onVisibilityChange
	}: Props = $props();
	let canvas: HTMLCanvasElement;
	let wrap: HTMLDivElement;

	function resize() {
		if (!canvas || !wrap) return;
		const dpr = window.devicePixelRatio || 1;
		const w = wrap.clientWidth;
		const h = w / aspect;
		canvas.width = Math.floor(w * dpr);
		canvas.height = Math.floor(h * dpr);
		canvas.style.width = `${w}px`;
		canvas.style.height = `${h}px`;
		const ctx = canvas.getContext('2d');
		if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		render();
	}

	function render() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d');
		if (!ctx) return;
		draw(ctx);
	}

	onMount(() => {
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(wrap);

		let io: IntersectionObserver | null = null;
		if (onVisibilityChange) {
			io = new IntersectionObserver(
				(entries) => {
					onVisibilityChange?.(entries.some((e) => e.isIntersecting));
				},
				{ threshold: 0 }
			);
			io.observe(wrap);
		}

		return () => {
			ro.disconnect();
			io?.disconnect();
		};
	});

	$effect(() => {
		void tick;
		render();
	});
</script>

<div bind:this={wrap} class="w-full">
	<canvas bind:this={canvas} class="block bg-(--color-paper-2)" aria-label={label}></canvas>
</div>
