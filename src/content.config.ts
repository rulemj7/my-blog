import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			// Free-form topic tags. Add a new topic by tagging a post with it — no schema change needed.
			tags: z.array(z.string()).default([]),
		}),
});

const videos = defineCollection({
	// Load Markdown files in the `src/content/videos/` directory.
	loader: glob({ base: './src/content/videos', pattern: '**/*.md' }),
	schema: () =>
		z.object({
			title: z.string(),
			caption: z.string(),
			embedUrl: z.string().url(),
			pubDate: z.coerce.date(),
		}),
});

const about = defineCollection({
	// Load the single Markdown file in the `src/content/about/` directory.
	loader: glob({ base: './src/content/about', pattern: '**/*.md' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog, videos, about };
