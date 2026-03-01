import { useReducer, useEffect, useCallback } from "react";
import { ChatMessage } from "@/types";
import { sendChatMessage, getChatHistory } from "@/lib/api";
import { registerChatOpener, unregisterChatOpener } from "@/lib/chatOpener";

export type ChatStatus = "idle" | "loading" | "typing" | "error" | "ready";

export interface ChatState {
    isOpen: boolean;
    status: ChatStatus;
    messages: ChatMessage[];
    errorMessage: string | null;
    historyLoaded: boolean;
}

type ChatAction =
    | { type: "TOGGLE_OPEN" }
    | { type: "SET_OPEN"; payload: boolean }
    | { type: "SEND_MESSAGE"; payload: ChatMessage }
    | { type: "SET_TYPING" }
    | { type: "RECEIVE_MESSAGE"; payload: ChatMessage }
    | { type: "LOAD_HISTORY"; payload: ChatMessage[] }
    | { type: "SET_ERROR"; payload: string }
    | { type: "CLEAR_ERROR" };

const initialState: ChatState = {
    isOpen: false,
    status: "idle",
    messages: [],
    errorMessage: null,
    historyLoaded: false,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case "TOGGLE_OPEN":
            return { ...state, isOpen: !state.isOpen };
        case "SET_OPEN":
            return { ...state, isOpen: action.payload };
        case "SEND_MESSAGE":
            return {
                ...state,
                status: "loading",
                messages: [...state.messages, action.payload],
                errorMessage: null,
            };
        case "SET_TYPING":
            return { ...state, status: "typing" };
        case "RECEIVE_MESSAGE":
            return {
                ...state,
                status: "ready",
                messages: [...state.messages, action.payload],
            };
        case "LOAD_HISTORY":
            return {
                ...state,
                status: "ready",
                messages: action.payload,
                historyLoaded: true,
            };
        case "SET_ERROR":
            return { ...state, status: "error", errorMessage: action.payload };
        case "CLEAR_ERROR":
            return { ...state, status: "idle", errorMessage: null };
        default:
            return state;
    }
}

export function useChatState() {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    // Load chat history from backend on first open
    const loadHistory = useCallback(async () => {
        if (state.historyLoaded) return;
        try {
            const { messages } = await getChatHistory();
            dispatch({ type: "LOAD_HISTORY", payload: messages });
        } catch (error) {
            console.error("Failed to load chat history:", error);
            // If history fails, still mark as loaded so we don't retry endlessly
            dispatch({ type: "LOAD_HISTORY", payload: [] });
        }
    }, [state.historyLoaded]);

    // Load history when chat is first opened
    useEffect(() => {
        if (state.isOpen && !state.historyLoaded) {
            loadHistory();
        }
    }, [state.isOpen, state.historyLoaded, loadHistory]);

    // Register global chat opener callback for CTA buttons
    useEffect(() => {
        registerChatOpener((aiGreeting?: string) => {
            dispatch({ type: "SET_OPEN", payload: true });
            // Greeting is now loaded from backend history, no need to locally inject
        });
        return () => unregisterChatOpener();
    }, []);

    const toggleChat = () => dispatch({ type: "TOGGLE_OPEN" });
    const openChat = () => dispatch({ type: "SET_OPEN", payload: true });

    const sendMessage = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
            timestamp: Date.now(),
        };

        dispatch({ type: "SEND_MESSAGE", payload: userMsg });

        // Show typing indicator
        setTimeout(() => {
            dispatch({ type: "SET_TYPING" });
        }, 300);

        try {
            const reply = await sendChatMessage(text);
            dispatch({ type: "RECEIVE_MESSAGE", payload: reply });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: "Koneksi terputus. Silakan coba lagi." });
        }
    };

    return { state, toggleChat, openChat, sendMessage, dispatch };
}
