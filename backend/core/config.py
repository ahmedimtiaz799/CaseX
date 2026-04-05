import os
from dotenv import load_dotenv
from dataclasses import dataclass

load_dotenv()

@dataclass
class Settings:
    GEMINI_API_KEY: str | None = os.getenv("GEMINI_API_KEY")
    DATABASE_URL: str | None = os.getenv("DATABASE_URL")
    COLLECTION_NAME: str | None = os.getenv("COLLECTION_NAME", "casex_vectors")
    MAX_FILE_SIZE_MB: int = int(os.getenv("MAX_FILE_SIZE_MB", 10))
    LANGFUSE_SECRET_KEY: str | None = os.getenv("LANGFUSE_SECRET_KEY")
    LANGFUSE_PUBLIC_KEY: str | None = os.getenv("LANGFUSE_PUBLIC_KEY")
    LANGFUSE_HOST: str | None = os.getenv("LANGFUSE_HOST", "https://cloud.langfuse.com")
    SUPABASE_URL: str | None = os.getenv("SUPABASE_URL")
    SUPABASE_SERVICE_ROLE_KEY: str | None = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

settings = Settings()