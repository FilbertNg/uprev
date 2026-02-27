"use client";

import { CyberScramble } from "@/components/effects/CyberScramble";
import { useLanguage } from "@/contexts/LanguageContext";

export function Pricing() {
    const { t } = useLanguage();
    return (
        <section id="harga" className="bg-[var(--color-carbon)] py-32 px-4 sm:px-6 relative z-10">
            <div className="mx-auto flex max-w-[800px] flex-col items-center gap-8 text-center">

                <h2 className="font-display text-[24px] font-bold text-[var(--color-smoke)]">
                    {t("Investasi yang Terukur Mulai dari", "Investment that is measured starting from")}
                </h2>

                <div className="font-display text-[48px] md:text-[60px] lg:text-[72px] font-extrabold text-[var(--color-tiger-flame)] leading-none">
                    <CyberScramble finalNumber={1500000} duration={1.5} prefix="Rp" />
                </div>

                <p className="max-w-[600px] font-inter text-[16px] text-[var(--color-muted)]">
                    {t("Sebuah investasi terukur. Sistem kami dirancang untuk membayar dirinya sendiri melalui penghematan operasional dan peningkatan profit.", "A measurable investment. Our system is designed to pay for itself through operational cost reduction and increased revenue.")}
                </p>
                <p className="max-w-[500px] font-inter text-[12px] text-[var(--color-muted)]/60 italic">
                    {t("*Belum termasuk biaya maintenance yang disesuaikan dengan kebutuhan bisnis Anda.", "*Excludes maintenance fees tailored to your business needs.")}
                </p>
            </div>
        </section>
    );
}
