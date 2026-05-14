<script lang="ts">
	import { disciplines, registry, type Discipline } from '$lib/models/registry';
	import ModelCard from '$lib/components/ModelCard.svelte';
	import TabBar from '$lib/components/TabBar.svelte';

	type Filter = Discipline | 'all';
	let active = $state<Filter>('all');

	const filtered = $derived(
		active === 'all' ? registry : registry.filter((m) => m.discipline === active)
	);
</script>

<div class="mx-auto max-w-(--max-w-page) px-6 pt-12 pb-24">
	<section class="max-w-2xl">
		<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">
			Reference library
		</p>
		<h1 class="mt-3 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl">
			Complex systems models,<br />
			validated and explained.
		</h1>
		<p class="mt-5 text-lg leading-relaxed text-(--color-ink-muted)">
			Interactive simulations, plain-language explanations, the underlying math, and citations
			back to the literature. Built for university students and instructors.
		</p>
	</section>

	<div class="mt-16">
		<TabBar tabs={disciplines} active={active} onChange={(id) => (active = id as Filter)} />
	</div>

	<div class="mt-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as model (model.slug)}
			<ModelCard {model} />
		{/each}
	</div>

	{#if filtered.length === 0}
		<p class="mt-12 font-mono text-sm text-(--color-ink-subtle)">No models in this discipline yet.</p>
	{/if}
</div>
