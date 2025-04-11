import { defineCollection, defineConfig } from "@content-collections/core";

const blogs = defineCollection({
  name: "blogs",
  directory: "src/content/blog",
  include: "**/*.md",
  schema: (z) => ({
    title: z.string(),
    date: z.string(),
    updated: z.string().optional(),
    tags: z.array(z.string()).optional(),
    description: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
  transform: async (document) => {
    return {
      ...document,
      slug: `${document._meta.path}`,
    };
  },
});

export default defineConfig({
  collections: [blogs],
}); 