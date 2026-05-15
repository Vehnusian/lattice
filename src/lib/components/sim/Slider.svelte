<script lang="ts">
	interface Props {
		label: string;
		value: number;
		min: number;
		max: number;
		step?: number;
		format?: (v: number) => string;
		onChange: (v: number) => void;
	}

	let {
		label,
		value,
		min,
		max,
		step = 0.01,
		format = (v) => v.toFixed(2),
		onChange
	}: Props = $props();
</script>

<label class="block">
	<div class="flex items-baseline justify-between">
		<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-muted)">
			{label}
		</span>
		<span class="font-mono text-xs tabular-nums text-(--color-ink)">{format(value)}</span>
	</div>
	<input
		type="range"
		{value}
		{min}
		{max}
		{step}
		oninput={(e) => onChange(parseFloat(e.currentTarget.value))}
		class="slider mt-2 w-full"
	/>
</label>

<style>
	.slider {
		-webkit-appearance: none;
		appearance: none;
		height: 4px;
		background: var(--color-rule);
		border-radius: 999px;
		outline: none;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 14px;
		height: 14px;
		background: var(--color-ink);
		border-radius: 50%;
		cursor: pointer;
		transition: transform 0.1s;
	}

	.slider::-webkit-slider-thumb:hover {
		transform: scale(1.15);
		background: var(--color-accent);
	}

	.slider::-moz-range-thumb {
		width: 14px;
		height: 14px;
		background: var(--color-ink);
		border: none;
		border-radius: 50%;
		cursor: pointer;
	}

	.slider::-moz-range-thumb:hover {
		background: var(--color-accent);
	}
</style>
