# AGENTS.md — guide for AI coding tools (Claude Code, Grok, Cursor, etc.)

## Project
Personal website for **Rachel Porter**, REALTOR®, Keeton & Co Real Estate (VA license 0225221415).
Brand: **"The Special-Needs Family Realtor"** in Central Virginia (Goochland, Henrico, Richmond,
Powhatan, Chesterfield). Rachel is a single mom of two boys; her son Wyatt has special needs. She is not married. Never mention a spouse.
Cell: (804) 629-9192 (confirmed).
Owner of this repo: Rachel. Broker of record: Daniel Keeton, Keeton & Co (keetonco.com).

## Stack
- Astro 7 (static output) + Tailwind CSS 4 (via `@tailwindcss/vite`, theme in `src/styles/global.css`)
- Supabase (Postgres) for form leads; schema in `supabase/migrations/*.sql`
- Hosting: Cloudflare Pages (`npm run build` → `dist/`)
- Env: `PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY` (see `.env.example`). Never commit `.env` or a service_role key.

## Content
- Blog: `src/content/blog/*.md|mdx`, schema in `src/content.config.ts`, template `_TEMPLATE.md.txt`. `draft: true` = hidden in prod.
- Videos: `src/content/videos/*.md`, `url` = YouTube/Vimeo/Facebook/TikTok or `/videos/x.mp4`. Rendered by `components/VideoEmbed.astro` (lite YouTube click-to-load). Use `<VideoEmbed>` in .mdx posts.
- Decap CMS at `/admin` (`public/admin/config.yml`) edits the same files via GitHub. Keep its fields in sync with `content.config.ts`.
  OAuth: `functions/api/{auth,callback}.js` (Cloudflare Pages Functions, env GITHUB_CLIENT_ID/SECRET).

## AI search / SEO (keep these working)
- JSON-LD from `src/lib/schema.ts`, injected by `layouts/Layout.astro` (`schema` prop for page-specific nodes: FAQPage, BlogPosting, VideoObject).
- `robots.txt.ts` allows AI crawlers; `llms.txt.ts` auto-summarizes the site; `@astrojs/sitemap`; `rss.xml.ts`.
- Site URL from `PUBLIC_SITE_URL` (default https://rachel-porter-site.pages.dev). Every new page should use Layout with a unique title and description, a single h1, and real content.
- FAQ answers must stay factual and general. No invented statistics or legal or medical advice; point people to agencies or professionals.

## Rules
1. **Never invent facts** about Rachel (bio, awards, reviews, stats). Use `[PLACEHOLDER — ...]` and ask her.
2. Facts live in `src/data/site.ts`; keep the source comments up to date.
3. Accessibility is the brand: semantic HTML, alt text, labels on every input, visible focus,
   color contrast AA, respects `prefers-reduced-motion`. Test with keyboard only.
4. Compliance: keep brokerage name "Keeton & Co Real Estate", license #, and Equal Housing
   Opportunity in the footer. Fair Housing: describe *homes and features*, never steer by
   protected class (disability/familial status are protected — offer services, don't restrict).
5. Testimonials must be real and permissioned.
6. Database changes = new file in `supabase/migrations/` (timestamped). Keep RLS on; anon may only INSERT into `leads`.
7. Run `npm run build` before committing; it must pass.

## Ideas backlog
- Resources page (Virginia DD waiver, Medicaid waivers, local therapy providers, IEP-friendly schools)
- Blog for SEO ("accessible homes Richmond VA", "sensory-friendly neighborhoods")
- Listings page / IDX embed; neighborhood guides; email notification on new lead (Supabase webhook or Edge Function)
- Admin page to view leads (Supabase Auth, Rachel only)
