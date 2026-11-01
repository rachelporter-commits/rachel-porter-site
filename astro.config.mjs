// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";
import { loadEnv } from "vite";

const env = loadEnv(process.env.NODE_ENV ?? "production", process.cwd(), "");
const site = (env.PUBLIC_SITE_URL || process.env.PUBLIC_SITE_URL || "https://rachel-porter-site.pages.dev").replace(/\/$/, "");

export default defineConfig({
  site,
  trailingSlash: "ignore",
  integrations: [mdx(), sitemap({ filter: (p) => !p.includes("/admin") })],
  vite: { plugins: [tailwindcss()] },
});
