import { marked } from 'marked';
import { directus, readItems, readSingleton, get_translated, get_asset_url } from '$lib/server/directus';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ depends }) => {
	depends('paraglide:locale');
	const lang = getLocale();

	const [artist_data, exhibition_items] = await Promise.all([
		directus.request(
			readSingleton('artist', {
				fields: ['id', 'name', 'roles', 'based_in', 'portrait', { translations: ['*'] }]
			})
		),
		directus.request(
			readItems('exhibitions', {
				fields: ['id', 'year', 'type', 'venue', 'city', 'country', { translations: ['*'] }],
				sort: ['-year', 'sort']
			})
		)
	]);

	const artist = get_translated(artist_data, lang);

	if (artist.t?.bio) {
		artist.t.bio = await marked(artist.t.bio);
	}

	const portrait_url = get_asset_url(artist.portrait, {
		width: 800,
		format: 'webp',
		quality: 85
	});

	const exhibitions = exhibition_items.map((item) => get_translated(item, lang));

	return { artist, portrait_url, exhibitions };
};
