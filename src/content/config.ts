import { defineCollection, z } from "astro:content";

export const blogSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  author: z.string(),
  date: z.date(),
});

export const blogCollection = defineCollection({
  schema: blogSchema,
});

export const collections = {
  blog: blogCollection,
};
