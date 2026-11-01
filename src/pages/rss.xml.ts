import rss from "@astrojs/rss";
import { getPosts } from "../lib/posts";
export async function GET(context: { site: URL }) {
  const posts = (await getPosts()).filter((p) => !p.data.draft);
  return rss({ title: "Rachel Porter | The Special-Needs Family Realtor", description: "Home buying and selling for special-needs families in Central Virginia.",
    site: context.site, items: posts.map((p) => ({ title: p.data.title, description: p.data.description, pubDate: p.data.pubDate, link: `/blog/${p.id}/`, categories: p.data.tags })) });
}
