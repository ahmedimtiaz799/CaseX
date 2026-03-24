import os
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.agent.vector_store import init_vector_store
from backend.api.routes import router as api_router

load_dotenv()


@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Initializing vector store...")
    init_vector_store()
    print("Vector store initialized successfully.")
    yield
    print("Shutting down application...")


app = FastAPI(
    title="CaseX",
    description="Api for legal document analysis",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api/v1")


@app.get("/")
async def root():
    """Health check endpoint to verify that the API is running."""
    return {
        "message": "Welcome to the CaseX API! The API is up and running.",
        "version": "1.0.0"
    }

