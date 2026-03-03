"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const TIMELINE_STEPS = [
  {
    num: "01",
    title: { ID: "Needs-Based Diagnosis.", EN: "Needs-Based Diagnosis." },
    desc: {
      ID: "Kami mendiagnosa masalah utama bisnis Anda, lalu memberikan solusi yang tepat. Tidak ada penawaran AI yang berlebihan (over-engineered) jika tidak diperlukan.",
      EN: "We diagnose your main business problems, then provide the exact right solution. No over-engineered AI offerings if they aren't necessary.",
    },
  },
  {
    num: "02",
    title: {
      ID: "Budget-Flexible Architecture.",
      EN: "Budget-Flexible Architecture.",
    },
    desc: {
      ID: "Kami menyusun arsitektur sistem—baik Custom Code (Next.js) untuk performa maksimal atau pendekatan yang lebih ringkas—sepenuhnya berdasarkan kebutuhan skalabilitas dan budget Anda.",
      EN: "We architect the system—whether Custom Code (Next.js) for maximum performance or a leaner approach—entirely based on your scalability needs and budget.",
    },
  },
  {
    num: "03",
    title: {
      ID: "Quality Assurance & Handover.",
      EN: "Quality Assurance & Handover.",
    },
    desc: {
      ID: "Internal stress-testing ketat untuk memastikan tidak ada misinformasi dan menjamin keamanan data sebelum sistem Go-Live di infrastruktur Anda.",
      EN: "Rigorous internal stress-testing to ensure zero hallucinations and guarantee data security before the system goes live on your infrastructure.",
    },
  },
];

export function AiTimeline() {
  const { lang } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll progress through the entire section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Calculate the height of the active "Tiger Flame" line based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="w-full relative py-32 bg-[#0A0A0A]" ref={containerRef}>
      <div className="max-w-5xl mx-auto px-6 relative z-10 flex flex-col md:flex-row gap-8 md:gap-16">
        {/* LEFT COLUMN: Vertical Header & Line */}
        <div className="md:w-1/3 flex flex-col pt-4 relative">
          <div className="sticky top-1/3">
            <h2 className="font-display font-bold text-[32px] md:text-[40px] text-smoke leading-[1.1] mb-6">
              {lang === "ID"
                ? "Proses Rekayasa Kami"
                : "The Engineering Process"}
            </h2>
            <p className="font-inter text-muted text-[16px]">
              {lang === "ID"
                ? "Pendekatan pragmatis dari diagnosa hingga peluncuran."
                : "A pragmatic approach from diagnosis to deployment."}
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: The Stepper Items */}
        <div className="md:w-2/3 flex flex-col relative pl-8 md:pl-16">
          {/* The Background Line (Gray) */}
          <div className="absolute left-0 top-6 bottom-0 w-[2px] bg-[#333333]" />

          {/* The Active Line (Tiger Flame) */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-[0px] top-6 w-[2px] bg-tiger-flame shadow-[0_0_12px_rgba(255,87,34,0.8)] origin-top z-10"
          />

          <div className="flex flex-col gap-24 py-8">
            {TIMELINE_STEPS.map((step, idx) => {
              return (
                <TimelineItem
                  key={idx}
                  step={step}
                  index={idx}
                  lang={lang}
                  scrollYProgress={scrollYProgress}
                  totalSteps={TIMELINE_STEPS.length}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual Timeline Item Logic (for scroll-spy highlighting)
// ─────────────────────────────────────────────────────────────────────────────

function TimelineItem({
  step,
  index,
  lang,
  scrollYProgress,
  totalSteps,
}: {
  step: any;
  index: number;
  lang: string;
  scrollYProgress: any;
  totalSteps: number;
}) {
  // Determine the active window for THIS specific step
  // E.g., for 3 steps: Step 0 is active from 0 to 0.33, Step 1 from 0.33 to 0.66, etc.
  const startObj = index / totalSteps;
  // adding a slight offset to make it light up slightly before the line hits exactly
  const activeProgress = useTransform(
    scrollYProgress,
    [startObj - 0.1, startObj + 0.1],
    [0, 1],
  );

  // We use a local state to toggle classes based on the motion value
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    return activeProgress.on("change", (latest) => {
      if (latest > 0.5 && !isActive) setIsActive(true);
      else if (latest <= 0.5 && isActive) setIsActive(false);
    });
  }, [activeProgress, isActive]);

  return (
    <div className="relative group flex flex-col gap-4">
      {/* The dot on the timeline */}
      <div
        className={`absolute -left-[37px] md:-left-[69px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-500 z-20 bg-[#0A0A0A] ${isActive ? "border-tiger-flame shadow-[0_0_10px_rgba(255,87,34,1)] scale-125" : "border-[#333333]"}`}
      />

      {/* Step Number */}
      <h4
        className={`font-mono text-[14px] font-bold tracking-widest transition-colors duration-500 ${isActive ? "text-tiger-flame" : "text-[#555555]"}`}
      >
        STEP {step.num}
      </h4>

      {/* Title */}
      <h3
        className={`font-display text-[24px] md:text-[28px] font-bold transition-colors duration-500 ${isActive ? "text-smoke" : "text-[#777777]"}`}
      >
        {step.title[lang]}
      </h3>

      {/* Description */}
      <p
        className={`font-inter text-[16px] leading-relaxed max-w-lg transition-colors duration-500 ${isActive ? "text-smoke/90" : "text-[#555555]"}`}
      >
        {step.desc[lang]}
      </p>
    </div>
  );
}
