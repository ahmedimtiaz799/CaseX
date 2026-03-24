import os
import shutil
import tempfile
import uuid
from typing import Annotated

from fastapi import APIRouter, UploadFile, File, HTTPException, status
from langchain_core.messages import HumanMessage

from backend.core.config import settings
from backend.api.schemas import UploadResponse, ChatRequest, ChatResponse, SessionResponse
from backend.agent.document_loader import load_and_split
from backend.agent.vector_store import add_documents
from backend.agent.graph import build_graph
from backend.agent.memory import get_all_sessions, session_delete

router = APIRouter()
agent = build_graph()


@router.post("/upload", response_model=UploadResponse)
async def upload_document(file: Annotated[UploadFile, File(...)]):
    if file.content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only PDF files are allowed."
        )

    max_bytes = settings.MAX_FILE_SIZE_MB * 1024 * 1024
    if file.size and file.size > max_bytes:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"File size exceeds the maximum limit of {settings.MAX_FILE_SIZE_MB}MB."
        )

    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
            shutil.copyfileobj(file.file, tmp)
            tmp_path = tmp.name

        try:
            chunks = load_and_split(tmp_path)
            add_documents(chunks)

            session_id = str(uuid.uuid4())

            return UploadResponse(
                session_id=session_id,
                file_name=file.filename,
                chunk_size=len(chunks)
            )

        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the file: {str(e)}"
        )


@router.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        inputs = {
            "messages": [HumanMessage(content=request.message)],
            "session_id": request.session_id
        }

        config = {"configurable": {"session_id": request.session_id}}

        result = agent.invoke(inputs, config=config)

        ai_message = result["messages"][-1].content

        context = result.get("context", "")
        sources = context.split("\n\n") if context.strip() else []

        return ChatResponse(
            session_id=request.session_id,
            reply=ai_message,
            sources=sources
        )

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the chat request: {str(e)}"
        )


@router.get("/sessions", response_model=SessionResponse)
async def list_sessions():
    try:
        sessions = get_all_sessions()
        return SessionResponse(sessions=sessions)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving sessions: {str(e)}"
        )


@router.delete("/sessions/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_session(session_id: str):
    try:
        session_delete(session_id)
        return None
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the session: {str(e)}"
        )
