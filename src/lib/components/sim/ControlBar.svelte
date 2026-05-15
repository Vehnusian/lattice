<script lang="ts">
	import { useRunner } from '$lib/sim/runner.svelte';

	const runner = useRunner();
	const speeds = [0.5, 1, 2, 4, 8];
</script>

<div class="flex items-center gap-1 border border-(--color-rule) bg-(--color-paper-2) px-2 py-1.5" style="border-radius: var(--radius-md);">
	<button
		type="button"
		onclick={() => (runner.playing ? runner.pause() : runner.play())}
		aria-label={runner.playing ? 'Pause' : 'Play'}
		class="icon-btn"
	>
		{#if runner.playing}
			<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
				<rect x="4" y="3" width="3" height="10" />
				<rect x="9" y="3" width="3" height="10" />
			</svg>
		{:else}
			<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
				<path d="M4 3 L13 8 L4 13 Z" />
			</svg>
		{/if}
	</button>

	<button type="button" onclick={() => runner.step()} aria-label="Step once" class="icon-btn">
		<svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
			<path d="M4 3 L10 8 L4 13 Z" />
			<rect x="11" y="3" width="2" height="10" />
		</svg>
	</button>

	<button type="button" onclick={() => runner.reset()} aria-label="Reset" class="icon-btn">
		<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">
			<path d="M3 8 A 5 5 0 1 1 5 11.5" />
			<polyline points="3,4 3,8 7,8" stroke-linejoin="round" />
		</svg>
	</button>

	<span class="mx-2 h-5 w-px bg-(--color-rule)"></span>

	<div class="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		{#each speeds as s}
			<button
				type="button"
				onclick={() => (runner.speed = s)}
				class="px-1.5 py-0.5"
				style={runner.speed === s
					? 'color: var(--color-ink); background: var(--color-rule);'
					: 'color: var(--color-ink-subtle);'}
			>
				{s}×
			</button>
		{/each}
	</div>

	<span class="ml-auto font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		t = {runner.tick}
	</span>
</div>

<style>
	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 28px;
		height: 28px;
		border-radius: 4px;
		color: var(--color-ink-muted);
		transition: color 0.15s, background 0.15s;
	}

	.icon-btn:hover {
		color: var(--color-ink);
		background: var(--color-rule);
	}
</style>
