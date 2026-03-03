"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function WebProblem() {
    const { t } = useLanguage();

    return (
        <section className="w-full relative overflow-hidden pt-24 pb-16 bg-carbon">
            <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="flex flex-col items-center"
                >
                    {/* Label */}
                    <span className="font-display text-[14px] font-bold text-tiger-flame tracking-[0.2em] uppercase mb-4 block">
                        THE CONVERSION KILLER
                    </span>

                    {/* H2 Headline */}
                    <h2 className="font-display text-smoke mb-6 text-[36px] md:text-[48px] font-extrabold leading-[1.2] max-w-4xl">
                        {t(
                            "Bisnis Sering Gagal Karena Website Hanya Sekadar Brosur Mati.",
                            "Businesses Often Fail Because Websites Are Just Dead Brochures."
                        )}
                    </h2>

                    {/* Description */}
                    <p className="font-inter text-muted text-[18px] md:text-[20px] leading-relaxed max-w-3xl">
                        {t(
                            "Tampilan cantik tidak ada artinya jika pengunjung pergi karena loading lambat atau bingung cara bertransaksi. Website yang bagus adalah yang menghasilkan profit. Kami merombak website Anda menjadi mesin pencetak penjualan dengan alur checkout tanpa hambatan.",
                            "A beautiful design means nothing if visitors leave due to slow loading speeds or confusing transaction flows. A good website is one that generates profit. We overhaul your website into a sales-generating machine with a frictionless checkout process."
                        )}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
