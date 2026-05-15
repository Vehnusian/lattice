<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Schelling } from './engine';
	import { render } from './render';
	import { defaultParams, presets, citation, bibtex } from './content';
	import { SimRunner, provideRunner } from '$lib/sim/runner.svelte';
	import type { ModelEntry } from '$lib/models/registry';

	import ModelPageLayout from '$lib/components/ModelPageLayout.svelte';
	import CanvasViewport from '$lib/components/sim/CanvasViewport.svelte';
	import Slider from '$lib/components/sim/Slider.svelte';
	import ControlBar from '$lib/components/sim/ControlBar.svelte';
	import ParamPanel from '$lib/components/sim/ParamPanel.svelte';
	import MetricPlot from '$lib/components/sim/MetricPlot.svelte';
	import LiveValue from '$lib/components/sim/LiveValue.svelte';
	import Preset from '$lib/components/sim/Preset.svelte';
	import MathBlock from '$lib/components/MathBlock.svelte';
	import CitationBlock from '$lib/components/CitationBlock.svelte';

	let { model }: { model: ModelEntry } = $props();

	const schelling = new Schelling(defaultParams, 1);
	const colors = { bg: '#F3EFE5', a: '#161513', b: '#B5450B' };

	const runner = new SimRunner(schelling, 'segregation');
	provideRunner(runner);

	function draw(ctx: CanvasRenderingContext2D) {
		render(ctx, schelling, colors);
	}

	onDestroy(() => runner.pause());
</script>

<ModelPageLayout {model}>
	{#snippet sim()}
		<CanvasViewport {draw} tick={runner.tick} />
	{/snippet}

	{#snippet controls()}
		<ControlBar />
	{/snippet}

	{#snippet params()}
		<ParamPanel>
			<Slider
				label="Tolerance"
				value={runner.params.tolerance}
				min={0}
				max={1}
				onChange={(v) => runner.setParam('tolerance', v)}
			/>
			<Slider
				label="Density"
				value={runner.params.density}
				min={0.1}
				max={0.99}
				onChange={(v) => runner.setParams({ density: v })}
			/>
			<MetricPlot
				label="Segregation index"
				min={0}
				max={1}
				format={(v) => v.toFixed(3)}
			/>
		</ParamPanel>
	{/snippet}

	{#snippet body()}
		<h2 class="text-2xl font-semibold tracking-tight text-(--color-ink)">How it works</h2>
		<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
			<p>
				Each cell of a square lattice is either empty or holds an agent of one of two types.
				At every step, one unsatisfied agent relocates to a random empty cell. An agent is
				unsatisfied when the fraction of its same-type neighbors — in the Moore eight-cell
				neighborhood — falls below a tolerance threshold.
			</p>
			<p>
				The system currently holds <LiveValue source="agents" /> agents, of which
				<LiveValue source="unsatisfied" /> are unsatisfied. The segregation index — the
				mean fraction of like-type neighbors over all occupied cells — is
				<LiveValue source="segregation" format={(v) => v.toFixed(3)} />.
			</p>
			<p>
				The behavior most often pointed to is that even tolerances well below half drive
				the system to highly segregated configurations. Agents who only need a third of
				their neighbors to match still produce sharp clusters.
			</p>
		</section>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">Things to try</h2>
		<div class="mt-4 space-y-2.5">
			{#each presets as preset (preset.label)}
				<Preset params={preset.params}>{preset.label}</Preset>
			{/each}
		</div>

		<div class="mt-14">
			<MathBlock>
				<p>
					For an agent at index <em>i</em> with type <em>t<sub>i</sub></em>, let
					<em>N(i)</em> denote its set of occupied Moore neighbors and
					<em>S(i) ⊆ N(i)</em> those that share <em>t<sub>i</sub></em>. The like-fraction
					is <em>L(i) = |S(i)| / |N(i)|</em>, with <em>L(i) = 1</em> by convention when
					<em>|N(i)| = 0</em>.
				</p>
				<p class="mt-4">
					The agent is unsatisfied if <em>L(i) &lt; τ</em>, the tolerance. At each step, a
					uniformly random unsatisfied agent relocates to a uniformly random empty cell.
				</p>
			</MathBlock>
		</div>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">References</h2>
		<div class="mt-4">
			<CitationBlock {citation} />
		</div>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">
			Cite this page
		</h2>
		<pre
			class="mt-4 overflow-x-auto border border-(--color-rule) bg-(--color-paper-2) p-4 text-sm leading-relaxed"
			style="border-radius: var(--radius-md);">{bibtex}</pre>

		<p class="mt-10 font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">
			<a
				href="https://github.com/Vehnusian/lattice/tree/main/src/lib/models/schelling"
				rel="noopener external"
				class="hover:text-(--color-ink)"
			>
				source code →
			</a>
		</p>
	{/snippet}
</ModelPageLayout>
