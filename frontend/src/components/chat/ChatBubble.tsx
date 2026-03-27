"use client";

import { ChatMessage } from "@/types";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatBubbleProps {
    message: ChatMessage;
    /** Stagger delay in seconds before this bubble animates in */
    delay?: number;
}

export function ChatBubble({ message, delay = 0 }: ChatBubbleProps) {
    const isUser = message.role === "user";

    return (
        <motion.div
            className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut", delay }}
        >
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                    isUser
                        ? "rounded-br-none bg-[var(--color-tiger-flame)]/20 border border-[var(--color-tiger-flame)]/50 text-[var(--color-smoke)]"
                        : "rounded-bl-none bg-[#222222] text-[var(--color-smoke)] border border-[var(--color-border-light)]"
                }`}
            >
                {isUser ? (
                    // User messages: plain text, preserve newlines
                    <span className="whitespace-pre-line">{message.content}</span>
                ) : (
                    // Assistant messages: full markdown rendering
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Paragraphs — no extra margin since we split by blank line
                            p: ({ children }) => (
                                <span className="block">{children}</span>
                            ),
                            // Bold
                            strong: ({ children }) => (
                                <strong className="font-semibold text-white">{children}</strong>
                            ),
                            // Italic
                            em: ({ children }) => (
                                <em className="italic">{children}</em>
                            ),
                            // Unordered list
                            ul: ({ children }) => (
                                <ul className="mt-1 space-y-0.5 list-none pl-0">{children}</ul>
                            ),
                            // Ordered list
                            ol: ({ children }) => (
                                <ol className="mt-1 space-y-0.5 list-decimal pl-4">{children}</ol>
                            ),
                            // List items — bullet styled manually for consistent look
                            li: ({ children }) => (
                                <li className="flex gap-2 items-start">
                                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--color-tiger-flame)]" />
                                    <span>{children}</span>
                                </li>
                            ),
                            // Inline code
                            code: ({ children }) => (
                                <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-[12px]">
                                    {children}
                                </code>
                            ),
                            // Links — map known URLs to friendly labels
                            a: ({ href }) => {
                                let label = "🔗 Buka Link";
                                if (href?.includes("uprev.id/api/meet/schedule")) {
                                    label = "📅 Link Jadwal";
                                } else if (href?.includes("checkout-staging.xendit.co/web/")) {
                                    label = "💳 Payment Link";
                                }
                                return (
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 rounded-full bg-[var(--color-tiger-flame)]/15 border border-[var(--color-tiger-flame)]/40 px-3 py-0.5 text-[13px] font-semibold text-[var(--color-tiger-flame)] hover:bg-[var(--color-tiger-flame)]/25 transition-colors"
                                    >
                                        {label}
                                    </a>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </ReactMarkdown>
                )}
            </div>
        </motion.div>
    );
}
