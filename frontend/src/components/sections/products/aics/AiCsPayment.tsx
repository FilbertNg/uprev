"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect, useState, useCallback } from "react";
import Image from "next/image";

// ─── Confetti Particle ──────────────────────────────────────────────
function ConfettiParticle({
  delay,
  color,
  angle,
  distance,
}: {
  delay: number;
  color: string;
  angle: number;
  distance: number;
}) {
  const rad = (angle * Math.PI) / 180;
  const tx = Math.cos(rad) * distance;
  const ty = Math.sin(rad) * distance;
  return (
    <motion.div
      initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      animate={{ opacity: 0, scale: 0.3, x: tx, y: ty }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
      className="absolute rounded-full"
      style={{
        width: 6 + Math.random() * 4,
        height: 6 + Math.random() * 4,
        backgroundColor: color,
        top: "50%",
        left: "50%",
      }}
    />
  );
}

// ─── Check Icon SVG ─────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      className="shrink-0 mt-0.5"
    >
      <circle cx="10" cy="10" r="10" fill="#10B981" opacity="0.15" />
      <path
        d="M6 10.5L9 13.5L14.5 7.5"
        stroke="#10B981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ─── Typing Dots ────────────────────────────────────────────────────
function TypingDots() {
  return (
    <div className="flex gap-1.5 items-center px-4 py-2">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
          className="bg-muted h-2 w-2 rounded-full"
        />
      ))}
    </div>
  );
}

// ─── Mouse Cursor SVG ───────────────────────────────────────────────
// (Removed per user request to favor CSS button-pop effects instead)

