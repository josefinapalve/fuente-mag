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
			category: z.enum(['Descubre', 'Ensayos', 'Conversaciones']).optional(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const panoramas = defineCollection({
	loader: glob({ base: './src/content/panoramas', pattern: '**/*.{md,mdx}' }),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			tipo: z.enum(['Charla', 'Retiro', 'Concierto', 'Película', 'Taller', 'Encuentro', 'Otro']),
			fecha: z.coerce.date(),
			fechaFin: z.coerce.date().optional(),
			hora: z.string().optional(),
			lugar: z.string(),
			organiza: z.string().optional(),
			link: z.string().url().optional(),
			heroImage: z.optional(image()),
		}),
});

export const collections = { blog, panoramas };
