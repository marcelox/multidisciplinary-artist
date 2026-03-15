import { directus, readItems, get_translated, get_asset_url } from '$lib/server/directus';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('paraglide:locale');
	const lang = getLocale();

	const items = await directus.request(
		readItems('projects', {
			fields: ['id', 'slug', 'cover_image', { translations: ['*'] }],
			filter: { status: { _eq: 'published' } },
			sort: ['sort']
		})
	);

	const projects = items.map((item) => {
		const translated = get_translated(item, lang);
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