<script lang="ts">
	import { tick } from 'svelte';
	import { page } from '$app/state';
	import { localizeHref } from '$lib/paraglide/runtime';
	import { afterNavigate } from '$app/navigation';

	interface NavItem {
		id: number;
		path: string;
		external?: boolean;
		t: { label: string };
	}

	interface Props {
		items: NavItem[];
		is_open?: boolean;
	}

	let { items, is_open = $bindable(false) }: Props = $props();

	let trigger_el = $state<HTMLButtonElement>();

	async function open_menu() {
		is_open = true;
		document.body.style.overflow = 'hidden';
		await tick();
		document.querySelector<HTMLAnchorElement>('#menu-overlay .menu-link')?.focus();
	}

	function close_menu() {
		is_open = false;
		document.body.style.overflow = '';
		trigger_el?.focus();
	}

	function toggle() {
		if (is_open) close_menu();
		else open_menu();
	}

	function is_current_page(path: string): boolean {
		return page.url.pathname === localizeHref(path);
	}

	function handle_keydown(event: KeyboardEvent) {
		if (!is_open) return;

		if (event.key === 'Escape') {
			event.preventDefault();
			close_menu();
			return;
		}

		if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
			const links = Array.from(
				document.querySelectorAll<HTMLAnchorElement>('#menu-overlay .menu-link, #menu-overlay .menu-footer-link')
			);
			if (!links.length) return;

			const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
			const next =
				event.key === 'ArrowDown'
					? (idx + 1) % links.length
					: (idx - 1 + links.length) % links.length;

			event.preventDefault();
			links[next]?.focus();
			return;
		}

		if (event.key === 'Tab') {
			const overlay = document.getElementById('menu-overlay');
			if (!overlay || !trigger_el) return;

			const focusable = [
				trigger_el,
				...Array.from(overlay.querySelectorAll<HTMLElement>('a'))
			];
			const idx = focusable.indexOf(document.activeElement as HTMLElement);

			if (event.shiftKey && idx <= 0) {
				event.preventDefault();
				focusable[focusable.length - 1]?.focus();
			} else if (!event.shiftKey && idx === focusable.length - 1) {
				event.preventDefault();
				focusable[0]?.focus();
			}
		}
	}

	afterNavigate(() => {
		if (is_open) close_menu();
	});
</script>

<svelte:window onkeydown={handle_keydown} />

<button
	class="menu-trigger"
	class:is-open={is_open}
	bind:this={trigger_el}
	onclick={toggle}
	aria-expanded={is_open}
	aria-controls="menu-overlay"
	aria-label={is_open ? 'Close menu' : 'Open menu'}
>
	<span class="trigger-line"></span>
	<span class="trigger-line"></span>
</button>

<div
	id="menu-overlay"
	class="menu-overlay"
	class:is-open={is_open}
	role="dialog"
	aria-modal="true"
	aria-label="Navigation menu"
	inert={!is_open || undefined}
