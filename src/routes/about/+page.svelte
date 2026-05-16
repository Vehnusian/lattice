<script lang="ts">
	const repoUrl = 'https://github.com/Vehnusian/lattice';
	const bibtex = `@misc{lattice,
  author = {Khan, Hashim},
  title  = {Lattice: A reference library of complex systems models},
  year   = {2026},
  url    = {https://github.com/Vehnusian/lattice}
}`;
	const apa =
		'Khan, H. (2026). Lattice: A reference library of complex systems models. https://github.com/Vehnusian/lattice';
</script>

<svelte:head>
	<title>About · lattice</title>
</svelte:head>

<div class="mx-auto max-w-(--max-w-prose) px-6 pt-12 pb-24">
	<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">About</p>
	<h1 class="mt-3 text-3xl font-semibold tracking-tight text-(--color-ink) sm:text-4xl">
		A reference library for complex systems models.
	</h1>

	<section class="mt-10 space-y-5 leading-relaxed text-(--color-ink-muted)">
		<p>
			The canonical models of complex systems (segregation, epidemics, networks, cellular automata,
			criticality, synchronization) are scattered across decades of papers, textbooks, and one-off
			demos. Each is a small piece of universal behavior. Together they form a recognizable canon.
		</p>
		<p>
			Lattice collects them in one place. Each page presents a single model with four pieces: an
			interactive simulation, a plain-language explanation, the underlying math, and a citation back
			to the original literature.
		</p>
		<p>
			Built for university students and instructors. Use it to grasp an unfamiliar model in minutes,
			to reference a familiar one while teaching, or to play with a model and build intuition.
		</p>
	</section>

	<hr class="my-16 border-(--color-rule)" />

	<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">Methodology</p>
	<h2 class="mt-3 text-2xl font-semibold tracking-tight text-(--color-ink)">Validation</h2>
	<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
		<p>
			Every model is validated before publication. Where a closed-form analytic result exists, the
			implementation is checked against it with documented tolerances. Examples include the 2D Ising
			critical temperature near 2.269, the 2D site-percolation threshold near 0.593, and the
			Erdős–Rényi giant component at mean degree one.
		</p>
		<p>
			For models without closed-form results, a Python reference implementation runs alongside the
			browser engine and the two outputs are compared statistically over many seeds. The validation
			documents live in the repository alongside the simulation code.
		</p>
	</section>

	<h2 class="mt-10 text-2xl font-semibold tracking-tight text-(--color-ink)">Citations</h2>
	<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
		<p>
			Each model page cites the original paper, the canonical textbook, and a free alternative when
			one is available. Deviations from the original (modified dynamics, simplified boundaries,
			alternative update rules) are disclosed in a short notes section on the same page.
		</p>
	</section>

	<h2 class="mt-10 text-2xl font-semibold tracking-tight text-(--color-ink)">Sources</h2>
	<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
		<p>
			The catalog draws only from established textbooks, peer-reviewed papers, and open educational
			resources. Wikipedia is useful for orientation; it is never used as a citation.
		</p>
	</section>

	<h2 class="mt-10 text-2xl font-semibold tracking-tight text-(--color-ink)">Reproducibility</h2>
	<section class="mt-4 space-y-4 leading-relaxed text-(--color-ink-muted)">
		<p>
			Every model's source code lives in the repository and runs locally. The browser simulation,
			the Python reference implementation, the validation tests, and the prose for each page are all
			version-controlled. Anyone can clone, build, and reproduce the figures.
		</p>
	</section>

	<hr class="my-16 border-(--color-rule)" />

	<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">How to cite</p>
	<h2 class="mt-3 text-2xl font-semibold tracking-tight text-(--color-ink)">Citing the library</h2>

	<p class="mt-6 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		BibTeX
	</p>
	<pre
		class="mt-2 overflow-x-auto border border-(--color-rule) bg-(--color-paper-2) p-4 text-sm leading-relaxed"
		style="border-radius: var(--radius-md);">{bibtex}</pre>

	<p class="mt-6 font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		Plain text
	</p>
	<p class="mt-2 leading-relaxed text-(--color-ink-muted)">{apa}</p>

	<section class="mt-8 space-y-4 leading-relaxed text-(--color-ink-muted)">
		<p>
			Each model page also provides its own citation block pointing at the original paper. Cite the
			underlying model where appropriate; cite this library when referencing the implementation, the
			explanation, or the figure.
		</p>
	</section>

	<hr class="my-16 border-(--color-rule)" />

	<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">License</p>
	<section class="mt-3 space-y-4 leading-relaxed text-(--color-ink-muted)">
		<p>
			Code is released under <a href="{repoUrl}/blob/main/LICENSE" rel="noopener external">MIT</a>.
			Prose and figures under
			<a href="{repoUrl}/blob/main/docs/LICENSE-DOCS.txt" rel="noopener external">CC-BY-4.0</a>. All
			source is on <a href={repoUrl} rel="noopener external">GitHub</a>.
		</p>
	</section>

	<hr class="my-16 border-(--color-rule)" />

	<p class="font-mono text-xs uppercase tracking-wider text-(--color-ink-subtle)">Not this</p>
	<ul class="mt-3 space-y-1.5 leading-relaxed text-(--color-ink-muted)">
		<li>Not a storytelling explorable.</li>
		<li>Not a long-form essay journal.</li>
		<li>Not a textbook replacement.</li>
		<li>Not a teaching curriculum.</li>
	</ul>
</div>
