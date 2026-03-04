"use client";

import { Sparkles } from "lucide-react";

interface ChatToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ChatToggle({ isOpen, onClick }: ChatToggleProps) {
    return (
        <button
            onClick={onClick}
            className="fixed bottom-8 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-tiger-flame)] bg-[var(--color-carbon)] transition-all duration-300 hover:bg-[var(--color-surface)] hover:scale-110 hover:shadow-lg hover:shadow-[var(--color-tiger-flame)]/20 active:scale-95"
            aria-label="Open Chat"
            data-magnetic
        >
            {/* Ripple effect */}
            <div className="absolute inset-0 rounded-full animate-ripple" />

            <Sparkles className="h-6 w-6 text-[var(--color-tiger-flame)]" />
        </button>
    );
}
