import type { CollectionEntry } from 'astro:content';

export function slugifyTag(tag: string): string {
	return tag.toLowerCase().trim().replace(/\s+/g, '-');
}

export function getAllTags(posts: CollectionEntry<'blog'>[]): string[] {
	const tags = new Set<string>();
	for (const post of posts) {
		for (const tag of post.data.tags) {
			tags.add(tag);
		}
	}
	return [...tags].sort((a, b) => a.localeCompare(b));
}
