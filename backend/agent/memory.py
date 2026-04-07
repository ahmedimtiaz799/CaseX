from typing import Dict
from langchain_core.chat_history import InMemoryChatMessageHistory

session_store: Dict[str, InMemoryChatMessageHistory] = {}

def get_chat_history(session_id: str) -> InMemoryChatMessageHistory:
    """Retrieve or create chat history for a given session ID."""
    if session_id not in session_store:
        session_store[session_id] = InMemoryChatMessageHistory()
    return session_store[session_id]

def session_delete(session_id: str) -> None:
    """Delete a session from the in-memory store."""
    if session_id in session_store:
        del session_store[session_id]
        print(f"Session {session_id} deleted successfully")

def get_all_sessions() -> list[str]:
    """Return all active in-memory session IDs."""
    return list(session_store.keys())