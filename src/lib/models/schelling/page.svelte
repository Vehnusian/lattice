<script lang="ts">
	import { onDestroy } from 'svelte';
	import { Schelling } from './engine';
	import { render } from './render';
	import {
		defaultParams,
		presets,
		citation,
		originalBibtex,
		originalPlain,
		pageBibtex,
		pagePlain
	} from './content';
	import engineTs from './engine.ts?raw';
	import enginePy from './engine.py?raw';
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
	import Math from '$lib/components/Math.svelte';
	import CitationBlock from '$lib/components/CitationBlock.svelte';
	import CiteBlock from '$lib/components/CiteBlock.svelte';
	import SourceView from '$lib/components/SourceView.svelte';

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
		<div class="space-y-6">
			<ParamPanel>
				<Slider
					label="Tolerance"
					value={runner.params.tolerance}
					min={0}
					max={1}
					onInput={(v) => runner.setParam('tolerance', v)}
				/>
				<Slider
					label="Density"
					value={runner.params.density}
					min={0.1}
					max={0.99}
					onCommit={(v) => runner.setParams({ density: v })}
				/>
			</ParamPanel>

			<div
				class="border border-(--color-rule) bg-(--color-paper-2) p-4"
				style="border-radius: var(--radius-md);"
			>
				<p class="mb-3 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
					Presets
				</p>
				<div class="space-y-2">
					{#each presets as preset (preset.label)}
						<Preset params={preset.params} summary={preset.summary}>{preset.label}</Preset>
					{/each}
				</div>
			</div>

			<div
				class="border border-(--color-rule) bg-(--color-paper-2) p-4"
				style="border-radius: var(--radius-md);"
			>
				<MetricPlot label="Segregation index" min={0} max={1} format={(v) => v.toFixed(3)} />
			</div>
		</div>
	{/snippet}

	{#snippet body()}
		<h2 class="text-2xl font-semibold tracking-tight text-(--color-ink)">Introduction</h2>
		<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
			<p>
				Thomas Schelling's 1971 segregation model is one of the earliest demonstrations that
				strong collective outcomes can arise from mild individual preferences. Two kinds of
				agents occupy a grid. None require a majority of like neighbors. None coordinate. Yet
				the system reliably settles into sharply segregated neighborhoods.
			</p>
			<p>
				The model is short, almost trivial. Its consequence, that visible segregation does not
				imply strong individual prejudice, has been cited in fields ranging from urban
				sociology to physics.
			</p>
		</section>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">How it works</h2>
		<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
			<p>
				Each cell of a square lattice is either empty or holds an agent of one of two types.
				Two parameters control the system. The density <Math tex={'d'} /> is the fraction of
				cells that start occupied. The tolerance <Math tex={'\\tau'} /> is the minimum
				fraction of like-type neighbors an agent requires to remain in place.
			</p>
			<p>
				At each step, one unsatisfied agent relocates to a random empty cell. An agent is
				unsatisfied when the fraction of its same-type neighbors, counted over the Moore
				eight-cell neighborhood, falls below <Math tex={'\\tau'} />.
			</p>
			<p>
				The system currently holds <LiveValue source="agents" /> agents, of which
				<LiveValue source="unsatisfied" /> are unsatisfied. The segregation index, the mean
				fraction of like-type neighbors over all occupied cells, is
				<LiveValue source="segregation" format={(v) => v.toFixed(3)} />.
			</p>
			<p>
				Schelling's qualitative finding is that the threshold needed for segregation is much
				lower than intuition suggests. Sayama's example uses <Math tex={'\\tau = 0.5'} /> and
				shows clear segregation. Below roughly <Math tex={'\\tau = 0.2'} /> the system stays
				mixed.
			</p>
			<p>
				At very high <Math tex={'\\tau'} /> (high homophily, around 0.7 and above) the system
				does not reach a stationary state. Agents are too demanding: at any cluster boundary
				they remain unsatisfied, and each move makes some other agent unsatisfied in turn.
				The presets to the right select these regimes.
			</p>
		</section>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">Math</h2>
		<section class="mt-4 space-y-5 leading-relaxed text-(--color-ink-muted)">
			<p>
				For an agent at lattice site <Math tex={'i'} /> with type
				<Math tex={'t_i \\in \\{1, 2\\}'} />, let <Math tex={'N(i)'} /> denote the set of
				occupied Moore neighbors and <Math tex={'S(i) \\subseteq N(i)'} /> those that share
				<Math tex={'t_i'} />. The like-fraction is
			</p>
			<Math
				display
				tex={'L(i) \\;=\\; \\frac{|S(i)|}{|N(i)|}, \\qquad L(i) \\equiv 1 \\;\\;\\text{when}\\;\\; |N(i)| = 0.'}
			/>
			<p>
				The agent is unsatisfied when <Math tex={'L(i) < \\tau'} />, where
				<Math tex={'\\tau'} /> is the tolerance. At each step, a uniformly random unsatisfied
				agent relocates to a uniformly random empty cell.
			</p>
			<p>
				The segregation index displayed in the metric plot is the mean of
				<Math tex={'L(i)'} /> over all occupied cells:
			</p>
			<Math
				display
				tex={'\\bar{L} \\;=\\; \\frac{1}{|A|} \\sum_{i \\in A} L(i), \\qquad A = \\{i : t_i \\neq 0\\}.'}
			/>
		</section>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">Source</h2>
		<p class="mt-3 leading-relaxed text-(--color-ink-muted)">
			The engine is a single file in both TypeScript and Python. The browser simulation runs the
			TypeScript version. The Python version is the validation reference. They produce the same
			behavior on the same seeds.
		</p>
		<div class="mt-4">
			<SourceView
				tabs={[
					{
						label: 'TypeScript',
						filename: 'engine.ts',
						source: engineTs,
						repoUrl:
							'https://github.com/Vehnusian/lattice/blob/main/src/lib/models/schelling/engine.ts'
					},
					{
						label: 'Python',
						filename: 'engine.py',
						source: enginePy,
						repoUrl:
							'https://github.com/Vehnusian/lattice/blob/main/src/lib/models/schelling/engine.py'
					}
				]}
			/>
		</div>

		<h2 class="mt-14 text-2xl font-semibold tracking-tight text-(--color-ink)">References</h2>
		<div class="mt-4">
			<CitationBlock {citation} />
		</div>

		<div class="mt-14 space-y-12">
			<CiteBlock title="Cite the original work" plain={originalPlain} bibtex={originalBibtex} />
			<CiteBlock title="Cite this page" plain={pagePlain} bibtex={pageBibtex} />
		</div>
	{/snippet}
</ModelPageLayout>
