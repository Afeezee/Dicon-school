# D'Icon School of Performing Arts

Official website for D'Icon School of Performing Arts, built with Next.js 14 App Router, strict TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Stack

- Next.js 14 App Router
- TypeScript strict mode
- Tailwind CSS
- Framer Motion
- Supabase SSR and Auth
- Radix UI primitives with local shadcn-style wrappers
- Vercel Analytics and Speed Insights

## Routes

- `/` Home
- `/about` Founder profile and career timeline
- `/school` Programmes, reasons, and FAQs
- `/movies` Filmography
- `/alumni` Alumni highlights
- `/gallery` Gallery and lightbox
- `/admission` Public application form
- `/contact` Enquiry form and contact links
- `/admin/login` Admin sign-in
- `/admin` Protected admissions dashboard

## Environment Variables

Copy `.env.example` to `.env.local` for local development.

Required for public and admin Supabase flows:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Recommended for deployment and metadata:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`

Available for future elevated admin workflows:

- `SUPABASE_SERVICE_ROLE_KEY`

The public site falls back to local content when Supabase env vars are missing. The admin dashboard requires live Supabase auth to be useful.

## Local Development

Install dependencies:

```bash
npm install
```

Start the app:

```bash
npm run dev
```

Open `http://localhost:3000`.

## Supabase Setup

Run the schema in your Supabase project:

- [supabase/schema.sql](c:\Users\USER\Diconschool\dicon-school\supabase\schema.sql)

Seed starter data if needed:

- [supabase/seed.sql](c:\Users\USER\Diconschool\dicon-school\supabase\seed.sql)

Create at least one admin user in Supabase Auth with `app_metadata.is_admin = true` before testing `/admin/login`.

## Validation

Type check:

```bash
node .\node_modules\typescript\bin\tsc --noEmit
```

Production build:

```bash
npm run build
```

## Production Hardening

The app already includes:

- CSP and security headers in [next.config.mjs](c:\Users\USER\Diconschool\dicon-school\next.config.mjs)
- Route metadata and canonical handling
- `robots.txt`, `sitemap.xml`, and `manifest.webmanifest`
- Open Graph and Twitter image routes
- Admin route protection in [middleware.ts](c:\Users\USER\Diconschool\dicon-school\middleware.ts)

## Launch

Use the full launch runbook here:

- [LAUNCH-CHECKLIST.md](c:\Users\USER\Diconschool\dicon-school\LAUNCH-CHECKLIST.md)
