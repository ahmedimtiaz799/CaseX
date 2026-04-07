import os
import shutil
import tempfile
import uuid
from typing import Annotated

from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from langchain_core.messages import HumanMessage

from core.config import settings
from core.auth import verify_supabase_jwt, supabase
from api.schemas import UploadResponse, ChatRequest, ChatResponse, SessionResponse, Source
from agent.document_loader import load_and_split
from agent.vector_store import add_documents
from agent.graph import build_graph
from agent.memory import get_all_sessions, session_delete

router = APIRouter()
agent = build_graph()


@router.post("/upload", response_model=UploadResponse)
async def upload_document(
    file: Annotated[UploadFile, File(...)],
    user: dict = Depends(verify_supabase_jwt)
):
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

            session_id = str(uuid.uuid4())

            for chunk in chunks:
                chunk.metadata["source"] = file.filename
                chunk.metadata["session_id"] = session_id

            add_documents(chunks)

            supabase.table("chat_sessions").insert({
                "id": session_id,
                "user_id": user["id"],
                "name": file.filename,
            }).execute()

            return UploadResponse(
                session_id=session_id,
                file_name=file.filename,
                chunk_count=len(chunks),
                message=f"Successfully processed {file.filename}"
            )

        finally:
            if os.path.exists(tmp_path):
                os.remove(tmp_path)

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the file: {str(e)}"
        )


@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatRequest,
    user: dict = Depends(verify_supabase_jwt)
):
    try:
        inputs = {
            "messages": [HumanMessage(content=request.message)],
            "session_id": request.session_id
        }
        config = {"configurable": {"session_id": request.session_id}}
        result = agent.invoke(inputs, config=config)

        ai_message = result["messages"][-1].content

        raw_sources = result.get("sources", [])
        sources = [
            Source(
                source=s.get("source", "unknown"),
                page=s.get("page", None)
            )
            for s in raw_sources
        ]

        supabase.table("chat_messages").insert([
            {
                "session_id": request.session_id,
                "role": "user",
                "content": request.message,
            },
            {
                "session_id": request.session_id,
                "role": "assistant",
                "content": ai_message,
                "sources": [s.model_dump() for s in sources],
            }
        ]).execute()

        return ChatResponse(
            session_id=request.session_id,
            reply=ai_message,
            sources=sources
        )

    except HTTPException:
        raise
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while processing the chat request: {str(e)}"
        )


@router.get("/sessions", response_model=SessionResponse)
async def list_sessions(user: dict = Depends(verify_supabase_jwt)):
    try:
        response = supabase.table("chat_sessions")\
            .select("id, name, created_at")\
            .eq("user_id", user["id"])\
            .order("created_at", desc=True)\
            .execute()
        return SessionResponse(sessions=response.data)
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving sessions: {str(e)}"
        )


@router.get("/sessions/{session_id}/messages")
async def get_messages(
    session_id: str,
    user: dict = Depends(verify_supabase_jwt)
):
    try:
        response = supabase.table("chat_messages")\
            .select("*")\
            .eq("session_id", session_id)\
            .order("created_at", desc=False)\
            .execute()
        return {"messages": response.data}
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while retrieving messages: {str(e)}"
        )


@router.delete("/sessions/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_session(
    session_id: str,
    user: dict = Depends(verify_supabase_jwt)
):
    try:
        session_delete(session_id)

        supabase.table("chat_sessions")\
            .delete()\
            .eq("id", session_id)\
            .eq("user_id", user["id"])\
            .execute()

        return None
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An error occurred while deleting the session: {str(e)}"
        )