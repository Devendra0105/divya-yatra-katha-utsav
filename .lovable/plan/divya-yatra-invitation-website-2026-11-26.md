# Divya Yatra invitation website

## Build
- Replace the template home with a polished static Hindi pilgrimage invitation using the requested lotus-mandala artwork and a tap-to-open introduction.
- Create seven connected pages: personalized invitation, Katha, destinations, travel and accommodation, chief guests, distinguished guests, and instructions/contacts/video gallery.
- Add shareable `/invite?to=GuestName` personalization and a separate local text-list utility that prints invitation links without storing names.
- Keep event copy in the six requested compact data modules; reuse destination detail presentation and mark missing guest/video/address material as unavailable rather than inventing it.
- Use the supplied brochure as the factual source until the user resolves differences with the typed update.

## Implementation
- Preserve TanStack Start and its file-based router; keep all functionality client-side and static, with no backend, tracking, forms, or third-party API calls.
- Build a small shared navigation, opening interaction, reusable destination detail view, responsive layout, restrained motion, and reduced-motion support.
- Use project design tokens and the requested maroon, antique-gold, ivory, and sandstone palette; add page-specific metadata for every content route.
- Use supplied brochure photos for destination imagery and store the requested mandala background through the project asset workflow.

## Verification
- Run existing route tests, add focused tests for safe invite-name handling and generated links, check preview/build diagnostics, and exercise the invitation and destination interactions in the browser.