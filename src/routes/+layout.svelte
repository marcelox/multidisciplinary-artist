<script lang="ts">
	import { page } from '$app/state';
	import { onNavigate } from '$app/navigation';
	import { locales, localizeHref, deLocalizeHref } from '$lib/paraglide/runtime';
	import favicon from '$lib/assets/favicon.svg';
	import type { LayoutProps } from './$types';
	import '../styles/fonts.css';
	import '../styles/animations.css';
	import '../styles/theme.css';
	import { browser } from '$app/environment';

	let { data, children }: LayoutProps = $props();

	let theme = $state<'light' | 'dark' | null>(null);

	function get_system_theme(): 'light' | 'dark' {
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}

	function get_effective_theme(): 'light' | 'dark' {
		return theme ?? get_system_theme();
	}

	function toggle_theme() {
		const next = get_effective_theme() === 'dark' ? 'light' : 'dark';
		theme = next;
		document.documentElement.setAttribute('data-theme', next);
		localStorage.setItem('theme', next);
	}

	if (browser) {
		const stored = localStorage.getItem('theme');
		if (stored === 'light' || stored === 'dark') {
			theme = stored;
		}
	}

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
	<button
		class="theme-toggle"
		onclick={toggle_theme}
		aria-label={browser ? (get_effective_theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle color scheme'}
		title={browser ? (get_effective_theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode') : 'Toggle color scheme'}
	>
		<svg class="icon-sun" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<circle cx="12" cy="12" r="5"/>
			<line x1="12" y1="1" x2="12" y2="3"/>
			<line x1="12" y1="21" x2="12" y2="23"/>
			<line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
			<line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
			<line x1="1" y1="12" x2="3" y2="12"/>
			<line x1="21" y1="12" x2="23" y2="12"/>
			<line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
			<line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
		</svg>
		<svg class="icon-moon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
			<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
		</svg>
	</button>
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

/* Theme toggle button */
.theme-toggle {
	background: none;
	border: 1.5px solid var(--color-border);
	border-radius: 50%;
	cursor: pointer;
	padding: 0.375rem;
	display: grid;
	place-items: center;
	color: inherit;
	transition: border-color 0.2s ease;
}

.theme-toggle:hover,
.theme-toggle:focus-visible {
	border-color: var(--color-text-secondary);
}

.theme-toggle:focus-visible {
	outline: 2px solid var(--color-text);
	outline-offset: 2px;
}

/*
 * Icon visibility: show sun icon in dark mode (click to go light),
 * show moon icon in light mode (click to go dark).
 */
.icon-sun { display: none; }
.icon-moon { display: block; }

:global(:root[data-theme="dark"]) .icon-sun { display: block; }
:global(:root[data-theme="dark"]) .icon-moon { display: none; }
:global(:root[data-theme="light"]) .icon-sun { display: none; }
:global(:root[data-theme="light"]) .icon-moon { display: block; }

/* System preference fallback when no explicit theme is set */
@media (prefers-color-scheme: dark) {
	:global(:root:not([data-theme])) .icon-sun { display: block; }
	:global(:root:not([data-theme])) .icon-moon { display: none; }
}

</style>
