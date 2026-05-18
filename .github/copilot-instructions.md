# D'Icon School Website Instructions

- Use British English in comments and user-facing copy.
- Keep the stack on Next.js 14 App Router with strict TypeScript.
- Build UI with Tailwind CSS and shadcn/ui primitives.
- Use Framer Motion for section entrance animations.
- Use `next/image` for every image. Never use a bare `<img>` tag.
- Use `LazyYouTube` for any public video embed. Do not load YouTube iframes until interaction unless the background video explicitly needs autoplay.
- Respect Supabase RLS: public read access on content, public insert on admissions, admin writes only for protected workflows.
- Never hardcode secrets. Read all keys from environment variables.
- Do not use inline styles. Prefer Tailwind utility classes.
- Use functional components and React hooks throughout.
- Preserve the dark cinematic black, gold, and crimson brand system with Playfair Display, Cormorant Garamond, and Bebas Neue.