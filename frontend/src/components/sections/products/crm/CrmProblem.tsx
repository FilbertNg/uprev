"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function CrmProblem() {
    const { t } = useLanguage();

    return (
        <section className="py-32 px-4 sm:px-6 bg-[var(--color-carbon)] relative overflow-hidden">
            <div className="max-w-[800px] mx-auto text-center">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="inline-block mb-4"
                >
                    <span className="font-inter text-[14px] font-bold text-[#FF5722] tracking-[0.2em] relative before:absolute before:inset-0 before:bg-[#FF5722]/10 before:rounded-full before:-m-1 before:z-[-1]">
                        {t("THE RETENTION LEAK", "THE RETENTION LEAK")}
                    </span>
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="font-display text-[32px] md:text-[40px] font-bold text-[#F5F5F5] leading-tight mb-8"
                >
                    {t(
                        "Mengapa Anda Kehilangan Potensi Repeat Order?",
                        "Why Are You Losing Repeat Order Potential?"
                    )}
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="font-inter text-[18px] text-[#A3A3A3] leading-relaxed max-w-[650px] mx-auto"
                >
                    {t(
                        "Ratusan interaksi berharga dengan prospek setiap bulannya menguap begitu saja karena tidak terpusat dalam satu sistem. Tanpa CRM, Anda kehilangan potensi Upselling yang seharusnya menjadi profit termudah bagi bisnis Anda.",
                        "Hundreds of valuable interactions with prospects evaporate every month because they are not centralized in one system. Without a CRM, you lose the Upselling potential that should be the easiest profit for your business."
                    )}
                </motion.p>
            </div>
        </section>
    );
}
