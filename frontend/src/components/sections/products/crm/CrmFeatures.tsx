"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { RefreshCw, MessageCircle, Check } from "lucide-react";
import { useEffect, useState, useCallback } from "react";

/* ─── Card 1: Smart Guest Database — "Extraction" Flow ─── */

function GuestDatabaseAnimation() {
    const [phase, setPhase] = useState<"idle" | "scan" | "fly" | "done">("idle");

    const runCycle = useCallback(() => {
        setPhase("idle");
        const t1 = setTimeout(() => setPhase("scan"), 800);
        const t2 = setTimeout(() => setPhase("fly"), 1800);
        const t3 = setTimeout(() => setPhase("done"), 2800);
        const t4 = setTimeout(() => setPhase("idle"), 4500);
        return [t1, t2, t3, t4];
    }, []);

    useEffect(() => {
        let timers = runCycle();
        const loop = setInterval(() => {
            timers.forEach(clearTimeout);
            timers = runCycle();
        }, 5000);
        return () => {
            clearInterval(loop);
            timers.forEach(clearTimeout);
        };
    }, [runCycle]);

    return (
        <div className="w-full max-w-[420px] flex flex-col gap-4">
            {/* Chat Bubble */}
            <motion.div
                animate={{
                    opacity: phase === "idle" || phase === "scan" ? 1 : 0.3,
                    scale: phase === "scan" ? 1.02 : 1,
                }}
                className="relative bg-[#1A1A1A] border border-[#333] rounded-xl p-4 shadow-lg"
            >
                <div className="flex items-start gap-2 mb-2">
                    <MessageCircle size={14} className="text-[#4CAF50] mt-0.5 shrink-0" />
                    <span className="text-[10px] text-[#4CAF50] font-mono">WhatsApp Chat</span>
                </div>
                <p className="text-[12px] text-[#A3A3A3] leading-relaxed">
                    &ldquo;Hi, I&apos;m <span className="text-white font-semibold">Budi T.</span> Can I book for 2 people tomorrow? My number is <span className="text-white font-semibold">+62811***</span>&rdquo;
                </p>

                {/* Scan Line */}
                <AnimatePresence>
                    {phase === "scan" && (
                        <motion.div
                            initial={{ top: 0, opacity: 0 }}
                            animate={{ top: "100%", opacity: [0, 1, 1, 0] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF5722] to-transparent z-20"
                        />
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Flying Data Fragments */}
            <div className="relative h-6 flex items-center justify-center">
                <AnimatePresence>
                    {phase === "fly" && (
                        <>
                            <motion.span
                                initial={{ y: -20, opacity: 0, x: -40 }}
                                animate={{ y: 20, opacity: [0, 1, 1, 0.8], x: -20 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                className="absolute text-[11px] text-[#FF5722] font-mono font-bold"
                            >
                                Budi T.
                            </motion.span>
                            <motion.span
                                initial={{ y: -20, opacity: 0, x: 40 }}
                                animate={{ y: 20, opacity: [0, 1, 1, 0.8], x: 20 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, delay: 0.15 }}
                                className="absolute text-[11px] text-[#FF5722] font-mono font-bold"
                            >
                                +62811***
                            </motion.span>
                        </>
                    )}
                </AnimatePresence>
            </div>

            {/* Database Table */}
            <div className="bg-[#1A1A1A] border border-[#333] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[#111] px-4 py-2.5 border-b border-[#333] flex justify-between items-center">
                    <span className="text-[#A3A3A3] text-[10px] font-mono">live_customers.db</span>
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                </div>
                <div className="p-3 space-y-2 font-mono text-[11px]">
                    {/* Header */}
                    <div className="flex gap-2 text-[9px] text-[#666] uppercase tracking-wider pb-1 border-b border-[#333]">
                        <div className="w-1/3">Name</div>
                        <div className="w-1/3">Phone</div>
                        <div className="w-1/3 text-right">Value</div>
                    </div>
                    <div className="flex gap-2 text-[#A3A3A3] py-1">
                        <div className="w-1/3">Michael S.</div>
                        <div className="w-1/3">+62812***</div>
                        <div className="w-1/3 text-right">Rp 2.4M</div>
                    </div>
                    <div className="flex gap-2 text-[#A3A3A3] py-1">
                        <div className="w-1/3">Sarah W.</div>
                        <div className="w-1/3">+62856***</div>
                        <div className="w-1/3 text-right">Rp 850K</div>
                    </div>
                    {/* New Row — glows green when done */}
                    <motion.div
                        animate={{
                            backgroundColor: phase === "done" ? "rgba(76,175,80,0.15)" : "rgba(51,51,51,0.3)",
                            borderColor: phase === "done" ? "rgba(76,175,80,0.4)" : "transparent",
                        }}
                        transition={{ duration: 0.4 }}
                        className="flex gap-2 rounded px-2 py-1.5 -mx-1 border"
                    >
                        <motion.div
                            animate={{ opacity: phase === "fly" || phase === "done" ? 1 : 0 }}
                            className="w-1/3 text-white font-semibold"
                        >
                            Budi T.
                        </motion.div>
                        <motion.div
                            animate={{ opacity: phase === "fly" || phase === "done" ? 1 : 0 }}
                            transition={{ delay: 0.15 }}
                            className="w-1/3 text-white"
                        >
                            +62811***
                        </motion.div>
                        <motion.div
                            animate={{ opacity: phase === "done" ? 1 : 0 }}
                            className="w-1/3 text-right text-[#4CAF50] font-semibold"
                        >
                            + Rp 1.2M
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

/* ─── Card 2: WhatsApp Promo Blast — "Ripple Effect" ─── */

function WhatsAppBlastAnimation() {
    const [active, setActive] = useState(false);

    useEffect(() => {
        const loop = setInterval(() => {
            setActive(true);
            setTimeout(() => setActive(false), 2500);
        }, 3500);
        // Trigger first one
        setActive(true);
        const firstReset = setTimeout(() => setActive(false), 2500);
        return () => {
            clearInterval(loop);
            clearTimeout(firstReset);
        };
    }, []);

    const phonePositions = [
        { x: -90, y: -60, delay: 0.4 },
        { x: 90, y: -50, delay: 0.6 },
        { x: -80, y: 50, delay: 0.5 },
        { x: 85, y: 55, delay: 0.7 },
        { x: -40, y: -85, delay: 0.3 },
        { x: 45, y: 80, delay: 0.8 },
    ];

    return (
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
            {/* Concentric Ripple Rings */}
            {[60, 90, 120].map((size, i) => (
                <motion.div
                    key={i}
                    animate={active ? {
                        scale: [0.5, 1.5],
                        opacity: [0.6, 0],
                    } : { scale: 0.5, opacity: 0 }}
                    transition={{
                        duration: 1.2,
                        delay: i * 0.25,
                        ease: "easeOut",
                    }}
                    className="absolute rounded-full border-2 border-[#FF5722]"
                    style={{ width: size, height: size }}
                />
            ))}

            {/* Center Core — WA Icon */}
            <motion.div
                animate={active ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ duration: 0.4 }}
                className="relative z-10 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.3)]"
            >
                <svg viewBox="0 0 24 24" className="w-7 h-7 text-white fill-current">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                </svg>
            </motion.div>

            {/* Flying Messages & Phone Nodes */}
            {phonePositions.map((pos, i) => (
                <div key={i} className="absolute" style={{ left: `calc(50% + ${pos.x}px)`, top: `calc(50% + ${pos.y}px)`, transform: 'translate(-50%, -50%)' }}>
                    {/* Message flying out */}
                    <AnimatePresence>
                        {active && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{ delay: pos.delay, duration: 0.3 }}
                                className="relative"
                            >
                                {/* Phone icon that turns green */}
                                <motion.div
                                    initial={{ backgroundColor: "rgba(51,51,51,1)" }}
                                    animate={{ backgroundColor: active ? "rgba(76,175,80,0.3)" : "rgba(51,51,51,1)" }}
                                    transition={{ delay: pos.delay + 0.5, duration: 0.3 }}
                                    className="w-8 h-8 rounded-lg border border-[#555] flex items-center justify-center"
                                >
                                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                                        <motion.path
                                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
                                            animate={{ fill: active ? "#4CAF50" : "#666" }}
                                            transition={{ delay: pos.delay + 0.5 }}
                                        />
                                    </svg>
                                </motion.div>
                                {/* "Claimed!" label */}
                                <motion.span
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: pos.delay + 0.7, duration: 0.2 }}
                                    className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[7px] text-[#4CAF50] font-mono whitespace-nowrap"
                                >
                                    {i % 2 === 0 ? "Opened!" : "Claimed!"}
                                </motion.span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}

/* ─── Card 3: Multi-Inventory Sync — "Triple Node" ─── */

function InventorySyncAnimation() {
    const [stocks, setStocks] = useState([10, 10, 10]);
    const [syncingFrom, setSyncingFrom] = useState<number | null>(null);
    const [showChecks, setShowChecks] = useState(false);

    useEffect(() => {
        const cycle = () => {
            // Step 1: "Click" card B (index 1)
            setSyncingFrom(1);
            setShowChecks(false);

            // Step 2: Decrement after a pause
            setTimeout(() => {
                setStocks(prev => {
                    const next = [...prev];
                    next[1] = next[1] <= 1 ? 10 : next[1] - 1;
                    return next;
                });
            }, 800);

            // Step 3: Sync to others
            setTimeout(() => {
                setStocks(prev => {
                    const val = prev[1];
                    return [val, val, val];
                });
            }, 1400);

            // Step 4: Show checkmarks
            setTimeout(() => {
                setShowChecks(true);
                setSyncingFrom(null);
            }, 1800);

            // Step 5: Reset checks
            setTimeout(() => {
                setShowChecks(false);
            }, 3200);
        };

        cycle();
        const loop = setInterval(cycle, 4000);
        return () => clearInterval(loop);
    }, []);

    const labels = ["Platform 1", "Platform 2", "Platform 3"];
    const colors = ["#90CAF9", "#FF5722", "#FFB74D"];

    return (
        <div className="flex flex-col items-center gap-4 w-full max-w-[340px]">
            {/* Three Inventory Nodes */}
            <div className="flex items-center gap-3 w-full justify-center">
                {stocks.map((stock, i) => (
                    <div key={i} className="flex flex-col items-center gap-2">
                        <motion.div
                            animate={{
                                borderColor: syncingFrom === i ? colors[i] : "#333",
                                boxShadow: syncingFrom === i ? `0 0 20px ${colors[i]}40` : "none",
                            }}
                            className="w-[80px] h-[80px] rounded-2xl bg-[#1A1A1A] border-2 flex flex-col items-center justify-center relative"
                        >
                            {/* Sale tag */}
                            <AnimatePresence>
                                {syncingFrom === i && (
                                    <motion.div
                                        initial={{ scale: 0, y: -10 }}
                                        animate={{ scale: 1, y: 0 }}
                                        exit={{ scale: 0 }}
                                        className="absolute -top-3 bg-[#FF5722] text-white text-[8px] font-bold px-2 py-0.5 rounded-full"
                                    >
                                        SOLD
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <span className="text-[9px] text-[#666] mb-0.5">Stock</span>
                            <motion.span
                                key={stock}
                                initial={{ y: -8, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="text-white font-mono text-2xl font-bold"
                            >
                                {stock}
                            </motion.span>

                            {/* Green check */}
                            <AnimatePresence>
                                {showChecks && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                        transition={{ delay: i * 0.1 }}
                                        className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-[#4CAF50] flex items-center justify-center"
                                    >
                                        <Check size={10} className="text-white" strokeWidth={3} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                        <span className="text-[9px] font-mono" style={{ color: colors[i] }}>{labels[i]}</span>
                    </div>
                ))}
            </div>

            {/* Sync indicator */}
            <div className="flex items-center gap-2">
                <motion.div
                    animate={{ rotate: syncingFrom !== null ? 360 : 0 }}
                    transition={{ duration: 0.8, ease: "linear" }}
                >
                    <RefreshCw size={16} className="text-[#4CAF50]" />
                </motion.div>
                <motion.span
                    animate={{ opacity: syncingFrom !== null ? 1 : 0.4 }}
                    className="text-[10px] font-mono text-[#4CAF50]"
                >
                    {syncingFrom !== null ? "Syncing..." : "All synced"}
                </motion.span>
            </div>

            {/* Pulse lines connecting nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ overflow: 'visible' }}>
                <AnimatePresence>
                    {syncingFrom !== null && (
                        <motion.line
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.3 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            x1="33%" y1="50%" x2="66%" y2="50%"
                            stroke="#4CAF50" strokeWidth="2" strokeDasharray="4 4"
                        />
                    )}
                </AnimatePresence>
            </svg>
        </div>
    );
}

/* ─── Main Component ─── */

export function CrmFeatures() {
    const { t } = useLanguage();

    return (
        <section className="py-24 px-4 sm:px-6 bg-[var(--color-carbon)] relative">
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                    {/* Card 1: Smart Guest Database — Full Width */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="md:col-span-2 bg-[#222222] border border-[#333333] rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row gap-10 group overflow-hidden relative min-h-[350px]"
                    >
                        <div className="md:w-1/2 relative z-10 flex flex-col justify-center">
                            <h3 className="font-display text-[28px] md:text-[32px] font-bold text-[#F5F5F5] mb-4">
                                {t("Smart Guest Database", "Smart Guest Database")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed max-w-[450px]">
                                {t(
                                    "Sistem otomatis yang merekam setiap percakapan AI dengan pelanggan. Nama, Nomor WhatsApp, dan Riwayat Transaksi tersimpan rapi untuk aset promosi jangka panjang.",
                                    "Automated system that records every AI conversation with customers. Name, WhatsApp Number, and Transaction History are neatly stored as a long-term promotional asset."
                                )}
                            </p>
                        </div>
                        <div className="md:w-1/2 mt-auto relative z-10 flex items-center justify-center pt-8 md:pt-0">
                            <GuestDatabaseAnimation />
                        </div>
                    </motion.div>

                    {/* Card 2: WhatsApp Promo Blast */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-[#222222] border border-[#333333] rounded-[32px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
                    >
                        <div className="relative z-10 mb-8">
                            <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4">
                                {t("WhatsApp Promo Blast", "WhatsApp Promo Blast")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Fitur broadcast pesan untuk mengirim diskon eksklusif ke database pelanggan lama, memancing repeat booking tanpa biaya iklan tambahan.",
                                    "Broadcast message feature to send exclusive discounts to old customer databases, enticing repeat bookings without additional advertising costs."
                                )}
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-auto flex-1 relative z-10">
                            <WhatsAppBlastAnimation />
                        </div>
                    </motion.div>

                    {/* Card 3: Multi-Inventory Sync */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-[#222222] border border-[#333333] rounded-[32px] p-10 flex flex-col justify-between group overflow-hidden relative min-h-[400px]"
                    >
                        <div className="relative z-10 mb-8">
                            <h3 className="font-display text-[24px] font-bold text-[#F5F5F5] mb-4">
                                {t("Multi-Inventory Sync", "Multi-Inventory Sync")}
                            </h3>
                            <p className="font-inter text-[#A3A3A3] leading-relaxed">
                                {t(
                                    "Saat satu produk/kamar terjual di salah satu platform, stok otomatis berkurang detik itu juga di platform lainnya. Mencegah overselling di semua saluran penjualan.",
                                    "When one product/room is sold on any platform, stock automatically decreases that exact second on all platforms. Prevents overselling across all sales channels."
                                )}
                            </p>
                        </div>
                        <div className="flex justify-center items-center mt-auto flex-1 relative z-10">
                            <InventorySyncAnimation />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
