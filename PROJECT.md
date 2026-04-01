# BDE MMI Bordeaux — AI Control File

BDE website for BUT MMI Bordeaux students. Events, blog, portfolio, merch, program. Auth via Supabase.

---

## Stack
Next.js 15 (App Router) · Supabase (auth + postgres + storage) · Tailwind CSS 3 (custom design system) · Framer Motion · TypeScript strict

---

## Architecture
```
src/
  app/          # Routes (one folder per page)
  components/
    features/   # Per-feature: admin, blog, events, home, merch, portfolio
    layout/     # Header, Footer, AppShell
    motion/     # ScrollReveal: FadeIn, SlideIn, ScaleReveal, Stagger
    ui/         # Button, Card, Badge, Tag, Input, SectionTitle, ImageUpload
  config/       # nav.ts, site.ts
  lib/supabase/ # client.ts, server.ts, auth.ts (requireAuth)
  lib/utils/    # cn.ts, formatDate.ts
  services/     # blogService, eventService, adminService, merchService, portfolioService
  types/        # event, blog, merch, portfolio, user (barrel: index.ts)
  middleware.ts # Session refresh + /dashboard guard
```

---

## Pages & Key Components

| Route | Notes |
|---|---|
| `/` | Hero, events preview, projects preview, program teaser |
| `/events` | Listing + filters + view toggle — no create/delete UI |
| `/events/new` | Redirects to /admin |
| `/blog` + `/blog/[slug]` | Listing + markdown post |
| `/portfolio` | Gallery — real Supabase data |
| `/merch` | Shop — real Supabase data, no cart |
| `/program` | Hardcoded curriculum, no service |
| `/admin` | Login OR dashboard (same route). Role: admin required for dashboard. CRUD: events/posts/products/projects |

Auth: `/admin` = login page for unauthenticated, dashboard for admin. Middleware only guards `/dashboard`. `requireAuth()` redirects to `/admin`.

---

## Supabase Tables

| Table | RLS |
|---|---|
| `events` | Public read · Authenticated write/update/delete |
| `posts` | Public read (published_at ≤ now) · Authenticated read all · Authenticated write/update/delete |
| `products` | Public read · Authenticated write/update/delete |
| `projects` | Public read · Authenticated write/update/delete |

Storage bucket `uploads` (public): `events/`, `posts/`, `products/`, `projects/`

Admin account: `bdemmibordeaux@gmail.com` — role set via `user_metadata.role = 'admin'`

---

## Admin Panel (`/admin`)

Four tabs: Événements · Articles · Produits · Portfolio

Each tab supports: **create, edit (pre-filled form), delete** (confirm step).
Image fields use `ImageUpload` component (drag & drop → Supabase Storage).

---

## Rules

**Dev:**
- Edit existing files. Never create new ones unless asked.
- No abstractions for one-off use. No speculative code.
- Mock data stays in the service file as fallback (error only, not empty table).
- Tailwind only. Use `cn()` (`@/lib/utils/cn`) for conditional classes.
- Auth route config: `middleware.ts` is the only source of truth.

**AI (STRICT MODE):**
- Only read files explicitly listed in the task or PROJECT.md.
- Ask before reading any other file.
- No new files, comments, or refactors outside task scope.
- Stage only modified files (`git add <file1> <file2>`), never `git add -A`.
- One commit per task.

---

## Current State
- All public pages live with real Supabase data (mock fallback on error).
- Admin panel: full CRUD (create / edit / delete) for events, posts, products, projects.
- Image upload via drag & drop → Supabase Storage on all admin forms.
- No public-facing create/edit/delete UI — admin panel only.

## Priorities
- [ ] Merch: add cart / order system
- [ ] Blog: rich text editor instead of raw Markdown textarea
- [ ] Events: add registration link handling on public cards
