"""Per-voter scoring: create voter_scores table, drop vote_score from candidates

Revision ID: 002
Revises: 001
Create Date: 2026-04-14

"""
from typing import Sequence, Union

from alembic import op

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.execute("""
        CREATE TABLE voter_scores (
            id SERIAL PRIMARY KEY,
            candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
            voter TEXT NOT NULL CHECK (voter IN ('jasper', 'micol', 'damia')),
            score INTEGER NOT NULL DEFAULT 0,
            UNIQUE (candidate_id, voter)
        )
    """)
    op.execute("ALTER TABLE candidates DROP COLUMN vote_score")


def downgrade() -> None:
    op.execute("ALTER TABLE candidates ADD COLUMN vote_score INTEGER NOT NULL DEFAULT 0")
    op.execute("DROP TABLE IF EXISTS voter_scores")
