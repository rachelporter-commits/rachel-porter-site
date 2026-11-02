# Handoff: getting the site live (Rachel's accounts)

## 1. GitHub
Accept the repository transfer from `keetonassistant` (link in your email / github.com/notifications). The repo becomes `rachelporter-commits/rachel-porter-site`.

## 2. Supabase (your account)
1. New project (region US East), save the DB password.
2. SQL Editor → paste `supabase/migrations/20261101000000_create_leads.sql` → Run.
3. Project Settings → API: copy **Project URL** and **anon public key** (NOT service_role).
Leads appear in Table Editor → `leads`.

## 3. Cloudflare Pages (your account)
1. Workers & Pages → Create → **Pages** → Connect to Git → authorize GitHub → pick `rachel-porter-site`.
2. Framework preset: Astro. Build command `npm run build`. Output directory `dist`. Branch `main`.
3. Environment variables (Production):
   - `PUBLIC_SITE_URL` = `https://rachelporterrealty.com`
   - `PUBLIC_SUPABASE_URL` / `PUBLIC_SUPABASE_ANON_KEY` = from Supabase
   - `NODE_VERSION` = `22`
   - `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` (encrypted) for /admin, see step 5
4. Save and Deploy → you get `rachel-porter-site.pages.dev`.

## 4. Domain rachelporterrealty.com (keep Google Workspace email working)
**Recommended:** move DNS to Cloudflare (free).
1. Cloudflare → Add a domain → `rachelporterrealty.com` → Free plan. Cloudflare imports existing records.
2. **Before switching nameservers, check these records were copied exactly:**
   all **MX** records (Google: `smtp.google.com` priority 1, or the older `aspmx.l.google.com` set),
   **TXT** SPF `v=spf1 include:_spf.google.com ~all`, **DKIM** TXT `google._domainkey`, **DMARC** `_dmarc`,
   and any `google-site-verification` TXT. Compare against the current registrar's DNS.
3. Change nameservers at the registrar (where the domain was bought; possibly Google Domains → Squarespace) to the two Cloudflare gives you.
4. Pages project → Custom domains → add `rachelporterrealty.com` and `www.rachelporterrealty.com`. Cloudflare creates the CNAMEs automatically. Don't touch MX/TXT.
5. Optional: Rules → redirect `www` → apex.

**Alternative (keep DNS at the registrar):** add only `www` as a CNAME → `rachel-porter-site.pages.dev` (Pages → Custom domains → www first), and set registrar URL-forwarding for the apex → www. An apex domain on Pages requires Cloudflare DNS. Never edit MX records.

## 5. /admin login (Decap CMS)
GitHub → Settings → Developer settings → OAuth Apps → New:
Homepage `https://rachelporterrealty.com`, callback `https://rachelporterrealty.com/api/callback`.
Put the Client ID and Secret into Cloudflare (step 3) → Retry deployment. Then log in at `/admin`.
