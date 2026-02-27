"use client";

import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle({ className }: { className?: string }) {
    const { lang, setLang } = useLanguage();

    const toggle = () => setLang(lang === "ID" ? "EN" : "ID");

    return (
        <button
            onClick={toggle}
            className={cn(
                "text-[14px] font-bold text-[var(--color-smoke)] transition-opacity hover:opacity-80",
                className
            )}
            data-magnetic
        >
            <span className={lang === "ID" ? "opacity-100" : "opacity-50"}>ID</span> | <span className={lang === "EN" ? "opacity-100" : "opacity-50"}>EN</span>
        </button>
    );
}
