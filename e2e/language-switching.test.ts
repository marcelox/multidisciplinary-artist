import { expect, test } from '@playwright/test';

test.describe('language switching on project page', () => {
	test('switching from EN to DE updates URL, nav labels, and captions', async ({ page }) => {
		// 1. Start on the English version of the project
		await page.goto('/projects/lautlos');
		await expect(page.locator('h1')).toBeVisible();

		// Verify English state
		await expect(page).toHaveURL('/projects/lautlos');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projects');

		// Grab an English caption for comparison later
		const first_caption = page.locator('figcaption').first();
		const en_caption_text = await first_caption.textContent();
		expect(en_caption_text).toBeTruthy();

		// 2. Click "de" in the language switcher
		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'de' }).click();

		// 3. Verify URL changed to German
		await expect(page).toHaveURL('/de/projekte/lautlos');

		// 4. Verify navigation labels switched to German
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projekte');

		// 5. Verify captions updated (not the same as English)
		const de_caption_text = await first_caption.textContent();
		expect(de_caption_text).toBeTruthy();
		expect(de_caption_text).not.toBe(en_caption_text);
	});

	test('switching from DE to EN updates URL, nav labels, and captions', async ({ page }) => {
		// Start on the German version
		await page.goto('/de/projekte/lautlos');
		await expect(page.locator('h1')).toBeVisible();

		await expect(page).toHaveURL('/de/projekte/lautlos');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projekte');

		const first_caption = page.locator('figcaption').first();
		const de_caption_text = await first_caption.textContent();

		// Click "en" in the language switcher
		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'en' }).click();

		await expect(page).toHaveURL('/projects/lautlos');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projects');

		const en_caption_text = await first_caption.textContent();
		expect(en_caption_text).not.toBe(de_caption_text);
	});

	test('SSR delivers correct locale on direct navigation', async ({ page }) => {
		// Direct navigation to German project page (no client-side switch)
		await page.goto('/de/projekte/lautlos');

		// Verify html lang attribute
		await expect(page.locator('html')).toHaveAttribute('lang', 'de');

		// Verify German nav
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projekte');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Über');
	});
});

test.describe('language switching on homepage', () => {
	test('homepage switches between EN and DE', async ({ page }) => {
		await page.goto('/');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projects');

		// Switch to German
		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'de' }).click();
		await expect(page).toHaveURL('/de');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projekte');

		// Switch back to English
		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'en' }).click();
		await expect(page).toHaveURL('/');
		await expect(page.locator('nav[aria-label="Main navigation"]')).toContainText('Projects');
	});
});

test.describe('language switcher URLs are correct', () => {
	test('no locale stacking in switcher links', async ({ page }) => {
		await page.goto('/de/projekte/lautlos');

		const en_link = page.locator('nav[aria-label="Language switcher"] a', { hasText: 'en' });
		const de_link = page.locator('nav[aria-label="Language switcher"] a', { hasText: 'de' });
		const es_link = page.locator('nav[aria-label="Language switcher"] a', { hasText: 'es' });

		await expect(en_link).toHaveAttribute('href', '/projects/lautlos');
		await expect(de_link).toHaveAttribute('href', '/de/projekte/lautlos');
		await expect(es_link).toHaveAttribute('href', '/es/proyectos/lautlos');
	});

	test('repeated switching does not stack locale prefixes', async ({ page }) => {
		await page.goto('/');

		// Switch DE → ES → EN → DE
		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'de' }).click();
		await expect(page).toHaveURL('/de');

		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'es' }).click();
		await expect(page).toHaveURL('/es');

		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'en' }).click();
		await expect(page).toHaveURL('/');

		await page.locator('nav[aria-label="Language switcher"] a', { hasText: 'de' }).click();
		await expect(page).toHaveURL('/de');
	});
});
