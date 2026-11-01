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
- `public/images/` – headshot, logo, past listing photos
- `supabase/migrations/` – database schema (run in Supabase SQL editor or `supabase db push`)

## Deploy (Cloudflare Pages)
Connect the GitHub repo in Cloudflare > Workers & Pages > Create > Pages.
Build command `npm run build`, output dir `dist`. Add env vars
`PUBLIC_SUPABASE_URL` and `PUBLIC_SUPABASE_ANON_KEY`.

## Reading your leads
Supabase dashboard > Table Editor > `leads`. The public key can only *insert*, never read.

## Before launch — TODOs
Search the code for `PLACEHOLDER` and `TODO`: your story, testimonials, confirm cell number,
confirm start year (2016 vs 2017). Real estate ads in VA must show the brokerage name (kept in footer).
