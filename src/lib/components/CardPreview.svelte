<script lang="ts">
	import type { Discipline } from '$lib/models/registry';

	interface Props {
		discipline: Discipline;
		animated: boolean;
	}

	let { discipline, animated }: Props = $props();

	const ink = 'var(--color-ink)';
	const muted = 'var(--color-ink-subtle)';
	const accent = 'var(--color-accent)';
</script>

<svg viewBox="0 0 200 150" preserveAspectRatio="xMidYMid slice" class="h-full w-full">
	{#if discipline === 'networks'}
		<g stroke={muted} stroke-width="0.4" fill="none">
			<line x1="40" y1="40" x2="100" y2="60" />
			<line x1="40" y1="40" x2="70" y2="100" />
			<line x1="100" y1="60" x2="160" y2="40" />
			<line x1="100" y1="60" x2="140" y2="110" />
			<line x1="100" y1="60" x2="70" y2="100" />
			<line x1="70" y1="100" x2="140" y2="110" />
			<line x1="160" y1="40" x2="140" y2="110" />
		</g>
		<g fill={ink}>
			<circle cx="40" cy="40" r="3" />
			<circle cx="160" cy="40" r="3" />
			<circle cx="70" cy="100" r="3" />
			<circle cx="140" cy="110" r="3" />
		</g>
		<circle cx="100" cy="60" r="5" fill={accent} />
	{:else if discipline === 'epidemics'}
		<g>
			{#each Array(60) as _, i}
				{@const x = 20 + (i % 12) * 14}
				{@const y = 20 + Math.floor(i / 12) * 22}
				{@const c = i % 7 === 0 ? accent : i % 11 === 0 ? muted : ink}
				<circle cx={x} cy={y} r="2.5" fill={c} opacity={c === accent ? 1 : 0.55} />
			{/each}
		</g>
	{:else if discipline === 'spatial'}
		<g>
			{#each Array(150) as _, i}
				{@const col = i % 15}
				{@const row = Math.floor(i / 15)}
				{@const x = 10 + col * 12}
				{@const y = 10 + row * 13}
				{@const isA = (col + row * 3 + (col * row) % 5) % 2 === 0}
				<rect
					x={x}
					y={y}
					width="8"
					height="8"
					fill={isA ? ink : accent}
					opacity={isA ? 0.85 : 0.7}
				/>
			{/each}
		</g>
	{:else if discipline === 'dynamics'}
		<g fill="none" stroke-width="0.8">
			<path
				d="M 10 90 Q 40 30, 70 90 T 130 90 T 190 90"
				stroke={ink}
				opacity="0.75"
			/>
			<path
				d="M 10 100 Q 40 160, 70 100 T 130 100 T 190 100"
				stroke={accent}
				opacity="0.8"
			/>
		</g>
	{:else if discipline === 'criticality'}
		<g>
			{#each Array(40) as _, i}
				{@const x = Math.random() * 180 + 10}
				{@const y = Math.random() * 130 + 10}
				{@const r = i < 3 ? 6 : i < 10 ? 3 : 1.5}
				<circle cx={x} cy={y} {r} fill={i < 3 ? accent : ink} opacity={i < 3 ? 0.9 : 0.6} />
			{/each}
		</g>
	{:else if discipline === 'evolution'}
		<g>
			<path d="M 100 130 L 100 80" stroke={ink} stroke-width="0.6" />
			<path d="M 100 80 L 60 50 M 100 80 L 140 50" stroke={ink} stroke-width="0.6" />
			<path d="M 60 50 L 40 25 M 60 50 L 80 25" stroke={muted} stroke-width="0.5" />
			<path d="M 140 50 L 120 25 M 140 50 L 160 25" stroke={muted} stroke-width="0.5" />
			<circle cx="100" cy="130" r="3" fill={ink} />
			<circle cx="40" cy="25" r="2.5" fill={accent} />
			<circle cx="80" cy="25" r="2.5" fill={ink} />
			<circle cx="120" cy="25" r="2.5" fill={ink} />
			<circle cx="160" cy="25" r="2.5" fill={ink} />
		</g>
	{:else if discipline === 'automata'}
		<g>
			{#each Array(225) as _, i}
				{@const col = i % 25}
				{@const row = Math.floor(i / 25)}
				{@const x = 5 + col * 7.6}
				{@const y = 8 + row * 16}
				{@const on = ((col + 12) ^ row) % 3 === 0}
				{#if on}
					<rect x={x} y={y} width="6" height="12" fill={ink} opacity="0.85" />
				{/if}
			{/each}
		</g>
	{/if}
</svg>

{#if animated}
	<!-- live preview hook for later -->
{/if}
