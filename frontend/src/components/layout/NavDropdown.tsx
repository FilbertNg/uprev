"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown, Sparkles, BarChart3, Globe, Zap, Building2, Users, Handshake, Phone, Rocket, FileText, BookOpen } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { NavLink } from "@/types";

const iconMap: Record<string, React.ElementType> = {
    Sparkles, BarChart3, Globe, Zap, Building2, Users, Handshake, Phone, Rocket, FileText, BookOpen,
};

interface NavDropdownProps {
    label: string;
    items: Omit<NavLink, "children">[];
    onItemClick?: (href: string) => void;
}

export function NavDropdown({ label, items, onItemClick }: NavDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { lang } = useLanguage();

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
        >
            <button
                className={`flex items-center gap-1 text-[14px] transition-colors duration-200 ${isOpen ? "text-[var(--color-smoke)]" : "text-[var(--color-muted)]"}`}
                data-magnetic
            >
                {label}
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                    <ChevronDown className="h-4 w-4" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[280px] rounded-[16px] border border-[var(--color-border-light)] bg-[var(--color-carbon)]/90 p-2 backdrop-blur-lg"
                    >
                        <div className="flex flex-col gap-0.5">
                            {items.map((item) => {
                                const Icon = item.icon ? iconMap[item.icon] : null;
                                const isExternal = item.href.startsWith("http");
                                const isAction = item.href.startsWith("#");

                                // Action items (like Hubungi Kami drawer trigger)
                                if (isAction && onItemClick) {
                                    return (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                setIsOpen(false);
                                                onItemClick(item.href);
                                            }}
                                            className="group flex items-start gap-3 rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-[var(--color-surface)] text-left w-full"
                                        >
                                            {Icon && (
                                                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-muted)] group-hover:text-[var(--color-tiger-flame)] transition-colors">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="text-[13px] font-semibold text-[var(--color-smoke)] group-hover:text-[var(--color-tiger-flame)] transition-colors">
                                                    {lang === "ID" ? item.labelId : item.labelEn}
                                                </span>
                                                {(item.descId || item.descEn) && (
                                                    <span className="text-[11px] text-[var(--color-muted)] leading-tight mt-0.5">
                                                        {lang === "ID" ? item.descId : item.descEn}
                                                    </span>
                                                )}
                                            </div>
                                        </button>
                                    );
                                }

                                const Comp = isExternal ? "a" : Link;
                                const extraProps = isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {};

                                return (
                                    <Comp
                                        key={item.id}
                                        href={item.href}
                                        {...extraProps}
                                        className="group flex items-start gap-3 rounded-[10px] px-3 py-2.5 transition-colors duration-150 hover:bg-[var(--color-surface)]"
                                    >
                                        {Icon && (
                                            <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-surface)] text-[var(--color-muted)] group-hover:text-[var(--color-tiger-flame)] transition-colors">
                                                <Icon className="h-4 w-4" />
                                            </div>
                                        )}
                                        <div className="flex flex-col">
                                            <span className="text-[13px] font-semibold text-[var(--color-smoke)] group-hover:text-[var(--color-tiger-flame)] transition-colors">
                                                {lang === "ID" ? item.labelId : item.labelEn}
                                            </span>
                                            {(item.descId || item.descEn) && (
                                                <span className="text-[11px] text-[var(--color-muted)] leading-tight mt-0.5">
                                                    {lang === "ID" ? item.descId : item.descEn}
                                                </span>
                                            )}
                                        </div>
                                    </Comp>
                                );
                            })}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

