"""Initial schema: candidates and notes tables

Revision ID: 001
Revises:
Create Date: 2026-04-14

"""
from typing import Sequence, Union

from alembic import op

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE candidates (
            id SERIAL PRIMARY KEY,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            phone TEXT NOT NULL,
            bio TEXT NOT NULL,
            source TEXT NOT NULL DEFAULT 'website',
            vote_score INTEGER NOT NULL DEFAULT 0,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
    """)
    op.execute("""
        CREATE TABLE notes (
            id SERIAL PRIMARY KEY,
            candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
            content TEXT NOT NULL,
            created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
    """)


def downgrade() -> None:
    op.execute("DROP TABLE IF EXISTS notes")
    op.execute("DROP TABLE IF EXISTS candidates")
