<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.project.t.title}</title>
</svelte:head>

<article class="project" in:fade={{ duration: prefersReducedMotion.current ? 0 : 300 }}>
	<header class="project-header">
		<h1>{data.project.t.title}</h1>
		{#if data.project.t.tagline}
			<p class="tagline">{data.project.t.tagline}</p>
		{/if}
		{#if data.project.year || data.project.medium?.length}
			<p class="meta">
				{#if data.project.year}{data.project.year}{/if}
				{#if data.project.year && data.project.medium?.length} — {/if}
				{#if data.project.medium?.length}{data.project.medium.join(', ')}{/if}
			</p>
		{/if}
	</header>

	<section class="project-images">
		{#each data.images as image, i (image.id)}
			<figure
				class="scroll-reveal"
				style="--reveal-delay: {i * 60}ms; {i === 0 ? `view-transition-name: project-${data.project.slug}` : ''}"
			>
				{#if image.url}
					<img
						src={image.url}
						alt={image.alt}
						loading="lazy"
						width="1200"
					/>
				{/if}
				{#if image.caption}
					<figcaption>{image.caption}</figcaption>
				{/if}
			</figure>
		{/each}
	</section>

	{#if data.project.t.statement}
		<section class="statement scroll-reveal">
			<h2>Statement</h2>
			<div>{@html data.project.t.statement}</div>
		</section>
	{/if}
</article>

<style>
	.project {
		max-width: 56.25rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.project-header {
		margin-bottom: 2rem;
	}

	.project-header h1 {
		font-size: 1.75rem;
		font-weight: 400;
		margin: 0;
	}

	.tagline {
		margin: 0.5rem 0 0;
		font-weight: 550;
		color: var(--color-text-secondary);
	}

	.meta {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
	}

	.project-images {
		display: flex;
		flex-direction: column;
		gap: 2rem;
	}

	figure {
		margin: 0;
	}

	figure img {
		width: 100%;
		height: auto;
		display: block;
	}

	figcaption {
		margin-top: 0.5rem;
		font-size: 0.8125rem;
		color: var(--color-text-caption);
	}

	.statement {
		margin-top: 3rem;
		max-width: 65ch;
	}

	.statement h2 {
		font-size: 1.125rem;
		font-weight: 400;
		margin: 0 0 1rem;
	}

	.statement div {
		line-height: 1.7;
		font-size: 0.9375rem;
	}
</style>