>
	<nav aria-label="Main navigation">
		<ul class="menu-list">
			{#each items as item, i (item.id)}
				<li class="menu-list-item">
					<div class="menu-item-reveal" style="--i: {i}">
						<span class="menu-index" aria-hidden="true"
							>{String(i + 1).padStart(2, '0')}</span
						>
						{#if item.external}
							<a
								class="menu-link"
								href={item.path}
								rel="noopener noreferrer"
								target="_blank">{item.t.label}</a
							>
						{:else}
							<a
								class="menu-link"
								href={localizeHref(item.path)}
								aria-current={is_current_page(item.path) ? 'page' : undefined}
								>{item.t.label}</a
							>
						{/if}
					</div>
				</li>
			{/each}
		</ul>
	</nav>
	<div class="menu-footer">
		<a
			class="menu-footer-link"
			href={localizeHref('/impressum')}
			aria-current={is_current_page('/impressum') ? 'page' : undefined}
		>Impressum</a>
	</div>
</div>

<style>
	/* ─── Trigger ─── */
	.menu-trigger {
		position: relative;
		z-index: 20;
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 6px;
		background: none;
		border: none;
		cursor: pointer;
		padding: 8px;
		color: inherit;
	}

	.menu-trigger:focus-visible {
		outline: 2px solid var(--color-text);
		outline-offset: 4px;
	}

	.trigger-line {
		display: block;
		height: 1.5px;
		width: 28px;
		background: currentColor;
		transition:
			transform 0.5s cubic-bezier(0.23, 1, 0.32, 1),
			width 0.3s cubic-bezier(0.23, 1, 0.32, 1);
		transform-origin: center;
	}

	.trigger-line:last-child {
		width: 16px;
		margin-inline-start: auto;
	}

	.menu-trigger:hover .trigger-line:last-child,
	.menu-trigger:focus-visible .trigger-line:last-child {
		width: 28px;
	}

	.menu-trigger.is-open .trigger-line:first-child {
		transform: translateY(3.75px) rotate(45deg);
	}

	.menu-trigger.is-open .trigger-line:last-child {
		width: 28px;
		transform: translateY(-3.75px) rotate(-45deg);
	}

	/* ─── Overlay ─── */
	.menu-overlay {
		position: fixed;
		inset: 0;
		z-index: 10;
		background: var(--color-bg);
		display: grid;
		place-content: center;
		padding: 6rem 2rem 3rem;
		opacity: 0;
		visibility: hidden;
		transition:
			opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1),
			visibility 0.5s;
	}

	.menu-overlay.is-open {
		opacity: 1;
		visibility: visible;
	}

	/* ─── List ─── */
	.menu-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.menu-list-item {
		overflow: hidden;
		border-bottom: 1px solid var(--color-border);
	}

	.menu-list-item:first-child {
		border-top: 1px solid var(--color-border);
	}

	/* Slide-up text reveal */
	.menu-item-reveal {
		display: flex;
		align-items: baseline;
		gap: 1.5rem;
		padding-block: 0.6rem;
		transform: translateY(110%);
		transition: transform 0.7s cubic-bezier(0.23, 1, 0.32, 1);
		transition-delay: calc(var(--i) * 80ms + 200ms);
	}

	.menu-overlay.is-open .menu-item-reveal {
		transform: translateY(0);
	}

	/* Quick exit, no stagger */
	.menu-overlay:not(.is-open) .menu-item-reveal {
		transition-delay: 0ms;
		transition-duration: 0.3s;
	}

	.menu-index {
		font-size: 0.75rem;
		font-weight: 300;
		color: var(--color-text-muted);
		letter-spacing: 0.1em;
		transition: color var(--hover-duration) ease;
	}

	.menu-link {
		display: block;
		font-size: clamp(2rem, 6vw, 4.5rem);
		font-weight: 200;
		text-decoration: none;
		color: inherit;
		text-transform: uppercase;
		letter-spacing: 0.04em;
		line-height: 1.2;
		transition:
			font-weight var(--hover-duration) ease,
			letter-spacing var(--hover-duration) ease,
			opacity var(--hover-duration) ease;
	}

	/* Spotlight: dim siblings on hover */
	.menu-list:hover .menu-link {
		opacity: 0.25;
	}

	.menu-list:hover .menu-list-item:hover .menu-link {
		opacity: 1;
		font-weight: 500;
		letter-spacing: 0.07em;
	}

	.menu-list:hover .menu-list-item:hover .menu-index {
		color: var(--color-text);
	}

	.menu-link:focus-visible {
		opacity: 1;
		font-weight: 500;
		outline: 2px solid var(--color-text);
		outline-offset: 4px;
	}

	.menu-link[aria-current='page'] {
		font-weight: 400;
	}

	/* ─── Footer (secondary links) ─── */
	.menu-footer {
		margin-block-start: 2rem;
		padding-block-start: 1rem;
		border-top: 1px solid var(--color-border);
		opacity: 0;
		transform: translateY(10px);
		transition:
			opacity 0.5s cubic-bezier(0.23, 1, 0.32, 1),
			transform 0.5s cubic-bezier(0.23, 1, 0.32, 1);
		transition-delay: calc(var(--i, 4) * 80ms + 400ms);
	}

	.menu-overlay.is-open .menu-footer {
		opacity: 1;
		transform: translateY(0);
	}

	.menu-overlay:not(.is-open) .menu-footer {
		transition-delay: 0ms;
		transition-duration: 0.3s;
	}

	.menu-footer-link {
		font-size: 0.875rem;
		font-weight: 300;
		text-decoration: none;
		color: var(--color-text-secondary);
		letter-spacing: 0.04em;
		transition: color var(--hover-duration-fast) ease;
	}

	.menu-footer-link:hover,
	.menu-footer-link:focus-visible {
		color: var(--color-text);
	}

	.menu-footer-link:focus-visible {
		outline: 2px solid var(--color-text);
		outline-offset: 4px;
	}

	.menu-footer-link[aria-current='page'] {
		color: var(--color-text);
	}

	/* ─── Reduced motion ─── */
	@media (prefers-reduced-motion: reduce) {
		.trigger-line {
			transition: none;
		}

		.menu-overlay {
			transition: none;
		}

		.menu-item-reveal {
			transform: none;
			transition: none;
		}

		.menu-link {
			transition: none;
		}

		.menu-index {
			transition: none;
		}

		.menu-footer {
			opacity: 1;
			transform: none;
			transition: none;
		}

		.menu-footer-link {
			transition: none;
		}
	}
</style>