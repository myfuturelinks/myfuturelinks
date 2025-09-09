MyFutureLinks --- Work/Study in Europe

A professional recruitment + study-admissions site built with Next.js
(App Router, TS), Tailwind, shadcn/ui, Zod validation, Resend for email,
and deployed on Vercel. Includes: SEO metadata, responsive layout,
job/study listings with filters, accessible forms with phone + country
code, rate-limited contact API, and a polished privacy policy.

Quick start \# 1) Clone + install git clone \<your-repo-url\>
myfuturelinks cd myfuturelinks npm ci

\# 2) Configure env cp .env.example .env \# Edit the values (sender
email/domain, contact recipient, site URL, etc.)

\# 3) Run locally npm run dev \# http://localhost:3000

Tech stack

Next.js 14 (App Router, RSC, Route Handlers)

TypeScript

Tailwind CSS (+ small theme tokens)

shadcn/ui (Select, Toast, Drawer/Sheet)

Zod + react-hook-form

Resend (or SMTP) for contact emails

Vercel (hosting, previews)

Optional anti-bot: Cloudflare Turnstile (off by default)

Project structure src/ app/ (routes) page.tsx \# Home (landing)
work/page.tsx \# Work abroad (filters + cards) study/page.tsx \# Study
in EU (filters + cards) contact/page.tsx \# Contact form page
privacy/page.tsx \# Polished privacy policy api/ contact/route.ts \#
POST handler -\> Resend/SMTP with rate limit

components/ forms/contact-form.tsx jobs/JobCard.tsx jobs/JobsGrid.tsx
study/ProgramCard.tsx site/navbar.tsx site/footer.tsx site/container.tsx
ui/... (shadcn components + use-toast)

data/ jobs.ts \# Jobs JSON-like data programs.ts \# Study programs data

lib/ site-config.ts \# name, url, og image, descriptions rate-limit.ts
\# in-memory IP + email cooldown sanitize.ts \# strip CRLF, clamp

Paths may vary slightly---adjust names to match your repo.

Environment variables

Create .env from the example below. Never commit your real .env.

.env.example \# \-\-- App \-\--
NEXT_PUBLIC_SITE_URL=https://myfuturelinks.com

\# \-\-- Mail provider (Option B: Resend) \-\-- MAIL_PROVIDER=resend
MAIL_FROM=\"MyFutureLinks \<contact@myfuturelinks.com\>\" \# must be a
verified sender CONTACT_TO_EMAIL=enquiry@myfuturelinks.com
RESEND_API_KEY=re\_\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

\# \-\-- Cooldown (rate limit) \-\-- CONTACT_COOLDOWN_SECONDS=60

\# \-\-- Optional Turnstile (bot protection) \# Enable only if you add
the widget on the form \# TURNSTILE_SITE_KEY= \# TURNSTILE_SECRET_KEY=

If you prefer SMTP instead of Resend, swap MAIL_PROVIDER=smtp and add
SMTP creds in the API route (we already wired the switch).

Development scripts npm run dev \# Next dev server npm run build \#
Production build npm run start \# Start built app npm run lint \# ESLint
npm run typecheck \# TypeScript noEmit type checks

Data: Jobs & Study programs

We intentionally made these static TS files (simple to edit, no DB).

src/data/jobs.ts (shape):

export type Job = { slug: string; title: string; location: string; //
\"City, Country\" country: string; // \"Belgium\" \| \"Netherlands\" \|
\"Germany\" \| \... sector: \"Healthcare\" \| \"Hospitality\" \|
\"Logistics\" \| \"Tech & IT\"; languages?: { // optional; can be empty
\[lang: string\]:
\"A2\"\|\"A2+\"\|\"B1\"\|\"B1+\"\|\"B2\"\|\"B2+\"\|\"C1\"\|\"C1+\"; };
requirements: string\[\]; // bullet points applyUrl?: string; //
external or internal link }; export const JOBS: Job\[\] = \[ /\* ... \*/
\];

src/data/programs.ts (shape):

