# Supabase setup

## Environment variables

Copy `.env.local.example` to `.env.local` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

## Database schema

1. Open the Supabase SQL editor.
2. Run `db/schema.sql` to create tables, triggers, RLS, and the `media` bucket.

## RLS expectations

- Public can only read posts where `status = 'published'` and `is_hidden = false`.
- Editors/admins can insert/update posts.
- Admins can manage homepage sections, homepage items, ad slots, and profiles.

## Storage

- Bucket: `media`
- Path convention: `posts/{postId}/cover.jpg`
- Public read enabled; write access is restricted to editors/admins via RLS policies.

## Client usage

- Browser client: `lib/supabaseClient.ts`
- Server client: `lib/supabaseServer.ts`

## Quick check

- With env vars set, the app should build.
- Anonymous reads of published posts should succeed.
- Writes without editor/admin role should be rejected by RLS.
