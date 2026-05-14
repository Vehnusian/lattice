<script lang="ts">
	const repoUrl = 'https://github.com/Vehnusian/lattice';
</script>

<header class="border-b border-(--color-border) bg-(--color-bg-elevated)">
	<div class="mx-auto flex max-w-(--max-w-page) items-center justify-between px-6 py-4">
		<a href="/" class="text-lg font-semibold tracking-tight text-(--color-text) hover:no-underline">
			lattice
		</a>
		<nav class="flex items-center gap-6 text-sm text-(--color-text-muted)">
			<a href="/" class="hover:text-(--color-text)">models</a>
			<a href="/about" class="hover:text-(--color-text)">about</a>
			<a href={repoUrl} class="hover:text-(--color-text)" rel="noopener external">source</a>
		</nav>
	</div>
</header>
