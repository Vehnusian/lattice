<script lang="ts">
	import { useRunner } from '$lib/sim/runner.svelte';

	interface Props {
		source: string;
		format?: (v: number) => string;
	}

	let { source, format = (v) => Math.round(v).toLocaleString() }: Props = $props();
	const runner = useRunner();

	const value = $derived((runner.metrics as Record<string, number>)[source] ?? 0);
</script>

<span class="font-mono tabular-nums text-(--color-ink)">{format(value)}</span>
