# home-site

Housemate finder site. 3 friends looking for 2 housemates. Two parts: public landing page + private admin panel.

## Project Structure

- `/frontend` — Next.js app (App Router, TypeScript, shadcn/ui)
- `/backend` — Python API (FastAPI, uv, Neon PostgreSQL 17)

Frontend and backend are independent — each has its own README.md with full specs. Read the relevant README before working in either directory.

## Key Design Decisions

- **No auth.** The admin panel uses per-voter URLs (`/admin/jasper`, `/admin/micol`, `/admin/damia`), not a login system.
- **No image upload.** Deliberately excluded for now.
- **Per-voter scoring.** Each of the 3 housemates (jasper, micol, damia) has their own +1/-1 score per candidate, displayed as an inline breakdown plus total.
- **Notes are shared.** One note thread per candidate, no per-user separation.
- **Candidates come from two sources:** website applications (source = "website") and manual admin adds (source = freetext like "Flatmates.com.au").

## Development

Frontend and backend run independently. See each directory's README for commands.

## Deployment

- Frontend deploys to Vercel via GitHub Actions.
- Database is Neon (PostgreSQL 17), already provisioned.
