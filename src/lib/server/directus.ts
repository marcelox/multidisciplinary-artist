import { createDirectus, rest, readItems, readSingleton } from '@directus/sdk';
import { DIRECTUS_URL } from '$env/static/private';
import type { Schema } from '$lib/types/directus';

export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

export { readItems, readSingleton };

/**
 * Helper to get translated fields for a given language
 */
export function get_translated<
	T extends { translations?: Array<{ languages_code: string }> | null }
>(item: T, lang: string): T & { t: NonNullable<T['translations']>[number] } {
	const translations = item.translations ?? [];
	const translation = translations.find((t) => t.languages_code === lang) ?? translations[0];
	return { ...item, t: translation } as T & { t: NonNullable<T['translations']>[number] };
}

/**
 * Helper to get asset URL
 */
export function get_asset_url(
	file_id: string | null,
	transforms?: {
		width?: number;
		height?: number;
		fit?: 'cover' | 'contain' | 'inside' | 'outside';
		format?: 'webp' | 'jpg' | 'png' | 'avif';
		quality?: number;
	}
): string | null {
	if (!file_id) return null;

	const params = new URLSearchParams();
	if (transforms?.width) params.set('width', transforms.width.toString());
	if (transforms?.height) params.set('height', transforms.height.toString());
	if (transforms?.fit) params.set('fit', transforms.fit);
	if (transforms?.format) params.set('format', transforms.format);
	if (transforms?.quality) params.set('quality', transforms.quality.toString());

	const query = params.toString();
	return `${DIRECTUS_URL}/assets/${file_id}${query ? `?${query}` : ''}`;
}
