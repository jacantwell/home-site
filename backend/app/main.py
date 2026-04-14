import json
import os
from contextlib import asynccontextmanager

from fastapi import FastAPI, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware

from app.db import close_db, get_pool, init_db
from app.models import (
    ApplyRequest,
    CandidateResponse,
    CreateCandidateRequest,
    CreateNoteRequest,
    NoteResponse,
    VoteRequest,
)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await init_db()
    yield
    await close_db()


app = FastAPI(lifespan=lifespan)

allowed_origins = os.environ.get("ALLOWED_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["*"],
    allow_headers=["*"],
)


async def _fetch_candidate_with_scores(candidate_id: int) -> dict | None:
    pool = await get_pool()
    row = await pool.fetchrow(
        """
        SELECT c.*,
            COALESCE(jsonb_object_agg(vs.voter, vs.score)
                FILTER (WHERE vs.voter IS NOT NULL), '{}') AS scores,
            COALESCE(SUM(vs.score), 0) AS total_score
        FROM candidates c
        LEFT JOIN voter_scores vs ON vs.candidate_id = c.id
        WHERE c.id = $1
        GROUP BY c.id
        """,
        candidate_id,
    )
    if row is None:
        return None
    result = dict(row)
    if isinstance(result["scores"], str):
        result["scores"] = json.loads(result["scores"])
    result["total_score"] = int(result["total_score"])
    return result


async def _fetch_all_candidates_with_scores() -> list[dict]:
    pool = await get_pool()
    rows = await pool.fetch(
        """
        SELECT c.*,
            COALESCE(jsonb_object_agg(vs.voter, vs.score)
                FILTER (WHERE vs.voter IS NOT NULL), '{}') AS scores,
            COALESCE(SUM(vs.score), 0) AS total_score
        FROM candidates c
        LEFT JOIN voter_scores vs ON vs.candidate_id = c.id
        GROUP BY c.id
        ORDER BY c.created_at DESC
        """
    )
    results = []
    for r in rows:
        d = dict(r)
        if isinstance(d["scores"], str):
            d["scores"] = json.loads(d["scores"])
        d["total_score"] = int(d["total_score"])
        results.append(d)
    return results


async def _create_candidate(
    name: str, age: int, phone: str, bio: str, source: str
) -> dict:
    pool = await get_pool()
    row = await pool.fetchrow(
        """
        INSERT INTO candidates (name, age, phone, bio, source)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        """,
        name,
        age,
        phone,
        bio,
        source,
    )
    result = dict(row)
    result["scores"] = {}
    result["total_score"] = 0
    return result


@app.post("/apply", response_model=CandidateResponse)
async def apply(body: ApplyRequest):
    candidate = await _create_candidate(
        body.name, body.age, body.phone, body.bio, "website"
    )
    return candidate


@app.get("/candidates", response_model=list[CandidateResponse])
async def list_candidates():
    return await _fetch_all_candidates_with_scores()


@app.post("/candidates", response_model=CandidateResponse)
async def create_candidate(body: CreateCandidateRequest):
    candidate = await _create_candidate(
        body.name, body.age, body.phone, body.bio, body.source
    )
    return candidate


@app.post("/candidates/{candidate_id}/vote", response_model=CandidateResponse)
async def vote(candidate_id: int, body: VoteRequest):
    pool = await get_pool()
    exists = await pool.fetchval(
        "SELECT id FROM candidates WHERE id = $1", candidate_id
    )
    if exists is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    await pool.execute(
        """
        INSERT INTO voter_scores (candidate_id, voter, score)
        VALUES ($1, $2, $3)
        ON CONFLICT (candidate_id, voter)
        DO UPDATE SET score = voter_scores.score + EXCLUDED.score
        """,
        candidate_id,
        body.voter,
        body.delta,
    )
    candidate = await _fetch_candidate_with_scores(candidate_id)
    return candidate


@app.delete("/candidates/{candidate_id}", status_code=204)
async def delete_candidate(candidate_id: int):
    pool = await get_pool()
    result = await pool.execute(
        "DELETE FROM candidates WHERE id = $1", candidate_id
    )
    if result == "DELETE 0":
        raise HTTPException(status_code=404, detail="Candidate not found")
    return Response(status_code=204)


@app.get("/candidates/{candidate_id}/notes", response_model=list[NoteResponse])
async def get_notes(candidate_id: int):
    pool = await get_pool()
    rows = await pool.fetch(
        "SELECT * FROM notes WHERE candidate_id = $1 ORDER BY created_at ASC",
        candidate_id,
    )
    return [dict(r) for r in rows]


@app.post("/candidates/{candidate_id}/notes", response_model=NoteResponse)
async def create_note(candidate_id: int, body: CreateNoteRequest):
    pool = await get_pool()
    exists = await pool.fetchval(
        "SELECT id FROM candidates WHERE id = $1", candidate_id
    )
    if exists is None:
        raise HTTPException(status_code=404, detail="Candidate not found")
    row = await pool.fetchrow(
        """
        INSERT INTO notes (candidate_id, content)
        VALUES ($1, $2)
        RETURNING *
        """,
        candidate_id,
        body.content,
    )
    return dict(row)
