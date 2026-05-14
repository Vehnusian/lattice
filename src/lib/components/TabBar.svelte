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

<div class="tabbar border-b border-(--color-rule)">
	<div class="tabbar-scroll">
		{#each tabs as tab (tab.id)}
			<button
				type="button"
				class="tab font-mono text-xs uppercase tracking-wider px-3 py-2 -mb-px border-b-2 transition-colors duration-150 whitespace-nowrap"
				style={active === tab.id
					? 'color: var(--color-ink); border-color: var(--color-accent);'
					: 'color: var(--color-ink-muted); border-color: transparent;'}
				onclick={() => onChange(tab.id)}
			>
				{tab.label}
			</button>
		{/each}
	</div>
</div>

<style>
	.tabbar {
		position: relative;
		mask-image: linear-gradient(to right, black calc(100% - 32px), transparent);
		-webkit-mask-image: linear-gradient(to right, black calc(100% - 32px), transparent);
	}

	.tabbar-scroll {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		overflow-x: auto;
		scrollbar-width: none;
		-ms-overflow-style: none;
		padding-right: 32px;
	}

	.tabbar-scroll::-webkit-scrollbar {
		display: none;
	}

	.tab:hover {
		color: var(--color-ink) !important;
	}
</style>
