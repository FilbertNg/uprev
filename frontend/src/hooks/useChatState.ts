import { useReducer, useEffect, useCallback, useRef } from "react";
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

// Default greeting shown optimistically (must match backend DEFAULT_GREETING)
const DEFAULT_GREETING =
    "Halo! 👋 Saya Rev, asisten AI UpRev. Ada yang bisa saya bantu tentang layanan kami?";

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
    // Holds the CTA aiGreeting to display immediately and send as context on first message
    const pendingGreeting = useRef<string | null>(null);
    // True until the user has sent at least one real message (or real history loaded)
    const isFirstMessage = useRef<boolean>(true);

    // Load chat history from backend on first open
    const loadHistory = useCallback(async () => {
        if (state.historyLoaded) return;

        // Optimistic UI: immediately show the default greeting
        // so the user sees content instantly (no blank delay)
        const optimisticGreeting: ChatMessage = {
            id: "optimistic-greeting",
            role: "assistant",
            content: DEFAULT_GREETING,
            timestamp: Date.now(),
        };
        dispatch({ type: "LOAD_HISTORY", payload: [optimisticGreeting] });

        // Fetch real history in background and replace
        try {
            const { messages } = await getChatHistory();
            // If messages is empty, keep the optimistic greeting and isFirstMessage stays true
            if (messages.length > 0) {
                dispatch({ type: "LOAD_HISTORY", payload: messages });
                // Real conversation history exists — not a first-time user
                isFirstMessage.current = false;
                pendingGreeting.current = null;
            }

            // Note: if messages is empty, pendingGreeting stays set so it gets
            // forwarded to the backend on the user's first send.
        } catch (error) {
            console.error("Failed to load chat history:", error);
            // Keep the optimistic greeting on error
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

            if (aiGreeting) {
                // Show the greeting immediately in the UI
                const ctaMsg: ChatMessage = {
                    id: crypto.randomUUID(),
                    role: "assistant",
                    content: aiGreeting,
                    timestamp: Date.now(),
                    isNew: true,
                };
                dispatch({ type: "RECEIVE_MESSAGE", payload: ctaMsg });
                // Also store it so it can be forwarded to the backend as context
                // on the user's first message (if no real history exists)
                if (isFirstMessage.current) {
                    pendingGreeting.current = aiGreeting;
                }
            }
        });
        return () => unregisterChatOpener();
    }, [state.historyLoaded]);

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

        // On the very first message, pass the aiGreeting to the backend so
        // LangChain sees: AI: greeting → Human: message
        const greetingForBackend = isFirstMessage.current ? (pendingGreeting.current ?? undefined) : undefined;
        isFirstMessage.current = false;
        pendingGreeting.current = null;

        try {
            const reply = await sendChatMessage(text, greetingForBackend);
            dispatch({ type: "RECEIVE_MESSAGE", payload: { ...reply, isNew: true } });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: "Koneksi terputus. Silakan coba lagi." });
        }
    };

    return { state, toggleChat, openChat, sendMessage, dispatch };
}
