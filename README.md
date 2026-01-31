# NeoPress Blog

A clean, light-only anime + gaming blog built with Next.js (App Router), Tailwind, and Supabase. It includes a public site, SEO routes, and an admin CMS for content, homepage, and ad management.

## Tech Stack

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Supabase** (Auth, Postgres, Storage)
- **browser-image-compression** (client-side image compression)

## Features

- Public site with two-column magazine layout
- Articles list + article detail with rich content rendering
- SEO: sitemap, robots, RSS feed, canonical metadata
- Admin CMS with role-based access (admin/editor)
- Media upload with client-side compression
- Homepage modules (hero + trending)
- Ad slot management

## Local Setup

### 1) Install dependencies

```bash
npm install
```

### 2) Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SITE_URL` (e.g., `https://your-domain.com`)

### 3) Supabase setup (DB + RLS + Storage)

#### Create the project

1. Go to the Supabase dashboard and create a new project.
2. Note the **Project URL** and **API keys** from **Project Settings → API**.

#### Find credentials

- **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
- **Anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Service role key** → `SUPABASE_SERVICE_ROLE_KEY`

> Keep the service role key **server-only**. Never expose it in client bundles.

#### Apply schema + RLS

1. Open the Supabase SQL editor.
2. Run `db/schema.sql`.
3. Verify policies with `docs/RLS_CHECKLIST.md`.

#### Storage setup

- The SQL file creates a `media` bucket and policies.
- Images are stored at `posts/{postId}/...`.

### 4) Run the app

```bash
npm run dev
```

App will be available at `http://localhost:3000`.

## Admin Access

### URL

`/admin/login`

### Credentials

**No credentials are hardcoded in this project.**

Use Supabase Auth to create an account (email + password) and then assign a role in the `profiles` table:

- **Admin**: full access (posts, homepage, ads, roles)
- **Editor**: content + homepage access (no ads)

The first admin role must be assigned manually in the `profiles` table after user signup. See `docs/SUPABASE_SETUP.md`.

## Content Model

Posts are stored in the `posts` table with:

- `status`: `draft`, `published`, `archived`
- `published_at`: used for public visibility
- `is_hidden`: hides from homepage
- `content`: JSON blocks rendered by `RichContentRenderer`

Homepage sections are controlled by:

- `homepage_sections`
- `homepage_items`

Ad slots are stored in `ad_slots` and only enabled slots render publicly.

## Image Uploads

- Images are compressed client-side before upload.
- Cover target: max width 1600px, ~0.75 quality, ~400KB if possible.
- Inline target: max width 1400px, ~0.75 quality.

Storage path convention: `posts/{postId}/...`

## SEO Endpoints

- `GET /sitemap.xml`
- `GET /robots.txt`
- `GET /rss.xml`

These are generated from published posts only.

## Deployment

See `docs/DEPLOYMENT.md` for Vercel deployment steps and environment configuration.
