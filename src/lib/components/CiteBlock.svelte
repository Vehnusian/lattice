<script lang="ts">
	interface Props {
		title: string;
		plain: string;
		bibtex: string;
	}

	let { title, plain, bibtex }: Props = $props();
	let copied = $state(false);

	async function copy(text: string) {
		try {
			await navigator.clipboard.writeText(text);
			copied = true;
			setTimeout(() => (copied = false), 1400);
		} catch {
			// ignore
		}
	}
</script>

<div>
	<h3 class="text-xl font-semibold tracking-tight text-(--color-ink)">{title}</h3>

	<p class="mt-4 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		Plain text
	</p>
	<p class="mt-2 leading-relaxed text-(--color-ink-muted)">{plain}</p>

	<div class="mt-4 flex items-center justify-between">
		<p class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">BibTeX</p>
		<button
			type="button"
			onclick={() => copy(bibtex)}
			class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle) hover:text-(--color-ink)"
		>
			{copied ? 'copied' : 'copy'}
		</button>
	</div>
	<pre
		class="mt-2 overflow-x-auto border border-(--color-rule) bg-(--color-paper-2) p-4 text-sm leading-relaxed"
		style="border-radius: var(--radius-md);">{bibtex}</pre>
</div>
