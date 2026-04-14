# home-site

A website for finding housemates for our new house. We (3 friends) are looking for 2 additional housemates.

## Concept

The site has two parts:

### 1. Public Landing Page (`/`)

A page where potential housemates can:

- Read about us — names, bios, interests, photos
- Learn about the house and what we're looking for
- Apply via a simple form: name, age, phone number, and a short bio

### 2. Private Admin Panel (`/admin/<secret>`)

Accessible only via a secret URL path. This is where the three of us can:

- View all applications submitted through the site
- Manually add candidates from external sources (same fields as the application form)
- Vote on candidates with simple +1 / -1 buttons (not tied to individual users — just a running tally)
- Leave shared notes on each candidate

## Tech Stack

| Layer    | Tech                              |
| -------- | --------------------------------- |
| Frontend | Next.js, React, TypeScript, shadcn/ui |
| Backend  | Python (managed with uv)          |
| Database | Neon (PostgreSQL 17)              |
| Deploy   | Vercel (via GitHub Actions)       |

## Project Structure

```
home-site/
├── frontend/   # Next.js app
├── backend/    # Python API
└── README.md
```
