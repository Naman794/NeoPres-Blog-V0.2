# RLS verification checklist

## Posts

- [ ] Anonymous user can select published, non-hidden posts.
- [ ] Anonymous user cannot insert/update/delete posts.
- [ ] Editor can insert/update posts.
- [ ] Admin can delete posts.

## Homepage

- [ ] Anonymous user can read enabled homepage sections and items.
- [ ] Admin can create/update/delete homepage sections and items.

## Ad slots

- [ ] Anonymous user can read enabled ad slots only.
- [ ] Admin can create/update/delete ad slots.

## Profiles

- [ ] Admin can update roles in `profiles`.
- [ ] Non-admin cannot change roles.

## Storage

- [ ] Public can read `media` bucket objects.
- [ ] Editor/admin can upload/delete media.
- [ ] Anonymous user cannot upload/delete media.
