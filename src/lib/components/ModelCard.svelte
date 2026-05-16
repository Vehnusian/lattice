<script lang="ts">
	import type { ModelEntry } from '$lib/models/registry';
	import CardPreview from './CardPreview.svelte';

	interface Props {
		model: ModelEntry;
	}

	let { model }: Props = $props();

	const href = $derived(`/models/${model.slug}`);
</script>

<a
	class="group block border-(--color-rule) hover:border-(--color-rule-strong) transition-colors duration-200"
	{href}
>
	<div class="aspect-[4/3] overflow-hidden border-b border-(--color-rule) bg-(--color-paper-2)">
		<CardPreview discipline={model.discipline} />
	</div>

	<div
		class="flex items-start justify-between gap-4 px-4 py-3 border-x border-b border-(--color-rule)"
	>
		<div class="min-w-0 flex-1">
			<h3 class="text-(--color-ink) font-medium tracking-tight">{model.name}</h3>
			<p class="mt-1 text-sm leading-snug text-(--color-ink-muted)">{model.tagline}</p>
		</div>
		<span class="shrink-0 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
			{#if model.status === 'published'}
				<span class="text-(--color-accent)">live</span>
			{:else if model.status === 'in-progress'}
				wip
			{:else}
				planned
			{/if}
		</span>
	</div>
</a>
