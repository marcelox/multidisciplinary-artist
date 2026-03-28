<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageProps } from './$types';
	import type { Project } from '$lib/types/directus.ts';

	let { data }: PageProps = $props();
</script>

<h1 class="visually-hidden">Projects</h1>

<section class="project-stages">
	{#each data.projects as project, i (project.id)}
		<a
			class="stage"
			href={localizeHref(`/projects/${project.slug}`)}
			style="view-transition-name: project-{project.slug}"
		>
			{#if project.cover_url}
				<img
					src={project.cover_url}
					alt={project.t.title}
					loading={i === 0 ? 'eager' : 'lazy'}
					width="1920"
				/>
			{/if}
			<div class="stage-overlay">
				<h2>{project.t.title}</h2>
				{#if project.t.tagline}
					<p class="tagline">{project.t.tagline}</p>
				{/if}
			</div>
		</a>
	{/each}
</section>

<style>
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	:global(html:has(.project-stages)) {
		scroll-snap-type: y mandatory;
	}

	.project-stages {
		display: grid;
		grid-auto-rows: 100svh;
		margin-top: -5rem; /* bleed behind fixed header */
	}

	.stage {
		scroll-snap-align: start;
		scroll-snap-stop: always;
		display: grid;
		grid-template: 1fr 1fr / 1fr 1fr;
		overflow: hidden;
		text-decoration: none;
		color: #fff;
	}

	.stage img {
		grid-row: 1/-1;
		grid-column: 1/-1;
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
		transition: transform var(--zoom-duration) ease;
	}

	.stage:hover img,
	.stage:focus-visible img {
		transform: scale(1.03);
	}

	.stage-overlay {
		grid-column: 1/-1;
		grid-row: 2/-1;
		align-self: end;
		padding: 3rem 2rem;
		background: linear-gradient(transparent 0%, rgba(0, 0, 0, 0.55) 100%);
		z-index: 1;
	}

	.stage-overlay h2 {
		margin: 0;
		font-size: clamp(1.5rem, 4vw, 3rem);
		font-weight: 400;
		letter-spacing: 0.02em;
	}

	.stage-overlay .tagline {
		margin: 0.5rem 0 0;
		font-size: clamp(0.875rem, 1.5vw, 1.125rem);
		opacity: 0.85;
	}

	.stage:focus-visible {
		outline: 3px solid #fff;
		outline-offset: -3px;
	}

	@media (prefers-reduced-motion: reduce) {
		:global(html:has(.project-stages)) {
			scroll-snap-type: none;
		}

		.project-stages {
			grid-auto-rows: auto;
		}

		.stage {
			min-height: 60vh;
		}

		.stage img {
			transition: none;
		}

		.stage:hover img,
		.stage:focus-visible img {
			transform: none;
		}
	}
</style>
