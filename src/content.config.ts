import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    video: z.string().optional(), // optional video URL shown at top of post
    draft: z.boolean().default(false),
  }),
});

const videos = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/videos" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    url: z.string(), // YouTube, Vimeo, Facebook, TikTok URL, or /videos/file.mp4
    pubDate: z.coerce.date(),
    thumbnail: z.string().optional(),
    upload: z.string().optional(), // set by the CMS file uploader; copy its path into url
    duration: z.string().optional(), // ISO 8601, e.g. PT2M30S
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, videos };
