import { createDirectus, rest, readItems, readItem, readSingleton } from '@directus/sdk';
import { DIRECTUS_URL } from '$env/static/private';
import type { Schema } from '$lib/types/directus';

export const directus = createDirectus<Schema>(DIRECTUS_URL).with(rest());

export { readItems, readItem, readSingleton };

/**
 * Helper to get translated fields for a given language
 */
export function get_translated<T extends { translations?: Array<{ languages_code: string }> }>(
	item: T,
	lang: string
): T & { t: T['translations'] extends Array<infer U> ? U : never } {
	const translation =
		item.translations?.find((t) => t.languages_code === lang) ?? item.translations?.[0];
	return { ...item, t: translation as never };
}

/**
 * Helper to get asset URL
 */
export function get_asset_url(
	file_id: string | null,
	transforms?: { width?: number; height?: number; fit?: 'cover' | 'contain' | 'inside' | 'outside' }
): string | null {
	if (!file_id) return null;

	const params = new URLSearchParams();
	if (transforms?.width) params.set('width', transforms.width.toString());
	if (transforms?.height) params.set('height', transforms.height.toString());
	if (transforms?.fit) params.set('fit', transforms.fit);

	const query = params.toString();
	return `${DIRECTUS_URL}/assets/${file_id}${query ? `?${query}` : ''}`;
}
