<script lang="ts">
	import { fade } from 'svelte/transition';
	import { prefersReducedMotion } from 'svelte/motion';
</script>

<svelte:head>
	<title>Impressum</title>
</svelte:head>

<article class="impressum" in:fade={{ duration: prefersReducedMotion.current ? 0 : 300 }}>
	<h1>Impressum</h1>

	<section class="scroll-reveal">
		<h2>Angaben gem&auml;&szlig; &sect; 5 TMG</h2>
		<p>
			Diana Juneck<br />
			Hobrechtstr. 69<br />
			12047 Berlin<br />
			Deutschland
		</p>
	</section>

	<section class="scroll-reveal">
		<h2>Kontakt</h2>
		<p>
			E-Mail: <a href="mailto:info@dianajuneck.com">info@dianajuneck.com</a>
		</p>
	</section>

	<section class="scroll-reveal">
		<h2>Verantwortlich f&uuml;r den Inhalt gem&auml;&szlig; &sect; 55 Abs. 2 RStV</h2>
		<p>
			Diana Juneck<br />
			Hobrechtstr. 69<br />
			12047 Berlin<br />
			Deutschland
		</p>
	</section>

	<section class="scroll-reveal">
		<h2>Haftungsausschluss</h2>

		<h3>Haftung f&uuml;r Inhalte</h3>
		<p>
			Die Inhalte dieser Seiten wurden mit gr&ouml;&szlig;ter Sorgfalt erstellt. F&uuml;r die Richtigkeit,
			Vollst&auml;ndigkeit und Aktualit&auml;t der Inhalte k&ouml;nnen wir jedoch keine Gew&auml;hr &uuml;bernehmen.
			Als Diensteanbieter sind wir gem&auml;&szlig; &sect; 7 Abs. 1 TMG f&uuml;r eigene Inhalte auf diesen
			Seiten nach den allgemeinen Gesetzen verantwortlich. Nach &sect;&sect; 8 bis 10 TMG sind wir als
			Diensteanbieter jedoch nicht verpflichtet, &uuml;bermittelte oder gespeicherte fremde Informationen
			zu &uuml;berwachen oder nach Umst&auml;nden zu forschen, die auf eine rechtswidrige T&auml;tigkeit hinweisen.
		</p>

		<h3>Haftung f&uuml;r Links</h3>
		<p>
			Unser Angebot enth&auml;lt Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen
			Einfluss haben. Deshalb k&ouml;nnen wir f&uuml;r diese fremden Inhalte auch keine Gew&auml;hr &uuml;bernehmen.
			F&uuml;r die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der
			Seiten verantwortlich.
		</p>
	</section>

	<section class="scroll-reveal">
		<h2>Urheberrecht</h2>
		<p>
			Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem
			deutschen Urheberrecht. Die Vervielf&auml;ltigung, Bearbeitung, Verbreitung und jede Art der
			Verwertung au&szlig;erhalb der Grenzen des Urheberrechtes bed&uuml;rfen der schriftlichen Zustimmung
			des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur f&uuml;r den
			privaten, nicht kommerziellen Gebrauch gestattet.
		</p>
	</section>
</article>

<style>
	.impressum {
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

	h3 {
		font-size: 0.9375rem;
		font-weight: 500;
		margin: 1.25rem 0 0.5rem;
	}

	p {
		font-size: 0.9375rem;
		line-height: 1.7;
		max-width: 65ch;
		margin: 0 0 0.75rem;
	}

	a {
		color: var(--color-text);
		text-decoration-color: var(--color-text-muted);
		text-underline-offset: 0.2em;
		transition: text-decoration-color var(--hover-duration-fast) ease;
	}

	a:hover,
	a:focus-visible {
		text-decoration-color: var(--color-text);
	}

	section {
		margin-bottom: 1.5rem;
	}

	section:first-of-type h2 {
		margin-top: 0;
	}
</style>
