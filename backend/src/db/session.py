import asyncpg
from fastapi import Request
from src.core.config import settings

class Database:
    def __init__(self):
        self.pool = None

    async def connect(self):
        if self.pool is None:
            self.pool = await asyncpg.create_pool(
                user=settings.POSTGRES_USER,
                password=settings.POSTGRES_PASSWORD,
                database=settings.POSTGRES_DB,
                host=settings.POSTGRES_SERVER,
                port=settings.POSTGRES_PORT,
                min_size=1,
                max_size=10
            )

    async def disconnect(self):
        if self.pool:
            await self.pool.close()

db = Database()

# Dependency for FastAPI routes
async def get_db_pool() -> asyncpg.Pool: # type: ignore
    if db.pool is None:
        await db.connect()
    assert db.pool is not None
    return db.pool

async def get_db_connection():
    pool = await get_db_pool()
    async with pool.acquire() as connection:
        yield connection
