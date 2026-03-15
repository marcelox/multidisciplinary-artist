<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref, deLocalizeHref } from '$lib/paraglide/runtime';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if data.settings.t}
		<title>{data.settings.t.title}</title>
	{/if}
</svelte:head>

<header>
	<nav aria-label="Main navigation">
		<a href={localizeHref('/')}>{data.settings.t?.title ?? 'Home'}</a>
		<ul class="menu-list">
			{#each data.navigation as item (item.id)}
				<li class="menu-list-item">
					{#if item.external}
						<a href={item.path} rel="noopener noreferrer" target="_blank">{item.t.label}</a>
					{:else}
						<a href={localizeHref(item.path)}>{item.t.label}</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
	<nav aria-label="Language switcher">
		<ul>
			{#each locales as locale (locale)}
				<li>
					<a href={localizeHref(deLocalizeHref(page.url.pathname), { locale })} data-sveltekit-reload>{locale}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
ul {
		margin-block: 0;
    margin-inline-start: 0;
		margin-inline-end: 0;
    padding-inline: 1rem;
}

li {
		list-style: none;
}

.menu-list {
    display: grid;
		margin-block: 0;
		margin-inline-end: 0;
    margin-inline-start: auto;
}

</style>