"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Language = "ID" | "EN";

interface LanguageContextType {
    lang: Language;
    setLang: (lang: Language) => void;
    t: (idStr: string, enStr: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [lang, setLang] = useState<Language>("ID");

    const t = (idStr: string, enStr: string) => {
        return lang === "ID" ? idStr : enStr;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
