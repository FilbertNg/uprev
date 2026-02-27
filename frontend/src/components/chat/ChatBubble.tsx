"use client";

import { ChatMessage } from "@/types";
import { useMemo } from "react";

// Parses message content into segments: plain text and clickable links
function parseContent(content: string): Array<{ type: "text" | "link"; text: string; href?: string }> {
    const segments: Array<{ type: "text" | "link"; text: string; href?: string }> = [];
    // Match URLs (http/https)
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = urlRegex.exec(content)) !== null) {
        // Text before the URL
        if (match.index > lastIndex) {
            segments.push({ type: "text", text: content.slice(lastIndex, match.index) });
        }
        // The URL itself — display as friendly label
        const url = match[1];
        let label = "[Link Jadwal WhatsApp]";
        if (!url.includes("meet/schedule") && !url.includes("whatsapp")) {
            // Generic link label for other URLs
            label = "[Buka Link]";
        }
        segments.push({ type: "link", text: label, href: url });
        lastIndex = urlRegex.lastIndex;
    }

    // Remaining text after last URL
    if (lastIndex < content.length) {
        segments.push({ type: "text", text: content.slice(lastIndex) });
    }

    return segments;
}

export function ChatBubble({ message }: { message: ChatMessage }) {
    const isUser = message.role === "user";
    const segments = useMemo(() => parseContent(message.content), [message.content]);

    return (
        <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
            <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed whitespace-pre-line ${isUser
                    ? "rounded-br-none bg-[var(--color-tiger-flame)]/20 border border-[var(--color-tiger-flame)]/50 text-[var(--color-smoke)]"
                    : "rounded-bl-none bg-[#222222] text-[var(--color-smoke)] border border-[var(--color-border-light)]"
                    }`}
            >
                {segments.map((seg, i) =>
                    seg.type === "link" ? (
                        <a
                            key={i}
                            href={seg.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--color-tiger-flame)] font-semibold underline underline-offset-2 hover:opacity-80 transition-opacity"
                        >
                            {seg.text}
                        </a>
                    ) : (
                        <span key={i}>{seg.text}</span>
                    )
                )}
            </div>
        </div>
    );
}
