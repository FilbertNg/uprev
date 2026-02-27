"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle, Twitter, Instagram, Linkedin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { openChatWithGreeting } from "@/lib/chatOpener";

export function Footer({ hideCTA = false }: { hideCTA?: boolean }) {
    const { t, lang } = useLanguage();

    const footerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: footerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [-150, 0]);

    const openChat = () => openChatWithGreeting("Siap membuka potensi maksimal bisnis Anda? 📈\n\nAnda bisa langsung mengatur jadwal meeting gratis bersama arsitek sistem kami di sini:\nhttps://uprev.id/api/meet/schedule\n\nUntuk memaksimalkan sesi kita nanti, area mana yang paling menjadi bottleneck di bisnis Anda saat ini?\n\nMisal: CS yang lambat, pendataan klien yang berantakan, atau website yang kurang konversi.");

    return (
        <motion.footer
            ref={footerRef}
            style={hideCTA ? undefined : { y }}
            className="flex flex-col bg-[#111111] border-t border-border-light w-full relative z-0"
        >
            {/* CTA Section — hidden on sub-pages */}
            {!hideCTA && (
                <div className="mx-auto w-full max-w-[1200px] px-6 py-24 text-center">
                    <h2 className="font-display text-4xl font-extrabold leading-tight text-[var(--color-smoke)] md:text-5xl lg:text-6xl mb-8">
                        {t("Siap Membuka Potensi", "Ready to Unlock Your")} <br className="hidden sm:block" /> {t("Bisnis Anda?", "Business Potential?")}
                    </h2>
                    <button
                        onClick={openChat}
                        className="group inline-flex items-center gap-2 rounded-full bg-[var(--color-tiger-flame)] px-8 py-4 text-[16px] font-semibold text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(255,87,34,0.3)]"
                        data-magnetic
                    >
                        <MessageCircle className="h-5 w-5" />
                        {t("Jadwalkan Konsultasi Gratis", "Schedule Free Consultation")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            )}

            {/* Fat Footer Content */}
            <div className="mx-auto w-full max-w-[1200px] px-6 py-16 border-t border-[#333333]">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-left">
                    {/* Column 1: Brand & Social */}
                    <div className="flex flex-col gap-6">
                        <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold w-fit" data-magnetic>
                            <img src="/uprev_logo_md.png" alt="UpRev Logo" className="h-8 w-auto" />
                            <div>
                                <span className="text-[var(--color-tiger-flame)]">Up</span>
                                <span className="text-white">Rev</span>
                            </div>
                        </Link>
                        <p className="text-[13px] text-[#A3A3A3] leading-relaxed">{t("Mitra transformasi digital Anda. Automasi bisnis dengan kekuatan AI.", "Your digital transformation partner. Automate business with AI.")}</p>
                        <div className="flex items-center gap-4">
                            <a href="#" className="text-[#A3A3A3] hover:text-[#F5F5F5] hover:scale-110 transition-all">
                                <Twitter className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[#A3A3A3] hover:text-[#F5F5F5] hover:scale-110 transition-all">
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a href="#" className="text-[#A3A3A3] hover:text-[#F5F5F5] hover:scale-110 transition-all">
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2: Produk */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white text-[14px] font-bold">{t("Produk", "Products")}</h4>
                        <Link href="/products/ai-cs" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Intelligent AI CS", "Intelligent AI CS")}</Link>
                        <Link href="/products/smart-crm" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Automated Smart CRM", "Automated Smart CRM")}</Link>
                        <Link href="/products/website" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("High-Performance Website", "High-Performance Website")}</Link>
                        <Link href="/404" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Custom AI Integration", "Custom AI Integration")}</Link>
                    </div>

                    {/* Column 3: Perusahaan */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white text-[14px] font-bold">{t("Perusahaan", "Company")}</h4>
                        <Link href="/about" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Tentang Kami", "About Us")}</Link>
                        <Link href="/team" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Tim Kami", "Our Team")}</Link>
                        <Link href="/careers" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Karir & Kolaborasi", "Careers & Partners")}</Link>
                        <Link href="/404" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Studi Kasus", "Case Studies")}</Link>
                    </div>

                    {/* Column 4: Resources */}
                    <div className="flex flex-col gap-4">
                        <h4 className="text-white text-[14px] font-bold">{t("Resources", "Resources")}</h4>
                        <a href="https://demo1.uprev.id" target="_blank" rel="noopener noreferrer" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Live Demo", "Live Demo")}</a>
                        <Link href="/404" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Blog & Insights", "Blog & Insights")}</Link>
                        <Link href="/404" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Dokumentasi / FAQ", "Documentation / FAQ")}</Link>
                        <Link href="/404" className="text-[14px] text-[#A3A3A3] hover:text-[#F5F5F5] transition-colors">{t("Kebijakan Privasi", "Privacy Policy")}</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Bar: Copyright */}
            <div className="w-full border-t border-border-light">
                <div className="mx-auto w-full max-w-[1200px] px-6 py-6 text-center md:text-left">
                    <p className="text-[12px] text-[#A3A3A3]">© 2026 UpRev. All rights reserved.</p>
                </div>
            </div>
        </motion.footer>
    );
}
