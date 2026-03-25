<script lang="ts">
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';

	interface NavItem {
		id: number;
		path: string;
		external?: boolean;
		t: { label: string };
	}

	let { items }: { items: NavItem[] } = $props();

	let focused_index = $state(0);
	let menubar_el: HTMLUListElement | undefined = $state();

	function get_menu_items(): HTMLAnchorElement[] {
		if (!menubar_el) return [];
		return Array.from(menubar_el.querySelectorAll<HTMLAnchorElement>('[role="menuitem"]'));
	}

	function focus_item(index: number) {
		focused_index = index;
		get_menu_items()[index]?.focus();
	}

	function handle_keydown(event: KeyboardEvent) {
		const { key } = event;
		const count = items.length;

		switch (key) {
			case 'ArrowRight':
				event.preventDefault();
				focus_item((focused_index + 1) % count);
				break;
			case 'ArrowLeft':
				event.preventDefault();
				focus_item((focused_index - 1 + count) % count);
				break;
			case 'Home':
				event.preventDefault();
				focus_item(0);
				break;
			case 'End':
				event.preventDefault();
				focus_item(count - 1);
				break;
			default:
				if (key.length === 1) {
					const char = key.toLowerCase();
					for (let i = 1; i <= count; i++) {
						const index = (focused_index + i) % count;
						if (items[index].t.label.toLowerCase().startsWith(char)) {
							event.preventDefault();
							focus_item(index);
							break;
						}
					}
				}
		}
	}

	function is_current_page(path: string): boolean {
		return page.url.pathname === localizeHref(path);
	}
</script>

<ul
	role="menubar"
	aria-label="Main navigation"
	class="menubar"
	bind:this={menubar_el}
	onkeydown={handle_keydown}
>
	{#each items as item, i (item.id)}
		<li role="none" class="menubar-item">
			{#if item.external}
				<a
					role="menuitem"
					class="menubar-link"
					href={item.path}
					rel="noopener noreferrer"
					target="_blank"
					tabindex={i === focused_index ? 0 : -1}
					onfocus={() => (focused_index = i)}
				>{item.t.label}</a>
			{:else}
				<a
					role="menuitem"
					class="menubar-link"
					href={localizeHref(item.path)}
					tabindex={i === focused_index ? 0 : -1}
					aria-current={is_current_page(item.path) ? 'page' : undefined}
					onfocus={() => (focused_index = i)}
				>{item.t.label}</a>
			{/if}
		</li>
	{/each}
</ul>

<style>
.menubar {
	display: grid;
	margin-block: 0;
	margin-inline-end: 0;
	margin-inline-start: auto;
	padding-inline: 1rem;
	gap: 1rem;
	list-style: none;
}

@media screen and (min-width: 37.5rem) {
	.menubar {
		grid-template-columns: repeat(3, 10rem);
		justify-content: end;
		margin-inline: 2rem;
	}
}

.menubar-item {
	border: 2px solid white;
}

.menubar-link {
	display: block;
  padding-inline: 1rem;
  padding-block: 1rem;
	text-decoration: none;
	color: inherit;
	background-image: linear-gradient(currentColor, currentColor);
	background-size: 0% 1px;
	background-position: left bottom;
	background-repeat: no-repeat;
	transition: background-size var(--hover-duration) ease;
	padding-bottom: 2px;
}

.menubar-link:hover,
.menubar-link:focus-visible {
	background-size: 100% 1px;
}

.menubar-link[aria-current='page'] {
	background-size: 100% 1px;
}
</style>