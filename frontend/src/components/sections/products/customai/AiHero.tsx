"use client";

import { motion, useAnimation } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useRef, useCallback } from "react";

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
          <h1 className="font-display font-extrabold text-[44px] md:text-[68px] lg:text-[80px] leading-[1.1] mb-8 text-transparent bg-clip-text bg-linear-to-b from-white to-[#A3A3A3]">
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
        <TerminalContainer />
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal Container with Flicker Glow
// ─────────────────────────────────────────────────────────────────────────────

function TerminalContainer() {
  const glowControls = useAnimation();
  const [lineCompleteCount, setLineCompleteCount] = useState(0);

  // Stable callback ref — avoids breaking the child's useEffect dependency chain
  const handleLineComplete = useCallback(() => {
    setLineCompleteCount((c) => c + 1);
  }, []);

  // Flash the glow whenever a new line finishes
  useEffect(() => {
    if (lineCompleteCount === 0) return;
    glowControls.start({
      boxShadow: [
        "0 0 0px rgba(16,185,129,0)",
        "0 0 40px rgba(16,185,129,0.35), inset 0 0 30px rgba(16,185,129,0.08)",
        "0 0 15px rgba(16,185,129,0.1)",
        "0 0 0px rgba(16,185,129,0)",
      ],
      transition: { duration: 0.6, ease: "easeOut" },
    });
  }, [lineCompleteCount, glowControls]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3, type: "spring", damping: 25 }}
      className="w-full max-w-3xl rounded-xl overflow-hidden border border-[#333333] bg-[#111111] relative"
    >
      {/* Animated glow wrapper */}
      <motion.div
        animate={glowControls}
        className="absolute inset-0 rounded-xl pointer-events-none z-20"
        style={{ boxShadow: "0 0 0px rgba(16,185,129,0)" }}
      />

      {/* Terminal Header */}
      <div className="h-10 bg-[#1A1A1A] border-b border-[#333333] flex items-center px-4 gap-2 relative z-10">
        <div className="w-3 h-3 rounded-full bg-red-500/80" />
        <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
        <div className="w-3 h-3 rounded-full bg-green-500/80" />
        <div className="ml-4 font-mono text-[11px] text-[#A3A3A3] flex-1 text-center pr-12">
          bash - root@uprev-engine:~
        </div>
      </div>

      {/* Terminal Body */}
      <div className="relative min-h-[280px] md:min-h-[320px]">
        {/* Neural Stream Canvas Background */}
        <NeuralStreamCanvas />

        {/* Terminal Text */}
        <div className="relative z-10 p-6 md:p-8 font-mono text-[14px] md:text-[16px] leading-relaxed text-[#10B981]">
          <TypingTerminal onLineComplete={handleLineComplete} />
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Neural Stream Canvas (Matrix-like falling particles)
// ─────────────────────────────────────────────────────────────────────────────

interface Particle {
  x: number;
  y: number;
  speed: number;
  length: number;
  opacity: number;
  char: string;
}

const STREAM_CHARS = "01アイウエオカキクケコサシスセソ";

function NeuralStreamCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animRef = useRef<number>(0);

  const init = useCallback((canvas: HTMLCanvasElement) => {
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;

    const columnCount = Math.floor(width / 20);
    const particles: Particle[] = [];
    for (let i = 0; i < columnCount; i++) {
      particles.push({
        x: (i / columnCount) * canvas.width + Math.random() * 10,
        y: Math.random() * canvas.height,
        speed: 0.8 + Math.random() * 1.5,
        length: 3 + Math.floor(Math.random() * 6),
        opacity: 0.03 + Math.random() * 0.08,
        char: STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)],
      });
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    init(canvas);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        const fontSize = 12 * window.devicePixelRatio;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity})`;

        for (let j = 0; j < p.length; j++) {
          const charY = p.y - j * fontSize;
          if (charY > 0 && charY < canvas.height) {
            const char = STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)];
            // Head character is brighter
            if (j === 0) {
              ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity * 2.5})`;
            } else {
              ctx.fillStyle = `rgba(16, 185, 129, ${p.opacity * (1 - j / p.length)})`;
            }
            ctx.fillText(char, p.x, charY);
          }
        }

        p.y += p.speed;
        if (p.y - p.length * 14 > canvas.height) {
          p.y = -20;
          p.char = STREAM_CHARS[Math.floor(Math.random() * STREAM_CHARS.length)];
        }
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    const handleResize = () => init(canvas);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none"
      style={{ opacity: 0.6 }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Terminal Typing Animation with Progress Bar
// ─────────────────────────────────────────────────────────────────────────────

const TERMINAL_LINES = [
  { text: "> initializing UpRev Custom Engine...", hasProgress: false },
  { text: "> loading LLM endpoints...", hasProgress: false },
  { text: "> establishing secure RAG pipeline...", hasProgress: true },
  { text: "> deployment successful. Server running at 99.9% uptime.", hasProgress: false },
];

interface TypingTerminalProps {
  onLineComplete: () => void;
}

function TypingTerminal({ onLineComplete }: TypingTerminalProps) {
  const [lines, setLines] = useState<string[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Progress bar states
  const [showProgress, setShowProgress] = useState(false);
  const [progressDone, setProgressDone] = useState(false);
  const [waitingForProgress, setWaitingForProgress] = useState(false);

  // Store callback in a ref so it never causes the effect to re-run
  const onLineCompleteRef = useRef(onLineComplete);
  onLineCompleteRef.current = onLineComplete;

  useEffect(() => {
    if (isComplete || waitingForProgress) return;

    if (currentLineIndex < TERMINAL_LINES.length) {
      const currentTarget = TERMINAL_LINES[currentLineIndex];

      if (currentCharIndex < currentTarget.text.length) {
        // Keep typing the current line
        const timeout = setTimeout(
          () => {
            setLines((prev) => {
              const newLines = [...prev];
              if (newLines[currentLineIndex] === undefined) {
                newLines[currentLineIndex] = "";
              }
              newLines[currentLineIndex] += currentTarget.text[currentCharIndex];
              return newLines;
            });
            setCurrentCharIndex((prev) => prev + 1);
          },
          30 + Math.random() * 40,
        );

        return () => clearTimeout(timeout);
      } else {
        // Line complete — check if it needs a progress bar
        if (currentTarget.hasProgress && !progressDone) {
          setShowProgress(true);
          setWaitingForProgress(true);
          return;
        }

        // Fire the glow effect (via ref to avoid dep cycle)
        onLineCompleteRef.current();

        // Pause then move to next line
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
  }, [currentLineIndex, currentCharIndex, isComplete, waitingForProgress, progressDone]);

  // When progress completes, resume typing
  const handleProgressComplete = useCallback(() => {
    setProgressDone(true);
    setWaitingForProgress(false);
    onLineCompleteRef.current();
    // Move to next line after a brief pause
    setTimeout(() => {
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
    }, 400);
  }, []);

  return (
    <div className="flex flex-col gap-2 relative">
      {lines.map((line, i) => (
        <div key={i} className="flex flex-col gap-1">
          <div className="flex items-center">
            <span className="whitespace-pre-wrap">{line}</span>
            {/* Blinking Cursor only on the active line */}
            {(i === currentLineIndex && !waitingForProgress) ||
              (isComplete && i === TERMINAL_LINES.length - 1) ? (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2.5 h-4 md:h-5 bg-[#10B981] ml-1 align-middle"
              />
            ) : null}
          </div>

          {/* Progress Bar — shows after RAG line finishes typing */}
          {i === 2 && showProgress && (
            <ProgressBar onComplete={handleProgressComplete} />
          )}
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Inline Progress Bar (non-linear speed)
// ─────────────────────────────────────────────────────────────────────────────

function ProgressBar({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const animRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const hasFired = useRef(false);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const DURATION = 2800; // total ms

    const tick = (now: number) => {
      const elapsed = now - startTimeRef.current;
      const t = Math.min(elapsed / DURATION, 1);

      // Non-linear easing: fast start, slow middle, fast end
      // Custom cubic bezier approximation
      let eased: number;
      if (t < 0.3) {
        eased = t * 1.2; // fast start
      } else if (t < 0.7) {
        eased = 0.36 + (t - 0.3) * 0.5; // slow middle
      } else {
        eased = 0.56 + (t - 0.7) * 1.47; // fast end
      }

      setProgress(Math.min(eased * 100, 100));

      if (t < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else if (!hasFired.current) {
        hasFired.current = true;
        onComplete();
      }
    };

    animRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animRef.current);
  }, [onComplete]);

  return (
    <div className="flex items-center gap-3 ml-2 mt-1">
      <div className="w-48 h-2 rounded-full bg-[#222222] border border-[#333333] overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-[#10B981]"
          style={{ width: `${progress}%` }}
          animate={{
            boxShadow:
              progress < 100
                ? "0 0 8px rgba(16,185,129,0.4)"
                : "0 0 16px rgba(16,185,129,0.6)",
          }}
        />
      </div>
      <span className="text-[12px] text-[#10B981]/70 font-mono tabular-nums w-10 text-right">
        {Math.floor(progress)}%
      </span>
      {progress >= 100 && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-[12px] text-[#10B981] font-bold"
        >
          ✓ SECURE
        </motion.span>
      )}
    </div>
  );
}
