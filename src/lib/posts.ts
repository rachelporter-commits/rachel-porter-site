import { getCollection } from "astro:content";
// Drafts show in `npm run dev` but never in the production build.
const show = (d: { data: { draft: boolean } }) => import.meta.env.DEV || !d.data.draft;
export const getPosts = async () => (await getCollection("blog", show)).sort((a, b) => +b.data.pubDate - +a.data.pubDate);
export const getVideos = async () => (await getCollection("videos", show)).sort((a, b) => +b.data.pubDate - +a.data.pubDate);
export const slugify = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
export const fmt = (d: Date) => d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" });
