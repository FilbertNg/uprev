"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function AiCsFeatures() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-4 sm:px-6 bg-[var(--color-carbon)] relative">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1: Instant Engagement — Zap Speed with Connected Trails */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-[#222222] border border-[#333333] rounded-[32px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
                    >
                        <div className="relative z-10 mb-12">
                            <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4">
                                {t("Instant Engagement", "Instant Engagement")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed relative z-10">
                                {t(
                                    "Merespon pertanyaan pelanggan secara instan. Menangkap 'Hot Leads' sebelum mereka berpindah ke kompetitor.",
                                    "Respond to customer inquiries instantly. Capture 'Hot Leads' before they move to competitors."
                                )}
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-auto flex-1 relative z-10">
                            {/* Unified SVG — Zap with idle pulse + connected trails on hover */}
                            <svg viewBox="0 0 340 180" className="w-full h-auto max-h-[180px]" fill="none">
                                {/* User Chat Bubble (top-left) */}
                                <rect x="5" y="30" width="80" height="40" rx="12" fill="#333333" stroke="#444444" strokeWidth="1" className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                <rect x="16" y="42" width="45" height="3" rx="1.5" fill="#555555" className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
                                <rect x="16" y="50" width="30" height="3" rx="1.5" fill="#555555" className="opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Speed trail: User bubble → Zap center */}
                                <path d="M 85 50 C 110 40, 125 60, 140 85" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="6 4" className="opacity-0 group-hover:opacity-80 transition-opacity duration-700">
                                    <animate attributeName="stroke-dashoffset" values="20;0" dur="0.5s" repeatCount="indefinite" />
                                </path>

                                {/* Central Zap — BIGGER with idle pulse glow */}
                                <g transform="translate(120, 35)">
                                    {/* Idle pulse ring */}
                                    <circle cx="50" cy="55" r="45" fill="#FF5722" opacity="0.08">
                                        <animate attributeName="r" values="40;50;40" dur="2s" repeatCount="indefinite" />
                                        <animate attributeName="opacity" values="0.05;0.15;0.05" dur="2s" repeatCount="indefinite" />
                                    </circle>
                                    {/* Glow circle behind bolt */}
                                    <circle cx="50" cy="55" r="38" fill="#FF5722" opacity="0.12" className="group-hover:opacity-30 transition-opacity duration-500" />
                                    {/* Zap bolt path — bigger */}
                                    <path d="M 42 20 L 28 58 L 44 58 L 34 90 L 72 48 L 54 48 L 65 20 Z" fill="#FF5722" stroke="#FF5722" strokeWidth="0.5" className="drop-shadow-[0_0_15px_rgba(255,87,34,0.9)]" />
                                </g>

                                {/* Speed trail: Zap center → AI reply bubble */}
                                <path d="M 215 95 C 235 105, 250 120, 258 112" fill="none" stroke="#FF5722" strokeWidth="2" strokeDasharray="6 4" className="opacity-0 group-hover:opacity-80 transition-opacity duration-700">
                                    <animate attributeName="stroke-dashoffset" values="20;0" dur="0.5s" repeatCount="indefinite" />
                                </path>

                                {/* AI Reply Bubble (bottom-right) */}
                                <rect x="255" y="100" width="80" height="40" rx="12" fill="#FF5722" fillOpacity="0.85" stroke="#FF5722" strokeWidth="1" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transitionDelay: '300ms' }} />
                                <rect x="268" y="112" width="50" height="3" rx="1.5" fill="white" fillOpacity="0.6" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transitionDelay: '300ms' }} />
                                <rect x="268" y="120" width="35" height="3" rx="1.5" fill="white" fillOpacity="0.4" className="opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{ transitionDelay: '300ms' }} />
                            </svg>
                        </div>
                    </motion.div>

                    {/* Card 2: Smart Selling & Persuasion */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-[#222222] border border-[#333333] rounded-[32px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
                    >
                        <div className="relative z-10 mb-2">
                            <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4">
                                {t("Smart Selling & Persuasion", "Smart Selling & Persuasion")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Bukan robot kaku. AI kami dilatih untuk berkomunikasi luwes, menjelaskan produk, dan mengarahkan ke pembelian (Closing).",
                                    "Not a rigid robot. Our AI is trained to communicate fluently, explain products, and drive toward purchase (Closing)."
                                )}
                            </p>
                        </div>
                        <div className="mt-auto bg-[#1A1A1A] rounded-2xl p-4 border border-[#333333] relative z-10 mb-8">
                            <div className="font-mono text-[13px] text-[#A3A3A3] flex flex-col gap-2">
                                {/* Step 1: analyzing_intent with loading dots */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 0.5 }}
                                    className="text-[#F5F5F5] opacity-50 flex items-center gap-2"
                                >
                                    <span>&gt; analyzing_intent</span>
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ duration: 1.2, repeat: Infinity }}
                                    >
                                        ...
                                    </motion.span>
                                </motion.div>
                                {/* Step 2: intent_match after 1.5s */}
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.4, delay: 1.5 }}
                                    className="text-[#4CAF50]"
                                >
                                    &gt; intent_match: pricing_inquiry ✓
                                </motion.div>
                                {/* Step 3: AI typewriter after 2.2s */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.3, delay: 2.2 }}
                                    className="flex items-start gap-2 mt-2"
                                >
                                    <span className="text-[#FF5722]">AI:</span>
                                    <span className="overflow-hidden whitespace-nowrap border-r-2 border-[#FF5722] animate-typing block" style={{ width: '0%', animationFillMode: 'forwards', animationDelay: '2.5s' }}>
                                        &quot;Paket Premium sedang diskon khusus hari ini. Ingin saya buatkan link?&quot;
                                    </span>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: Auto-Qualification */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[#222222] border border-[#333333] rounded-[32px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
                    >
                        <div className="relative z-10 mb-12">
                            <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4">
                                {t("Auto-Qualification", "Auto-Qualification")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Otomatis menyaring mana pelanggan serius dan mana yang hanya bertanya (Window Shopper), menghemat waktu tim sales Anda.",
                                    "Automatically filters serious buyers from window shoppers, saving your sales team valuable time."
                                )}
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-auto flex-1 relative z-10">
                            {/* Organic Physics Funnel Animation */}
                            <svg width="220" height="180" viewBox="0 0 220 180" fill="none" className="group-hover:scale-105 transition-transform duration-700 ease-out">

                                {/* Funnel Body (Physical Shape) */}
                                <path d="M 20 30 C 60 90, 85 110, 85 160" stroke="#333333" strokeWidth="3" strokeLinecap="round" className="group-hover:stroke-[#FF5722] transition-colors duration-700" />
                                <path d="M 200 30 C 160 90, 135 110, 135 160" stroke="#333333" strokeWidth="3" strokeLinecap="round" className="group-hover:stroke-[#FF5722] transition-colors duration-700" />
                                <ellipse cx="110" cy="30" rx="90" ry="15" stroke="#333333" strokeWidth="2" strokeDasharray="4 4" fill="rgba(26,26,26,0.5)" className="group-hover:stroke-[#FF5722]/50 transition-colors duration-700" />

                                {/* Glowing destination point */}
                                <ellipse cx="110" cy="160" rx="25" ry="8" fill="#FF5722" className="opacity-0 group-hover:opacity-30 transition-opacity duration-1000" />

                                {/* Rejected Gray Balls */}
                                <g className="group-hover:opacity-100 opacity-60 transition-opacity duration-500">
                                    <circle cx="0" cy="0" r="4" fill="#666666">
                                        <animateTransform attributeName="transform" type="translate" values="60,-10; 40,30; 10,60; -20,100" dur="2.5s" repeatCount="indefinite" keyTimes="0; 0.3; 0.6; 1" keySplines="0.4 0 1 1; 0 0.4 1 1; 0.4 0 1 1" calcMode="spline" />
                                        <animate attributeName="opacity" values="0; 1; 1; 0" dur="2.5s" keyTimes="0; 0.2; 0.7; 1" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="0" cy="0" r="5" fill="#555555">
                                        <animateTransform attributeName="transform" type="translate" values="160,-20; 180,35; 200,60; 230,120" dur="3s" repeatCount="indefinite" begin="0.8s" keyTimes="0; 0.4; 0.7; 1" keySplines="0.4 0 1 1; 0 0.4 1 1; 0.4 0 1 1" calcMode="spline" />
                                        <animate attributeName="opacity" values="0; 1; 1; 0" dur="3s" begin="0.8s" keyTimes="0; 0.3; 0.8; 1" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="0" cy="0" r="4" fill="#777777">
                                        <animateTransform attributeName="transform" type="translate" values="100,-10; 70,70; 40,50; -10,90" dur="2.8s" repeatCount="indefinite" begin="1.5s" keyTimes="0; 0.35; 0.6; 1" keySplines="0.4 0 1 1; 0 0.4 1 1; 0.4 0 1 1" calcMode="spline" />
                                        <animate attributeName="opacity" values="0; 1; 1; 0" dur="2.8s" begin="1.5s" keyTimes="0; 0.2; 0.8; 1" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                {/* Accepted Orange Balls — smoother trajectory */}
                                <g>
                                    <circle cx="0" cy="0" r="6" fill="#FF5722" className="drop-shadow-[0_0_8px_rgba(255,87,34,0.8)]">
                                        <animateTransform attributeName="transform" type="translate" values="115,-20; 112,20; 110,50; 110,80; 110,110; 110,140; 110,180" dur="3.5s" repeatCount="indefinite" keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.8; 1" keySplines="0.4 0 0.6 1; 0.3 0 0.6 1; 0.3 0 0.6 1; 0.3 0 0.6 1; 0.3 0 0.6 1; 0.4 0 1 1" calcMode="spline" />
                                        <animate attributeName="opacity" values="0; 1; 1; 1; 1; 1; 0" dur="3.5s" keyTimes="0; 0.1; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite" />
                                    </circle>
                                    <circle cx="0" cy="0" r="5" fill="#FFB74D" className="drop-shadow-[0_0_8px_rgba(255,183,77,0.8)]">
                                        <animateTransform attributeName="transform" type="translate" values="105,-10; 108,25; 110,55; 110,85; 110,115; 110,150; 110,190" dur="3.2s" begin="1.6s" repeatCount="indefinite" keyTimes="0; 0.15; 0.3; 0.45; 0.6; 0.8; 1" keySplines="0.4 0 0.6 1; 0.3 0 0.6 1; 0.3 0 0.6 1; 0.3 0 0.6 1; 0.3 0 0.6 1; 0.4 0 1 1" calcMode="spline" />
                                        <animate attributeName="opacity" values="0; 1; 1; 1; 1; 1; 0" dur="3.2s" begin="1.6s" keyTimes="0; 0.1; 0.3; 0.5; 0.7; 0.85; 1" repeatCount="indefinite" />
                                    </circle>
                                </g>

                                {/* Filter Lines */}
                                <path d="M 45 60 L 175 60" stroke="#333333" strokeWidth="1" strokeDasharray="2 4" opacity="0.4" />
                                <path d="M 65 90 L 155 90" stroke="#333333" strokeWidth="1" strokeDasharray="2 4" opacity="0.5" />
                                <path d="M 85 120 L 135 120" stroke="#333333" strokeWidth="1" strokeDasharray="2 4" opacity="0.6" />

                            </svg>
                        </div>
                    </motion.div>

                    {/* Card 4: 24/7 Operations — Analog Clock with Activity Pings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-[#222222] border border-[#333333] rounded-[32px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
                    >
                        <div className="relative z-10 mb-12">
                            <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4">
                                {t("24/7 Operations", "24/7 Operations")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Bisnis Anda tetap buka dan berjualan bahkan saat kantor tutup atau hari libur nasional.",
                                    "Your business remains open and selling even when the office is closed or on national holidays."
                                )}
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-auto flex-1 relative z-10">
                            {/* Analog Clock with Activity Pings */}
                            <div className="relative w-[180px] h-[180px]">
                                {/* Background ambient glow — shifts amber ↔ blue */}
                                <motion.div
                                    animate={{
                                        backgroundColor: [
                                            "rgba(255, 183, 77, 0.12)",
                                            "rgba(255, 183, 77, 0.2)",
                                            "rgba(144, 202, 249, 0.12)",
                                            "rgba(144, 202, 249, 0.2)",
                                            "rgba(255, 183, 77, 0.12)",
                                        ]
                                    }}
                                    transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                    className="absolute inset-[-20px] rounded-full blur-[30px] z-0"
                                />

                                {/* Clock SVG */}
                                <svg viewBox="0 0 200 200" className="w-full h-full relative z-10">
                                    {/* Clock face circle */}
                                    <circle cx="100" cy="100" r="88" fill="none" stroke="#444" strokeWidth="2" />
                                    <circle cx="100" cy="100" r="85" fill="rgba(26,26,26,0.6)" />

                                    {/* Hour marks */}
                                    {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((h) => {
                                        const angle = (h * 30 - 90) * (Math.PI / 180);
                                        const x1 = 100 + 72 * Math.cos(angle);
                                        const y1 = 100 + 72 * Math.sin(angle);
                                        const x2 = 100 + 80 * Math.cos(angle);
                                        const y2 = 100 + 80 * Math.sin(angle);
                                        return (
                                            <line key={h} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#666" strokeWidth={h % 3 === 0 ? 3 : 1.5} strokeLinecap="round" />
                                        );
                                    })}

                                    {/* Center dot */}
                                    <circle cx="100" cy="100" r="4" fill="#FF5722" />

                                    {/* Hour hand — rotates 360° in 10s */}
                                    <line x1="100" y1="100" x2="100" y2="45" stroke="#FF5722" strokeWidth="3" strokeLinecap="round">
                                        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="10s" repeatCount="indefinite" />
                                    </line>

                                    {/* Minute hand — rotates faster */}
                                    <line x1="100" y1="100" x2="100" y2="30" stroke="#A3A3A3" strokeWidth="1.5" strokeLinecap="round" opacity="0.6">
                                        <animateTransform attributeName="transform" type="rotate" from="0 100 100" to="360 100 100" dur="2.5s" repeatCount="indefinite" />
                                    </line>

                                    {/* Orange ping pulses at 12, 3, 6, 9 positions */}
                                    {[
                                        { cx: 100, cy: 15 },
                                        { cx: 185, cy: 100 },
                                        { cx: 100, cy: 185 },
                                        { cx: 15, cy: 100 },
                                    ].map((pos, i) => (
                                        <circle key={i} cx={pos.cx} cy={pos.cy} r="4" fill="#FF5722" opacity="0.6">
                                            <animate attributeName="r" values="3;8;3" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                                            <animate attributeName="opacity" values="0.6;0;0.6" dur="2s" begin={`${i * 0.5}s`} repeatCount="indefinite" />
                                        </circle>
                                    ))}
                                </svg>

                                {/* Chat notification bubbles floating around clock */}
                                <motion.div
                                    animate={{ y: [-3, 3, -3], opacity: [0.7, 1, 0.7] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="absolute -top-2 -right-4 text-[16px]"
                                >
                                    💬
                                </motion.div>
                                <motion.div
                                    animate={{ y: [3, -3, 3], opacity: [0.5, 0.9, 0.5] }}
                                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
                                    className="absolute -bottom-1 -left-3 text-[14px]"
                                >
                                    💬
                                </motion.div>
                                <motion.div
                                    animate={{ y: [-2, 4, -2], opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                                    className="absolute top-1/2 -right-6 text-[12px]"
                                >
                                    💬
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>

            {/* Global styles for typing animation */}
            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes typing {
                    from { width: 0% }
                    to { width: 100% }
                }
                .animate-typing {
                    animation: typing 3s steps(40, end) infinite alternate;
                }
            `}} />
        </section>
    );
}
