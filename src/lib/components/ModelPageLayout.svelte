<script lang="ts">
	import { onMount, type Snippet } from 'svelte';
	import type { ModelEntry } from '$lib/models/registry';

	export interface TocItem {
		id: string;
		label: string;
	}

	interface Props {
		model: ModelEntry;
		toc?: TocItem[];
		sim: Snippet;
		params: Snippet;
		controls: Snippet;
		body: Snippet;
	}

	let { model, toc = [], sim, params, controls, body }: Props = $props();

	let activeId = $state(toc[0]?.id ?? '');

	const statusLabel = {
		planned: 'planned',
		'in-progress': 'in progress',
		published: 'live'
	}[model.status];

	onMount(() => {
		if (toc.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const visible = entries
					.filter((e) => e.isIntersecting)
					.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
				if (visible.length > 0) {
					activeId = visible[0].target.id;
				}
			},
			{ rootMargin: '-15% 0px -70% 0px', threshold: 0 }
		);

		const els: Element[] = [];
		for (const item of toc) {
			const el = document.getElementById(item.id);
			if (el) {
				observer.observe(el);
				els.push(el);
			}
		}

		return () => observer.disconnect();
	});
</script>

<div class="mx-auto max-w-(--max-w-page) pt-10 pb-24">
	<div class="px-4 sm:px-6">
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

	<div class="mt-10 grid gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px]">
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

	<div
		class="mt-16 grid gap-12 px-4 sm:px-6 lg:grid-cols-[minmax(0,65ch)_minmax(0,200px)]"
	>
		<div>
			{@render body()}
		</div>
		{#if toc.length > 0}
			<aside class="hidden lg:block">
				<div class="sticky top-6">
					<p
						class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)"
					>
						On this page
					</p>
					<ul class="mt-3 space-y-1.5 text-sm">
						{#each toc as item (item.id)}
							<li>
								<a
									href="#{item.id}"
									class="toc-link block py-0.5"
									style={activeId === item.id
										? 'color: var(--color-ink);'
										: 'color: var(--color-ink-subtle);'}
								>
									{item.label}
								</a>
							</li>
						{/each}
					</ul>
				</div>
			</aside>
		{/if}
	</div>
</div>

<style>
	.toc-link {
		transition: color 0.15s;
		text-decoration: none;
	}

	.toc-link:hover {
		color: var(--color-ink);
	}
</style>
