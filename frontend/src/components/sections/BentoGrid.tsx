"use client";

import { BentoCard } from "@/components/bento/BentoCard";
import { products } from "@/data/mock";
import { useLanguage } from "@/contexts/LanguageContext";

export function BentoGrid() {
    const { t } = useLanguage();
    const getProduct = (id: string) => products.find((p) => p.id === id)!;

    return (
        <section className="bg-[var(--color-carbon)] py-32 px-4 sm:px-6 relative">
            <div className="mx-auto flex max-w-[1200px] flex-col gap-16">
                {/* Header */}
                <div className="text-center">
                    <h2 className="font-display text-[32px] md:text-[40px] font-extrabold text-[var(--color-smoke)]">
                        {t("Ekosistem Digital untuk Skala Bisnis Anda.", "Digital Ecosystem to Scale Your Business.")}
                    </h2>
                </div>

                {/* Asymmetric Grid */}
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-5 lg:gap-8">
                    {/* Left Large Card (60%) */}
                    <div className="lg:col-span-3">
                        <BentoCard product={getProduct("ai-cs")} />
                    </div>

                    {/* Right Stack (40%) */}
                    <div className="flex flex-col gap-6 lg:col-span-2 lg:gap-8">
                        <div className="flex-1">
                            <BentoCard product={getProduct("smart-crm")} />
                        </div>
                        <div className="flex-1">
                            <BentoCard product={getProduct("website")} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
