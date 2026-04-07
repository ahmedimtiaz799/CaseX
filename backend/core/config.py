from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    
    GEMINI_API_KEY: str
    DATABASE_URL: str
    SUPABASE_URL: str
    SUPABASE_SERVICE_ROLE_KEY: str
    LANGFUSE_PUBLIC_KEY: str
    LANGFUSE_SECRET_KEY: str

    
    COLLECTION_NAME: str = "casex_vectors"
    MAX_FILE_SIZE_MB: int = 10
    LANGFUSE_HOST: str = "https://cloud.langfuse.com"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()