<script lang="ts">
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
</script>

<svelte:head>
	<title>Contact - Diana Juneck</title>
</svelte:head>

<!-- Keep in sync with --page-fade-duration-short in animations.css -->
<article class="contact" in:fade={{ duration: prefersReducedMotion.current ? 0 : 300 }}>
	<h1>Contact</h1>

	<section class="intro scroll-reveal">
		<p>
			For inquiries about prints, exhibitions, collaborations, workshops, or licensing, please get in touch.
		</p>
	</section>

	<section class="email scroll-reveal">
		<h2>Email</h2>
		<a href="mailto:info@diana-juneck.de" class="contact-link email-link">
			info@diana-juneck.de
		</a>
	</section>

	<section class="social scroll-reveal">
		<h2>Follow</h2>
		<ul class="social-list">
			<li>
				<a
					href="https://www.instagram.com/diana_juneck_artist"
					class="social-link"
					rel="noopener noreferrer"
					target="_blank"
					aria-label="Instagram"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
						<rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
						<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
						<line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
					</svg>
					<span>Instagram</span>
				</a>
			</li>
			<li>
				<a
					href="https://www.behance.net/dianajuneck"
					class="social-link"
					rel="noopener noreferrer"
					target="_blank"
					aria-label="Behance"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
						<path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988H0V5.021h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zM3 11h3.584c2.508 0 2.906-3-.312-3H3v3zm3.391 3H3v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
					</svg>
					<span>Behance</span>
				</a>
			</li>
<!--			<li>-->
<!--				<a-->
<!--					href="https://vimeo.com/dianajuneck"-->
<!--					class="social-link"-->
<!--					rel="noopener noreferrer"-->
<!--					target="_blank"-->
<!--					aria-label="Vimeo"-->
<!--				>-->
<!--					<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">-->
<!--						<path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.614-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.48 4.807z"/>-->
<!--					</svg>-->
<!--					<span>Vimeo</span>-->
<!--				</a>-->
<!--			</li>-->
		</ul>
	</section>

<!--	<section class="location scroll-reveal">-->
<!--		<h2>Based in</h2>-->
<!--		<p>Berlin, Germany</p>-->
<!--	</section>-->
</article>

<style>
	.contact {
		max-width: 56.25rem;
		margin: 0 auto;
		padding: 2rem 1rem;
	}

	h1 {
		font-size: 1.75rem;
		font-weight: 400;
		margin: 0 0 2rem;
	}

	h2 {
		text-transform: uppercase;
		font-size: 1.125rem;
		font-weight: 400;
		line-height: 1;
		margin: 2rem 0 0.75rem;
	}

	p {
		font-size: 0.9375rem;
		line-height: 1.7;
		max-width: 65ch;
		margin: 0 0 0.75rem;
	}

	section {
		margin-bottom: 1.5rem;
	}

	section:first-of-type h2 {
		margin-top: 0;
	}

	/* ─── Email ─── */
	.email-link {
		font-size: 1.125rem;
		font-weight: 300;
		color: var(--color-text);
		text-decoration: none;
		border-bottom: 1.5px solid var(--color-border);
		padding-bottom: 2px;
		transition:
			border-color var(--hover-duration-fast) ease;
	}

	.email-link:hover,
	.email-link:focus-visible {
		border-color: var(--color-text);
	}

	.email-link:focus-visible {
		outline: 2px solid var(--color-text);
		outline-offset: 4px;
	}

	/* ─── Social ─── */
	.social-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.social-link {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.5rem 0;
		text-decoration: none;
		color: var(--color-text);
		font-size: 0.9375rem;
		font-weight: 300;
		transition:
			opacity var(--hover-duration-fast) ease;
	}

	.social-link:hover,
	.social-link:focus-visible {
		opacity: 0.6;
	}

	.social-link:focus-visible {
		outline: 2px solid var(--color-text);
		outline-offset: 4px;
	}

	.social-link svg {
		flex-shrink: 0;
	}

	/* ─── Location ─── */
	.location p {
		font-size: 0.9375rem;
		color: var(--color-text-secondary);
	}
</style>
