<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title?: string;
		children: Snippet;
	}

	let { title = 'Parameters', children }: Props = $props();
</script>

<div
	class="border border-(--color-rule) bg-(--color-paper-2) p-4"
	style="border-radius: var(--radius-md);"
>
	<p class="mb-4 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		{title}
	</p>
	<div class="space-y-4">
		{@render children()}
	</div>
</div>
