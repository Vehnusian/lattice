<script lang="ts">
	import { useRunner } from '$lib/sim/runner.svelte';

	const runner = useRunner();
	const speeds = [0.5, 1, 2, 4, 8];
</script>

<div
	class="flex items-center gap-2 border border-(--color-rule) bg-(--color-paper-2) px-3 py-2"
	style="border-radius: var(--radius-md);"
>
	<button
		type="button"
		onclick={() => (runner.playing ? runner.pause() : runner.play())}
		aria-label={runner.playing ? 'Pause' : 'Play'}
		class="icon-btn"
	>
		{#if runner.playing}
			<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
				<rect x="4" y="3" width="3" height="10" />
				<rect x="9" y="3" width="3" height="10" />
			</svg>
		{:else}
			<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
				<path d="M4 3 L13 8 L4 13 Z" />
			</svg>
		{/if}
	</button>

	<button type="button" onclick={() => runner.step()} aria-label="Step once" class="icon-btn">
		<svg viewBox="0 0 16 16" width="18" height="18" fill="currentColor" aria-hidden="true">
			<path d="M4 3 L10 8 L4 13 Z" />
			<rect x="11" y="3" width="2" height="10" />
		</svg>
	</button>

	<button type="button" onclick={() => runner.reset()} aria-label="Reset" class="icon-btn">
		<svg
			viewBox="0 0 16 16"
			width="18"
			height="18"
			fill="none"
			stroke="currentColor"
			stroke-width="1.6"
			aria-hidden="true"
		>
			<path d="M3 8 A 5 5 0 1 1 5 11.5" />
			<polyline points="3,4 3,8 7,8" stroke-linejoin="round" />
		</svg>
	</button>

	<span class="mx-2 h-6 w-px bg-(--color-rule)"></span>

	<div class="flex items-center gap-0.5 font-mono text-xs">
		{#each speeds as s (s)}
			<button
				type="button"
				onclick={() => (runner.speed = s)}
				class="speed-btn"
				style={runner.speed === s
					? 'color: var(--color-paper); background: var(--color-ink);'
					: 'color: var(--color-ink-muted); background: transparent;'}
			>
				{s}×
			</button>
		{/each}
	</div>

	<span class="ml-auto flex items-center gap-3 font-mono text-xs tabular-nums">
		{#if runner.settled}
			<span class="text-(--color-accent) uppercase tracking-wider">settled</span>
		{/if}
		<span class="text-(--color-ink)">
			<span class="text-(--color-ink-subtle)">t =</span>
			{runner.tick.toLocaleString()}
		</span>
	</span>
</div>

<style>
	.icon-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		height: 38px;
		border-radius: 6px;
		color: var(--color-ink-muted);
		transition: color 0.15s, background 0.15s;
	}

	.icon-btn:hover {
		color: var(--color-ink);
		background: var(--color-rule);
	}

	.speed-btn {
		padding: 6px 10px;
		border-radius: 4px;
		transition: color 0.15s, background 0.15s;
		font-weight: 500;
	}

	.speed-btn:hover {
		color: var(--color-ink);
	}
</style>
