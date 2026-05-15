<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();
	let open = $state(false);
</script>

<details bind:open class="border-y border-(--color-rule)">
	<summary class="flex cursor-pointer items-center justify-between py-3">
		<span class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">Math</span>
		<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)"
			>{open ? 'hide' : 'show'}</span
		>
	</summary>
	<div class="py-4 leading-relaxed text-(--color-ink-muted)">
		{@render children()}
	</div>
</details>

<style>
	summary::-webkit-details-marker {
		display: none;
	}
	summary {
		list-style: none;
	}
</style>
