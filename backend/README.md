# home-site / backend

Python API serving the frontend. Manages candidates, votes, and notes backed by a Neon PostgreSQL database.

## Tech

- **Python** (managed with **uv**)
- **Neon** PostgreSQL 17 database
- REST API (framework TBD — likely FastAPI)

## Database Schema

### `candidates`

| Column     | Type         | Notes                                      |
| ---------- | ------------ | ------------------------------------------ |
| id         | uuid / serial| primary key                                |
| name       | text         | required                                   |
| age        | integer      | required                                   |
| phone      | text         | required                                   |
| bio        | text         | required                                   |
| source     | text         | "website" for applications, freetext for manual adds (e.g. "Flatmates.com.au") |
| vote_score | integer      | running tally, default 0                   |
| created_at | timestamptz  | default now()                              |

### `notes`

| Column       | Type         | Notes                        |
| ------------ | ------------ | ---------------------------- |
| id           | uuid / serial| primary key                  |
| candidate_id | fk           | references candidates.id     |
| content      | text         | the note body                |
| created_at   | timestamptz  | default now()                |

## API Endpoints

### Public

| Method | Path            | Description              |
| ------ | --------------- | ------------------------ |
| POST   | `/apply`        | Submit an application    |

### Admin (no auth — security by secret URL on the frontend)

| Method | Path                        | Description                        |
| ------ | --------------------------- | ---------------------------------- |
| GET    | `/candidates`               | List all candidates                |
| POST   | `/candidates`               | Manually add a candidate           |
| POST   | `/candidates/:id/vote`      | Vote +1 or -1 (body: `{ delta: 1 }` or `{ delta: -1 }`) |
| GET    | `/candidates/:id/notes`     | Get notes for a candidate          |
| POST   | `/candidates/:id/notes`     | Add a note to a candidate          |

## Development

```bash
# create virtual environment & install deps
uv sync

# run dev server
uv run uvicorn app.main:app --reload
```

## Environment Variables

| Variable       | Description                     |
| -------------- | ------------------------------- |
| `DATABASE_URL` | Neon PostgreSQL connection string |
