from pydantic import BaseModel


class Source(BaseModel):
    source: str
    page: int | None = None


class SessionItem(BaseModel):
    id: str
    name: str
    created_at: str


class UploadResponse(BaseModel):
    session_id: str
    file_name: str
    chunk_count: int
    message: str


class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChatResponse(BaseModel):
    session_id: str
    reply: str
    sources: list[Source]


class SessionResponse(BaseModel):
    sessions: list[SessionItem]