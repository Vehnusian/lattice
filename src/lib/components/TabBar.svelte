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

<div class="flex flex-wrap items-center gap-x-1 gap-y-1 border-b border-(--color-rule) overflow-x-auto">
	{#each tabs as tab (tab.id)}
		<button
			type="button"
			class="font-mono text-xs uppercase tracking-wider px-3 py-2 -mb-px border-b-2 transition-colors duration-150"
			class:border-transparent={active !== tab.id}
			class:text-ink-muted={active !== tab.id}
			class:hover:text-ink={active !== tab.id}
			style={active === tab.id
				? `color: var(--color-ink); border-color: var(--color-accent);`
				: `color: var(--color-ink-muted); border-color: transparent;`}
			onclick={() => onChange(tab.id)}
		>
			{tab.label}
		</button>
	{/each}
</div>
