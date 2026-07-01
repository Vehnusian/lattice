<script lang="ts">
	interface SourceTab {
		label: string;
		filename: string;
		source: string;
		repoUrl?: string;
	}

	interface Props {
		tabs: SourceTab[];
	}

	let { tabs }: Props = $props();

	let open = $state(false);
	let activeIndex = $state(0);
	let copied = $state(false);

	const active = $derived(tabs[activeIndex]);

	async function copy() {
		try {
			await navigator.clipboard.writeText(active.source);
			copied = true;
			setTimeout(() => (copied = false), 1400);
		} catch {
			// ignore
		}
	}
</script>

<div>
	<button
		type="button"
		onclick={() => (open = !open)}
		class="flex w-full items-center justify-between border border-(--color-rule) bg-(--color-paper-2) px-4 py-3"
		style="border-radius: var(--radius-md);"
	>
		<span class="flex items-center gap-3">
			<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
				engine
			</span>
			<span class="text-sm text-(--color-ink)">
				{open ? 'Hide source' : 'View source'}
			</span>
		</span>
		<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
			{open ? '−' : '+'}
		</span>
	</button>

	{#if open}
		<div
			class="mt-2 overflow-hidden border border-(--color-rule) bg-(--color-paper-2)"
			style="border-radius: var(--radius-md);"
		>
			<div
				class="flex flex-wrap items-center justify-between gap-3 border-b border-(--color-rule) px-3 py-2"
			>
				<div class="flex items-center gap-1">
					{#each tabs as tab, i (tab.filename)}
						<button
							type="button"
							onclick={() => (activeIndex = i)}
							class="lang-tab font-mono text-xs px-3 py-1.5"
							style={activeIndex === i
								? 'color: var(--color-paper); background: var(--color-ink);'
								: 'color: var(--color-ink-muted); background: transparent;'}
						>
							{tab.label}
						</button>
					{/each}
				</div>
				<div
					class="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)"
				>
					<span>{active.filename}</span>
					{#if active.repoUrl}
						<a
							href={active.repoUrl}
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-(--color-ink)"
						>
							github
						</a>
					{/if}
					<button type="button" onclick={copy} class="hover:text-(--color-ink)">
						{copied ? 'copied' : 'copy'}
					</button>
				</div>
			</div>
			<pre class="overflow-x-auto px-4 py-3 text-sm leading-relaxed text-(--color-ink)"><code
					>{active.source}</code
				></pre>
		</div>
	{/if}
</div>

<style>
	.lang-tab {
		border-radius: 4px;
		transition:
			color 0.15s,
			background 0.15s;
	}

	.lang-tab:hover {
		color: var(--color-ink);
	}
</style>
