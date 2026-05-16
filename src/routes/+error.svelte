<script lang="ts">
	import { page } from '$app/stores';

	const status = $derived($page.status);
	const message = $derived($page.error?.message ?? 'Something went wrong.');
	const title = $derived(status === 404 ? 'Not found' : 'Error');
</script>

<svelte:head>
	<title>{title} · lattice</title>
</svelte:head>

<div class="mx-auto max-w-(--max-w-page) px-6 pt-24 pb-32">
	<p class="font-mono text-[10px] uppercase tracking-wider text-(--color-ink-subtle)">
		error {status}
	</p>
	<h1 class="mt-3 text-4xl font-semibold tracking-tight text-(--color-ink) sm:text-5xl">
		{title}
	</h1>
	<p class="mt-4 max-w-xl text-lg leading-relaxed text-(--color-ink-muted)">
		{message}
	</p>

	<div class="mt-10 flex flex-wrap gap-4 font-mono text-xs uppercase tracking-wider">
		<a
			href="/"
			class="border border-(--color-ink) bg-(--color-ink) px-4 py-2.5 text-(--color-paper) hover:no-underline"
			style="border-radius: var(--radius-md);"
		>
			Back to models
		</a>
		<a
			href="/about"
			class="border border-(--color-rule) bg-(--color-paper-2) px-4 py-2.5 text-(--color-ink-muted) hover:border-(--color-ink) hover:text-(--color-ink) hover:no-underline"
			style="border-radius: var(--radius-md);"
		>
			About this site
		</a>
	</div>
</div>
