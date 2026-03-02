"use client";

import { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatState } from "@/hooks/useChatState";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Send, AlertCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatWindowProps {
    state: ChatState;
    onSendMessage: (msg: string) => void;
    onClose: () => void;
}

export function ChatWindow({ state, onSendMessage, onClose }: ChatWindowProps) {
    const { t } = useLanguage();
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [state.messages, state.status]);

    // Focus input when opened
    useEffect(() => {
        if (state.isOpen && !isMobile) {
            setTimeout(() => inputRef.current?.focus(), 300);
        }
    }, [state.isOpen, isMobile]);

    // Close when clicking outside (desktop only)
    useEffect(() => {
        if (!state.isOpen || isMobile) return;

        const handleClickOutside = (e: MouseEvent) => {
            if (
                windowRef.current &&
                !windowRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };

        // Delay listener to avoid instantly closing from the toggle click
        const timer = setTimeout(() => {
            document.addEventListener("mousedown", handleClickOutside);
        }, 100);

        return () => {
            clearTimeout(timer);
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [state.isOpen, isMobile, onClose]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputRef.current) return;
        const val = inputRef.current.value;
        if (val.trim()) {
            onSendMessage(val);
            inputRef.current.value = "";
        }
    };

    return (
        <AnimatePresence>
            {state.isOpen && (
                <motion.div
                    ref={windowRef}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`fixed z-[90] flex flex-col overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-carbon)]/80 backdrop-blur-lg shadow-2xl ${isMobile
                        ? "inset-0 h-[100dvh] w-full rounded-none"
                        : "bottom-24 right-8 h-[550px] w-[380px] rounded-[20px]"
                        }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[var(--color-border-light)] bg-[#222222]/80 px-6 py-4">
                        <div className="flex flex-col">
                            <span className="font-display font-bold text-[var(--color-smoke)]">UpRev AI Assistant</span>
                            <span className="text-xs text-[var(--color-tiger-flame)]">{t("Selalu online", "Always online")}</span>
                        </div>
                        {isMobile && (
                            <button
                                onClick={onClose}
                                className="text-[var(--color-muted)] hover:text-white"
                            >
                                ✕
                            </button>
                        )}
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
                        {state.messages.map((msg) => (
                            <ChatBubble key={msg.id} message={msg} />
                        ))}

                        {state.status === "typing" && (
                            <div className="flex w-full justify-start">
                                <TypingIndicator />
                            </div>
                        )}

                        {state.status === "error" && state.errorMessage && (
                            <div className="flex items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20 mt-2">
                                <AlertCircle className="h-4 w-4" />
                                {state.errorMessage}
                            </div>
                        )}
                    </div>

                    {/* Input Area */}
                    <form
                        onSubmit={handleSubmit}
                        className="border-t border-[var(--color-border-light)] bg-[#222222] p-4 flex items-center gap-2"
                    >
                        <input
                            ref={inputRef}
                            type="text"
                            placeholder={t("Ketik pesan...", "Type a message...")}
                            className="flex-1 rounded-full bg-[var(--color-carbon)] px-4 py-2 text-[14px] text-[var(--color-smoke)] outline-none placeholder:text-[var(--color-muted)] focus:ring-1 focus:ring-[var(--color-tiger-flame)]/50"
                            disabled={state.status === "loading" || state.status === "typing"}
                        />
                        <button
                            type="submit"
                            disabled={state.status === "loading" || state.status === "typing"}
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-tiger-flame)] text-white transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
