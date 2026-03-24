from typing import TypedDict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage,SystemMessage
from langgraph.graph import StateGraph,START,END
from langchain_core.runnables.history import RunnableWithMessageHistory

from backend.agent.vector_store import get_retriever
from backend.agent.memory import get_chat_history
from langfuse.langchain import CallbackHandler
from backend.core.config import settings

class State(TypedDict):
    messages:list[BaseMessage]
    context:str
    session_id:str


def retrieve(state:State)->dict:
    """Retrieve relevant information from the vector store based on the user's query"""
    retriever=get_retriever()
    latest_message=state['messages'][-1]
    docs=retriever.invoke(latest_message.content)
    context="\n\n".join(doc.page_content for doc in docs)
    return {"context":context}

def generate(state:State)->dict:
    """AI will generate a response based on the retrieved information and the user's query"""
    llm=ChatGoogleGenerativeAI(
        model="gemini-2.0-flash",
        temperature=0
    )
    context=state.get("context","")

    langfuse_handler=CallbackHandler(
secret_key=settings.LANGFUSE_SECRET_KEY,
        public_key=settings.LANGFUSE_PUBLIC_KEY,
        host=settings.LANGFUSE_HOST,
        session_id=state.get("session_id", "unknown-session")
    )
    system_prompt = (
        """You are CaseX, an experienced legal contract analyst skilled in reviewing and interpreting legal documents, agreements, and contracts.

Your role is to carefully analyze the provided document context and answer the user’s question in a clear, natural, and professional legal tone — similar to how a legal advisor would explain a contract to a client.

Follow these rules strictly:

1. Base your answer only on the provided document context. Do not rely on outside knowledge.

2. Do not invent or assume any clauses, terms, or legal interpretations that are not explicitly supported by the document.

3. If the answer cannot be found in the provided context, respond exactly with:
I am unable to find sufficient information in the provided documents to answer this question.

4. Write in a natural, professional legal tone. Your response should feel like a human legal expert explaining the document, not a robotic system.

5. Keep the response concise and focused, ideally within 3 to 4 short paragraphs.

6. Where relevant, refer to specific clauses, sections, or wording from the document to support your explanation.

This system provides document analysis assistance and does not replace professional legal advice.

Document Context:
{context}

User Question:
{question}"""
    )
    full_messages= [SystemMessage(content=system_prompt)]+state['messages']
    response= llm.invoke(full_messages,
                         config={"callbacks":[langfuse_handler]}
                         )
    result= state['messages']+[response]
    return {"messages":result}
    
workflow=StateGraph(State)
workflow.add_node("retrieve",retrieve)
workflow.add_node("generate",generate)
workflow.add_edge(START,"retrieve")
workflow.add_edge("retrieve","generate")
workflow.add_edge("generate",END)

app=workflow.compile()


def build_graph():
    """Add memory to the agent so it remebers the conversation history and return the final agent to be used by the API."""
    app_memory=RunnableWithMessageHistory(
        app,
        get_chat_history,
        input_messages_key="messages",
        history_messages_key="messages"
    )
    return app_memory