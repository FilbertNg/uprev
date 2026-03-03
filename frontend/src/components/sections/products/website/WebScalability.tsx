"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { LayoutTemplate, Building2, ShoppingCart, Server } from "lucide-react";

const SCOPE_LIST = [
  {
    icon: LayoutTemplate,
    title: { ID: "Landing Page", EN: "Landing Page" },
    desc: {
      ID: "Halaman konversi tinggi untuk kampanye iklan spesifik.",
      EN: "High-conversion pages specifically for ad campaigns.",
    },
  },
  {
    icon: Building2,
    title: { ID: "Company Profile", EN: "Company Profile" },
    desc: {
      ID: "Etalase kredibilitas profesional berdesain premium.",
      EN: "A professional credibility storefront with premium design.",
    },
  },
  {
    icon: ShoppingCart,
    title: { ID: "E-Commerce / Toko Online", EN: "E-Commerce / Online Store" },
    desc: {
      ID: "Toko digital dengan manajemen stok dan pembayaran otomatis.",
      EN: "Digital store with automated inventory and payment management.",
    },
  },
  {
    icon: Server,
    title: { ID: "Enterprise Web App", EN: "Enterprise Web App" },
    desc: {
      ID: "Sistem kustom kompleks dengan perlindungan data militer.",
      EN: "Complex custom systems with military-grade data protection.",
    },
  },
];

