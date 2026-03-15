from typing import List
from langchain_core.documents import Document
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

def load_and_split(file_path:str)->List[Document]:
    """Loading the document then splitting it into chunks and then returning the list of documents."""
    document=PyPDFLoader(file_path).load()
    text_splitter=RecursiveCharacterTextSplitter(chunk_size=1000,chunk_overlap=200)
    split=text_splitter.split_documents(document)
    return split