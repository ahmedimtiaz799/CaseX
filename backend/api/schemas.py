from pydantic import BaseModel

class UploadResponse(BaseModel):
    session_id:str
    file_name:str
    chunk_size:int

class ChatRequest(BaseModel):
    session_id:str
    message:str

class ChatResponse(BaseModel):
    session_id:str
    reply:str
    sources:list[str]

class SessionResponse(BaseModel):
    sessions:list[str]