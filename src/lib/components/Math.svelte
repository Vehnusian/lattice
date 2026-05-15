<script lang="ts">
	import katex from 'katex';

	interface Props {
		tex: string;
		display?: boolean;
	}

	let { tex, display = false }: Props = $props();

	const html = $derived(
		katex.renderToString(tex, {
			displayMode: display,
			throwOnError: false,
			output: 'html'
		})
	);
</script>

{#if display}
	<div class="my-4 overflow-x-auto text-(--color-ink)">{@html html}</div>
{:else}
	<span class="text-(--color-ink)">{@html html}</span>
{/if}
