<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	function fly_params(delay: number) {
		return prefersReducedMotion.current
			? { duration: 0 }
			: { y: 20, duration: 400, delay };
	}
</script>

<svelte:head>
	<title>{data.artist.name}</title>
</svelte:head>

<article class="about" in:fade={{ duration: prefersReducedMotion.current ? 0 : 300 }}>
	<header class="artist-header">
		{#if data.portrait_url}
			<img
				class="portrait scroll-reveal"
				src={data.portrait_url}
				alt={data.artist.name}
				width="800"
			/>
		{/if}
		<div class="artist-info">
			<h1>{data.artist.name}</h1>
			{#if data.artist.roles?.length}
				<p class="roles">{data.artist.roles.join(', ')}</p>
			{/if}
			{#if data.artist.based_in?.length}
				<p class="based-in">{data.artist.based_in.join(', ')}</p>
			{/if}
		</div>
	</header>

	{#if data.artist.t?.bio}
		<section class="bio scroll-reveal">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.artist.t.bio}
		</section>
	{/if}

	{#if data.exhibitions.length}
		<section class="exhibitions scroll-reveal">
			<h2>Exhibitions</h2>
			<ul>
				{#each data.exhibitions as exhibition, i (exhibition.id)}
					<li in:fly={fly_params(i * 30)}>
						<span class="year">{exhibition.year}</span>
						<span class="details">
							{#if exhibition.t?.title}
								<span class="exhibition-title">{exhibition.t.title}</span>,
							{/if}
							{exhibition.venue}, {exhibition.city}{#if exhibition.country}, {exhibition.country}{/if}
							<span class="type">({exhibition.type})</span>
						</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
</article>

<style>
	.about {
		max-width: 56.25rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	@media (min-width: 62.5rem) {
      .about {
					display: grid;
					grid-template-columns: 1fr 1fr 1fr;
          max-width: 156.25rem;
					grid-column-gap: 3rem;
          justify-items: center;
      }
	}

	.artist-header {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}

	.portrait {
		width: 100%;
		max-width: 400px;
		height: auto;
		display: block;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 400;
		margin: 0;
	}

	.roles {
		margin: 0.25rem 0 0;
		font-size: 0.9375rem;
		color: var(--color-text-secondary);
	}

	.based-in {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: var(--color-text-tertiary);
	}

	.bio {
		line-height: 1.7;
		font-size: 0.9375rem;
		max-width: 65ch;
	}

  .bio :global(p:first-child) {
      margin-block-start: 0;
  }

	.exhibitions {
		margin-block-start: 3rem;
	}

	.exhibition-title {
			font-weight: 500;
	}

  @media (min-width: 62.5rem) {
      .exhibitions {
          margin-block-start: 0;
      }
  }

	.exhibitions h2 {
		font-size: 1.125rem;
		font-weight: 400;
		margin: 0 0 1rem;
	}

	.exhibitions ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.exhibitions li {
		display: flex;
		gap: 1rem;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--color-border);
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.year {
		flex-shrink: 0;
		color: var(--color-text-secondary);
		font-variant-numeric: tabular-nums;
	}

	.type {
		color: var(--color-text-muted);
		font-size: 0.8125rem;
	}
</style>
