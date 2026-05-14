<script lang="ts">
	import { disciplines, registry, type Discipline } from '$lib/models/registry';
	import ModelCard from '$lib/components/ModelCard.svelte';
	import TabBar from '$lib/components/TabBar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';

	type Filter = Discipline | 'all';

	let active = $state<Filter>('all');
	let query = $state('');

	const filtered = $derived.by(() => {
		const q = query.trim().toLowerCase();
		return registry.filter((m) => {
			const matchDiscipline = active === 'all' || m.discipline === active;
			if (!matchDiscipline) return false;
			if (!q) return true;
			return m.name.toLowerCase().includes(q) || m.tagline.toLowerCase().includes(q);
		});
	});
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
		<SearchBar value={query} onChange={(v) => (query = v)} />
	</div>

	<div class="mt-6">
		<TabBar tabs={disciplines} active={active} onChange={(id) => (active = id as Filter)} />
	</div>

	<div class="mt-4 flex items-center justify-between">
		<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">
			{filtered.length} of {registry.length}
		</p>
	</div>

	<div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as model (model.slug)}
			<ModelCard {model} />
		{/each}
	</div>

	{#if filtered.length === 0}
		<div class="mt-12 border border-(--color-rule) px-6 py-16 text-center">
			<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">
				No matches
			</p>
			<p class="mt-2 text-(--color-ink-muted)">
				Try a different search or pick another discipline.
			</p>
		</div>
	{/if}
</div>
