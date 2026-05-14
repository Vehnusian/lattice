<script lang="ts">
	const repoUrl = 'https://github.com/Vehnusian/lattice';
</script>

<header class="border-b border-(--color-rule)">
	<div class="mx-auto flex max-w-(--max-w-page) items-baseline justify-between px-6 py-6">
		<a
			href="/"
			class="text-(--color-ink) text-xl font-semibold tracking-tight hover:no-underline"
		>
			lattice
		</a>
		<nav class="flex items-center gap-6 font-mono text-xs uppercase tracking-wider">
			<a href="/" class="text-(--color-ink-muted) hover:text-(--color-ink) hover:no-underline">
				models
			</a>
			<a href="/about" class="text-(--color-ink-muted) hover:text-(--color-ink) hover:no-underline">
				about
			</a>
			<a
				href={repoUrl}
				class="text-(--color-ink-muted) hover:text-(--color-ink) hover:no-underline"
				rel="noopener external"
			>
				source
			</a>
		</nav>
	</div>
</header>
