import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { defineConfig } from 'vitest/config';
import { playwright } from '@vitest/browser-playwright';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
	plugins: [
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide',
			strategy: ['url', 'cookie', 'baseLocale'],
			urlPatterns: [
				{
					pattern: ':protocol://:domain(.*)::port?/projects/:slug',
					localized: [
						['en', ':protocol://:domain(.*)::port?/projects/:slug'],
						['de', ':protocol://:domain(.*)::port?/de/projekte/:slug'],
						['es', ':protocol://:domain(.*)::port?/es/proyectos/:slug']
					]
				},
				{
					pattern: ':protocol://:domain(.*)::port?/about',
					localized: [
						['en', ':protocol://:domain(.*)::port?/about'],
						['de', ':protocol://:domain(.*)::port?/de/ueber'],
						['es', ':protocol://:domain(.*)::port?/es/sobre']
					]
				},
				{
					pattern: ':protocol://:domain(.*)::port?/contact',
					localized: [
						['en', ':protocol://:domain(.*)::port?/contact'],
						['de', ':protocol://:domain(.*)::port?/de/kontakt'],
						['es', ':protocol://:domain(.*)::port?/es/contacto']
					]
				},
				{
					pattern: ':protocol://:domain(.*)::port?/',
					localized: [
						['en', ':protocol://:domain(.*)::port?/'],
						['de', ':protocol://:domain(.*)::port?/de'],
						['es', ':protocol://:domain(.*)::port?/es']
					]
				}
			]
		})
	],
	test: {
		expect: { requireAssertions: true },
		projects: [
			{
				extends: './vite.config.ts',
				test: {
					name: 'client',
					browser: {
						enabled: true,
						provider: playwright(),
						instances: [{ browser: 'chromium', headless: true }]
					},
					include: ['src/**/*.svelte.{test,spec}.{js,ts}'],
					exclude: ['src/lib/server/**']
				}
			}
		]
	}
});
