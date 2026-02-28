"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AiCsHero() {
    const { t } = useLanguage();

    const bubbles = [
        { id: 1, text: "Halo, tgl 14 feb besok ada kamar Ocean View untuk Anniversary?", isUser: true, delay: 0 },
        { id: 2, text: "Halo Kak! 👋 Kebetulan tinggal 1 kamar terakhir. Mau saya hold slotnya sebelum diambil tamu lain? 😊", isUser: false, delay: 1.2 },
        { id: 3, text: "Boleh dong, book sekarang!", isUser: true, delay: 3.2 },
        { id: 4, text: "Siap Kak! Mau upgrade ke \"Honeymoon Package\"? 🌹 Hanya +300k dapat Room Decor + Private Dinner eksklusif!", isUser: false, delay: 4.2 },
        { id: 5, text: "Wah boleh tuh, menarik!", isUser: true, delay: 6 },
        { id: 6, text: "Baik Kak 😊 Total Rp 1.850.000. Silakan bayar di sini 👇", isUser: false, delay: 7, hasPaymentLink: true },
    ];

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#1A1A1A] px-4 sm:px-6 pt-32 pb-20">
            {/* Very faint grid background */}
            <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#333333_1px,transparent_1px),linear-gradient(to_bottom,#333333_1px,transparent_1px)] bg-[size:40px_40px] opacity-10 pointer-events-none" />

            {/* Subtle glow behind hero */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF5722] rounded-full blur-[120px] opacity-[0.05] pointer-events-none" />

            <div className="max-w-[1200px] mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Left Text Content */}
                <div>
                    <motion.h1
                        initial={{ opacity: 0, filter: "blur(10px)", y: 20 }}
                        animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="font-display text-[48px] md:text-[64px] font-extrabold text-[#F5F5F5] leading-[1.1] mb-6"
                    >
                        {t("Your ", "Your ")}
                        <span className="bg-gradient-to-r from-[var(--color-tiger-flame)] to-[#FF8A65] bg-clip-text text-transparent">
                            24/7
                        </span>
                        {t(" Intelligent Staff.", " Intelligent Staff.")}
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="font-inter text-[18px] text-[#A3A3A3] mb-10 max-w-[500px] leading-relaxed"
                    >
                        {t(
                            "Lebih dari sekadar chatbot. Sebuah aset pencetak pendapatan. Satu sistem AI UpRev setara dengan mempekerjakan 3 shift admin customer service.",
                            "More than just a chatbot. A revenue-generating asset. One UpRev AI system is equivalent to hiring 3 shifts of customer service admins."
                        )}
                    </motion.p>
                </div>

                {/* Right Glassmorphism Phone Mockup */}
                <div className="relative h-[600px] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
                        className="w-full max-w-[340px] h-[680px] bg-white/5 backdrop-blur-xl border border-white/10 rounded-[40px] p-4 shadow-2xl relative overflow-hidden flex flex-col"
                        style={{
                            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 0 0 1px rgba(255, 255, 255, 0.1)"
                        }}
                    >
                        {/* Phone notch area */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-[20px] z-20" />

                        {/* App Header (Fake WhatsApp-ish) */}
                        <div className="h-[60px] border-b border-white/10 flex items-center px-4 pt-4 shrink-0 z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#333] flex items-center justify-center">
                                    <span className="text-[12px]">✨</span>
                                </div>
                                <div>
                                    <p className="font-inter text-sm font-semibold text-white">UpRev AI Agent</p>
                                    <p className="font-inter text-[11px] text-[#A3A3A3]">Online 24/7</p>
                                </div>
                            </div>
                        </div>

                        {/* Chat Bubbles Container — neat, fits one screen */}
                        <div className="flex-1 px-4 py-2 flex flex-col justify-end gap-1.5 overflow-hidden">
                            {bubbles.map((bubble) => (
                                <div key={bubble.id}>
                                    {/* Typing indicator (3 dots) before AI messages */}
                                    {!bubble.isUser && (
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: [0, 1, 1, 0] }}
                                            transition={{
                                                duration: 0.9,
                                                delay: bubble.delay + 0.2,
                                                times: [0, 0.1, 0.7, 1],
                                            }}
                                            className="flex gap-1 mb-1 ml-1"
                                        >
                                            <span className="w-[5px] h-[5px] rounded-full bg-[#FF5722]/50 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-[5px] h-[5px] rounded-full bg-[#FF5722]/50 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-[5px] h-[5px] rounded-full bg-[#FF5722]/50 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </motion.div>
                                    )}
                                    <motion.div
                                        initial={{ opacity: 0, y: 15, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.4,
                                            ease: "easeOut",
                                            delay: bubble.delay + 1,
                                        }}
                                        className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[12.5px] font-inter leading-[1.55] whitespace-pre-wrap ${bubble.isUser
                                            ? "bg-white/10 text-white/90 self-end rounded-br-sm backdrop-blur-md ml-auto"
                                            : "bg-gradient-to-br from-[#FF5722] to-[#E64A19] text-white self-start rounded-bl-sm shadow-lg"
                                            }`}
                                    >
                                        {bubble.text}
                                        {bubble.hasPaymentLink && (
                                            <a href="#" className="inline-flex items-center gap-1.5 mt-1.5 font-mono text-[10.5px] bg-black/30 text-white px-3 py-1.5 rounded-lg border border-white/20 hover:bg-black/50 transition-colors animate-pulse shadow-lg">
                                                <span className="font-bold tracking-wide">[Link Pembayaran]</span>
                                            </a>
                                        )}
                                    </motion.div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div className="h-[60px] border-t border-white/10 flex items-center px-4 shrink-0 mt-2 z-10">
                            <div className="w-full h-10 rounded-full bg-white/5 border border-white/10 px-4 flex items-center">
                                <span className="text-[#A3A3A3] text-[13px]">Ketik pesan...</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
