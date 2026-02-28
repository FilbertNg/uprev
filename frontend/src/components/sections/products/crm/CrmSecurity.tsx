"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Lock, ShieldCheck, Database, Key } from "lucide-react";

export function CrmSecurity() {
    const { t } = useLanguage();

    const features = [
        {
            icon: <UsersIcon className="w-6 h-6 text-[#FF5722]" />,
            title: "Role-Based Access",
            desc: "Kontrol akses berlapis untuk staf dan manajemen.",
            descEn: "Multi-layered access control for staff and management.",
            delay: 0.1
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-[#FF5722]" />,
            title: "API Shield",
            desc: "Perlindungan penuh terhadap injeksi data eksternal.",
            descEn: "Full protection against external data injection.",
            delay: 0.2
        },
        {
            icon: <Database className="w-6 h-6 text-[#FF5722]" />,
            title: "Row-Level Security (RLS)",
            desc: "Memastikan isolasi data secara presisi.",
            descEn: "Ensures precise data isolation.",
            delay: 0.3
        },
        {
            icon: <Key className="w-6 h-6 text-[#FF5722]" />,
            title: "Auto-Encryption",
            desc: "Enkripsi tingkat tinggi untuk seluruh data sensitif pelanggan.",
            descEn: "High-level encryption for all sensitive customer data.",
            delay: 0.4
        }
    ];

    return (
        <section className="min-h-screen py-32 px-4 sm:px-6 bg-[#0A0A0A] relative flex items-center overflow-hidden border-t border-[#333333]/30">
            {/* Fine grain noise background for technical feel */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.15] mix-blend-overlay pointer-events-none" />

            <div className="max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 items-center relative z-10">

                {/* Left Side: Copy & Features */}
                <div>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block mb-6"
                    >
                        <span className="font-inter text-[14px] font-bold text-[#FF5722] tracking-[0.2em] relative before:absolute before:inset-0 before:bg-[#FF5722]/10 before:rounded-full before:-m-1 before:z-[-1]">
                            {t("ENTERPRISE-GRADE SECURITY", "ENTERPRISE-GRADE SECURITY")}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="font-display text-[40px] md:text-[56px] font-extrabold text-[#F5F5F5] leading-tight mb-12"
                    >
                        {t("Arsitektur Keamanan Standar Perbankan.", "Banking-Standard Security Architecture.")}
                    </motion.h2>

                    <div className="space-y-6">
                        {features.map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: feature.delay }}
                                className="flex gap-4 items-start"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#1A1A1A] border border-[#333333] flex items-center justify-center shrink-0">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h4 className="font-display text-[20px] font-bold text-[#F5F5F5] mb-1">{feature.title}</h4>
                                    <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                        {t(feature.desc, feature.descEn)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Rotating Shield SVG Animation */}
                <div className="relative h-[500px] flex items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, type: "spring" }}
                        className="relative w-[400px] h-[400px] flex items-center justify-center"
                    >
                        {/* Core Padlock inside */}
                        <div className="absolute z-20 w-32 h-32 rounded-full bg-[#1A1A1A] border-2 border-[#FF5722]/50 shadow-[0_0_50px_rgba(255,87,34,0.3)] flex items-center justify-center">
                            <Lock className="w-12 h-12 text-[#FF5722]" />
                        </div>

                        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                            <defs>
                                <linearGradient id="ring-glow-1" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#FF5722" stopOpacity="0.9" />
                                    <stop offset="100%" stopColor="#FF5722" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="ring-glow-2" x1="100%" y1="0%" x2="0%" y2="100%">
                                    <stop offset="0%" stopColor="#FF8A65" stopOpacity="0.8" />
                                    <stop offset="100%" stopColor="#FF5722" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="ring-glow-3" x1="0%" y1="100%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#FF5722" stopOpacity="0.7" />
                                    <stop offset="100%" stopColor="#FFB74D" stopOpacity="0.1" />
                                </linearGradient>
                                <linearGradient id="ring-glow-4" x1="50%" y1="0%" x2="50%" y2="100%">
                                    <stop offset="0%" stopColor="#FFB74D" stopOpacity="0.6" />
                                    <stop offset="100%" stopColor="#FF5722" stopOpacity="0.15" />
                                </linearGradient>
                            </defs>

                            {/* Ring 1 — Layer 1: Role-Based Access (innermost, fast CW) */}
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                style={{ originX: "50%", originY: "50%" }}
                            >
                                <circle cx="200" cy="200" r="90" stroke="#FF5722" strokeWidth="1.5" opacity="0.25" />
                                <circle cx="200" cy="200" r="90" stroke="url(#ring-glow-1)" strokeWidth="2.5" strokeDasharray="120 60" opacity="0.7" />
                                {/* Orbital dot */}
                                <circle cx="290" cy="200" r="3.5" fill="#FF5722" opacity="0.9" />
                            </motion.g>

                            {/* Ring 2 — Layer 2: API Shield (CCW, medium speed) */}
                            <motion.g
                                animate={{ rotate: -360 }}
                                transition={{ duration: 13, repeat: Infinity, ease: "linear" }}
                                style={{ originX: "50%", originY: "50%" }}
                            >
                                <circle cx="200" cy="200" r="120" stroke="#FF5722" strokeWidth="1.5" opacity="0.2" />
                                <circle cx="200" cy="200" r="120" stroke="url(#ring-glow-2)" strokeWidth="3" strokeDasharray="80 40 30 40" opacity="0.65" />
                                {/* Orbital dot */}
                                <circle cx="320" cy="200" r="4" fill="#FF8A65" opacity="0.9" />
                            </motion.g>

                            {/* Ring 3 — Layer 3: Row-Level Security (CW, slow) */}
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                style={{ originX: "50%", originY: "50%" }}
                            >
                                <circle cx="200" cy="200" r="150" stroke="#FF5722" strokeWidth="1.5" opacity="0.2" />
                                <circle cx="200" cy="200" r="150" stroke="url(#ring-glow-3)" strokeWidth="2.5" strokeDasharray="60 30 20 30" opacity="0.6" />
                                {/* Orbital dot */}
                                <circle cx="350" cy="200" r="4.5" fill="#FF5722" opacity="0.85" />
                            </motion.g>

                            {/* Ring 4 — Layer 4: Auto-Encryption (CCW, slowest, outermost) */}
                            <motion.g
                                animate={{ rotate: -360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                style={{ originX: "50%", originY: "50%" }}
                            >
                                <circle cx="200" cy="200" r="185" stroke="#FF5722" strokeWidth="1.5" opacity="0.15" />
                                <circle cx="200" cy="200" r="185" stroke="url(#ring-glow-4)" strokeWidth="3.5" strokeDasharray="40 20 10 20" opacity="0.55" />
                                {/* Orbital dot */}
                                <circle cx="385" cy="200" r="5" fill="#FFB74D" opacity="0.8" />
                            </motion.g>
                        </svg>

                        {/* Connection nodes to the shield */}
                        <div className="absolute top-1/2 left-0 w-[50px] h-[1px] bg-[#FF5722]/50 -translate-y-1/2 -translate-x-full"></div>
                        <div className="absolute top-1/2 right-0 w-[50px] h-[1px] bg-[#FF5722]/50 -translate-y-1/2 translate-x-full"></div>
                        <div className="absolute left-1/2 top-0 w-[1px] h-[50px] bg-[#FF5722]/50 -translate-x-1/2 -translate-y-full"></div>
                        <div className="absolute left-1/2 bottom-0 w-[1px] h-[50px] bg-[#FF5722]/50 -translate-x-1/2 translate-y-full"></div>

                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// Minimal local UsersIcon since we are hitting import issues on some standard ones depending on lucide version available
function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    );
}
