"""
LangGraph AgentState definition – the scratchpad for customer tracking.
"""

from __future__ import annotations

from typing import Annotated, Literal, Sequence

from langchain_core.messages import BaseMessage
from langgraph.graph.message import add_messages
from typing_extensions import TypedDict


class CustomerScratchpad(TypedDict, total=False):
    """Extracted details about the customer, populated during conversation."""
    name: str | None
    email: str | None
    company_name: str | None
    identified_needs: list[str]
    budget_range: str | None
    recommended_package_id: str | None
    is_ready_to_buy: bool


class AgentState(TypedDict):
    """Complete working state of the LangGraph Sales Agent for a thread."""

    # Conversation messages – `add_messages` appends instead of replacing.
    messages: Annotated[Sequence[BaseMessage], add_messages]

    # Running profile of the customer being served.
    customer_profile: CustomerScratchpad

    # Agent stage tracking for conversation flow control.
    agent_stage: Literal["consulting", "upselling", "checkout"]

    # The selected package name (set when user commits to one).
    selected_package: str | None

    # Add-ons accepted by the user during upselling.
    selected_addons: list[dict]
