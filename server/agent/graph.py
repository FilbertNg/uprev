"""
LangGraph StateGraph for the UpRev AI Sales Agent.

Compiles a graph with:
  - call_model node  (LLM reasoning + tool binding)
  - tools node       (executes tool calls)
Persists state via AsyncPostgresSaver keyed by thread_id.
"""

from __future__ import annotations

import logging

from langchain_core.messages import SystemMessage
from langchain_openai import ChatOpenAI
from langgraph.graph import END, START, StateGraph
from langgraph.prebuilt import ToolNode

from agent.prompts import SALES_AGENT_SYSTEM_PROMPT
from agent.state import AgentState
from agent.tools import generate_payment_link, get_context, search_addons, search_uprev_packages
from core.config import settings

logger = logging.getLogger(__name__)

# ── LLM Initialisation (OpenRouter) ─────────────────────────────────────────

llm = ChatOpenAI(
    api_key=settings.OPENROUTER_API_KEY,
    base_url="https://openrouter.ai/api/v1",
    model=settings.OPENROUTER_MODEL,
    temperature=0.4,
    default_headers={
        "HTTP-Referer": "https://uprev.id",
        "X-Title": "UpRev AI Sales Agent",
    },
)

# Bind all tools to the model
TOOLS = [search_uprev_packages, search_addons, get_context, generate_payment_link]
llm_with_tools = llm.bind_tools(TOOLS)


# ── Graph Nodes ──────────────────────────────────────────────────────────────

async def call_model(state: AgentState) -> dict:
    """Invoke the LLM with the current message history + system prompt."""
    messages = list(state["messages"])

    # Prepend system prompt if not already present
    if not messages or not isinstance(messages[0], SystemMessage):
        messages.insert(0, SystemMessage(content=SALES_AGENT_SYSTEM_PROMPT))

    response = await llm_with_tools.ainvoke(messages)
    return {"messages": [response]}


def should_continue(state: AgentState) -> str:
    """Route: if the last message has tool_calls, go to tools; else END."""
    last_message = state["messages"][-1]
    if hasattr(last_message, "tool_calls") and last_message.tool_calls:
        return "tools"
    return END


# ── Build the Graph ──────────────────────────────────────────────────────────

def build_graph():
    """Construct the compiled LangGraph StateGraph (without checkpointer).
    The checkpointer is attached at runtime in the /api/chat endpoint.
    """
    tool_node = ToolNode(TOOLS)

    builder = StateGraph(AgentState)
    builder.add_node("call_model", call_model)
    builder.add_node("tools", tool_node)

    builder.add_edge(START, "call_model")
    builder.add_conditional_edges("call_model", should_continue, {"tools": "tools", END: END})
    builder.add_edge("tools", "call_model")

    return builder


graph_builder = build_graph()
