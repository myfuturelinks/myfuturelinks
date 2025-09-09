\# MyFutureLinks · Work & Study in Europe

\[\![Next.js\](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs)\](https://nextjs.org/)
\[\![TypeScript\](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)\](https://www.typescriptlang.org/)
\[\![Tailwind
CSS\](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwindcss&logoColor=white)\](https://tailwindcss.com/)
\[\![Vercel\](https://img.shields.io/badge/Deployed%20on-Vercel-000?logo=vercel)\](https://vercel.com/)
\![License\](https://img.shields.io/badge/License-Private-lightgrey)

A professional recruitment + admissions website for candidates heading
to the EU. Built with \*\*Next.js (App Router, TS)\*\*,
\*\*Tailwind\*\*, \*\*shadcn/ui\*\*, \*\*Zod\*\*, and \*\*Resend\*\*
email. Deployed on \*\*Vercel\*\* with custom domain (Combell DNS).

\-\--

\## Table of contents

\- \[Features\](#features) - \[Tech stack\](#tech-stack) - \[Project
structure\](#project-structure) - \[Getting
started\](#getting-started) - \[Environment
variables\](#environment-variables) - \[Scripts\](#scripts) - \[Data
model (jobs & programs)\](#data-model-jobs\--programs) - \[Contact &
email delivery\](#contact\--email-delivery) - \[SEO &
assets\](#seo\--assets) - \[Branching workflow\](#branching-workflow) -
\[Deployment (Vercel + Combell
DNS)\](#deployment-vercel\--combell-dns) - \[Common
tasks\](#common-tasks) - \[Troubleshooting\](#troubleshooting) -
\[Roadmap\](#roadmap) - \[License\](#license)

\-\--

\## Features

\- ✅ Modern landing with sector cards, CTAs, and FAQs - ✅
\*\*Work\*\* & \*\*Study\*\* pages with filters and responsive card grid

- ✅ Accessible \*\*Contact\*\* form (country code + phone), Zod
  validation - ✅ Email sending via \*\*Resend\*\* (or SMTP alternative)
- ✅ Built-in \*\*rate limiting\*\* & cooldown (anti-spam) - ✅
  \*\*SEO\*\*: metadata, OpenGraph, Twitter, JSON-LD, favicons/manifest -
  ✅ Polished \*\*Privacy Policy\*\* (sticky ToC, anchors) - ✅ Clean
  mobile nav drawer, no rounded corners (per product spec)

\-\--

\## Tech stack

\- \*\*Next.js 14\*\* (App Router, Route Handlers) - \*\*TypeScript\*\*

- \*\*Tailwind CSS\*\* (+ brand token utilities) - \*\*shadcn/ui\*\*
  (Select, Toast, Drawer) - \*\*Zod\*\* + \*\*react-hook-form\*\* -
  \*\*Resend\*\* for email (DKIM/SPF verified sender domain) -
  \*\*Vercel\*\* hosting (previews per PR/branch)

\-\--

\## Project structure

\`\`\`txt src/ app/ page.tsx \# Home work/page.tsx \# Work abroad
study/page.tsx \# Study in EU contact/page.tsx \# Contact form
privacy/page.tsx \# Privacy policy api/ contact/route.ts \# POST -\>
email with rate limit

components/ forms/contact-form.tsx jobs/JobCard.tsx jobs/JobsGrid.tsx
study/ProgramCard.tsx site/navbar.tsx site/footer.tsx site/container.tsx
ui/... \# shadcn components + use-toast

data/ jobs.ts \# Jobs dataset programs.ts \# Study programs dataset

lib/ site-config.ts \# Name, URL, descriptions, OG image rate-limit.ts
\# In-memory throttle + cooldown sanitize.ts \# stripCRLF, clamp Getting
started bash Copy code \# 1) Clone & install git clone \<repo-url\>
myfuturelinks cd myfuturelinks npm ci

\# 2) Configure environment cp .env.example .env \# Edit values (sender
domain, recipient email, site URL, etc.)

\# 3) Run npm run dev \# http://localhost:3000 Tip: Run npm run
typecheck && npm run build before pushing to catch issues early.

Environment variables Key Example / Notes NEXT_PUBLIC_SITE_URL
https://myfuturelinks.com (set per environment) MAIL_PROVIDER resend
(default). SMTP is possible if you wire it in the API route. MAIL_FROM
\"MyFutureLinks \<contact@myfuturelinks.com\>\" (must be a verified
sender) CONTACT_TO_EMAIL enquiry@myfuturelinks.com (where contact
messages arrive) RESEND_API_KEY
re\_\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*
CONTACT_COOLDOWN_SECONDS 60 (per-email cooldown; also rate-limits per
IP) TURNSTILE\_\* Optional Cloudflare Turnstile (SITE_KEY, SECRET_KEY)

In Vercel's UI, do not include quotes around MAIL_FROM. Locally in .env,
quotes are fine.

Scripts Script What it does npm run dev Next dev server with HMR npm run
build Production build npm run start Start compiled server npm run lint
ESLint npm run typecheck TypeScript checks (no emit)

Data model (jobs & programs) No database needed---just edit the arrays.

ts Copy code // src/data/jobs.ts export type Job = { slug: string;
title: string; location: string; // \"City, Country\" country: string;
// e.g., \"Belgium\" sector: \"Healthcare\" \| \"Hospitality\" \|
\"Logistics\" \| \"Tech & IT\"; languages?: { \[lang: string\]:
\"A2\"\|\"A2+\"\|\"B1\"\|\"B1+\"\|\"B2\"\|\"B2+\"\|\"C1\"\|\"C1+\" };
requirements: string\[\]; applyUrl?: string; }; export const JOBS:
Job\[\] = \[/\* ... \*/\]; ts Copy code // src/data/programs.ts export
type Program = { slug: string; title: string; country: \"Belgium\" \|
\"Netherlands\" \| \"Germany\" \| \"Malta\" \| \"Other\"; level:
\"Bachelor\" \| \"Master\" \| \"Vocational\" \| \"Foundation\";
languages?: { \[lang: string\]: \"B1\"\|\"B2\"\|\"C1\" }; requirements:
string\[\]; applyUrl?: string; }; export const PROGRAMS: Program\[\] =
\[/\* ... \*/\]; Contact & email delivery UI:
components/forms/contact-form.tsx (Zod + RHF + shadcn Select)

API: app/api/contact/route.ts

Validates & sanitizes input

Rate limits per IP + CONTACT_COOLDOWN_SECONDS per email

Sends via Resend (Option B). SMTP can be added if you prefer.

Resend DNS: Verify your domain (SPF + DKIM TXT records) in Combell. When
Resend shows "Verified", emails deliver reliably.

SEO & assets Global metadata in app/layout.tsx

Per-page metadata in each route (/contact, /privacy, ...)

JSON-LD helper: components/seo/jsonld.tsx

Favicons & site.webmanifest in /public

Set NEXT_PUBLIC_SITE_URL correctly per environment for canonicals/OG

Branching workflow vbnet Copy code main → production dev → integration
feature/\<slug\> → short-lived branches off dev Create a feature

bash Copy code git checkout dev git pull git checkout -b
feature/\<slug\> \# \... code \... git add -A git commit -m
\"feat(area): short description\" git push -u origin feature/\<slug\>
Open a PR into dev. When ready to release:

bash Copy code git checkout main git pull git merge \--no-ff dev -m
\"chore: release\" git push Delete branches

bash Copy code git branch -d feature/\<slug\> git push origin \--delete
feature/\<slug\> Deployment (Vercel + Combell DNS) Connect repo to
Vercel (Production branch = main).

Add your domains in Vercel (myfuturelinks.com, www.myfuturelinks.com).

Combell DNS:

Apex A → Vercel IP (e.g., 76.76.21.21 or the newer IP Vercel recommends
in the dashboard)

CNAME www → the \*.vercel-dns.com value Vercel shows

Wait for SSL to provision.

Set Vercel Environment Variables for Production & Preview (see
.env.example).

Common tasks Add a job → edit src/data/jobs.ts

Add a program → edit src/data/programs.ts

Change hero text / sectors / FAQ → app/page.tsx

Change favicon / OG image → replace files in /public

Troubleshooting Email not received? • Resend domain verified (SPF/DKIM
✅) • MAIL_FROM uses that domain • Check Vercel logs for POST
/api/contact

"useSearchParams should be wrapped in suspense" Move the hook to a
client component or wrap with \<Suspense\>.

Vercel shows "DNS change recommended" Update the apex A record to the IP
Vercel suggests; old IP still works, but switching is recommended.

Roadmap Cookie/consent banner + Vercel Analytics

Move rate limit to Upstash Redis

Admin JSON editor for jobs/programs

i18n (Nepali/English) for primary pages

CI (GitHub Actions) for lint/typecheck/build

E2E tests (Playwright) for contact + filters

License Private project --- © MyFutureLinks. All rights reserved.

yaml Copy code

\-\--

\### \`.env.example\`

\`\`\`env \# Public site URL (used for canonical URLs, OpenGraph, etc.)
NEXT_PUBLIC_SITE_URL=https://myfuturelinks.com

\# Mail delivery (Resend) MAIL_PROVIDER=resend MAIL_FROM=\"MyFutureLinks
\<contact@myfuturelinks.com\>\" \# must be a verified sender
CONTACT_TO_EMAIL=enquiry@myfuturelinks.com
RESEND_API_KEY=re\_\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*\*

\# Anti-spam / rate limit CONTACT_COOLDOWN_SECONDS=60

\# Optional Cloudflare Turnstile (enable only if you render the widget)
\# TURNSTILE_SITE_KEY= \# TURNSTILE_SECRET_KEY= If you want this split
into /docs (e.g., docs/DEPLOYMENT.md, docs/DATA_MODEL.md,
docs/CONTRIBUTING.md), say the word and I'll generate them too.
