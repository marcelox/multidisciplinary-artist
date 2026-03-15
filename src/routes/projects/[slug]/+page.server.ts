import { directus, readItems, get_translated, get_asset_url } from '$lib/server/directus';
import { getLocale } from '$lib/paraglide/runtime';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, depends }) => {
	depends('paraglide:locale');
	const lang = getLocale();

	const items = await directus.request(
		readItems('projects', {
			fields: [
				'id',
				'slug',
				'medium',
				'year',
				{
					translations: ['*'],
					images: ['id', 'sort', 'image', { translations: ['*'] }]
				}
			],
			filter: {
				slug: { _eq: params.slug },
				status: { _eq: 'published' }
			},
			limit: 1
		})
	);

	const item = items[0];
	if (!item) error(404, 'Project not found');

	const project = get_translated(item, lang);

	const images = (project.images ?? [])
		.sort((a, b) => (a.sort ?? 0) - (b.sort ?? 0))
		.map((img) => {
			const translated = get_translated(img, lang);
			return {
				id: translated.id,
				url: get_asset_url(translated.image, {
					width: 1200,
					format: 'webp',
					quality: 80
				}),
				alt: translated.t?.alt_text ?? '',
				caption: translated.t?.caption ?? null
			};
		});

	return {
		project,
		images
	};
};