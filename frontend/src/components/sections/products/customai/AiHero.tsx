"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

export function AiHero() {
  const { t } = useLanguage();

  return (
    <section className="relative w-full min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-20 mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)]" />

        {/* Spotlight Green Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[#10B981]/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full flex flex-col items-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mb-16"
        >
          <h1 className="font-display font-extrabold text-[44px] md:text-[68px] lg:text-[px80] leading-[1.1] mb-8 text-transparent bg-clip-text bg-linear-to-b from-white to-[#A3A3A3]">
            {t("We Build What You Need.", "We Build What You Need.")}
          </h1>
          <p className="font-inter text-[18px] md:text-[22px] leading-relaxed text-[#A3A3A3] max-w-3xl mx-auto">
            {t(
              "Not just expensive code. But the right solution for your goals demand. Solusi AI tailor-made untuk infrastruktur Enterprise dan peluncuran MVP (Minimum Viable Product) yang cepat dan terukur.",
              "Not just expensive code. But the right solution for your goals demand. Tailor-made AI solutions for Enterprise infrastructure and rapid, scalable MVP (Minimum Viable Product) launches.",
            )}
          </p>
        </motion.div>

        {/* Terminal UI */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, type: "spring", damping: 25 }}
          className="w-full max-w-3xl rounded-xl overflow-hidden border border-[#333333] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.1)] bg-[#111111]"
        >
          {/* Terminal Header */}
          <div className="h-10 bg-[#1A1A1A] border-b border-[#333333] flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
            <div className="ml-4 font-mono text-[11px] text-[#A3A3A3] flex-1 text-center pr-12">
              bash - root@uprev-engine:~
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 min-h-[280px] md:min-h-[320px] font-mono text-[14px] md:text-[16px] leading-relaxed text-[#10B981]">
            <TypingTerminal />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal Typing Animation Logic
// ─────────────────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  "> initializing UpRev Custom Engine...",
  "> loading LLM endpoints...",
  "> establishing secure RAG pipeline...",
  "> deployment successful. Server running at 99.9% uptime.",
];

function TypingTerminal() {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (isComplete) return;

    if (currentLineIndex < TERMINAL_LINES.length) {
      const currentTargetLine = TERMINAL_LINES[currentLineIndex];

      if (currentCharIndex < currentTargetLine.length) {
        // Keep typing the current line
        const timeout = setTimeout(
          () => {
            setLines((prev) => {
              const newLines = [...prev];
              if (newLines[currentLineIndex] === undefined) {
                newLines[currentLineIndex] = "";
              }
              newLines[currentLineIndex] += currentTargetLine[currentCharIndex];
              return newLines;
            });
            setCurrentCharIndex((prev) => prev + 1);
          },
          30 + Math.random() * 40,
        ); // Random typing speed

        return () => clearTimeout(timeout);
      } else {
        // Line complete, pause then move to next line
        const timeout = setTimeout(
          () => {
            setCurrentLineIndex((prev) => prev + 1);
            setCurrentCharIndex(0);
          },
          currentLineIndex === TERMINAL_LINES.length - 1 ? 0 : 600,
        );

        return () => clearTimeout(timeout);
      }
    } else {
      setIsComplete(true);
    }
  }, [currentLineIndex, currentCharIndex, isComplete]);

  return (
    <div className="flex flex-col gap-2 relative">
      {lines.map((line, i) => (
        <div key={i} className="flex">
          <span className="whitespace-pre-wrap">{line}</span>
          {/* Blinking Cursor only on the active line, or at the end if complete */}
          {(i === currentLineIndex ||
            (isComplete && i === TERMINAL_LINES.length - 1)) && (
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="inline-block w-2.5 h-4 md:h-5 bg-[#10B981] ml-1 align-middle"
            />
          )}
        </div>
      ))}
    </div>
  );
}
