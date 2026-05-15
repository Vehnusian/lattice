<script lang="ts">
	import { useRunner } from '$lib/sim/runner.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		params: Record<string, number>;
		summary?: string;
		children: Snippet;
	}

	let { params, summary, children }: Props = $props();
	const runner = useRunner();

	function apply() {
		runner.setParams(params);
	}
</script>

<button
	type="button"
	onclick={apply}
	class="preset group flex w-full flex-col items-start gap-0.5 border border-(--color-rule) bg-(--color-paper) px-3 py-2 text-left transition-colors"
	style="border-radius: var(--radius-sm);"
>
	<span class="text-sm text-(--color-ink) group-hover:text-(--color-accent)">
		{@render children()}
	</span>
	{#if summary}
		<span class="font-mono text-[10px] tabular-nums text-(--color-ink-subtle)">{summary}</span>
	{/if}
</button>

<style>
	.preset:hover {
		border-color: var(--color-accent);
	}
</style>
