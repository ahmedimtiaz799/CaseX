from typing import TypedDict
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.messages import BaseMessage, SystemMessage
from langgraph.graph import StateGraph, START, END
from langchain_core.runnables.history import RunnableWithMessageHistory
from langfuse.langchain import CallbackHandler

from agent.vector_store import get_retriever
from agent.memory import get_chat_history
from core.config import settings


class State(TypedDict):
    messages: list[BaseMessage]
    context: str
    session_id: str
    sources: list[dict]


llm = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash",
    api_key=settings.GEMINI_API_KEY,
    temperature=0
)


def retrieve(state: State) -> dict:
    session_id = state.get("session_id", "")
    retriever = get_retriever(session_id=session_id)
    latest_message = state["messages"][-1]
    docs = retriever.invoke(latest_message.content)

    context = "\n\n".join(
        f"[Source: {doc.metadata.get('source', 'unknown')}, Page: {doc.metadata.get('page', '?')}]\n{doc.page_content}"
        for doc in docs
    )
    sources = [
        {
            "source": doc.metadata.get("source", "unknown"),
            "page": doc.metadata.get("page", None)
        }
        for doc in docs
    ]
    return {"context": context, "sources": sources}


def generate(state: State) -> dict:
    context = state.get("context", "")
    latest_question = state["messages"][-1].content

    langfuse_handler = CallbackHandler()

    system_prompt = (
        """You are CaseX, an experienced legal contract analyst skilled in reviewing and interpreting legal documents, agreements, and contracts.

Your role is to carefully analyze the provided document context and answer the user's question in a clear, natural, and professional legal tone — similar to how a legal advisor would explain a contract to a client.

Follow these rules strictly:

1. Base your answer only on the provided document context. Do not rely on outside knowledge.

2. Do not invent or assume any clauses, terms, or legal interpretations that are not explicitly supported by the document.

3. If the answer cannot be found in the provided context, respond exactly with:
I am unable to find sufficient information in the provided documents to answer this question.

4. Write in a natural, professional legal tone. Your response should feel like a human legal expert explaining the document, not a robotic system.

5. Keep the response concise and focused, ideally within 3 to 4 short paragraphs.

6. Where relevant, refer to specific clauses, sections, or wording from the document to support your explanation.

7. Do NOT use any markdown formatting in your response. No asterisks, no bold, no bullet points, no headers. Write in plain flowing paragraphs only.

This system provides document analysis assistance and does not replace professional legal advice.

Document Context:
{context}

User Question:
{question}"""
    ).format(context=context, question=latest_question)

    full_messages = [SystemMessage(content=system_prompt)] + state["messages"]
    response = llm.invoke(full_messages, config={"callbacks": [langfuse_handler]})
    return {"messages": state["messages"] + [response]}


workflow = StateGraph(State)
workflow.add_node("retrieve", retrieve)
workflow.add_node("generate", generate)
workflow.add_edge(START, "retrieve")
workflow.add_edge("retrieve", "generate")
workflow.add_edge("generate", END)

app = workflow.compile()


def build_graph():
    return RunnableWithMessageHistory(
        app,
        get_chat_history,
        input_messages_key="messages",
    )