"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { navLinks } from "@/data/mock";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
    const { lang, t } = useLanguage();
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 right-0 top-0 z-[70] flex w-4/5 max-w-sm flex-col bg-[var(--color-carbon)] border-l border-[var(--color-border-light)] p-6 overflow-y-auto"
                    >
                        <div className="flex justify-end mb-8">
                            <button
                                onClick={onClose}
                                className="text-[var(--color-muted)] hover:text-[var(--color-tiger-flame)]"
                            >
                                {t("Tutup", "Close")} ✕
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <div key={link.id} className="flex flex-col gap-3">
                                    {link.children ? (
                                        <>
                                            <span className="text-lg font-bold text-[var(--color-smoke)]">{lang === "ID" ? link.labelId : link.labelEn}</span>
                                            <div className="flex flex-col gap-3 pl-4 border-l border-[var(--color-border-light)]">
                                                {link.children.map((child) => {
                                                    const isExternal = child.href.startsWith("http");
                                                    return isExternal ? (
                                                        <a
                                                            key={child.id}
                                                            href={child.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={onClose}
                                                            className="text-[var(--color-muted)] hover:text-[var(--color-tiger-flame)] transition-colors"
                                                        >
                                                            {lang === "ID" ? child.labelId : child.labelEn}
                                                        </a>
                                                    ) : (
                                                        <Link
                                                            key={child.id}
                                                            href={child.href}
                                                            onClick={onClose}
                                                            className="text-[var(--color-muted)] hover:text-[var(--color-tiger-flame)] transition-colors"
                                                        >
                                                            {lang === "ID" ? child.labelId : child.labelEn}
                                                        </Link>
                                                    );
                                                })}
                                            </div>
                                        </>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            onClick={onClose}
                                            className="text-lg font-bold text-[var(--color-smoke)] hover:text-[var(--color-tiger-flame)] transition-colors"
                                        >
                                            {lang === "ID" ? link.labelId : link.labelEn}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>

                        <div className="mt-auto flex flex-col gap-4">
                            <Button onClick={() => window.open("https://demo1.uprev.id", "_blank")}>
                                Coba Demo
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
