from typing import List,Dict
from langchain_core.chat_history import InMemoryChatMessageHistory

session_store=Dict={}

def get_chat_history(session_id:str)->InMemoryChatMessageHistory:
    """Retrieving the chat history for a given session ID."""
    if session_id not in session_store:
        session_store[session_id]=InMemoryChatMessageHistory()
    return session_store[session_id]

def session_delete(session_id:str)->None:
    """Deleting the session id from the session store."""
    if session_id in session_store:
        del session_store[session_id]
        print(f"Session {session_id} deleted succesfully")

def get_all_sessions()->List[str]:
    """Getting all the session ids from the session store."""
    return list(session_store.keys())