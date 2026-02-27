"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ProductCard } from "@/types";
import { useState } from "react";
import { useMousePosition } from "@/hooks/useMousePosition";
import { AICSVisual, SmartCRMVisual, WebsiteVisual } from "./BentoVisuals";
import { useLanguage } from "@/contexts/LanguageContext";

interface BentoCardProps {
    product: ProductCard;
    className?: string;
}

export function BentoCard({ product, className = "" }: BentoCardProps) {
    const { lang, t } = useLanguage();
    const [isHovered, setIsHovered] = useState(false);
    const { x, y } = useMousePosition();
    const [cardPosition, setCardPosition] = useState({ x: 0, y: 0 });

    return (
        <Link
            href={product.href}
            className={`group relative flex h-full min-h-[300px] flex-col overflow-hidden rounded-[24px] border transition-all duration-300 ${isHovered
                ? "border-[var(--color-tiger-flame)]/40 bg-[#2A2A2A] shadow-[0_0_40px_rgba(255,87,34,0.1)]"
                : "border-[var(--color-border-light)] bg-[var(--color-surface)]"
                } ${className}`}
            onMouseEnter={(e) => {
                setIsHovered(true);
                const rect = e.currentTarget.getBoundingClientRect();
                setCardPosition({ x: rect.left, y: rect.top });
            }}
            onMouseLeave={() => setIsHovered(false)}
            data-magnetic
        >
            {/* Magnetic Spotlight inside card on hover (Desktop only roughly) */}
            {isHovered && (
                <div
                    className="pointer-events-none absolute inset-0 -z-10 opacity-50 transition-opacity duration-300 hidden md:block rounded-[24px]"
                    style={{
                        background: `radial-gradient(400px circle at ${x - cardPosition.x}px ${y - cardPosition.y
                            }px, rgba(255, 87, 34, 0.1), transparent 80%)`,
                    }}
                />
            )}

            {/* Custom Visuals */}
            {product.mockVisual === 'chat' && <AICSVisual isHovered={isHovered} />}
            {product.mockVisual === 'chart' && <SmartCRMVisual isHovered={isHovered} />}
            {product.mockVisual === 'wireframe' && <WebsiteVisual isHovered={isHovered} />}

            {/* Content */}
            <div className="flex flex-1 flex-col p-8 md:p-10 relative z-10">
                <h3 className="mb-4 font-display text-[28px] md:text-[32px] font-bold text-[var(--color-smoke)]">
                    {lang === "ID" ? product.title : (product.titleEn || product.title)}
                </h3>
                <p className="max-w-md font-inter text-[16px] text-[var(--color-muted)]">
                    {lang === "ID" ? product.description : (product.descriptionEn || product.description)}
                </p>

                {/* Floating CTA */}
                <div className={`mt-auto pt-8 flex items-center ${product.id === 'smart-crm' ? 'justify-start' : 'justify-end'}`}>
                    <span className="flex items-center text-[14px] font-semibold text-[var(--color-tiger-flame)]">
                        {t("Pelajari Fitur", "Learn Features")}
                        <motion.div
                            animate={{ x: isHovered ? 8 : 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="ml-2"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </motion.div>
                    </span>
                </div>
            </div>
        </Link>
    );
}
