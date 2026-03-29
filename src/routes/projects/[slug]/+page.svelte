<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	/* Keep in sync with --page-fade-duration in animations.css */
	const fade_base: number = 300;
</script>

<svelte:head>
	<title>{data.project.t.title}</title>
</svelte:head>

<article class="project" in:fade={{ duration: prefersReducedMotion.current ? 0 : fade_base }}>
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
				style="--reveal-delay: calc({i} * var(--stagger-images)); {i === 0 ? `view-transition-name: project-${data.project.slug}` : ''}"
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
	:global(html:has(.project-images)) {
		scroll-snap-type: y mandatory;
	}

	.project {
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	.project-header {
		margin-bottom: 2rem;
		max-width: 56.25rem;
		margin-inline: auto;
		scroll-snap-align: start;
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
		display: grid;
		grid-auto-rows: 100svh;
	}

	figure {
		margin: 0;
		position: relative;
		scroll-snap-align: start;
		scroll-snap-stop: always;
		overflow: hidden;
	}

	figure img {
		width: 100%;
		height: 100%;
		object-fit: contain;
		display: block;
		background: var(--color-bg);
	}

	figcaption {
		position: absolute;
		right: 0;
		bottom: 2rem;
		max-width: 20ch;
		padding: 0.75rem 1rem;
		font-size: 0.8125rem;
		color: var(--color-text-caption);
		text-align: right;
		background-color: var(--color-bg);
	}

	.statement {
		margin-top: 3rem;
		max-width: 65ch;
		margin-inline: auto;
		padding: 2rem 1rem;
		scroll-snap-align: start;
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

	@media (prefers-reduced-motion: reduce) {
		:global(html:has(.project-images)) {
			scroll-snap-type: none;
		}

		.project-images {
			grid-auto-rows: auto;
		}

		figure {
			min-height: auto;
		}

		figure img {
			height: auto;
		}
	}
</style>
