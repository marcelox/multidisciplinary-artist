/**
 * Directus Schema Types
 *
 * These match the collections in Directus.
 * Update if you change the schema.
 */

export type Language = {
	code: string;
	name: string;
	direction: 'ltr' | 'rtl';
};

export type SiteSettings = {
	id: number;
	url: string;
	default_language: string;
	translations?: SiteSettingsTranslation[];
};

export type SiteSettingsTranslation = {
	id: number;
	site_settings_id: number;
	languages_code: string;
	title: string;
	subtitle: string | null;
	alternate_subtitle: string | null;
};

export type Artist = {
	id: number;
	name: string;
	born: number | null;
	roles: string[];
	based_in: string[];
	portrait: string | null;
	degree: string | null;
	degree_field: string | null;
	degree_year: number | null;
	translations?: ArtistTranslation[];
};

export type ArtistTranslation = {
	id: number;
	artist_id: number;
	languages_code: string;
	bio: string | null;
};

export type Project = {
	id: number;
	slug: string;
	status: 'published' | 'draft' | 'archived';
	sort: number | null;
	cover_image: string | null;
	medium: string[];
	year: number | null;
	has_video: boolean;
	video_url: string | null;
	translations?: ProjectTranslation[];
	images?: ProjectImage[];
	exhibitions?: Exhibition[];
};

export type ProjectTranslation = {
	id: number;
	projects_id: number;
	languages_code: string;
	title: string;
	tagline: string | null;
	description: string | null;
	statement: string | null;
};

export type ProjectImage = {
	id: number;
	sort: number | null;
	project_id: number;
	image: string;
	translations?: ProjectImageTranslation[];
};

export type ProjectImageTranslation = {
	id: number;
	project_images_id: number;
	languages_code: string;
	caption: string | null;
	alt_text: string | null;
};

export type Exhibition = {
	id: number;
	sort: number | null;
	year: number;
	type: 'solo' | 'group';
	venue: string;
	city: string;
	country: string | null;
	url: string | null;
	project_id: number | null;
	translations?: ExhibitionTranslation[];
};

export type ExhibitionTranslation = {
	id: number;
	exhibitions_id: number;
	languages_code: string;
	title: string | null;
};

export type Navigation = {
	id: number;
	path: string;
	sort: number | null;
	external: boolean;
	translations?: NavigationTranslation[];
};

export type NavigationTranslation = {
	id: number;
	navigation_id: number;
	languages_code: string;
	label: string;
};

/**
 * Directus SDK Schema
 */
export type Schema = {
	languages: Language[];
	site_settings: SiteSettings;
	artist: Artist;
	projects: Project[];
	project_images: ProjectImage[];
	exhibitions: Exhibition[];
	navigation: Navigation[];
};
