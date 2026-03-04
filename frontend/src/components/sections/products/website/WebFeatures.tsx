"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect } from "react";
import { Lock, User, UserPlus } from "lucide-react";

export function WebFeatures() {
  const { t } = useLanguage();

  return (
    <section className="w-full relative overflow-hidden py-32 bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* ── CARD 1: Ultra-Fast Architecture ── */}
          <div className="group rounded-[24px] bg-surface border border-border-light p-8 md:p-10 flex flex-col gap-8 transition-colors hover:border-tiger-flame/50 overflow-hidden relative">
            {/* Visual */}
            <div className="w-full aspect-[2/1] bg-carbon/50 rounded-xl border border-border-light/50 flex items-center justify-center relative overflow-hidden">
              <ScoreAnimation />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-smoke text-[24px] font-bold">
                {t("Ultra-Fast Loading Website", "Ultra-Fast Loading Website")}
              </h3>
              <p className="font-inter text-muted text-[16px] leading-relaxed">
                {t(
                  "Pembuatan website baru menggunakan teknologi modern framework (bukan template berat), menjamin loading speed maksimal di HP tamu.",
                  "Built entirely using modern frameworks rather than heavy templates, guaranteeing maximum loading speed on your guests' mobile devices.",
                )}
              </p>
            </div>
          </div>

          {/* ── CARD 2: Booking-Optimized UI/UX ── */}
          <div className="group rounded-[24px] bg-surface border border-border-light p-8 md:p-10 flex flex-col gap-8 transition-colors hover:border-tiger-flame/50 overflow-hidden relative">
            {/* Visual */}
            <div className="w-full aspect-[2/1] bg-carbon/50 rounded-xl border border-border-light/50 flex items-center justify-center relative overflow-hidden">
              <RippleClickAnimation />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-smoke text-[24px] font-bold">
                {t("Booking-Optimized UI/UX", "Booking-Optimized UI/UX")}
              </h3>
              <p className="font-inter text-muted text-[16px] leading-relaxed">
                {t(
                  "Desain antarmuka eksklusif yang mempermudah tamu melihat produk dan menekan tombol Checkout.",
                  "Exclusive interface design that makes it frictionless for guests to browse products and press the Checkout button.",
                )}
              </p>
            </div>
          </div>

          {/* ── CARD 3: Automated Payment Routing ── */}
          <div className="group rounded-[24px] bg-surface border border-border-light p-8 md:p-10 flex flex-col gap-8 transition-colors hover:border-tiger-flame/50 overflow-hidden relative">
            {/* Visual */}
            <div className="w-full aspect-[2/1] bg-carbon/50 rounded-xl border border-border-light/50 flex items-center justify-center relative overflow-hidden">
              <BarcodeScanAnimation />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-smoke text-[24px] font-bold">
                {t("Automated Payment Routing", "Automated Payment Routing")}
              </h3>
              <p className="font-inter text-muted text-[16px] leading-relaxed">
                {t(
                  "Integrasi API Payment Gateway (QRIS/Virtual Account). Sistem pembayaran otomatis. Verifikasi pembayaran instan tanpa perlu kirim bukti transfer manual.",
                  "Seamless Payment Gateway API integration (QRIS/VA). Fully automated transactions with instant verification—no more manual proof of transfer.",
                )}
              </p>
            </div>
          </div>

          {/* ── CARD 4: Real-Time Availability ── */}
          <div className="group rounded-[24px] bg-surface border border-border-light p-8 md:p-10 flex flex-col gap-8 transition-colors hover:border-tiger-flame/50 overflow-hidden relative">
            {/* Visual */}
            <div className="w-full aspect-[2/1] bg-carbon/50 rounded-xl border border-border-light/50 flex items-center justify-center relative overflow-hidden">
              <DoubleBookingAnimation />
            </div>
            {/* Text */}
            <div className="flex flex-col gap-3">
              <h3 className="font-display text-smoke text-[24px] font-bold">
                {t("Real-Time Availability", "Real-Time Availability")}
              </h3>
              <p className="font-inter text-muted text-[16px] leading-relaxed">
                {t(
                  "Sistem otomatis mengunci stok yang sedang dipesan orang lain. Tidak ada lagi drama 'seat penuh' setelah transfer. Tidak ada lagi drama 'double booking'.",
                  "An automated locking mechanism secures stock instantly as they are booked. No more 'fully booked' surprises after transfer. No more double booking drama.",
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-Components for Micro-Animations
// ─────────────────────────────────────────────────────────────────────────────

function ScoreAnimation() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number | null = null;
    const duration = 1500; // 1.5s
    const totalCycle = 3500; // 1.5s duration + 2s repeatDelay
    let animationFrame: number;

    const animateNumber = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Calculate current position in the cycle
      const cycleTime = elapsed % totalCycle;

      if (cycleTime < duration) {
        // In the active animation phase
        const progress = cycleTime / duration;
        // easeOut easing function approximation
        const easeOutProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(easeOutProgress * 99));
      } else {
        // In the wait phase after reaching 99
        setCount(99);
      }

      animationFrame = requestAnimationFrame(animateNumber);
    };

    animationFrame = requestAnimationFrame(animateNumber);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Background Circle */}
      <svg className="absolute inset-0 w-full h-full transform -rotate-90">
        <circle
          cx="64"
          cy="64"
          r="56"
          stroke="#333333"
          strokeWidth="8"
          fill="none"
        />
        {/* Foreground animated stroke */}
        <motion.circle
          cx="64"
          cy="64"
          r="56"
          stroke="#10B981"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={2 * Math.PI * 56}
          initial={{ strokeDashoffset: 2 * Math.PI * 56 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 56 * (1 - 0.99) }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
            repeat: Infinity,
            repeatDelay: 2,
          }}
          style={{ filter: "drop-shadow(0 0 10px rgba(16,185,129,0.5))" }}
        />
      </svg>
      {/* Number */}
      <motion.div
        className="font-display font-extrabold text-[40px] text-[#10B981]"
        style={{ textShadow: "0 0 20px rgba(16,185,129,0.5)" }}
      >
        {count}
      </motion.div>
    </div>
  );
}