export function WebScalability() {
  const { t, lang } = useLanguage();
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section className="w-full relative pt-16 pb-32 bg-[#111111] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Section */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-smoke text-[36px] md:text-[48px] font-bold leading-[1.2] mb-6"
          >
            {t(
              "Solusi yang Mengikuti Skala Pertumbuhan Anda.",
              "Solutions That Flow With Your Scale Of Growth.",
            )}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-inter text-muted text-[18px] leading-relaxed"
          >
            {t(
              "Tidak ada solusi pukul rata. Kami mendiagnosa kebutuhan bisnis Anda dan membangun dengan fondasi yang paling efisien—baik secara performa maupun anggaran.",
              "There is no one-size-fits-all solution. We diagnose your business needs and build on the most efficient foundation—both in performance and budget.",
            )}
          </motion.p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* ════ LEFT COLUMN: The Scope List ════ */}
          <div className="flex flex-col gap-4">
            {SCOPE_LIST.map((item, idx) => {
              const isActive = hoveredIdx === idx;
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="relative cursor-default"
                >
                  {/* Left Border Highlight */}
                  <div
                    className={`absolute left-[-1px] top-0 bottom-0 w-[2px] transition-colors duration-300 ${
                      isActive
                        ? "bg-tiger-flame shadow-[0_0_10px_rgba(255,87,34,0.6)]"
                        : "bg-transparent"
                    }`}
                  />

                  <div className="relative w-full h-[100px] [perspective:1000px]">
                    <motion.div
                      initial={false}
                      animate={{ rotateX: isActive ? 180 : 0 }}
                      transition={{
                        duration: 0.6,
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                      className="w-full h-full relative [transform-style:preserve-3d]"
                    >
                      {/* FRONT (Icon + Title) */}
                      <div className="absolute inset-0 flex items-center gap-6 p-6 rounded-xl border border-[#333333] bg-[#1A1A1A] [backface-visibility:hidden]">
                        <div
                          className={`p-3 rounded-xl border transition-colors duration-300 ${isActive ? "bg-tiger-flame/10 border-tiger-flame/30 text-tiger-flame" : "bg-[#222222] border-[#333333] text-muted"}`}
                        >
                          <Icon size={24} strokeWidth={1.5} />
                        </div>
                        <h3
                          className={`font-display text-[22px] font-bold transition-colors duration-300 ${isActive ? "text-smoke" : "text-smoke/60"}`}
                        >
                          {item.title[lang]}
                        </h3>
                      </div>

                      {/* BACK (Description) */}
                      <div className="absolute inset-0 flex items-center p-6 rounded-xl border border-tiger-flame/30 bg-tiger-flame/5 [backface-visibility:hidden] [transform:rotateX(180deg)] shadow-[0_0_15px_rgba(255,87,34,0.1)]">
                        <p className="font-inter text-[15px] leading-relaxed text-smoke/90">
                          {item.desc[lang]}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ════ RIGHT COLUMN: The Tech Stack Slider ════ */}
          <div className="w-full flex justify-center">
            <TechStackSlider />
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// The Architect Slider Animation
// ─────────────────────────────────────────────────────────────────────────────
function TechStackSlider() {
  const { t } = useLanguage();
  const [sliderPos, setSliderPos] = useState(0);
  const [activePos, setActivePos] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSliderPos((p) => {
        const next = p === 0 ? 1 : 0;
        setTimeout(() => setActivePos(next), 1500);
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  // Derived styles based on slider position
  const isWpTarget = sliderPos === 0;
  const isWpActive = activePos === 0;

  return (
    <div
      className={`relative w-full max-w-lg aspect-square lg:aspect-[4/3] rounded-[32px] border border-border-light overflow-hidden transition-colors duration-1000 ${
        isWpActive
          ? "bg-[radial-gradient(circle_at_30%_50%,rgba(33,117,155,0.1)_0%,transparent_70%)]"
          : "bg-[radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.05)_0%,transparent_70%)]"
      } bg-[#1A1A1A] flex flex-col p-8 justify-between`}
    >
      <div className="relative flex justify-between items-center w-full max-w-[280px] mx-auto mt-12 z-10">
        {/* Connecting Line Track - securely underneath logos */}
        <div className="absolute left-[40px] right-[40px] top-1/2 -translate-y-1/2 h-[2px] bg-[#333333] z-0 overflow-hidden rounded-full">
          {/* The directional comet tail */}
          <motion.div
            initial={false}
            animate={{ left: isWpTarget ? "-50%" : "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className={`absolute top-1/2 -translate-y-1/2 w-16 h-[2px] shadow-[0_0_15px_currentColor] z-10 transition-colors duration-500 ${
              isWpTarget
                ? "bg-gradient-to-l from-transparent to-[#21759b] text-[#21759b]"
                : "bg-gradient-to-r from-transparent to-white text-white"
            }`}
          />
        </div>

        {/* Left Node: WordPress */}
        <div
          className={`relative z-10 flex flex-col items-center transition-all duration-700 ${isWpActive ? "opacity-100 scale-110" : "opacity-40 scale-100"}`}
        >
          <div className="w-20 h-20 rounded-2xl bg-[#222222] border border-[#333333] flex items-center justify-center shadow-lg">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/WordPress_blue_logo.svg/960px-WordPress_blue_logo.svg.png"
              width={48}
              height={48}
              alt="WordPress"
              className="object-contain"
            />
          </div>
        </div>

        {/* Right Node: Next.js */}
        <div
          className={`relative z-10 flex flex-col items-center transition-all duration-700 ${!isWpActive ? "opacity-100 scale-110" : "opacity-40 scale-100"}`}
        >
          <div className="w-20 h-20 rounded-2xl bg-[#222222] border border-[#333333] flex items-center justify-center shadow-lg">
            <img
              src="https://www.svgrepo.com/show/354113/nextjs-icon.svg"
              width={48}
              height={48}
              alt="Next.js"
              className="object-contain filter invert"
            />
          </div>
        </div>
      </div>

      {/* Dynamic Text Information */}
      <div className="w-full text-center min-h-[250px] flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {isWpActive ? (
            <motion.div
              key="wp"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <span className="font-display font-bold text-[#21759b] text-[18px]">
                WordPress
              </span>
              <p className="font-inter text-muted text-[14px] leading-relaxed max-w-xs">
                {t(
                  "Efisiensi & Kecepatan Setup. Cocok untuk Company Profile & Landing Page standar.",
                  "Efficiency & Setup Speed. Suited for standard Company Profiles & Landing Pages.",
                )}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="next"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col gap-2"
            >
              <span className="font-display font-bold text-smoke text-[18px]">
                Next.js Custom
              </span>
              <p className="font-inter text-muted text-[14px] leading-relaxed max-w-xs">
                {t(
                  "Performa Ekstrem & Kustomisasi. Cocok untuk Web App & Skala Enterprise.",
                  "Extreme Performance & Customization. Scaled for Web Apps & Enterprise.",
                )}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
