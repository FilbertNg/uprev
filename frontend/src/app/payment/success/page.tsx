"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";
import { MagneticCursor } from "@/components/effects/MagneticCursor";
import { CheckCircle, MessageCircle, ArrowRight } from "lucide-react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const txId = searchParams.get("tx_id") || "";
    const pkgName = searchParams.get("pkg") || "";
    const custName = searchParams.get("name") || "";

    const meetUrl = `/api/meet/success_payment?tx_id=${encodeURIComponent(txId)}&pkg_name=${encodeURIComponent(pkgName)}&cust_name=${encodeURIComponent(custName)}`;

    return (
        <>
            <NoiseOverlay />
            <MagneticCursor />

            <main className="relative z-10 flex min-h-screen flex-col items-center justify-center bg-[var(--color-carbon)] overflow-hidden px-6 text-center">
                {/* Subtle grid background */}
                <div
                    className="absolute inset-0 z-0 h-full w-full opacity-15"
                    style={{
                        backgroundImage:
                            "radial-gradient(rgba(34,197,94,0.6) 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                />

                <div className="relative z-10 flex flex-col items-center gap-6 max-w-lg">
                    {/* Animated check icon */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2,
                        }}
                        className="flex h-28 w-28 items-center justify-center rounded-full bg-green-500/20 border-2 border-green-400/50"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 0.4 }}
                        >
                            <CheckCircle className="h-14 w-14 text-green-400" />
                        </motion.div>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="font-display text-4xl md:text-5xl font-extrabold text-green-400"
                    >
                        Pembayaran Berhasil
                    </motion.h1>

                    {/* Description */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.1, duration: 0.6 }}
                        className="flex flex-col gap-3"
                    >
                        <p className="text-[var(--color-muted)] text-lg">
                            Terima kasih, <span className="text-[var(--color-smoke)] font-semibold">{custName || "Pelanggan"}</span>!
                            Pembayaran Anda untuk paket{" "}
                            <span className="text-green-400 font-semibold">{pkgName || "UpRev"}</span>{" "}
                            telah kami terima.
                        </p>
                        <p className="text-[var(--color-muted)] text-sm">
                            Silakan hubungi tim kami via WhatsApp untuk memulai proses pengerjaan.
                        </p>
                    </motion.div>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.4, duration: 0.6 }}
                        className="flex flex-col sm:flex-row gap-4 mt-4"
                    >
                        <a
                            href={meetUrl}
                            className="group flex items-center gap-2 rounded-full bg-green-500 px-8 py-4 text-[16px] font-semibold text-white transition-all hover:bg-green-400 hover:shadow-lg hover:shadow-green-500/25"
                            data-magnetic
                        >
                            <MessageCircle className="h-5 w-5" />
                            Hubungi Tim via WhatsApp
                        </a>

                        <Link
                            href="/"
                            className="group flex items-center gap-2 rounded-full border border-[var(--color-border-light)] bg-transparent px-8 py-4 text-[16px] font-semibold text-[var(--color-smoke)] transition-all hover:bg-[var(--color-surface)]"
                            data-magnetic
                        >
                            Kembali ke Beranda
                            <motion.span className="inline-block transition-transform duration-300 group-hover:translate-x-2">
                                <ArrowRight className="h-5 w-5" />
                            </motion.span>
                        </Link>
                    </motion.div>

                    {/* Transaction ID */}
                    {txId && (
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8 }}
                            className="text-xs text-[var(--color-muted)] mt-4"
                        >
                            ID Transaksi: <code className="text-[var(--color-smoke)]">{txId}</code>
                        </motion.p>
                    )}
                </div>
            </main>
        </>
    );
}

export default function PaymentSuccessPage() {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-screen items-center justify-center bg-[var(--color-carbon)]">
                    <div className="animate-spin h-8 w-8 border-2 border-green-400 border-t-transparent rounded-full" />
                </div>
            }
        >
            <SuccessContent />
        </Suspense>
    );
}
