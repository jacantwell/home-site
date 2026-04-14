from datetime import datetime
from typing import Literal

from pydantic import BaseModel


class ApplyRequest(BaseModel):
    name: str
    age: int
    phone: str
    bio: str


class CreateCandidateRequest(ApplyRequest):
    source: str


class VoteRequest(BaseModel):
    delta: Literal[1, -1]
    voter: Literal["jasper", "micol", "damia"]


class CreateNoteRequest(BaseModel):
    content: str


class CandidateResponse(BaseModel):
    id: int
    name: str
    age: int
    phone: str
    bio: str
    source: str
    scores: dict[str, int]
    total_score: int
    created_at: datetime


class NoteResponse(BaseModel):
    id: int
    candidate_id: int
    content: str
    created_at: datetime
