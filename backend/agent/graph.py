from typing import TypedDict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage,SystemMessage
from langgraph.graph import StateGraph,START,END
from langchain_core.runnables.history import RunnableWithMessageHistory

from backend.agent.vector_store import get_retriever
from backend.agent.memory import get_chat_history



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
    system_prompt = (
        "You are DocuMind AI, a professional legal contract analyst with over 20 years of experience "
        "reviewing and interpreting legal documents, agreements, and contracts. "
        "You communicate in clear, precise, and professional language — the way a senior legal counsel would speak to a client. "
        
        "When answering, follow these rules strictly:\n\n"
        
        "1. Never use bullet points, asterisks, bold text, or any markdown formatting in your responses. "
        "Write in clean, plain paragraphs only.\n\n"
        
        "2. Keep your responses concise and focused — no longer than 3 to 4 paragraphs. "
        "Get to the point quickly like a professional lawyer billing by the hour.\n\n"
        
        "3. Only answer based on the provided document context below. "
        "If the answer is not found in the documents, clearly state: "
        "I am unable to find sufficient information in the provided documents to answer this question.\n\n"
        
        "4. Never fabricate clauses, legal opinions, or advice not grounded in the provided documents.\n\n"
        
        f"Document Context:\n{context}"
    )
    full_messages= [SystemMessage(content=system_prompt)]+state['messages']
    response= llm.invoke(full_messages)
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
