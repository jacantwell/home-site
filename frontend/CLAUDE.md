# Frontend — CLAUDE.md

Next.js app (App Router) with TypeScript and shadcn/ui. See `README.md` for full page specs.

## Commands

```bash
npm install          # install deps
npm run dev          # dev server
npm run build        # production build
npm run lint         # lint
```

## Architecture

- **App Router** — use `app/` directory, not `pages/`.
- **shadcn/ui** — use shadcn components via `npx shadcn@latest add <component>`. They install into `components/ui/`. Use these for all UI — buttons, inputs, cards, tables, dialogs, etc.
- **API calls** — the backend is a separate Python service. Use `NEXT_PUBLIC_API_URL` env var as the base URL for all fetch calls. Never hardcode the backend URL.

## Pages

### `/` — Landing Page

Single scrollable page with sections:
1. Hero — "We're looking for 2 housemates"
2. About us — 3 cards (name, bio, interests, photo placeholder)
3. About the house — placeholder section
4. Application form — name (text), age (number), phone (text), bio (textarea). POSTs to `{API_URL}/apply`.

### `/admin/[voter]` — Admin Panel (per-voter)

Dynamic route segment for the voter name (jasper, micol, or damia). Each voter has their own URL and their votes are tracked separately. The page shows:
- Candidate list showing per-voter score breakdown (J: +3 · M: -1 · D: +2 · Total: +4) and source
- +1 / -1 vote buttons per candidate → POST `{API_URL}/candidates/{id}/vote` with `{ "delta": 1|-1, "voter": "<name>" }`
- "Add candidate" form — same fields as application form + a "source" text field. POSTs to `{API_URL}/candidates`.
- Notes section per candidate — display existing notes, text input to add new ones. GET/POST `{API_URL}/candidates/{id}/notes`.

## Style

- Keep it simple and clean. This is a small personal project, not a SaaS product.
- Mobile-friendly but don't over-engineer responsive layouts.
