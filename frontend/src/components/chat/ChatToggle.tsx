"use client";

import { Sparkles, X } from "lucide-react";

interface ChatToggleProps {
    isOpen: boolean;
    onClick: () => void;
}

export function ChatToggle({ isOpen, onClick }: ChatToggleProps) {
    return (
        <button
            onClick={onClick}
            className={`fixed bottom-8 right-8 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-[var(--color-tiger-flame)] transition-colors duration-300 ${isOpen ? "bg-[var(--color-surface)]" : "bg-[var(--color-carbon)] hover:bg-[var(--color-surface)]"
                }`}
            aria-label="Toggle Chat"
            data-magnetic
        >
            {/* Ripple effect when closed */}
            {!isOpen && (
                <div className="absolute inset-0 rounded-full animate-ripple" />
            )}

            {isOpen ? (
                <X className="h-6 w-6 text-[var(--color-smoke)]" />
            ) : (
                <Sparkles className="h-6 w-6 text-[var(--color-tiger-flame)]" />
            )}
        </button>
    );
}
