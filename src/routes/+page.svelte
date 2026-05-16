<script lang="ts">
	import { disciplines, registry, type Discipline } from '$lib/models/registry';
	import { searchModels } from '$lib/search';
	import ModelCard from '$lib/components/ModelCard.svelte';
	import TabBar from '$lib/components/TabBar.svelte';
	import SearchBar from '$lib/components/SearchBar.svelte';
	import AmbientField from '$lib/components/AmbientField.svelte';

	type Filter = Discipline | 'all';

	let active = $state<Filter>('all');
	let query = $state('');
	let liveOnly = $state(false);

	const liveCount = registry.filter((m) => m.status === 'published').length;

	const filtered = $derived.by(() => {
		let result = searchModels(query);
		if (active !== 'all') result = result.filter((m) => m.discipline === active);
		if (liveOnly) result = result.filter((m) => m.status === 'published');
		return result;
	});
</script>

<svelte:head>
	<title>lattice — reference library of complex systems models</title>
</svelte:head>

<div class="hero-wrap">
	<AmbientField />
	<div class="relative mx-auto max-w-(--max-w-page) px-6 pt-20 pb-16">
		<section class="max-w-3xl">
			<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">
				Reference library
			</p>
			<h1
				class="mt-3 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl md:text-6xl"
			>
				How simple rules<br />
				produce complex behavior.
			</h1>
			<p class="mt-6 max-w-2xl text-lg leading-relaxed text-(--color-ink-muted)">
				A reference library of validated complex systems models. Each one has an interactive
				simulation, the math, and citations to the source literature.
			</p>
		</section>
	</div>
</div>

<div class="mx-auto max-w-(--max-w-page) px-6 pt-4 pb-24">
	<div class="mt-16 flex flex-col gap-3 sm:flex-row sm:items-center">
		<div class="flex-1">
			<SearchBar value={query} onChange={(v) => (query = v)} />
		</div>
		<button
			type="button"
			onclick={() => (liveOnly = !liveOnly)}
			class="live-toggle flex items-center gap-2 self-stretch border px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors"
			style={liveOnly
				? 'background: var(--color-ink); color: var(--color-paper); border-color: var(--color-ink); border-radius: var(--radius-md);'
				: 'background: var(--color-paper-2); color: var(--color-ink-muted); border-color: var(--color-rule); border-radius: var(--radius-md);'}
		>
			<span
				class="h-1.5 w-1.5 rounded-full"
				style={liveOnly
					? 'background: var(--color-accent);'
					: 'background: var(--color-ink-subtle);'}
			></span>
			Live ({liveCount})
		</button>
	</div>

	<div class="mt-6">
		<TabBar tabs={disciplines} {active} onChange={(id) => (active = id as Filter)} />
	</div>

	<div class="mt-6 flex items-center justify-between border-b border-(--color-rule) pb-3">
		<p class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
			{filtered.length} of {registry.length}
		</p>
	</div>

	<div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
		{#each filtered as model (model.slug)}
			<ModelCard {model} />
		{/each}
	</div>

	{#if filtered.length === 0}
		<div class="mt-12 border border-(--color-rule) px-6 py-16 text-center">
			<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">No matches</p>
			<p class="mt-2 text-(--color-ink-muted)">
				Try a different search or pick another discipline.
			</p>
		</div>
	{/if}
</div>

<style>
	.hero-wrap {
		position: relative;
		overflow: hidden;
		border-bottom: 1px solid var(--color-rule);
	}

	.live-toggle:hover {
		border-color: var(--color-ink) !important;
	}
</style>
