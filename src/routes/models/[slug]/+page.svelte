<script lang="ts">
	import type { PageData } from './$types';
	import SchellingPage from '$lib/models/schelling/page.svelte';

	let { data }: { data: PageData } = $props();

	const pages: Record<string, typeof SchellingPage> = {
		schelling: SchellingPage
	};

	const PageComponent = $derived(pages[data.model.slug]);
	const isPublished = $derived(data.model.status === 'published');
</script>

<svelte:head>
	<title>{data.model.name} · lattice</title>
</svelte:head>

{#if PageComponent && isPublished}
	<PageComponent model={data.model} />
{:else}
	<div class="mx-auto max-w-(--max-w-prose) px-6 pt-10 pb-24">
		<a
			href="/"
			class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle) hover:text-(--color-ink) hover:no-underline"
		>
			← models
		</a>

		<div class="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
			<span class="text-(--color-ink-subtle)">{data.model.discipline}</span>
			<span class="text-(--color-rule-strong)">·</span>
			<span class="text-(--color-ink-subtle)">{data.model.status}</span>
		</div>

		<h1 class="mt-3 text-3xl font-semibold tracking-tight text-(--color-ink) sm:text-4xl">
			{data.model.name}
		</h1>
		<p class="mt-3 text-lg leading-relaxed text-(--color-ink-muted)">{data.model.tagline}</p>

		<div
			class="mt-12 border border-(--color-rule) bg-(--color-paper-2) p-6"
			style="border-radius: var(--radius-md);"
		>
			<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">
				Not yet built
			</p>
			<p class="mt-3 leading-relaxed text-(--color-ink-muted)">
				This model is in the catalog but not yet implemented. Implementation order is set by
				validation difficulty and pedagogical priority.
			</p>
			<p class="mt-3 leading-relaxed text-(--color-ink-muted)">
				Track progress on
				<a href="https://github.com/Vehnusian/lattice" target="_blank" rel="noopener noreferrer"
					>GitHub</a
				>.
			</p>
		</div>
	</div>
{/if}
