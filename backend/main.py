"""
DreamLab Backend - 梦的解析心理学学习平台
FastAPI app with SQLite + Mimo AI integration.
"""
from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from .models import Base
from .routes import users, courses, dreams, reflect, spirited, assessments


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create tables on startup, clean up on shutdown."""
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield
    await engine.dispose()


app = FastAPI(
    title="DreamLab API",
    description="梦的解析心理学学习平台 - AI驱动的梦境分析与心理学课程",
    version="1.0.0",
    lifespan=lifespan,
)

# CORS - allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(users.router)
app.include_router(courses.router)
app.include_router(dreams.router)
app.include_router(reflect.router)
app.include_router(spirited.router)
app.include_router(assessments.router)


@app.get("/api/health", tags=["health"])
async def health_check():
    """Health check endpoint."""
    return {"status": "ok", "service": "DreamLab API", "version": "1.0.0"}


# Run with: uvicorn backend.main:app --host 0.0.0.0 --port 8002
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8002, reload=True)
