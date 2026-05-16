<script lang="ts">
	import { useRunner } from '$lib/sim/runner.svelte';

	interface Props {
		label?: string;
		min?: number;
		max?: number;
		format?: (v: number) => string;
	}

	let { label, min = 0, max = 1, format = (v) => v.toFixed(2) }: Props = $props();
	const runner = useRunner();

	const width = 200;
	const height = 60;

	const points = $derived.by(() => {
		const h = runner.history;
		if (h.length === 0) return '';
		const tMin = h[0].t;
		const tMax = h[h.length - 1].t || 1;
		const tSpan = Math.max(1, tMax - tMin);
		return h
			.map((s) => {
				const x = ((s.t - tMin) / tSpan) * width;
				const y = height - ((s.value - min) / (max - min)) * height;
				return `${x.toFixed(1)},${y.toFixed(1)}`;
			})
			.join(' ');
	});

	const current = $derived(runner.history.at(-1)?.value ?? 0);
</script>

<div>
	{#if label}
		<div class="flex items-baseline justify-between">
			<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-muted)"
				>{label}</span
			>
			<span class="font-mono text-xs tabular-nums text-(--color-ink)">{format(current)}</span>
		</div>
	{:else}
		<div class="flex items-baseline justify-end">
			<span class="font-mono text-xs tabular-nums text-(--color-ink)">{format(current)}</span>
		</div>
	{/if}
	<svg
		viewBox="0 0 {width} {height}"
		class="mt-2 w-full"
		preserveAspectRatio="none"
		role="img"
		aria-label={label ?? 'metric history'}
	>
		<line x1="0" y1={height} x2={width} y2={height} stroke="var(--color-rule)" stroke-width="0.5" />
		<polyline {points} fill="none" stroke="var(--color-accent)" stroke-width="1.2" />
	</svg>
</div>
