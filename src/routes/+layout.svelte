<script lang="ts">
	import { page } from '$app/state';
	import { locales, localizeHref } from '$lib/paraglide/runtime';
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
		<ul>
			{#each data.navigation as item (item.id)}
				<li>
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
					<a href={localizeHref(page.url.pathname, { locale })}>{locale}</a>
				</li>
			{/each}
		</ul>
	</nav>
</header>

<main>
	{@render children()}
</main>