import os
from typing import List
from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def load_and_split(file_path: str) -> List[Document]:
    """Load a PDF, split into chunks, and return list of Documents."""
    document = PyPDFLoader(file_path).load()

    if not document:
        raise ValueError(f"Could not extract text from PDF: {file_path}")

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=400
    )
    split = text_splitter.split_documents(document)

    if not split:
        raise ValueError("PDF produced no chunks — file may be empty or image-only")

    
    for doc in split:
        doc.metadata["source"] = os.path.basename(file_path)

    return split