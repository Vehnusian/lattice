<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import SiteHeader from '$lib/components/SiteHeader.svelte';
	import SiteFooter from '$lib/components/SiteFooter.svelte';

	let { children } = $props();

	const siteName = 'lattice';
	const description =
		'A reference library of validated complex systems models. Each one has an interactive simulation, the math, and citations to the source literature.';
	const url = $derived(`https://lattice.dev${$page.url.pathname}`);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<meta name="description" content={description} />
	<meta name="theme-color" content="#f9f6f0" />
	<meta property="og:site_name" content={siteName} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={siteName} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content={siteName} />
	<meta name="twitter:description" content={description} />
</svelte:head>

<div class="flex min-h-dvh flex-col">
	<SiteHeader />
	<main class="flex-1">
		{@render children()}
	</main>
	<SiteFooter />
</div>
