import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
    og_image: z.string().optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    created: z.date(),
    updated: z.date(),
    maturity: z.enum(['seedling', 'budding', 'evergreen']),
    tags: z.array(z.string()).default([]),
    related_notes: z.array(z.string()).default([]),
    related_posts: z.array(z.string()).default([]),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tech_stack: z.array(z.string()).default([]),
    repo_url: z.string().optional(),
    demo_url: z.string().optional(),
    status: z.enum(['active', 'completed', 'archived']),
    order: z.number().default(0),
    cover_image: z.string().optional(),
  }),
});

const docs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(0),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog, notes, projects, docs };
