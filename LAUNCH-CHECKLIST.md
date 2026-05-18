# D'Icon School Launch Checklist

## Platform

- Set `NEXT_PUBLIC_SITE_URL` to the production domain.
- Set `NEXT_PUBLIC_SITE_NAME` if the deployed branding should override the repo default.
- Deploy the app to Vercel and attach `diconschool.com` and the preferred `www` or apex redirect.
- Confirm HTTPS is active and the production build completes with `npm run build`.

## Supabase

- Run [supabase/schema.sql](c:\Users\USER\Diconschool\dicon-school\supabase\schema.sql) on the target Supabase project.
- Seed reference content from [supabase/seed.sql](c:\Users\USER\Diconschool\dicon-school\supabase\seed.sql) if the launch environment needs starter data.
- Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `SUPABASE_SERVICE_ROLE_KEY` in the deployment environment.
- Create at least one admin user in Supabase Auth with `app_metadata.is_admin = true`, then test `/admin/login`.
- Verify RLS still allows public reads and public admission inserts while protecting admin workflows.

## SEO And Metadata

- Check `/robots.txt`, `/sitemap.xml`, and `/manifest.webmanifest` on the production domain.
- Validate the Open Graph and Twitter cards on the deployed domain using the live metadata image routes.
- Submit the production sitemap to Google Search Console and Bing Webmaster Tools.
- Confirm canonical URLs, page titles, and descriptions render correctly for all public routes.

## QA

- Test every public route on desktop and mobile.
- Submit the admission form and the contact form with live Supabase configured.
- Review the admin dashboard sign-in, sign-out, and admission status updates end to end.
- Confirm YouTube embeds, gallery lightbox, and remote images load without CSP or network errors.

## Monitoring

- Verify Vercel Analytics and Speed Insights receive production traffic.
- Review browser console and network logs for CSP, image, or auth-cookie issues.
- Capture a post-launch Lighthouse report for home, movies, and admission.

## Content Operations

- Replace placeholder gallery imagery with final approved assets.
- Add any final movie posters or Supabase-hosted media before launch.
- Review British English copy one more time with the school team before publishing.