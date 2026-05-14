<script lang="ts" generics="T extends string">
	interface Tab {
		id: T;
		label: string;
	}

	interface Props {
		tabs: Tab[];
		active: T;
		onChange: (id: T) => void;
	}

	let { tabs, active, onChange }: Props = $props();
</script>

<div class="flex flex-wrap items-center gap-1.5">
	{#each tabs as tab (tab.id)}
		{@const isActive = active === tab.id}
		<button
			type="button"
			onclick={() => onChange(tab.id)}
			class="chip font-mono text-xs uppercase tracking-wider px-3.5 py-1.5 transition-colors duration-150"
			style={isActive
				? 'background: var(--color-ink); color: var(--color-paper); border: 1px solid var(--color-ink);'
				: 'background: transparent; color: var(--color-ink-muted); border: 1px solid var(--color-rule);'}
		>
			{tab.label}
		</button>
	{/each}
</div>

<style>
	.chip {
		border-radius: 999px;
		white-space: nowrap;
	}

	.chip:hover {
		color: var(--color-ink) !important;
		border-color: var(--color-rule-strong) !important;
	}
</style>
