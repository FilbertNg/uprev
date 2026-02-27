import { useReducer, useEffect } from "react";
import { ChatMessage, SendMessagePayload } from "@/types";
import { sendChatMessage } from "@/lib/api";
import { registerChatOpener, unregisterChatOpener } from "@/lib/chatOpener";

export type ChatStatus = "idle" | "loading" | "typing" | "error" | "ready";

export interface ChatState {
    isOpen: boolean;
    status: ChatStatus;
    messages: ChatMessage[];
    errorMessage: string | null;
    sessionId: string;
}

type ChatAction =
    | { type: "TOGGLE_OPEN" }
    | { type: "SET_OPEN"; payload: boolean }
    | { type: "SEND_MESSAGE"; payload: ChatMessage }
    | { type: "SET_TYPING" }
    | { type: "RECEIVE_MESSAGE"; payload: ChatMessage }
    | { type: "RESET_GREETING"; payload: ChatMessage }
    | { type: "SET_ERROR"; payload: string }
    | { type: "CLEAR_ERROR" };

const DEFAULT_GREETING = "Halo! 👋 Saya asisten AI UpRev. Ada yang bisa saya bantu tentang layanan kami?";

const initialState: ChatState = {
    isOpen: false,
    status: "idle",
    messages: [],
    errorMessage: null,
    sessionId: typeof window !== "undefined" ? crypto.randomUUID() : "",
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
        case "TOGGLE_OPEN": {
            const opening = !state.isOpen;
            // When floating button opens chat and it's empty, inject default greeting
            if (opening && state.messages.length === 0) {
                return {
                    ...state,
                    isOpen: true,
                    messages: [{
                        id: "greeting-1",
                        role: "assistant",
                        content: DEFAULT_GREETING,
                        timestamp: Date.now(),
                    }],
                };
            }
            return { ...state, isOpen: opening };
        }
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
        case "RESET_GREETING":
            return {
                ...state,
                status: "ready",
                messages: [action.payload],
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

    useEffect(() => {
        // Generate session ID on mount if it wasn't generated during SSR
        if (!state.sessionId) {
            initialState.sessionId = crypto.randomUUID();
        }
    }, [state.sessionId]);

    // Register global chat opener callback for CTA buttons
    useEffect(() => {
        registerChatOpener((aiGreeting?: string) => {
            dispatch({ type: "SET_OPEN", payload: true });
            if (aiGreeting) {
                dispatch({ type: "SET_TYPING" });
                setTimeout(() => {
                    dispatch({
                        type: "RESET_GREETING",
                        payload: {
                            id: crypto.randomUUID(),
                            role: "assistant",
                            content: aiGreeting,
                            timestamp: Date.now(),
                        },
                    });
                }, 800);
            }
        });
        return () => unregisterChatOpener();
    }, []);

    const toggleChat = () => dispatch({ type: "TOGGLE_OPEN" });
    const openChat = () => dispatch({ type: "SET_OPEN", payload: true });

    const sendMessage = async (text: string, productId?: string) => {
        if (!text.trim()) return;

        const userMsg: ChatMessage = {
            id: crypto.randomUUID(),
            role: "user",
            content: text,
            timestamp: Date.now(),
        };

        dispatch({ type: "SEND_MESSAGE", payload: userMsg });

        // Move to typing state shortly after sending
        setTimeout(() => {
            dispatch({ type: "SET_TYPING" });
        }, 500);

        try {
            const payload: SendMessagePayload = {
                sessionId: state.sessionId,
                message: text,
                locale: "id", // Assuming id for now based on context
                context: productId ? { productId } : undefined,
            };

            const reply = await sendChatMessage(payload);
            dispatch({ type: "RECEIVE_MESSAGE", payload: reply });
        } catch (error) {
            dispatch({ type: "SET_ERROR", payload: "Koneksi terputus. Silakan coba lagi." });
        }
    };

    return { state, toggleChat, openChat, sendMessage, dispatch };
}
