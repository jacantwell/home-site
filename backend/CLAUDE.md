# Backend — CLAUDE.md

Python REST API using FastAPI, managed with uv. Neon PostgreSQL 17 database. See `README.md` for full schema and endpoint specs.

## Commands

```bash
uv sync                                    # install deps
uv run uvicorn app.main:app --reload       # dev server
```

## Architecture

- **FastAPI** as the web framework.
- **asyncpg** or **psycopg[binary]** for database access. Use async where possible.
- **Pydantic** models for request/response validation.
- Entry point: `app/main.py`.
- CORS must be enabled — the frontend runs on a different origin in dev and production.

## Environment Variables

- `DATABASE_URL` — Neon PostgreSQL connection string. Loaded from `.env` file (not committed).

## Database

Neon PostgreSQL 17, already provisioned. Two tables:

**candidates** — id (serial PK), name (text), age (int), phone (text), bio (text), source (text, default "website"), created_at (timestamptz, default now())

**voter_scores** — id (serial PK), candidate_id (FK → candidates.id, cascade delete), voter (text, CHECK IN jasper/micol/damia), score (int, default 0), UNIQUE(candidate_id, voter)

**notes** — id (serial PK), candidate_id (FK → candidates.id, cascade delete), content (text), created_at (timestamptz, default now())

Migrations are managed with Alembic (see `alembic/versions/`).

## API Endpoints

| Method | Path                     | Body                                              | Response                |
|--------|--------------------------|---------------------------------------------------|-------------------------|
| POST   | `/apply`                 | `{ name, age, phone, bio }`                       | created candidate       |
| GET    | `/candidates`            | —                                                 | list of all candidates  |
| POST   | `/candidates`            | `{ name, age, phone, bio, source }`               | created candidate       |
| DELETE  | `/candidates/{id}`       | —                                                 | 204 No Content          |
| POST   | `/candidates/{id}/vote`  | `{ "delta": 1\|-1, "voter": "jasper"\|"micol"\|"damia" }` | updated candidate       |
| GET    | `/candidates/{id}/notes` | —                                                 | list of notes           |
| POST   | `/candidates/{id}/notes` | `{ "content": "..." }`                            | created note            |

`POST /apply` is the same as `POST /candidates` but automatically sets `source = "website"`.

## Style

- Keep it minimal. No ORM — raw SQL queries are fine for this scale.
- No auth on any endpoint. Security is handled by the frontend's secret URL.
