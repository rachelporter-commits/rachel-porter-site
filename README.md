# Rachel Porter — The Special-Needs Family Realtor

Website for Rachel Porter, REALTOR® with Keeton & Co Real Estate (Glen Allen, VA).
Built with **Astro 7 + Tailwind CSS 4**, static output, hosted on **Cloudflare Pages**,
contact form saves to a **Supabase** `leads` table.

## Run it
```bash
npm install
cp .env.example .env   # fill in your Supabase URL + anon key
npm run dev            # http://localhost:4321
npm run build          # outputs ./dist
```

## Where things live
- `src/pages/index.astro` – the home page (all sections)
- `src/data/site.ts` – your contact info, license, service area, stats (edit here)
- `src/lib/leads.ts` – contact form → Supabase
- `src/layouts/Layout.astro` – <head>, SEO tags
- `src/styles/global.css` – colors/fonts (sage, clay, cream)
- `public/images/` – headshot, logo, past listing photos (`uploads/` = CMS uploads)
- `src/content/blog/`, `src/content/videos/` – posts and videos (Markdown)
- `src/content.config.ts` – fields allowed in posts/videos
- `src/components/VideoEmbed.astro` – YouTube/Vimeo/Facebook/TikTok/mp4 player
- `src/lib/schema.ts` – JSON-LD structured data
- `src/pages/robots.txt.ts`, `llms.txt.ts`, `rss.xml.ts` – generated files for search and AI bots
- `public/admin/` – Decap CMS (browser editor); `functions/api/` – its GitHub login
- `supabase/migrations/` – database schema (run in Supabase SQL editor or `supabase db push`)

## Deploy (Cloudflare Pages)
Connect the GitHub repo in Cloudflare > Workers & Pages > Create > Pages.
Build command `npm run build`, output dir `dist`. Add env vars
`PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.

## Reading your leads
Supabase dashboard > Table Editor > `leads`. The public key can only *insert*, never read.


## ✍️ How to post a blog (2 ways)

**A. In the browser (easiest):** go to `https://YOUR-SITE/admin`, click *Login with GitHub*,
choose **Blog posts → New**, write, add a photo/video link, and click **Publish**.
The site rebuilds itself in about a minute.

**B. In the code (or ask Claude Code / Grok to do it):**
1. Copy `src/content/blog/_TEMPLATE.md.txt` to `src/content/blog/my-post-name.md` (the filename becomes the URL).
2. Fill in the top section (title, description, date, tags) and write below the `---`.
3. `draft: true` hides it from the live site (you can still see it with `npm run dev`).
4. Commit and push. Cloudflare deploys it.

Video in the middle of a post: name the file `.mdx` and use
`<VideoEmbed url="https://youtu.be/..." title="..." />` (see the template).

## 🎥 How to post a video
- **Browser:** `/admin` → **Videos → New** → paste the YouTube, Vimeo, Facebook, or TikTok link, add a title and description, then Publish.
- **Code:** copy `src/content/videos/_TEMPLATE.md.txt` to `src/content/videos/my-video.md` and fill it in.
- **Your own mp4:** put it in `public/videos/` and set `url: "/videos/file.mp4"`. Keep files small (under ~25 MB, Cloudflare's limit is 25 MiB per file). For anything longer, use YouTube.
Videos show on `/videos`, load lazily (YouTube only loads when someone clicks play), and include VideoObject schema for Google and AI search.
Delete or edit `src/content/videos/example-video.md` (a draft example).

## 🤖 AI search / SEO built in
- JSON-LD: Person, RealEstateAgent/LocalBusiness (you), brokerage (Keeton & Co), FAQPage, BlogPosting, VideoObject
- `/sitemap-index.xml`, `/rss.xml`, `/robots.txt` (explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.), `/llms.txt` (a plain-text summary written for AI assistants; it updates itself from posts and videos)
- Canonical, Open Graph, and Twitter tags on every page. The FAQ lives in `src/data/site.ts` (`faqs`).
- Set `PUBLIC_SITE_URL` once you have a real domain. After launch, submit the sitemap in Google Search Console and Bing Webmaster Tools (Bing powers ChatGPT search).

## 🔐 One-time setup for /admin (GitHub login via Cloudflare)
1. GitHub → Settings → Developer settings → **OAuth Apps → New**.
   Homepage: `https://YOUR-SITE`; Authorization callback URL: `https://YOUR-SITE/api/callback`.
2. Copy the Client ID and generate a Client Secret.
3. Cloudflare → Workers & Pages → your project → Settings → Variables and Secrets:
   `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (encrypt it). Redeploy.
4. In `public/admin/config.yml`, set `repo:` to `your-github-username/rachel-porter-site` and `base_url`/`site_url` to your site.
The OAuth handler is in `functions/api/auth.js` and `functions/api/callback.js` (Cloudflare Pages Functions).

## Before launch — TODOs
Search the code for `PLACEHOLDER` and `TODO`: your story, testimonials, confirm start year (2016 vs 2017). Real estate ads in VA must show the brokerage name (kept in footer).
