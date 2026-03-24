import os
from typing import List
from langchain_core.documents import Document
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_postgres.vectorstores import PGVector
from langchain_core.vectorstores import VectorStoreRetriever

def init_vector_store()->PGVector:
    """Initialize the vector store and expecting the PGVector object as an output."""
    embeddings=GoogleGenerativeAIEmbeddings(
        model="models/text-embedding-004"
    )
    connection_string=os.getenv("Database_URL")
    collection_name=os.getenv("Collection_Name","CaseX")
    if not connection_string:
        raise ValueError("Database_URL environment is not set.")
    vector_store=PGVector(
        embeddings=embeddings,
        connection=connection_string,
        collection_name=collection_name
    )
    return vector_store

def add_documents(docs:List[Document])->None:
    """Adding Documents to the vector store."""
    vector_store=init_vector_store()
    vector_store.add_documents(docs)
    print(f"Successfully added {len(docs)} chunks to the vector store.")

def get_retriever(k:int=5)->VectorStoreRetriever:
    """Retrieving the first 5 results from the vector store."""
    vector_store=init_vector_store()
    return vector_store.as_retriever(search_kwargs={"k":k})



