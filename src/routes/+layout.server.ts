import { directus, readItems, readSingleton, get_translated } from '$lib/server/directus';
import { getLocale } from '$lib/paraglide/runtime';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ depends }) => {
	depends('paraglide:locale');
	const lang = getLocale();

	const [navigation_items, site_settings] = await Promise.all([
		directus.request(
			readItems('navigation', {
				fields: ['id', 'path', 'sort', 'external', { translations: ['*'] }],
				sort: ['sort']
			})
		),
		directus.request(
			readSingleton('site_settings', {
				fields: ['id', 'url', 'default_language', { translations: ['*'] }]
			})
		)
	]);

	const navigation = navigation_items.map((item) => get_translated(item, lang));
	const settings = get_translated(site_settings, lang);

	return { navigation, settings };
};