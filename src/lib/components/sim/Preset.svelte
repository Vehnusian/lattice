<script lang="ts">
	import { useRunner } from '$lib/sim/runner.svelte';
	import type { Snippet } from 'svelte';

	interface Props {
		params: Record<string, number>;
		children: Snippet;
	}

	let { params, children }: Props = $props();
	const runner = useRunner();
</script>

<button
	type="button"
	onclick={() => runner.setParams(params)}
	class="preset group inline-flex w-full items-center justify-between border border-(--color-rule) bg-(--color-paper-2) px-4 py-3 text-left transition-colors"
	style="border-radius: var(--radius-md);"
>
	<span class="text-(--color-ink)">{@render children()}</span>
	<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle) group-hover:text-(--color-accent)">
		try →
	</span>
</button>

<style>
	.preset:hover {
		border-color: var(--color-accent);
	}
</style>
