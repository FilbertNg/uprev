"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function AiVipCta() {
  const { t } = useLanguage();

  return (
    <section className="w-full bg-tiger-flame relative overflow-hidden py-24 md:py-32">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,white,transparent_70%)]" />
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center flex flex-col items-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display font-extrabold text-[36px] md:text-[48px] lg:text-[56px] text-white leading-[1.1] mb-10"
        >
          {t(
            "Punya Kebutuhan Skala Enterprise? Mari Bicara Teknis.",
            "Have Enterprise-Scale Needs? Let's Talk Specs.",
          )}
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Link
            href="https://uprev.id/api/meet/schedule" // Same link as Fat Footer
            target="_blank"
            className="group relative inline-flex items-center gap-3 bg-carbon hover:bg-black text-white px-8 py-5 rounded-full font-display font-bold text-[18px] transition-all duration-300 shadow-2xl hover:shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:-translate-y-1"
          >
            <span>
              {t(
                "Jadwalkan Konsultasi Engineering",
                "Schedule Engineering Consultation",
              )}
            </span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
