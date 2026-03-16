<script lang="ts">
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { locales, localizeHref, deLocalizeHref } from '$lib/paraglide/runtime';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import '../styles/fonts.css';
	import '../styles/animations.css';

	let { data, children }: LayoutProps = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	{#if data.settings.t}
		<title>{data.settings.t.title}</title>
	{/if}
</svelte:head>

<header>
	<nav aria-label="Main navigation">
		<a class="site-title" href={localizeHref('/')}>{data.settings.t?.title ?? 'Home'}</a>
		<ul class="menu-list">
			{#each data.navigation as item (item.id)}
				<li class="menu-list-item">
					{#if item.external}
						<a class="nav-link" href={item.path} rel="noopener noreferrer" target="_blank">{item.t.label}</a>
					{:else}
						<a class="nav-link" href={localizeHref(item.path)}>{item.t.label}</a>
					{/if}
				</li>
			{/each}
		</ul>
	</nav>
	<nav aria-label="Language switcher">
		<ul class="lang-list">
			{#each locales as locale (locale)}
				<li>
					<a class="lang-link" href={localizeHref(deLocalizeHref(page.url.pathname), { locale })} data-sveltekit-reload>{locale}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>

<style>
:global(body) {
	font-family: 'Outfit Variable', system-ui, sans-serif;
}

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

/* Nav link hover underline animation */
.nav-link {
	text-decoration: none;
	color: inherit;
	background-image: linear-gradient(currentColor, currentColor);
	background-size: 0% 1px;
	background-position: left bottom;
	background-repeat: no-repeat;
	transition: background-size 0.3s ease;
	padding-bottom: 2px;
}

.nav-link:hover,
.nav-link:focus-visible {
	background-size: 100% 1px;
}

/* Site title subtle hover */
.site-title {
	text-decoration: none;
	color: inherit;
	transition: opacity 0.2s ease;
}

.site-title:hover {
	opacity: 0.7;
}

/* Language switcher */
.lang-list {
	display: flex;
	gap: 0.5rem;
}

.lang-link {
	text-decoration: none;
	color: inherit;
	opacity: 0.5;
	transition: opacity 0.2s ease;
}

.lang-link:hover,
.lang-link:focus-visible {
	opacity: 1;
}

</style>
