"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tag, Handshake, Rocket, Sparkles } from "lucide-react";

const partnerCards = [
    {
        icon: Tag,
        titleId: "White-Label Partnership",
        titleEn: "White-Label Partnership",
        descId: "Gunakan teknologi UpRev dengan brand Anda sendiri. Cocok untuk agensi digital yang ingin memperluas portofolio tanpa investasi pengembangan.",
        descEn: "Use UpRev technology under your own brand. Perfect for digital agencies looking to expand their portfolio without development investment.",
    },
    {
        icon: Handshake,
        titleId: "Referral Program",
        titleEn: "Referral Program",
        descId: "Dapatkan komisi menarik untuk setiap klien yang Anda referensikan ke UpRev. Tanpa ikatan, tanpa modal awal.",
        descEn: "Earn attractive commissions for every client you refer to UpRev. No strings attached, no upfront capital.",
    },
    {
        icon: Rocket,
        titleId: "Joint Venture",
        titleEn: "Joint Venture",
        descId: "Bangun proyek bersama untuk klien besar. Gabungkan keahlian Anda dengan teknologi AI kami untuk solusi enterprise.",
        descEn: "Build projects together for enterprise clients. Combine your expertise with our AI technology for enterprise solutions.",
    },
];

const tabs = [
    { id: "mitra", labelId: "Mitra Strategis", labelEn: "Strategic Partners" },
    { id: "talenta", labelId: "Talenta AI", labelEn: "AI Talent" },
];

export function CareersTabLayout() {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState("mitra");

    return (
        <section className="pb-32 px-4 sm:px-6 bg-[var(--color-carbon)]">
            <div className="mx-auto max-w-[1000px]">
                {/* Tab Buttons */}
                <div className="relative flex gap-2 mb-10 justify-center">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className="relative px-6 py-2 text-[16px] font-inter rounded-full z-10 transition-colors duration-200"
                            style={{
                                color: activeTab === tab.id ? "#F5F5F5" : "#A3A3A3",
                                fontWeight: activeTab === tab.id ? 700 : 400,
                            }}
                        >
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="tab-highlight"
                                    className="absolute inset-0 bg-[#333333] rounded-full -z-10"
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                            {t(tab.labelId, tab.labelEn)}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "mitra" ? (
                        <motion.div
                            key="mitra"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {partnerCards.map((card, i) => {
                                    const Icon = card.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4, delay: i * 0.1 }}
                                            className="group bg-[#222222] border border-[#333333] rounded-[16px] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FF5722]/50"
                                        >
                                            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FF5722]/10 mb-5 transition-colors duration-300 group-hover:bg-[#FF5722]/20">
                                                <Icon className="h-5 w-5 text-[#FF5722]" />
                                            </div>
                                            <h3 className="font-display text-[18px] font-bold text-[#F5F5F5] mb-3">
                                                {t(card.titleId, card.titleEn)}
                                            </h3>
                                            <p className="font-inter text-[14px] text-[#A3A3A3] leading-relaxed mb-5">
                                                {t(card.descId, card.descEn)}
                                            </p>
                                            <span className="font-inter text-[13px] font-semibold text-[#FF5722] group-hover:underline cursor-pointer">
                                                {t("Hubungi Kami →", "Contact Us →")}
                                            </span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="talenta"
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex flex-col items-center justify-center text-center py-16 px-6"
                        >
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FF5722]/10 mb-6">
                                <Sparkles className="h-8 w-8 text-[#FF5722]" />
                            </div>
                            <h3 className="font-display text-[28px] font-bold text-[#F5F5F5] mb-3">
                                {t("Segera Hadir", "Coming Soon")} ✨
                            </h3>
                            <p className="font-inter text-[16px] text-[#A3A3A3] max-w-[500px] leading-relaxed">
                                {t(
                                    "Kami sedang mempersiapkan kesempatan luar biasa untuk talenta di bidang AI, pengembangan web, dan desain produk digital. Nantikan update dari kami!",
                                    "We're preparing amazing opportunities for talent in AI, web development, and digital product design. Stay tuned for updates!"
                                )}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
