<script lang="ts">
	interface Props {
		source: string;
		filename: string;
		repoUrl?: string;
	}

	let { source, filename, repoUrl }: Props = $props();
	let open = $state(false);
	let copied = $state(false);

	async function copy() {
		try {
			await navigator.clipboard.writeText(source);
			copied = true;
			setTimeout(() => (copied = false), 1400);
		} catch {
			// ignore
		}
	}
</script>

<div class="border-(--color-rule)">
	<button
		type="button"
		onclick={() => (open = !open)}
		class="flex w-full items-center justify-between border border-(--color-rule) bg-(--color-paper-2) px-4 py-3"
		style="border-radius: var(--radius-md);"
	>
		<span class="flex items-center gap-3">
			<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
				{filename}
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
			class="mt-2 border border-(--color-rule) bg-(--color-paper-2)"
			style="border-radius: var(--radius-md);"
		>
			<div class="flex items-center justify-between border-b border-(--color-rule) px-4 py-2">
				<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
					{filename}
				</span>
				<div class="flex items-center gap-3 font-mono text-[10px] uppercase tracking-wider">
					{#if repoUrl}
						<a href={repoUrl} rel="noopener external" class="text-(--color-ink-subtle) hover:text-(--color-ink)">
							open on github
						</a>
					{/if}
					<button
						type="button"
						onclick={copy}
						class="text-(--color-ink-subtle) hover:text-(--color-ink)"
					>
						{copied ? 'copied' : 'copy'}
					</button>
				</div>
			</div>
			<pre class="overflow-x-auto px-4 py-3 text-sm leading-relaxed text-(--color-ink)"><code>{source}</code></pre>
		</div>
	{/if}
</div>
