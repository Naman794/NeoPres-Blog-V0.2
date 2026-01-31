# Deployment

## Vercel checklist

1. Add the following environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (canonical base URL)
2. Ensure the Supabase project has the schema + RLS from `db/schema.sql`.
3. Enable the `media` bucket and confirm storage policies are applied.
4. Deploy.

## Notes

- Public site reads use the anon key and rely on RLS for safety.
- Admin CMS uses Supabase Auth and role checks; first admin role is set manually in `profiles`.
- Image uploads are compressed client-side before storage.
