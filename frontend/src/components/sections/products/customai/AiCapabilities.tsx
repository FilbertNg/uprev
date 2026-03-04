"use client";

import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Card Data
// ─────────────────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  {
    animationType: "document-digestion" as const,
    title: {
      ID: "Internal Data Automation & RAG",
      EN: "Internal Data Automation & RAG",
    },
    desc: {
      ID: "Kami membangun sistem yang mengonsumsi ribuan dokumen internal perusahaan Anda untuk menciptakan AI yang paham konteks bisnis Anda secara spesifik, bukan sekadar ChatGPT publik.",
      EN: "We engineer systems that ingest thousands of your company's internal documents to create an AI that understands your specific business context, not just a generic public ChatGPT.",
    },
  },
  {
    animationType: "adaptive-morphing" as const,
    title: {
      ID: "Advanced AI UI/UX Workflows",
      EN: "Advanced AI UI/UX Workflows",
    },
    desc: {
      ID: "Membangun antarmuka kompleks yang ditenagai AI. Mulai dari platform manajemen data hingga merancang UI responsif untuk ekstensi software khusus.",
      EN: "Building complex, AI-powered interfaces. From comprehensive data management platforms to designing responsive UIs for custom software extensions.",
    },
  },
  {
    animationType: "secure-handshake" as const,
    title: {
      ID: "API & Infrastructure Overhaul",
      EN: "API & Infrastructure Overhaul",
    },
    desc: {
      ID: "Menghubungkan software tradisional Anda dengan kemampuan AI modern melalui integrasi API yang aman, stabil, dan terenkripsi.",
      EN: "Connecting your traditional legacy software with modern AI capabilities through secure, stable, and encrypted API integrations.",
    },
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export function AiCapabilities() {
  const { lang } = useLanguage();

  return (
    <section className="py-32 w-full bg-[#111111] relative overflow-hidden border-t border-[#333333]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {CAPABILITIES.map((cap, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-8 md:p-10 flex flex-col gap-6 group hover:border-tiger-flame/50 transition-colors duration-300 relative overflow-hidden"
            >
              {/* Subtle Background Glow on Hover */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.05),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Animated Icon Area */}
              <div className="w-full h-28 rounded-xl bg-[#151515] border border-[#2a2a2a] flex items-center justify-center overflow-hidden relative">
                {cap.animationType === "document-digestion" && <DocumentDigestionAnim />}
                {cap.animationType === "adaptive-morphing" && <AdaptiveMorphingAnim />}
                {cap.animationType === "secure-handshake" && <SecureHandshakeAnim />}
              </div>

              <div className="flex flex-col gap-3 relative z-10">
                <h3 className="font-display font-bold text-smoke text-[22px]">
                  {/* @ts-ignore */}
                  {cap.title[lang]}
                </h3>
                <p className="font-inter text-muted text-[16px] leading-relaxed">
                  {/* @ts-ignore */}
                  {cap.desc[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation A: Document Digestion (RAG Card)
// Files fly into database → database pulses → sparkle emerges
// ─────────────────────────────────────────────────────────────────────────────

function DocumentDigestionAnim() {
  const [phase, setPhase] = useState<"ingest" | "process" | "output">("ingest");

  useEffect(() => {
    const cycle = () => {
      setPhase("ingest");
      const t1 = setTimeout(() => setPhase("process"), 1800);
      const t2 = setTimeout(() => setPhase("output"), 3200);
      const t3 = setTimeout(() => setPhase("ingest"), 5500);
      return [t1, t2, t3];
    };

    let timers = cycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = cycle();
    }, 5500);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  const fileIcons = [
    { label: "PDF", color: "#EF4444", delay: 0 },
    { label: "DOC", color: "#3B82F6", delay: 0.2 },
    { label: "CSV", color: "#22C55E", delay: 0.4 },
  ];

  return (
    <svg viewBox="0 0 240 100" className="w-full h-full" fill="none">
      {/* File icons flying in */}
      {fileIcons.map((file, i) => (
        <motion.g
          key={file.label}
          animate={{
            x: phase === "ingest" ? [-(30 + i * 20), 85] : 85,
            opacity: phase === "ingest" ? [0, 1] : phase === "process" ? [1, 0] : 0,
          }}
          transition={{
            duration: phase === "ingest" ? 1.2 : 0.3,
            delay: phase === "ingest" ? file.delay : 0,
            ease: "easeOut",
          }}
        >
          <rect
            x={10}
            y={28 + i * 16}
            width={24}
            height={16}
            rx={2}
            fill={file.color}
            fillOpacity={0.2}
            stroke={file.color}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <text
            x={22}
            y={39 + i * 16}
            textAnchor="middle"
            fill={file.color}
            fontSize={7}
            fontFamily="monospace"
            fontWeight="bold"
          >
            {file.label}
          </text>
        </motion.g>
      ))}

      {/* Database icon (center) */}
      <motion.g
        animate={{
          scale: phase === "process" ? [1, 1.1, 1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 1.4,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "120px 50px" }}
      >
        {/* DB body */}
        <ellipse cx={120} cy={35} rx={18} ry={8} fill="#10B981" fillOpacity={0.15} stroke="#10B981" strokeWidth={1.2} />
        <rect x={102} y={35} width={36} height={28} fill="#111111" stroke="none" />
        <line x1={102} y1={35} x2={102} y2={63} stroke="#10B981" strokeWidth={1.2} />
        <line x1={138} y1={35} x2={138} y2={63} stroke="#10B981" strokeWidth={1.2} />
        <ellipse cx={120} cy={63} rx={18} ry={8} fill="#10B981" fillOpacity={0.15} stroke="#10B981" strokeWidth={1.2} />
        {/* Middle ellipse line */}
        <ellipse cx={120} cy={49} rx={18} ry={8} fill="none" stroke="#10B981" strokeWidth={0.6} strokeOpacity={0.4} />

        {/* Processing glow */}
        <motion.ellipse
          cx={120}
          cy={49}
          rx={22}
          ry={12}
          fill="none"
          stroke="#10B981"
          strokeWidth={1.5}
          animate={{
            opacity: phase === "process" ? [0, 0.6, 0, 0.6, 0] : 0,
            scale: phase === "process" ? [0.8, 1.2, 0.8, 1.2, 0.8] : 1,
          }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          style={{ transformOrigin: "120px 49px" }}
        />
      </motion.g>

      {/* Output: Sparkle/Brain icon */}
      <motion.g
        animate={{
          opacity: phase === "output" ? 1 : 0,
          y: phase === "output" ? 0 : 10,
          scale: phase === "output" ? 1 : 0.5,
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Sparkle star */}
        <motion.text
          x={185}
          y={55}
          textAnchor="middle"
          fontSize={24}
          animate={{
            rotate: phase === "output" ? [0, 15, -15, 0] : 0,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "185px 48px" }}
        >
          ✨
        </motion.text>

        {/* Glow behind sparkle */}
        <motion.circle
          cx={185}
          cy={50}
          r={18}
          fill="#10B981"
          animate={{
            opacity: phase === "output" ? [0.05, 0.15, 0.05] : 0,
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Arrow from DB to sparkle */}
        <motion.line
          x1={140}
          y1={50}
          x2={168}
          y2={50}
          stroke="#10B981"
          strokeWidth={1}
          strokeDasharray="4 3"
          animate={{
            opacity: phase === "output" ? 0.6 : 0,
          }}
        />
        <motion.polygon
          points="166,46 172,50 166,54"
          fill="#10B981"
          animate={{
            opacity: phase === "output" ? 0.6 : 0,
          }}
        />
      </motion.g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation B: Adaptive Morphing (UI/UX Card)
// Frame morphs: Dashboard → Mobile → Extension
// ─────────────────────────────────────────────────────────────────────────────

const MORPH_SHAPES = [
  { width: 90, height: 55, rx: 6, label: "Dashboard" }, // Wide desktop
  { width: 35, height: 65, rx: 8, label: "Mobile" },    // Tall phone
  { width: 45, height: 45, rx: 10, label: "Extension" }, // Small square
];

function AdaptiveMorphingAnim() {
  const [shapeIdx, setShapeIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setShapeIdx((prev) => (prev + 1) % MORPH_SHAPES.length);
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  const shape = MORPH_SHAPES[shapeIdx];
  const cx = 120;
  const cy = 50;

  return (
    <svg viewBox="0 0 240 100" className="w-full h-full" fill="none">
      {/* Morphing frame */}
      <motion.rect
        animate={{
          x: cx - shape.width / 2,
          y: cy - shape.height / 2,
          width: shape.width,
          height: shape.height,
          rx: shape.rx,
        }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        fill="#10B981"
        fillOpacity={0.08}
        stroke="#10B981"
        strokeWidth={1.5}
      />

      {/* Inner content depends on shape */}
      {/* </> Code icon always centered */}
      <motion.text
        x={cx}
        y={cy + 5}
        textAnchor="middle"
        fill="#10B981"
        fontSize={16}
        fontFamily="monospace"
        fontWeight="bold"
        animate={{ opacity: 1 }}
      >
        {"</>"}
      </motion.text>

      {/* Shape label */}
      <motion.text
        key={shape.label}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 0.5, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        x={cx}
        y={92}
        textAnchor="middle"
        fill="#A3A3A3"
        fontSize={9}
        fontFamily="monospace"
      >
        {shape.label}
      </motion.text>

      {/* Decorative dots inside frame (simulate UI elements) */}
      {shapeIdx === 0 && (
        <>
          {/* Dashboard: horizontal lines */}
          {[0, 1, 2].map((i) => (
            <motion.rect
              key={`dash-${i}`}
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 0.3, scaleX: 1 }}
              transition={{ delay: i * 0.1 + 0.3, duration: 0.4 }}
              x={cx - 35}
              y={cy - 18 + i * 10}
              width={28}
              height={3}
              rx={1.5}
              fill="#10B981"
              style={{ transformOrigin: `${cx - 35}px ${cy - 18 + i * 10}px` }}
            />
          ))}
        </>
      )}
      {shapeIdx === 1 && (
        <>
          {/* Mobile: small header bar + button */}
          <motion.rect
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.3 }}
            x={cx - 12}
            y={cy - 25}
            width={24}
            height={3}
            rx={1.5}
            fill="#10B981"
          />
          <motion.rect
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.4, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            x={cx - 10}
            y={cy + 18}
            width={20}
            height={6}
            rx={3}
            fill="#10B981"
            style={{ transformOrigin: `${cx}px ${cy + 21}px` }}
          />
        </>
      )}
      {shapeIdx === 2 && (
        <>
          {/* Extension: gear icon dots */}
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const r = 16;
            const dotX = cx + r * Math.cos((angle * Math.PI) / 180);
            const dotY = cy + r * Math.sin((angle * Math.PI) / 180);
            return (
              <motion.circle
                key={`gear-${i}`}
                cx={dotX}
                cy={dotY}
                r={1.5}
                fill="#10B981"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ delay: i * 0.08 + 0.3, duration: 1.5, repeat: Infinity }}
              />
            );
          })}
        </>
      )}
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Animation C: Secure Handshake (API Card)
// Gray server ← encrypted line → Green AI → server turns green
// ─────────────────────────────────────────────────────────────────────────────

function SecureHandshakeAnim() {
  const [phase, setPhase] = useState<"idle" | "connecting" | "connected">("idle");

  useEffect(() => {
    const cycle = () => {
      setPhase("idle");
      const t1 = setTimeout(() => setPhase("connecting"), 800);
      const t2 = setTimeout(() => setPhase("connected"), 3200);
      const t3 = setTimeout(() => setPhase("idle"), 5800);
      return [t1, t2, t3];
    };

    let timers = cycle();
    const interval = setInterval(() => {
      timers.forEach(clearTimeout);
      timers = cycle();
    }, 6200);

    return () => {
      clearInterval(interval);
      timers.forEach(clearTimeout);
    };
  }, []);

  const serverColor = phase === "connected" ? "#10B981" : "#666666";

  return (
    <svg viewBox="0 0 240 100" className="w-full h-full" fill="none">
      {/* Left: Server icon */}
      <motion.g animate={{ x: 0 }}>
        {/* Server box */}
        <motion.rect
          x={30}
          y={25}
          width={40}
          height={50}
          rx={4}
          fill={serverColor}
          fillOpacity={0.1}
          stroke={serverColor}
          strokeWidth={1.2}
          animate={{
            stroke: serverColor,
            fill: phase === "connected" ? "rgba(16,185,129,0.1)" : "rgba(102,102,102,0.1)",
          }}
          transition={{ duration: 0.8 }}
        />
        {/* Server lines */}
        {[0, 1, 2].map((i) => (
          <motion.rect
            key={`srv-${i}`}
            x={38}
            y={34 + i * 14}
            width={24}
            height={4}
            rx={2}
            animate={{
              fill: phase === "connected" ? "#10B981" : "#555555",
            }}
            fillOpacity={0.5}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        ))}
        {/* Server dots */}
        {[0, 1, 2].map((i) => (
          <motion.circle
            key={`dot-${i}`}
            cx={36}
            cy={36 + i * 14}
            r={1.5}
            animate={{
              fill: phase === "connected" ? "#10B981" : "#555555",
            }}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          />
        ))}
        {/* Label */}
        <text x={50} y={88} textAnchor="middle" fill="#666666" fontSize={8} fontFamily="monospace">
          Legacy
        </text>
      </motion.g>

      {/* Connection line (dashed, animated dash offset) */}
      <motion.line
        x1={75}
        y1={50}
        x2={165}
        y2={50}
        stroke="#10B981"
        strokeWidth={1.2}
        strokeDasharray="5 4"
        animate={{
          opacity: phase === "idle" ? 0.15 : phase === "connecting" ? 0.5 : 0.8,
          strokeDashoffset: phase === "connecting" ? [90, 0] : 0,
        }}
        transition={{
          strokeDashoffset: { duration: 2.4, ease: "linear" },
          opacity: { duration: 0.4 },
        }}
      />

      {/* Traveling Lock icon */}
      <motion.g
        animate={{
          x: phase === "connecting" ? [0, 50] : phase === "connected" ? 50 : 0,
          opacity: phase === "idle" ? 0 : 1,
        }}
        transition={{
          x: { duration: phase === "connecting" ? 2.4 : 0.3, ease: "easeInOut" },
          opacity: { duration: 0.3 },
        }}
      >
        {/* Lock body */}
        <rect x={95} y={43} width={10} height={9} rx={2} fill="#10B981" fillOpacity={0.3} stroke="#10B981" strokeWidth={1} />
        {/* Lock shackle */}
        <path d="M97 43v-3a3 3 0 0 1 6 0v3" fill="none" stroke="#10B981" strokeWidth={1} strokeLinecap="round" />

        {/* Lock glow when connected */}
        <motion.circle
          cx={100}
          cy={47}
          r={10}
          fill="#10B981"
          animate={{
            opacity: phase === "connected" ? [0, 0.15, 0] : 0,
          }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </motion.g>

      {/* Right: AI icon */}
      <motion.g>
        {/* AI circle */}
        <circle cx={190} cy={50} r={22} fill="#10B981" fillOpacity={0.1} stroke="#10B981" strokeWidth={1.2} />

        {/* AI brain/circuit lines */}
        <motion.text
          x={190}
          y={55}
          textAnchor="middle"
          fill="#10B981"
          fontSize={18}
          fontFamily="monospace"
          fontWeight="bold"
          animate={{
            opacity: [0.6, 1, 0.6],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          AI
        </motion.text>

        {/* Outer pulse ring */}
        <motion.circle
          cx={190}
          cy={50}
          r={22}
          fill="none"
          stroke="#10B981"
          strokeWidth={1}
          animate={{
            r: [22, 28, 22],
            opacity: [0.4, 0, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Label */}
        <text x={190} y={88} textAnchor="middle" fill="#10B981" fontSize={8} fontFamily="monospace" fillOpacity={0.6}>
          UpRev AI
        </text>
      </motion.g>

      {/* "Connected" status */}
      <motion.text
        x={120}
        y={20}
        textAnchor="middle"
        fill="#10B981"
        fontSize={8}
        fontFamily="monospace"
        fontWeight="bold"
        animate={{
          opacity: phase === "connected" ? 1 : 0,
          y: phase === "connected" ? 20 : 25,
        }}
        transition={{ duration: 0.4 }}
      >
        ● ENCRYPTED CONNECTION
      </motion.text>
    </svg>
  );
}
