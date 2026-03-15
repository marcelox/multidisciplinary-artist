<script lang="ts">
	import { localizeHref } from '$lib/paraglide/runtime';
	import type { PageProps } from './$types';
	import type { Project } from '$lib/types/directus.ts';

	let { data }: PageProps = $props();
</script>


<h1>Projects</h1>

<section class="project-grid">
	{#each data.projects as project (project.id)}
		<a class="project-card" href={localizeHref(`/projects/${project.slug}`)}>
			{#if project.cover_url}
				<img
					src={project.cover_url}
					alt={project.t.title}
					loading="lazy"
					width="800"
				/>
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
	}

	.project-card img {
		width: 100%;
		height: auto;
		display: block;
		aspect-ratio: 4 / 3;
		object-fit: cover;
	}

	.project-card h2 {
		margin: 0.75rem 0 0;
		font-size: 1rem;
		font-weight: 400;
		letter-spacing: 0.02em;
	}

	.project-card:hover h2 {
		text-decoration: underline;
	}
</style>