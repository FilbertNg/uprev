"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { CyberScramble } from "@/components/effects/CyberScramble";
import { MagneticCursor } from "@/components/effects/MagneticCursor";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
    return (
        <>
            <NoiseOverlay />
            <MagneticCursor />

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-[var(--color-carbon)] overflow-hidden px-6 text-center">
                {/* Subtle grid background */}
                <div
                    className="absolute inset-0 z-0 h-full w-full opacity-20"
                    style={{
                        backgroundImage: "radial-gradient(var(--color-tiger-flame) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="relative z-10 flex flex-col items-center gap-6">
                    <div className="font-display text-[120px] md:text-[180px] font-extrabold leading-none text-[var(--color-tiger-flame)]">
                        <CyberScramble finalNumber={404} duration={0.8} />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.8 }}
                        className="flex flex-col items-center gap-8"
                    >
                        <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--color-smoke)]">
                            Halaman Tidak Ditemukan
                        </h2>
                        <p className="text-[var(--color-muted)] max-w-md">
                            Sistem AI kami tidak dapat menemukan destinasi yang Anda cari. Mari kembali ke jalur yang benar.
                        </p>

                        <Link
                            href="/"
                            className="group flex items-center gap-2 rounded-full bg-[var(--color-smoke)] px-8 py-4 text-[16px] font-semibold text-[var(--color-carbon)] transition-all hover:bg-white"
                            data-magnetic
                        >
                            Kembali ke Beranda
                            <motion.span
                                className="inline-block transition-transform duration-300 group-hover:translate-x-2"
                            >
                                <ArrowRight className="h-5 w-5" />
                            </motion.span>
                        </Link>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