function RippleClickAnimation() {
  const [clickToggle, setClickToggle] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setClickToggle((p) => !p);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Zoom Container - zooms in significantly on the "BOOK NOW" button */}
      <motion.div
        initial={false}
        animate={clickToggle ? { scale: 2.5 } : { scale: 0.9 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
        style={{ transformOrigin: "80% 85%" }}
        className="w-[260px] h-[170px] bg-[#1A1A1A] border border-[#333333] rounded-xl p-5 flex flex-col shadow-2xl relative"
      >
        {/* Fake Navbar */}
        <div className="flex justify-between items-center pb-3 border-b border-[#333333]">
          <div className="w-12 h-2.5 bg-[#444] rounded-sm" />
          <div className="flex gap-2">
            <div className="w-6 h-1.5 bg-[#444] rounded-sm" />
            <div className="w-6 h-1.5 bg-[#444] rounded-sm" />
            <div className="w-6 h-1.5 bg-[#444] rounded-sm" />
          </div>
        </div>

        {/* Fake Hero Body */}
        <div className="flex-1 flex flex-col gap-3 pt-4">
          <div className="w-3/4 h-5 bg-[#444] rounded-md" />
          <div className="w-1/2 h-5 bg-[#444] rounded-md mb-auto" />

          {/* Integrated Footer Row: 1/2 text lines, 1/2 CTA Button */}
          <div className="flex items-center gap-3 w-full mt-2">
            <div className="w-1/2 flex flex-col gap-2">
              <div className="w-full h-2 bg-[#333] rounded-sm" />
              <div className="w-4/5 h-2 bg-[#333] rounded-sm" />
            </div>

            <motion.button
              animate={
                clickToggle
                  ? {
                    scale: [1, 0.95, 1],
                    boxShadow: [
                      "0 0 0px rgba(255,87,34,0)",
                      "0 0 15px rgba(255,87,34,0.6)",
                      "0 0 0px rgba(255,87,34,0)",
                    ],
                    transition: { delay: 0.8, duration: 0.5 },
                  }
                  : { scale: 1, boxShadow: "0 0 0px rgba(255,87,34,0)" }
              }
              className="w-1/2 bg-tiger-flame px-2 py-2 rounded-[6px] font-display font-bold text-white text-[9px] shadow-lg relative overflow-hidden flex items-center justify-center"
            >
              BOOK NOW
              <AnimatePresence>
                {clickToggle && (
                  <motion.span
                    initial={{ scale: 0, opacity: 0.5 }}
                    animate={{ scale: 4, opacity: 0 }}
                    transition={{ delay: 1, duration: 0.6, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Cursor SVG (Placed INSIDE layout so it targets the button directly!) */}
        <motion.div
          initial={{ x: 230, y: 30 }}
          animate={clickToggle ? { x: 185, y: 130 } : { x: 230, y: 30 }}
          transition={
            clickToggle
              ? { delay: 0.4, duration: 0.6, ease: "easeOut" }
              : { duration: 0.6, ease: "easeInOut" }
          }
          className="absolute top-0 left-0 z-50 pointer-events-none"
        >
          <motion.svg
            animate={
              clickToggle
                ? {
                  scale: [1, 0.8, 1],
                  transition: { delay: 1, duration: 0.3 },
                }
                : { scale: 1 }
            }
            width="24"
            height="32"
            viewBox="-4 -4 28 36"
            fill="none"
          >
            {/* Subtle pulsate glow when hovered near button */}
            <motion.circle
              cx="1"
              cy="1"
              r="6"
              fill="rgba(255,255,255,0.8)"
              initial={{ scale: 0, opacity: 0 }}
              animate={
                clickToggle
                  ? { scale: [0, 2, 4], opacity: [0, 0.5, 0] }
                  : { scale: 0, opacity: 0 }
              }
              transition={
                clickToggle ? { delay: 1, duration: 0.5, ease: "easeOut" } : {}
              }
              style={{ filter: "blur(2px)" }}
            />
            <path
              d="M1 1L1 19L6 14L11 24L14 22.5L9 13L16 12L1 1Z"
              fill="white"
              stroke="#333"
              strokeWidth="1"
              style={{ filter: "drop-shadow(0px 1px 3px rgba(0,0,0,0.6))" }}
            />
          </motion.svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

function BarcodeScanAnimation() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setVerified(true);
      setTimeout(() => setVerified(false), 2000);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center bg-white rounded-xl p-3 overflow-hidden shadow-xl">
      {/* Abstract QR code */}
      <div className="w-full h-full grid grid-cols-4 grid-rows-4 gap-1 opacity-80">
        <div className="col-span-1 row-span-1 bg-carbon rounded-sm" />
        <div className="col-span-2 row-span-1 border-2 border-carbon rounded-sm" />
        <div className="col-span-1 row-span-2 bg-carbon rounded-sm" />
        <div className="col-span-1 row-span-2 border-2 border-carbon rounded-sm" />
        <div className="col-span-1 row-span-1 bg-carbon rounded-sm" />
        <div className="col-span-1 row-span-1 bg-carbon rounded-sm" />
        <div className="col-span-2 row-span-2 border-2 border-carbon rounded-sm flex items-center justify-center">
          <div className="w-3 h-3 bg-carbon" />
        </div>
        <div className="col-span-1 row-span-1 bg-carbon rounded-sm" />
        <div className="col-span-1 row-span-1 bg-carbon rounded-sm" />
      </div>

      {/* Laser Line */}
      <AnimatePresence>
        {!verified && (
          <motion.div
            animate={{ y: [-50, 50, -50] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-x-0 h-1 bg-tiger-flame shadow-[0_0_12px_rgba(255,87,34,0.8)] z-10"
          />
        )}
      </AnimatePresence>

      {/* Verified Badge Overlay */}
      <AnimatePresence>
        {verified && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute inset-2 bg-white/90 backdrop-blur border border-[#10B981] rounded-lg z-20 flex flex-col items-center justify-center"
          >
            <svg width="32" height="32" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="10" r="10" fill="#10B981" opacity="0.2" />
              <path
                d="M6 10.5L9 13.5L14.5 7.5"
                stroke="#10B981"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="font-display text-[#10B981] text-[10px] font-bold mt-1 tracking-wider">
              VERIFIED
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DoubleBookingAnimation() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase(0);
      setTimeout(() => setPhase(1), 500); // Users approach
      setTimeout(() => setPhase(2), 1200); // Block locked
      setTimeout(() => setPhase(3), 2500); // Block cleared
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center mt-6">
      {/* User 1 (Left) - Success */}
      <motion.div
        initial={{ x: -60, y: -40, opacity: 0 }}
        animate={{
          x: phase >= 1 ? -30 : -60,
          y: phase >= 1 ? -10 : -40,
          opacity: phase >= 1 ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className="absolute z-10 flex flex-col items-center"
      >
        <div
          className={`p-2 rounded-full ${phase >= 2 ? "bg-[#10B981]/20 text-[#10B981]" : "bg-surface text-smoke"} border border-border-light`}
        >
          <User size={20} />
        </div>
        {phase >= 2 && (
          <span className="text-[#10B981] text-[9px] font-bold mt-1">
            SECURED
          </span>
        )}
      </motion.div>

      {/* Target Block (Center) */}
      <motion.div
        animate={{
          borderColor: phase >= 2 ? "rgba(16,185,129,0.8)" : "rgba(51,51,51,1)",
          backgroundColor:
            phase >= 2 ? "rgba(16,185,129,0.1)" : "rgba(34,34,34,1)",
        }}
        className="w-20 h-24 border-2 border-[#333333] bg-surface rounded-xl flex items-center justify-center relative z-0"
      >
        {phase < 2 ? (
          <span className="text-muted text-[10px] font-mono select-none">
            ROOM 1
          </span>
        ) : (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <Lock className="text-[#10B981]" size={24} />
          </motion.div>
        )}
      </motion.div>

      {/* User 2 (Right) - Blocked */}
      <motion.div
        initial={{ x: 60, y: 40, opacity: 0 }}
        animate={{
          x: phase === 1 ? 30 : phase >= 2 ? 60 : 60,
          y: phase === 1 ? 10 : phase >= 2 ? 40 : 40,
          opacity: phase >= 1 ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute z-10 flex flex-col items-center"
      >
        <div
          className={`p-2 rounded-full ${phase >= 2 ? "bg-tiger-flame/20 text-tiger-flame" : "bg-surface text-smoke"} border border-border-light`}
        >
          <User size={20} />
        </div>
        {phase >= 2 && (
          <span className="text-tiger-flame text-[9px] font-bold mt-1">
            LOCKED
          </span>
        )}
      </motion.div>
    </div>
  );
}