export type Program = { slug: string; title: string; country:
\"Belgium\" \| \"Netherlands\" \| \"Germany\" \| \"Malta\" \| \"Other\";
level: \"Bachelor\" \| \"Master\" \| \"Vocational\" \| \"Foundation\";
languages?: { \[lang: string\]: \"B1\"\|\"B2\"\|\"C1\" }; // optional
requirements: string\[\]; applyUrl?: string; }; export const PROGRAMS:
Program\[\] = \[ /\* ... \*/ \];

Add a new card

Append to JOBS or PROGRAMS.

Make sure slug is unique.

The filters on /work and /study read from these arrays and update
automatically.

Contact form & email delivery

UI: src/components/forms/contact-form.tsx (Zod + react-hook-form +
shadcn Select)

API: src/app/api/contact/route.ts

Validates payload (Zod)

Rate-limits (IP + 60s email cooldown via CONTACT_COOLDOWN_SECONDS)

Sanitizes input (CR/LF stripping)

Sends email using Resend (Option B) or SMTP (Option A, commented)

Success/failure messages via toast; "cooldown" errors tell users how
many seconds to wait.

Resend DNS (for your domain sender)

In Resend: add sender domain (e.g. myfuturelinks.com or
send.myfuturelinks.com).

Add the SPF + DKIM TXT (and optional DMARC/MX) records to Combell.

Wait until Resend shows "verified".

In .env, set MAIL_FROM and CONTACT_TO_EMAIL appropriately.

SEO & metadata

Global metadata: src/app/layout.tsx

title, description, openGraph, twitter, icons, manifest.

Page‐specific (/contact, /privacy, etc.) set their own metadata.

JSON-LD helpers: src/components/seo/jsonld.tsx.

Favicon/manifest: put files in /public (already wired).

Set NEXT_PUBLIC_SITE_URL to your real domain in Vercel envs (Production
vs Preview).

Styling & components

Tailwind: base tokens in globals.css.

text-ink / ink opacity classes for brand color

General spacing: max-w-6xl content container via Container component.

shadcn/ui: Selects, Toasts, Drawer (mobile nav), etc.

To add a new UI primitive, run the shadcn generator (already installed).

Navigation

Desktop top bar + mobile drawer in src/components/site/navbar.tsx

Primary links: Home, Work abroad, Study in EU, FAQ, Contact (Hero CTA
"Start now").

Mobile menu is full height drawer; backdrop blur; no rounded corners per
your preference.

Privacy & security

Privacy Policy page styled with sticky table-of-contents and anchor
links.

Rate limiting:

Memory-based IP throttle + per-email cooldown in lib/rate-limit.ts.

For production scale, replace with Upstash Redis (the function signature
makes this easy).

Optional Cloudflare Turnstile (tokens supported in the API route; add
widget if you enable).

Deployment Vercel

Production branch: main

Preview deployments: all branches (including dev & feature/\*)

Env vars: set per environment (Production vs Preview)

NEXT_PUBLIC_SITE_URL=https://myfuturelinks.com (Prod)

NEXT_PUBLIC_SITE_URL=https://dev.myfuturelinks.com or the preview URL
(Preview)

DNS (Combell → Vercel)

A record (root/apex myfuturelinks.com) → Vercel IP

Today either 76.76.21.21 or 216.198.79.1 (Vercel may recommend the newer
one)

CNAME www → the cname.vercel-dns.com value Vercel shows

SSL auto-provisions in Vercel (give it a few minutes)

We also redirect the \*.vercel.app host to the primary domain in
src/middleware.ts (optional).

Branching model (lightweight)

main = production

dev = integration/staging

feature/\<slug\> → branches off dev

Create a feature:

git checkout dev git pull git checkout -b feature/\<slug\> \# \... code
\... git commit -m \"feat(area): short description\" git push -u origin
feature/\<slug\>

Open a PR into dev. When ready to release:

git checkout main git pull git merge \--no-ff dev -m \"chore: release\"
git push

Delete a branch:

git checkout dev git branch -d feature/\<slug\> \# local git push origin
\--delete feature/\<slug\> \# remote

Common tasks Add a new job

Edit src/data/jobs.ts → add to JOBS.

Confirm it appears under /work (filters: country, sector, language).

Add a new study program

Edit src/data/programs.ts → add to PROGRAMS.

Confirm it appears under /study (filters: country, level, language).

Change hero text, sectors, or FAQ

Home: src/app/page.tsx (Hero + sector cards + FAQ blocks).

Change favicon/manifest OG image

Replace files in /public (keep names) and redeploy.

Troubleshooting

"useSearchParams should be wrapped in suspense" Don't call
useSearchParams in server components. If needed, wrap the client section
in \<Suspense\> or move to a client component.

Email not received Check:

Resend domain verified (SPF/DKIM green)

MAIL_FROM uses that verified domain

CONTACT_TO_EMAIL is correct

Look at Vercel logs for POST /api/contact

DNS change recommended in Vercel Update the apex A record to the IP
Vercel suggests; both old and new usually work.

Roadmap / Wish-list

Cookie/consent banner + Vercel Analytics

Migrate rate limit to Upstash Redis

Admin JSON editor for jobs/programs

i18n (Nepali/English) for primary pages

E2E tests (Playwright) for contact + filters

CI (GitHub Actions) for lint/typecheck/build

Structured logs + monitoring

License

Private project (© MyFutureLinks). All rights reserved.

.env.example (again for convenience)
NEXT_PUBLIC_SITE_URL=https://myfuturelinks.com

MAIL_PROVIDER=resend MAIL_FROM=\"MyFutureLinks
\<contact@myfuturelinks.com\>\"
CONTACT_TO_EMAIL=enquiry@myfuturelinks.com
RESEND_API_KEY=re\_\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

CONTACT_COOLDOWN_SECONDS=60 \# TURNSTILE_SITE_KEY= \#
TURNSTILE_SECRET_KEY=

If you want this split into a /docs folder (e.g., docs/DEPLOYMENT.md,
docs/ADDING_JOBS.md), say the word and I'll generate those files too.
