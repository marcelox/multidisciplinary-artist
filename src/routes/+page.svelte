<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageProps } from './$types';
	import type { Project } from '$lib/types/directus.ts';

	let { data }: PageProps = $props();
</script>


<h1>Projects</h1>

<section class="project-grid">
	{#each data.projects as project, i (project.id)}
		<a
			class="project-card scroll-reveal"
			href={localizeHref(`/projects/${project.slug}`)}
			style="--reveal-delay: {i * 80}ms; view-transition-name: project-{project.slug}"
		>
			{#if project.cover_url}
				<div class="card-image-wrapper">
					<img
						src={project.cover_url}
						alt={project.t.title}
						loading="lazy"
						width="800"
					/>
				</div>
			{/if}
			<h2>{project.t.title}</h2>
		</a>
	{/each}
</section>

<style>
	.project-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		gap: 1.5rem;
		padding: 2rem 1rem;
	}

	.project-card {
		display: block;
		text-decoration: none;
		color: inherit;
		overflow: hidden;
		transition: transform 0.3s ease, box-shadow 0.3s ease;
			padding-block-end: 1.5rem;
	}

	.project-card:hover {
		transform: scale(1.02);
		box-shadow: 0 8px 30px var(--color-shadow);
	}

	.card-image-wrapper {
		overflow: hidden;
	}

	.project-card img {
		width: 100%;
		height: auto;
		display: block;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		transition: transform 0.4s ease;
	}

	.project-card:hover img {
		transform: scale(1.05);
	}

	.project-card h2 {
		margin: 0.75rem 0 0;
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: 0.02em;
		transition: opacity 0.2s ease;
			padding-inline: 1.5rem;
	}

	.project-card:hover h2 {
		text-decoration: underline;
	}

	@media (prefers-reduced-motion: reduce) {
		.project-card {
			transition: none;
		}

		.project-card:hover {
			transform: none;
			box-shadow: none;
		}

		.project-card img {
			transition: none;
		}

		.project-card:hover img {
			transform: none;
		}
	}
</style>
