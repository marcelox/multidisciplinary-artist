import { directus, readItems, get_translated, get_asset_url } from '$lib/server/directus';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const items = await directus.request(
		readItems('projects', {
			fields: ['id', 'slug', 'cover_image', { translations: ['*'] }],
			filter: { status: { _eq: 'published' } },
			sort: ['sort']
		})
	);

	const projects = items.map((item) => {
		const translated = get_translated(item, params.lang);
		return {
			...translated,
			cover_url: get_asset_url(translated.cover_image, {
				width: 800,
				format: 'webp',
				quality: 80
			})
		};
	});

	return { projects };
};