import os

import asyncpg
from dotenv import load_dotenv

load_dotenv()

_pool: asyncpg.Pool | None = None


async def init_db() -> None:
    global _pool
    database_url = os.environ["DATABASE_URL"]
    _pool = await asyncpg.create_pool(database_url)


async def close_db() -> None:
    global _pool
    if _pool:
        await _pool.close()
        _pool = None


async def get_pool() -> asyncpg.Pool:
    global _pool
    if _pool is None:
        await init_db()
    return _pool