// ─── Main Component ─────────────────────────────────────────────────
export function AiCsPayment() {
  const { t } = useLanguage();
  // 0=idle, 1=user, 2=typing/ai, 3=cursor clicks link, 4=payment module popup, 5=scan effect, 6=pin input, 7=verified
  const [phase, setPhase] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const PHASE_TIMINGS = {
    idle: 800,
    user: 1200,
    typing: 1000,
    ai: 1400,
    cursor: 1200,
    modulePopup: 1500,
    scan: 2000,
    pin: 2000,
    verified: 3500,
  };

  const startCycle = useCallback(() => {
    setPhase(0);

    let t_accum = PHASE_TIMINGS.idle;
    const t1 = setTimeout(() => setPhase(1), t_accum);

    t_accum += PHASE_TIMINGS.user;
    const t2 = setTimeout(() => setPhase(2), t_accum);

    t_accum += PHASE_TIMINGS.typing + PHASE_TIMINGS.ai;
    const t3 = setTimeout(() => setPhase(3), t_accum);

    t_accum += PHASE_TIMINGS.cursor;
    const t4 = setTimeout(() => setPhase(4), t_accum);

    t_accum += PHASE_TIMINGS.modulePopup;
    const t5 = setTimeout(() => setPhase(5), t_accum);

    t_accum += PHASE_TIMINGS.scan;
    const t6 = setTimeout(() => setPhase(6), t_accum);

    t_accum += PHASE_TIMINGS.pin;
    const t7 = setTimeout(() => setPhase(7), t_accum);

    t_accum += PHASE_TIMINGS.verified;
    const tReset = setTimeout(() => {
      setCycleKey((k) => k + 1);
    }, t_accum);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
      clearTimeout(tReset);
    };
  }, []);

  useEffect(() => {
    const cleanup = startCycle();
    return cleanup;
  }, [cycleKey, startCycle]);

  // Confetti particles for final phase
  const confettiColors = [
    "#10B981",
    "#FF5722",
    "#10B981",
    "#FFB74D",
    "#10B981",
    "#FF5722",
    "#34D399",
    "#FF8A65",
  ];
  const confettiParticles = Array.from({ length: 15 }, (_, i) => ({
    angle: i * 24,
    distance: 60 + Math.random() * 50,
    color: confettiColors[i % confettiColors.length],
    delay: Math.random() * 0.3,
  }));

  const checklist = [
    t(
      "Auto-Generate Invoice Link (QRIS/Virtual Account).",
      "Auto-Generate Invoice Link (QRIS/Virtual Account).",
    ),
    t(
      "Verifikasi Pembayaran Otomatis Detik Itu Juga.",
      "Instant Automatic Payment Verification.",
    ),
    t(
      "Dana masuk 100% tanpa potongan komisi OTA.",
      "100% funds received with zero OTA commission cuts.",
    ),
  ];

  return (
    <section className="w-full relative overflow-hidden py-32 bg-[#111111]">
      {/* ── Emerald glow background ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 70%)",
          filter: "blur(120px)",
        }}
      />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center px-6 relative z-10">
        {/* ═══════ LEFT COLUMN: Text ═══════ */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col"
        >
          {/* Kicker */}
          <span className="font-display text-[14px] font-bold text-[#10B981] tracking-[0.2em] uppercase mb-4">
            THE ULTIMATE CLOSER
          </span>

          {/* H2 Headline */}
          <h2 className="font-display text-smoke mb-6 text-[40px] font-extrabold leading-[1.2] lg:text-[48px]">
            {t(
              "Bukan Sekadar Menjawab. Didesain Khusus Untuk Menutup Penjualan.",
              "Not Just Answering. Engineered To Close Sales.",
            )}
          </h2>

          {/* Description */}
          <p className="font-inter text-muted mb-10 text-[18px] leading-relaxed">
            {t(
              "Berhenti membiarkan pelanggan menunggu admin mengirimkan nomor rekening. AI CS kami terintegrasi penuh dengan API Payment Gateway. Saat prospek siap membeli, AI secara otomatis men-generate tautan pembayaran instan yang aman.",
              "Stop making customers wait for an admin to send a bank account number. Our AI CS is fully integrated with Payment Gateway APIs. When a prospect is ready to buy, the AI automatically generates a secure instant payment link.",
            )}
          </p>

          {/* Checklist */}
          <div className="flex flex-col gap-4 mb-12">
            {checklist.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="flex items-start gap-3"
              >
                <CheckIcon />
                <span className="font-inter text-smoke text-[16px] font-medium">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Trust Badges */}
          <div>
            <span className="font-inter text-[12px] text-[#555555] font-bold tracking-widest block mb-4">
              ENCRYPTED & SECURED BY
            </span>
            <div className="flex flex-row items-center gap-6 lg:gap-8 mt-2">
              <div
                className="relative opacity-60 transition-all duration-300 hover:opacity-100 flex items-center justify-center w-[80px]"
                style={{ filter: "brightness(0) invert(1)" }}
              >
                <Image
                  src="/logos/qris.svg"
                  alt="QRIS"
                  width={100}
                  height={28}
                  className="h-8 w-auto object-contain"
                />
              </div>
              <div
                className="relative opacity-60 transition-all duration-300 hover:opacity-100 flex items-center justify-center w-[90px]"
                style={{ filter: "brightness(0) invert(1)" }}
              >
                <Image
                  src="/logos/xendit.png"
                  alt="Xendit"
                  width={100}
                  height={28}
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div
                className="relative opacity-60 transition-all duration-300 hover:opacity-100 flex items-center justify-center w-[100px]"
                style={{ filter: "brightness(0) invert(1)" }}
              >
                <Image
                  src="/logos/midtrans.png"
                  alt="Midtrans"
                  width={100}
                  height={28}
                  className="h-28 w-auto object-contain mt-1"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* ═══════ RIGHT COLUMN: Payment Flow Animation ═══════ */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative w-full"
        >
          {/* Glass Box Container */}
          <div
            key={cycleKey}
            className="relative w-full aspect-4/3 bg-carbon/40 border-border-light rounded-[24px] backdrop-blur-md p-6 overflow-hidden flex flex-col pt-12"
          >
            {/* Dark Background Overlay if Module Active */}
            <AnimatePresence>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, transition: { duration: 0.4 } }}
                  className="absolute inset-0 bg-black/80 z-20"
                />
              )}
            </AnimatePresence>

            {/* Chat area */}
            <div className="relative z-10 flex flex-col gap-3">
              {/* Phase 1: User bubble */}
              <AnimatePresence>
                {phase >= 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.3 } }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="self-start max-w-[80%]"
                  >
                    <div className="bg-surface rounded-bl-md rounded-2xl px-4 py-3">
                      <p className="font-inter text-smoke text-[14px] leading-relaxed">
                        {t(
                          "Oke, saya ambil paket yang ini ya. Bayarnya gimana?",
                          "Ok, I'll take this package. How do I pay?",
                        )}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Phase 2: AI Response Container (handles both typing and message to prevent jumping) */}
              <AnimatePresence mode="wait">
                {phase >= 2 && phase < 4 && (
                  <motion.div
                    key={phase === 2 ? "typing" : "message"}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{
                      opacity: 0,
                      scale: 0.95,
                      transition: { duration: 0.15 },
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="self-end max-w-[85%] origin-bottom-right"
                  >
                    {phase === 2 ? (
                      <div className="bg-surface rounded-2xl rounded-br-md px-4 py-3 border border-border-light inline-block">
                        <TypingDots />
                      </div>
                    ) : (
                      <div className="bg-tiger-flame/20 border-tiger-flame/30 rounded-br-md rounded-2xl border px-4 py-3">
                        <p className="font-inter text-smoke mb-2 text-[14px] leading-relaxed">
                          {t(
                            "Siap! Totalnya Rp 1.850.000. Silakan selesaikan pembayaran melalui tautan aman berikut ini ya:",
                            "Done! The total is Rp 1,850,000. Please complete your payment through this secure link:",
                          )}
                        </p>
                        <motion.button
                          animate={phase === 3 ? { scale: [1, 0.95, 1] } : {}}
                          transition={{ duration: 0.3, delay: 0.8 }}
                          className="bg-[#10B981] text-white text-[13px] font-bold px-4 py-2 rounded-lg font-inter flex items-center gap-2"
                        >
                          💳 Pay Invoice
                        </motion.button>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Phase 4-7: Payment Module Popup */}
            <AnimatePresence>
              {phase >= 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{
                    opacity: 0,
                    scale: 0.95,
                    y: -10,
                    transition: { duration: 0.4 },
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-surface border border-border-light rounded-2xl p-5 z-30 shadow-2xl mx-auto max-w-sm flex flex-col"
                >
                  {/* Module Header */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-display text-[16px] font-bold text-smoke">
                      Payment Method
                    </span>
                    <span className="text-[14px] font-bold text-tiger-flame">
                      Rp 1.850.000
                    </span>
                  </div>

                  {/* Phase 4: Selection List */}
                  {phase === 4 && (
                    <div className="flex flex-col gap-2 relative">
                      <motion.div
                        animate={
                          phase === 4
                            ? {
                                scale: [1, 0.96, 1],
                                borderColor: [
                                  "rgba(255,255,255,0.1)",
                                  "rgba(255,87,34,0.5)",
                                  "rgba(255,255,255,0.1)",
                                ],
                              }
                            : {}
                        }
                        transition={{ duration: 0.3, delay: 1.2 }}
                        className="flex items-center gap-3 p-3 bg-carbon/50 border border-border-light rounded-xl hover:border-tiger-flame/50 transition-colors cursor-pointer relative"
                      >
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center p-1">
                          <Image
                            src="/logos/qris.svg"
                            alt="QRIS"
                            width={32}
                            height={12}
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="font-inter text-smoke text-[14px] font-medium">
                          QRIS
                        </span>
                      </motion.div>

                      <div className="flex items-center gap-3 p-3 bg-carbon/50 border border-border-light rounded-xl opacity-60">
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                          <span className="text-[9px] font-bold text-black">
                            VA
                          </span>
                        </div>
                        <span className="font-inter text-smoke text-[14px] font-medium">
                          Virtual Account
                        </span>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-carbon/50 border border-border-light rounded-xl opacity-60">
                        <div className="w-10 h-6 bg-white rounded flex items-center justify-center">
                          <span className="text-[9px] font-bold text-[#00AECF]">
                            GO
                          </span>
                          <span className="text-[9px] font-bold text-[#00C25A]">
                            PAY
                          </span>
                        </div>
                        <span className="font-inter text-smoke text-[14px] font-medium">
                          GoPay
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Phase 5: QRIS Scan Phase */}
                  {phase === 5 && (
                    <div className="flex flex-col items-center py-4">
                      <span className="text-[13px] text-muted mb-4">
                        Scan with any QRIS app
                      </span>
                      <div className="relative w-32 h-32 bg-white rounded-xl p-2 flex items-center justify-center overflow-hidden">
                        {/* Fake QR pattern */}
                        <svg
                          viewBox="0 0 100 100"
                          className="w-full h-full opacity-80"
                        >
                          <rect
                            x="10"
                            y="10"
                            width="30"
                            height="30"
                            fill="#1A1A1A"
                          />
                          <rect
                            x="15"
                            y="15"
                            width="20"
                            height="20"
                            fill="white"
                          />
                          <rect
                            x="20"
                            y="20"
                            width="10"
                            height="10"
                            fill="#1A1A1A"
                          />
                          <rect
                            x="60"
                            y="10"
                            width="30"
                            height="30"
                            fill="#1A1A1A"
                          />
                          <rect
                            x="65"
                            y="15"
                            width="20"
                            height="20"
                            fill="white"
                          />
                          <rect
                            x="70"
                            y="20"
                            width="10"
                            height="10"
                            fill="#1A1A1A"
                          />
                          <rect
                            x="10"
                            y="60"
                            width="30"
                            height="30"
                            fill="#1A1A1A"
                          />
                          <rect
                            x="15"
                            y="65"
                            width="20"
                            height="20"
                            fill="white"
                          />
                          <rect
                            x="20"
                            y="70"
                            width="10"
                            height="10"
                            fill="#1A1A1A"
                          />

                          <rect
                            x="50"
                            y="50"
                            width="40"
                            height="40"
                            fill="#1A1A1A"
                          />
                          <rect
                            x="55"
                            y="55"
                            width="10"
                            height="10"
                            fill="white"
                          />
                          <rect
                            x="75"
                            y="75"
                            width="10"
                            height="10"
                            fill="white"
                          />
                          <rect
                            x="55"
                            y="75"
                            width="10"
                            height="10"
                            fill="white"
                          />
                          <rect
                            x="75"
                            y="55"
                            width="10"
                            height="10"
                            fill="white"
                          />
                        </svg>

                        {/* Scanning Laser Line */}
                        <motion.div
                          animate={{ y: [0, 112, 0] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "linear",
                          }}
                          className="absolute left-0 right-0 h-0.5 bg-tiger-flame top-0 shadow-[0_0_8px_rgba(255,87,34,0.8)]"
                        />
                      </div>
                    </div>
                  )}

                  {/* Phase 6: PIN Input Phase */}
                  {phase === 6 && (
                    <div className="flex flex-col items-center py-6">
                      <span className="text-[14px] font-bold text-smoke mb-6">
                        Enter Payment PIN
                      </span>

                      {/* PIN Dots */}
                      <div className="flex gap-3 mb-4">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded-full bg-carbon/50 border border-border-light overflow-hidden flex items-center justify-center"
                          >
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{
                                delay: i * 0.2,
                                type: "spring",
                                stiffness: 500,
                              }}
                              className="w-full h-full bg-tiger-flame rounded-full origin-center"
                              style={{ display: "inline-block" }}
                            />
                          </div>
                        ))}
                      </div>

                      <span className="text-[12px] text-muted">
                        Verifying secure connection...
                      </span>
                    </div>
                  )}

                  {/* Phase 7: Verification Badge & Confetti */}
                  <AnimatePresence>
                    {phase === 7 && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{
                          opacity: 0,
                          scale: 0.8,
                          y: -20,
                          transition: { duration: 0.4 },
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-52 bg-white rounded-3xl flex flex-col items-center justify-center gap-4 shadow-2xl z-40"
                      >
                        {/* Check icon */}
                        <svg
                          width="56"
                          height="56"
                          viewBox="0 0 48 48"
                          fill="none"
                        >
                          <circle
                            cx="24"
                            cy="24"
                            r="24"
                            fill="#10B981"
                            opacity="0.15"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="18"
                            fill="#10B981"
                            opacity="0.25"
                          />
                          <path
                            d="M15 24.5L21 30.5L33 18.5"
                            stroke="#10B981"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span className="font-display text-[22px] font-extrabold text-[#10B981] tracking-wide">
                          VERIFIED
                        </span>

                        {/* Confetti particles */}
                        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
                          {confettiParticles.map((p, i) => (
                            <ConfettiParticle
                              key={i}
                              delay={p.delay}
                              color={p.color}
                              angle={p.angle}
                              distance={p.distance}
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
