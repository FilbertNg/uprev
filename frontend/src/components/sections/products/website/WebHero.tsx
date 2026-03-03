"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

export function WebHero() {
  const { t } = useLanguage();
  // Continual 5-second cycle for the background to slightly pulse or stay static
  // We can remove the rigid setPhase logic.
  useEffect(() => {
    // If we want to keep any periodic updates, they go here.
    // Otherwise, this useEffect is just a placeholder.
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] bg-[#1A1A1A] overflow-hidden flex items-center py-24">
      {/* ── 3D Infinite Grid Horizon ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Sky fade gradient */}
        <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-[#1A1A1A] to-transparent z-10" />

        {/* The Grid */}
        <div
          className="absolute bottom-0 w-[200%] h-[60vh] left-[-50%] opacity-30"
          style={{
            perspective: "1000px",
            transformOrigin: "bottom center",
          }}
        >
          <motion.div
            className="w-full h-[200%] absolute bottom-0"
            style={{
              backgroundImage: `
                    linear-gradient(to right, rgba(255,87,34,0.3) 1px, transparent 1px),
                    linear-gradient(to top, rgba(255,87,34,0.3) 1px, transparent 1px)
                  `,
              backgroundSize: "60px 60px",
              transform: "rotateX(75deg)",
              transformOrigin: "bottom center",
            }}
            animate={{
              backgroundPosition: ["0px 0px", "0px 60px"],
            }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 1,
            }}
          />
          {/* Horizon fade */}
          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-[#1A1A1A]/80 to-[#1A1A1A] z-20" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* ════ LEFT COLUMN: Text ════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 w-fit mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-tiger-flame animate-pulse" />
            <span className="text-white/70 text-sm font-medium tracking-wide">
              High-Performance Engine
            </span>
          </motion.div>

          <h1 className="font-display text-[48px] lg:text-[64px] font-extrabold leading-[1.1] tracking-tight mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#F5F5F5] to-[#A3A3A3]">
              Design for{" "}
              <br/>
              <span className="bg-gradient-to-r from-[var(--color-tiger-flame)] to-[#FF8A65] bg-clip-text text-transparent">
                Speed,
              </span>
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-[#F5F5F5] to-[#A3A3A3]">
              Built for{" "}
              <span className="bg-gradient-to-r from-[var(--color-tiger-flame)] to-[#FF8A65] bg-clip-text text-transparent">
                Scale.
              </span>
            </span>
          </h1>

          <p className="font-inter text-[#A3A3A3] text-[18px] leading-relaxed max-w-xl">
            {t(
              "Dari Landing Page sederhana hingga Web App kompleks yang dirancang untuk kredibilitas dan konversi. Sebuah etalase digital premium yang terintegrasi penuh dengan ekosistem bisnis Anda.",
              "From simple Landing Pages to complex Web Apps engineered for credibility and conversion. A premium digital storefront fully integrated with your business ecosystem.",
            )}
          </p>
        </motion.div>

        {/* ════ RIGHT COLUMN: The Skeleton Fill Visual ════ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="relative w-full aspect-[4/3] max-w-lg mx-auto lg:max-w-none"
        >
          {/* Browser Window Mockup */}
          <div className="absolute inset-0 bg-[#111111] rounded-2xl border border-[#333333] shadow-2xl overflow-hidden flex flex-col">
            {/* Header bar */}
            <div className="h-10 border-b border-[#333333] flex items-center px-4 gap-2 bg-[#1A1A1A]">
              <div className="w-3 h-3 rounded-full bg-[#333333]" />
              <div className="w-3 h-3 rounded-full bg-[#333333]" />
              <div className="w-3 h-3 rounded-full bg-[#333333]" />
              <div className="ml-4 h-4 rounded-md bg-[#222222] flex-1 max-w-[200px]" />
            </div>

            {/* Window Content */}
            <div className="flex-1 relative p-6 flex flex-col gap-6">
              {/* ── THE LIGHT SWEEP SKELETON REVEAL ── */}

              {/* 1. Underlying Grayscale UI */}
              <div className="absolute inset-0 p-6 flex flex-col gap-6 grayscale opacity-40">
                <WebHeroUI />
              </div>

              {/* 2. Colorful UI (Revealed by scanning) */}
              <motion.div
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={{ clipPath: "inset(0 0% 0 0)" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
                className="absolute inset-0 p-6 flex flex-col gap-6 overflow-hidden"
              >
                <WebHeroUI />
              </motion.div>

              {/* 3. The Laser Line (Ping-Pong) */}
              <motion.div
                initial={{ left: "0%", x: "-50%" }}
                animate={{ left: "100%", x: "-50%" }}
                transition={{
                  duration: 2,
                  ease: "easeInOut",
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 0.5,
                }}
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg] z-20 pointer-events-none mix-blend-overlay"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Abstracted UI for Masked Reveal
// ─────────────────────────────────────────────────────────────────────────────
function WebHeroUI() {
  return (
    <>
      <div className="w-full h-32 rounded-xl bg-gradient-to-br from-tiger-flame/20 to-[#111111] border border-tiger-flame/30 flex items-center p-6">
        <div className="w-16 h-16 rounded-full bg-tiger-flame relative" />
        <div className="ml-6 flex flex-col gap-3 flex-1">
          <div className="h-6 w-1/2 bg-white rounded-md" />
          <div className="h-4 w-3/4 bg-white/50 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 flex-1">
        <div className="rounded-xl bg-[#222222] border border-[#333333] p-4 flex flex-col gap-3">
          <div className="h-3 w-1/3 bg-[#10B981] rounded-full mb-2" />
          <div className="h-2 w-full bg-white/20 rounded-full" />
          <div className="h-2 w-5/6 bg-white/20 rounded-full" />
        </div>
        <div className="rounded-xl bg-[#222222] border border-[#333333] p-4 flex flex-col justify-end">
          <div className="h-8 w-full bg-tiger-flame rounded-lg mt-auto text-white text-[10px] font-bold flex items-center justify-center">
            CHECKOUT
          </div>
        </div>
      </div>
    </>
  );
}
