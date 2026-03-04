"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatState } from "@/hooks/useChatState";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { Send, AlertCircle, X } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useLanguage } from "@/contexts/LanguageContext";

interface ChatWindowProps {
    state: ChatState;
    onSendMessage: (msg: string) => void;
    onClose: () => void;
}

/**
 * Tracks the visual viewport position and size.
 * On mobile, when the virtual keyboard opens, the visual viewport shrinks
 * AND may shift (offsetTop changes). We use both values to pin the chat
 * container exactly into the visible area — like WhatsApp.
 */
function useVisualViewport(enabled: boolean) {
    const [vp, setVp] = useState<{ height: number; offsetTop: number } | null>(null);

    useEffect(() => {
        if (!enabled) {
            setVp(null);
            return;
        }

        const vv = window.visualViewport;
        if (!vv) return;

        const update = () => {
            setVp({
                height: vv.height,
                offsetTop: vv.offsetTop,
            });
        };

        // Set initial values
        update();

        vv.addEventListener("resize", update);
        vv.addEventListener("scroll", update);

        return () => {
            vv.removeEventListener("resize", update);
            vv.removeEventListener("scroll", update);
        };
    }, [enabled]);

    return vp;
}

export function ChatWindow({ state, onSendMessage, onClose }: ChatWindowProps) {
    const { t } = useLanguage();
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const windowRef = useRef<HTMLDivElement>(null);
    const isMobile = useMediaQuery("(max-width: 768px)");
    const [isInputFocused, setIsInputFocused] = useState(false);

    // Track where the visible viewport actually is on mobile
    const vp = useVisualViewport(isMobile && state.isOpen);

    // Is the keyboard currently open?
    const keyboardOpen = vp != null && vp.height < window.innerHeight - 100;

    // ─── Body scroll lock ───
    // Use overflow:hidden + touch-action to prevent ALL background scrolling
    useEffect(() => {
        if (!state.isOpen || !isMobile) return;

        const html = document.documentElement;
        const body = document.body;

        // Store originals
        const origHtmlOverflow = html.style.overflow;
        const origBodyOverflow = body.style.overflow;
        const origHtmlHeight = html.style.height;
        const origBodyHeight = body.style.height;

        html.style.overflow = "hidden";
        html.style.height = "100%";
        body.style.overflow = "hidden";
        body.style.height = "100%";

        return () => {
            html.style.overflow = origHtmlOverflow;
            html.style.height = origHtmlHeight;
            body.style.overflow = origBodyOverflow;
            body.style.height = origBodyHeight;
        };
    }, [state.isOpen, isMobile]);

    // Prevent touch-scrolling from leaking to the body
    useEffect(() => {
        if (!state.isOpen || !isMobile) return;

        const prevent = (e: TouchEvent) => {
            // Allow scrolling inside the messages container
            if (scrollRef.current?.contains(e.target as Node)) return;
            // Block everything else
            e.preventDefault();
        };

        document.addEventListener("touchmove", prevent, { passive: false });
        return () => document.removeEventListener("touchmove", prevent);
    }, [state.isOpen, isMobile]);

    // Auto-scroll messages to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [state.messages, state.status]);

    // Re-scroll when keyboard opens/closes
    useEffect(() => {
        if (vp && scrollRef.current) {
            requestAnimationFrame(() => {
                if (scrollRef.current) {
                    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                }
            });
        }
    }, [vp?.height]);

    // Focus input when opened (desktop only)
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

    const handleInputFocus = () => {
        setIsInputFocused(true);
        setTimeout(() => {
            if (scrollRef.current) {
                scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
            }
        }, 300);
    };

    const handleInputBlur = () => {
        setIsInputFocused(false);
    };

    // Build mobile container style: pin to the actual visible viewport
    const mobileStyle: React.CSSProperties | undefined = isMobile
        ? {
            // Position at the TOP of the visible area (offsetTop handles
            // the browser scrolling the layout viewport when keyboard opens)
            top: vp != null ? `${vp.offsetTop}px` : 0,
            left: 0,
            right: 0,
            // Fill exactly the visible area height (excludes keyboard)
            height: vp != null ? `${vp.height}px` : "100dvh",
            bottom: "auto",
        }
        : undefined;

    return (
        <AnimatePresence>
            {state.isOpen && (
                <motion.div
                    ref={windowRef}
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    className={`fixed z-[90] flex flex-col overflow-hidden border border-[var(--color-border-light)] bg-[var(--color-carbon)] backdrop-blur-lg shadow-2xl ${isMobile
                            ? "rounded-none"
                            : "bottom-24 right-8 h-[550px] w-[380px] rounded-[20px]"
                        }`}
                    style={mobileStyle}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-[var(--color-border-light)] bg-[#222222] px-5 py-3.5 shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-tiger-flame)]/20 border border-[var(--color-tiger-flame)]/40">
                                <span className="text-sm font-bold text-[var(--color-tiger-flame)]">U</span>
                                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#222222] bg-emerald-500" />
                            </div>
                            <div className="flex flex-col">
                                <span className="font-display font-bold text-[var(--color-smoke)] text-[15px] leading-tight">
                                    UpRev AI Assistant
                                </span>
                                <span className="text-[11px] text-emerald-400 flex items-center gap-1">
                                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    {t("Selalu online", "Always online")}
                                </span>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-muted)] transition-all duration-200 hover:bg-white/10 hover:text-white active:scale-90"
                            aria-label="Close chat"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Messages */}
                    <div
                        ref={scrollRef}
                        className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 overscroll-contain"
                        style={{ WebkitOverflowScrolling: "touch" }}
                    >
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
                                <AlertCircle className="h-4 w-4 shrink-0" />
                                {state.errorMessage}
                            </div>
                        )}
                    </div>

                    {/* WhatsApp-style Input Bar */}
                    <form
                        onSubmit={handleSubmit}
                        className="shrink-0 border-t border-[var(--color-border-light)] bg-[#1a1a1a] px-3 py-2 flex items-end gap-2"
                        style={{
                            paddingBottom: isMobile && !keyboardOpen
                                ? "max(0.5rem, env(safe-area-inset-bottom))"
                                : "0.5rem",
                        }}
                    >
                        <div className="flex-1 flex items-center rounded-full bg-[#2a2a2a] border border-[var(--color-border-light)] transition-all duration-200 focus-within:border-[var(--color-tiger-flame)]/50 focus-within:ring-1 focus-within:ring-[var(--color-tiger-flame)]/20">
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder={t("Ketik pesan...", "Type a message...")}
                                className="flex-1 bg-transparent px-4 py-2.5 text-[14px] text-[var(--color-smoke)] outline-none placeholder:text-[var(--color-muted)]"
                                disabled={
                                    state.status === "loading" ||
                                    state.status === "typing"
                                }
                                onFocus={handleInputFocus}
                                onBlur={handleInputBlur}
                                enterKeyHint="send"
                                autoComplete="off"
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={
                                state.status === "loading" ||
                                state.status === "typing"
                            }
                            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--color-tiger-flame)] text-white transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-[var(--color-tiger-flame)]/25 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:hover:shadow-none mb-0.5"
                        >
                            <Send className="h-4 w-4" />
                        </button>
                    </form>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
