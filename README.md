# Md Muntasir Mahmud — Portfolio

Personal portfolio and content-management dashboard built with **Next.js 16 (App Router)**, **MongoDB/Mongoose**, **Tailwind CSS 4 + daisyUI**, and **Framer Motion**.

- Public site: Home, About, Projects, Project details, Contact.
- Admin dashboard at `/admin`: edit every section, manage projects/skills, moderate testimonials, change credentials.

## Getting started

```bash
npm install
cp .env.example .env   # then fill in the values
npm run dev            # http://localhost:3000
```

| Script          | What it does              |
| --------------- | ------------------------- |
| `npm run dev`   | Start the dev server      |
| `npm run build` | Production build          |
| `npm start`     | Serve the production build |
| `npm run lint`  | ESLint                    |

See [`.env.example`](.env.example) for every environment variable. The build connects to MongoDB to pre-render pages, so `MONGO_URI` must be reachable at build time.

## How it fits together

```
src/
├── app/
│   ├── (public)/        Public pages. layout.js fetches portfolio data on the server
│   ├── admin/           Login, password reset, dashboard (client-side editors)
│   ├── api/             Route handlers (auth, portfolio, reviews, upload)
│   ├── sitemap.js, robots.js, not-found.js, error.js
├── components/
│   ├── providers/       PortfolioProvider (public data), AdminProvider, ThemeProvider
│   ├── sections/        Page sections (Hero, Skills, …)
│   ├── admin/           Admin form components + useSectionDraft hook
│   └── ui/              Shared UI (Button, RemoteImage, cards, …)
├── lib/                 db, auth/session, cached data access, rate limiting, helpers
├── models/              Mongoose schemas
└── proxy.js             Redirects unauthenticated users away from /admin/dashboard
```

**Rendering and caching.** Public pages are rendered on the server and cached (ISR, 1 hour). Data comes from `lib/portfolio.js` through `unstable_cache`. When the admin saves a section, the API calls `revalidateTag` so the change appears on the next page view.

**Auth.** Admin login sets an `httpOnly`, `SameSite=Strict` session cookie (24 h). `proxy.js` guards the dashboard routes, and every mutating API route checks the session with `verifyAuth`.

**Abuse protection.**
- Login, password reset, review submission and anonymous uploads are rate limited. The limiter is in-memory, so it's per server instance; for strict limits, swap in Redis/Upstash.
- New reviews are hidden until approved in the dashboard.
- Anonymous uploads accept only images up to 2 MB.

**Images.** `RemoteImage` wraps `next/image`. Images on Cloudinary and ImgBB are optimized; other hosts are passed through unoptimized. Add hosts in `src/lib/images.mjs`.

## Deploying

Deploy on Vercel (or any Node host). Set all variables from `.env.example`, including `NEXT_PUBLIC_SITE_URL` with your real domain.
