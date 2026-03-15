<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<svelte:head>
	<title>{data.artist.name}</title>
</svelte:head>

<article class="about">
	<header class="artist-header">
		{#if data.portrait_url}
			<img
				class="portrait"
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
		<section class="bio">
			<!-- eslint-disable-next-line svelte/no-at-html-tags -->
			{@html data.artist.t.bio}
		</section>
	{/if}

	{#if data.exhibitions.length}
		<section class="exhibitions">
			<h2>Exhibitions</h2>
			<ul>
				{#each data.exhibitions as exhibition (exhibition.id)}
					<li>
						<span class="year">{exhibition.year}</span>
						<span class="details">
							{#if exhibition.t?.title}
								<em>{exhibition.t.title}</em>,
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
		max-width: 800px;
		margin: 0 auto;
		padding: 2rem 1rem;
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
		color: #555;
	}

	.based-in {
		margin: 0.25rem 0 0;
		font-size: 0.875rem;
		color: #777;
	}

	.bio {
		line-height: 1.7;
		font-size: 0.9375rem;
		max-width: 65ch;
	}

	.bio p {
		margin: 0;
	}

	.exhibitions {
		margin-top: 3rem;
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
		border-bottom: 1px solid #eee;
		font-size: 0.875rem;
		line-height: 1.5;
	}

	.year {
		flex-shrink: 0;
		color: #555;
		font-variant-numeric: tabular-nums;
	}

	.type {
		color: #999;
		font-size: 0.8125rem;
	}
</style>
