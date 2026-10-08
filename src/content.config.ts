import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { getPostId, postMetadataSchema } from "./lib/post-metadata.ts";

const posts = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "./posts",
    generateId: ({ entry, data }) => getPostId(entry, data),
  }),
  schema: postMetadataSchema,
});

export const collections = { posts };
