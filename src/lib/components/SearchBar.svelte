<script lang="ts">
	interface Props {
		value: string;
		onChange: (v: string) => void;
		placeholder?: string;
	}

	let { value, onChange, placeholder = 'Search models' }: Props = $props();
	let input: HTMLInputElement;

	function clear() {
		onChange('');
		input?.focus();
	}

	function onKey(e: KeyboardEvent) {
		if (e.key === 'Escape' && value) {
			e.preventDefault();
			clear();
		}
	}
</script>

<svelte:window
	onkeydown={(e) => {
		if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
			e.preventDefault();
			input?.focus();
		}
	}}
/>

<div class="relative">
	<svg
		viewBox="0 0 20 20"
		fill="none"
		stroke="currentColor"
		stroke-width="1.6"
		class="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-(--color-ink-subtle)"
		aria-hidden="true"
	>
		<circle cx="9" cy="9" r="6" />
		<line x1="13.5" y1="13.5" x2="17" y2="17" stroke-linecap="round" />
	</svg>

	<input
		bind:this={input}
		type="search"
		{value}
		oninput={(e) => onChange(e.currentTarget.value)}
		onkeydown={onKey}
		{placeholder}
		spellcheck="false"
		autocomplete="off"
		class="w-full border border-(--color-rule) bg-(--color-paper-2) py-2.5 pr-12 pl-10 text-(--color-ink) placeholder:text-(--color-ink-subtle) focus:border-(--color-accent) focus:outline-none"
		style="border-radius: var(--radius-md);"
	/>

	{#if value}
		<button
			type="button"
			onclick={clear}
			aria-label="Clear search"
			class="absolute top-1/2 right-3 -translate-y-1/2 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle) hover:text-(--color-ink)"
		>
			clear
		</button>
	{:else}
		<kbd
			class="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 hidden font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle) sm:block"
		>
			⌘K
		</kbd>
	{/if}
</div>
