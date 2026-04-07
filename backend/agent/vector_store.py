from typing import List
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_postgres.vectorstores import PGVector
from langchain_core.vectorstores import VectorStoreRetriever
from core.config import settings

_vector_store: PGVector | None = None

def init_vector_store() -> PGVector:
    global _vector_store
    if _vector_store is not None:
        return _vector_store

    embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

    _vector_store = PGVector(
        embeddings=embeddings,
        connection=settings.DATABASE_URL,
        collection_name=settings.COLLECTION_NAME
    )
    return _vector_store

def add_documents(docs: List[Document]) -> None:
    vector_store = init_vector_store()
    vector_store.add_documents(docs)
    print(f"Successfully added {len(docs)} chunks to the vector store.")

def get_retriever(session_id: str, k: int = 3) -> VectorStoreRetriever:
    vector_store = init_vector_store()
    return vector_store.as_retriever(
        search_kwargs={
            "k": k,
            "filter": {"session_id": session_id}
        }
    )