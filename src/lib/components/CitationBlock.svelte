<script lang="ts">
	export interface Citation {
		paper: string;
		paperUrl?: string;
		textbook: string;
		textbookUrl?: string;
		freeRef?: string;
		freeRefUrl?: string;
	}

	interface Props {
		citation: Citation;
	}

	let { citation }: Props = $props();
</script>

<dl class="space-y-3">
	<div>
		<dt class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
			Original paper
		</dt>
		<dd class="mt-1 text-(--color-ink-muted)">
			{#if citation.paperUrl}
				<a href={citation.paperUrl} target="_blank" rel="noopener noreferrer">{citation.paper}</a>
			{:else}
				{citation.paper}
			{/if}
		</dd>
	</div>

	<div>
		<dt class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
			Textbook
		</dt>
		<dd class="mt-1 text-(--color-ink-muted)">
			{#if citation.textbookUrl}
				<a href={citation.textbookUrl} target="_blank" rel="noopener noreferrer"
					>{citation.textbook}</a
				>
			{:else}
				{citation.textbook}
			{/if}
		</dd>
	</div>

	{#if citation.freeRef}
		<div>
			<dt class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
				Free reference
			</dt>
			<dd class="mt-1 text-(--color-ink-muted)">
				{#if citation.freeRefUrl}
					<a href={citation.freeRefUrl} target="_blank" rel="noopener noreferrer"
						>{citation.freeRef}</a
					>
				{:else}
					{citation.freeRef}
				{/if}
			</dd>
		</div>
	{/if}
</dl>
