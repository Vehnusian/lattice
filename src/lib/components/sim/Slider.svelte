<script lang="ts">
	interface Props {
		label: string;
		value: number;
		min: number;
		max: number;
		step?: number;
		format?: (v: number) => string;
		onInput?: (v: number) => void;
		onCommit?: (v: number) => void;
	}

	let {
		label,
		value,
		min,
		max,
		step = 0.01,
		format = (v) => v.toFixed(2),
		onInput,
		onCommit
	}: Props = $props();

	let local = $state(value);

	$effect(() => {
		local = value;
	});

	function handleInput(e: Event) {
		const v = parseFloat((e.target as HTMLInputElement).value);
		local = v;
		onInput?.(v);
	}

	function handleChange(e: Event) {
		const v = parseFloat((e.target as HTMLInputElement).value);
		onCommit?.(v);
	}
</script>

<label class="block">
	<div class="flex items-baseline justify-between">
		<span class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-muted)">
			{label}
		</span>
		<span class="font-mono text-sm tabular-nums text-(--color-ink)">{format(local)}</span>
	</div>
	<input
		type="range"
		value={local}
		{min}
		{max}
		{step}
		oninput={handleInput}
		onchange={handleChange}
		class="slider mt-2 w-full"
	/>
</label>

<style>
	.slider {
		-webkit-appearance: none;
		appearance: none;
		height: 22px;
		background: transparent;
		cursor: pointer;
		outline: none;
		touch-action: none;
	}

	.slider::-webkit-slider-runnable-track {
		height: 6px;
		background: var(--color-rule);
		border-radius: 999px;
	}

	.slider::-moz-range-track {
		height: 6px;
		background: var(--color-rule);
		border-radius: 999px;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 20px;
		height: 20px;
		background: var(--color-ink);
		border-radius: 50%;
		margin-top: -7px;
		cursor: grab;
		box-shadow: 0 0 0 2px var(--color-paper);
		transition: background 0.12s, transform 0.08s;
	}

	.slider::-moz-range-thumb {
		width: 20px;
		height: 20px;
		background: var(--color-ink);
		border: none;
		border-radius: 50%;
		cursor: grab;
		box-shadow: 0 0 0 2px var(--color-paper);
	}

	.slider:hover::-webkit-slider-thumb {
		background: var(--color-accent);
	}

	.slider:hover::-moz-range-thumb {
		background: var(--color-accent);
	}

	.slider:active::-webkit-slider-thumb,
	.slider:focus::-webkit-slider-thumb {
		background: var(--color-accent);
		transform: scale(1.08);
		cursor: grabbing;
	}

	.slider:active::-moz-range-thumb,
	.slider:focus::-moz-range-thumb {
		background: var(--color-accent);
	}
</style>
