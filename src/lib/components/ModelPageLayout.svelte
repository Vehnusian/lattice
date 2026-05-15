<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { ModelEntry } from '$lib/models/registry';

	interface Props {
		model: ModelEntry;
		sim: Snippet;
		params: Snippet;
		controls: Snippet;
		body: Snippet;
	}

	let { model, sim, params, controls, body }: Props = $props();

	const statusLabel = {
		planned: 'planned',
		'in-progress': 'in progress',
		published: 'live'
	}[model.status];
</script>

<div class="mx-auto max-w-(--max-w-page) pt-10 pb-24">
	<div class="px-6">
		<a
			href="/"
			class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle) hover:text-(--color-ink) hover:no-underline"
		>
			← models
		</a>

		<div class="mt-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider">
			<span class="text-(--color-ink-subtle)">{model.discipline}</span>
			<span class="text-(--color-rule-strong)">·</span>
			<span
				class={model.status === 'published'
					? 'text-(--color-accent)'
					: 'text-(--color-ink-subtle)'}
			>
				{statusLabel}
			</span>
		</div>

		<h1 class="mt-3 text-3xl font-semibold tracking-tight text-(--color-ink) sm:text-4xl">
			{model.name}
		</h1>
		<p class="mt-3 max-w-2xl text-lg leading-relaxed text-(--color-ink-muted)">
			{model.tagline}
		</p>
	</div>

	<div class="mt-10 grid gap-6 px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
		<div class="flex flex-col gap-3">
			<div>
				{@render sim()}
			</div>
			<div>
				{@render controls()}
			</div>
		</div>
		<div>
			{@render params()}
		</div>
	</div>

	<div class="mt-16 px-6">
		<div class="mx-auto max-w-(--max-w-prose)">
			{@render body()}
		</div>
	</div>
</div>
