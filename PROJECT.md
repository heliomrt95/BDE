# BDE MMI Bordeaux — AI Control File

BDE website for BUT MMI Bordeaux students. Events, blog, portfolio, merch, program. Auth via Supabase.

---

## Stack
Next.js 15 (App Router) · Supabase (auth + postgres) · Tailwind CSS 3 (custom design system) · Framer Motion · TypeScript strict

---

## Architecture
```
src/
  app/          # Routes (one folder per page)
  components/
    features/   # Per-feature: admin, auth, blog, events, home, merch, portfolio
    layout/     # Header, Footer, AppShell
    motion/     # ScrollReveal: FadeIn, SlideIn, ScaleReveal, Stagger
    ui/         # Button, Card, Badge, Tag, Input, SectionTitle
  config/       # nav.ts, site.ts
  hooks/        # useAuth, useEventFilters
  lib/supabase/ # client.ts, server.ts, auth.ts (requireAuth, requireRole)
  lib/utils/    # cn.ts, formatDate.ts
  services/     # blogService, eventService, eventService.client, adminService, merchService, portfolioService
  types/        # event, blog, merch, portfolio, user (barrel: index.ts)
  middleware.ts # Auth guard + session refresh
```

---

## Pages & Key Components

| Route | Notes |
|---|---|
| `/` | Hero, events preview, projects preview, program teaser |
| `/events` | Listing + calendar + filters |
| `/events/new` | Create form — auth required |
| `/blog` + `/blog/[slug]` | Listing + markdown post |
| `/portfolio` | Gallery — mock data |
| `/merch` | Shop — mock data, no cart |
| `/program` | Hardcoded curriculum, no service |
| `/dashboard` | Auth required |
| `/admin` | Role: admin — events/posts/products panels |
| `/(auth)/login` `/(auth)/signup` | Auth forms |

Auth: middleware guards `/dashboard`, `/admin`. `requireAuth()` / `requireRole('admin')` for SSR. `useAuth` for client state.

---

## Rules

**Dev:**
- Edit existing files. Never create new ones unless asked.
- No abstractions for one-off use. No speculative code.
- Mock data stays in the service file. No separate fixtures.
- Tailwind only. Use `cn()` (`@/lib/utils/cn`) for conditional classes.
- Auth route config: `middleware.ts` is the only source of truth.

**AI:**
- Do not explore the codebase. Only read files mentioned in the task.
- No new files, comments, or refactors outside task scope.
- Keep diffs minimal.

---

## Current State
- All public pages functional. Auth working (SSR).
- Events + Blog: real Supabase data with mock fallback.
- Portfolio + Merch: mock data only (no Supabase tables yet).
- Admin: events/posts CRUD works. Products panel broken — `products` table missing in Supabase.

## Priorities
- [ ] `supabase/products.sql` — unblock admin product CRUD
- [ ] Connect portfolio + merch to Supabase
- [ ] Extract duplicated hero markup into shared component
