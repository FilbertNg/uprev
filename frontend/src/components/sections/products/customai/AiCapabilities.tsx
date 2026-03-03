"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Database, Code2, Network } from "lucide-react";

const CAPABILITIES = [
  {
    icon: Database,
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
    icon: Code2,
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
    icon: Network,
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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
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
          {CAPABILITIES.map((cap, idx) => {
            const Icon = cap.icon;
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-[#1A1A1A] border border-[#333333] rounded-2xl p-8 md:p-10 flex flex-col gap-6 group hover:border-tiger-flame/50 transition-colors duration-300 relative overflow-hidden"
              >
                {/* Subtle Background Glow on Hover */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,87,34,0.05),transparent_50%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="w-14 h-14 rounded-xl bg-[#222222] border border-[#333333] flex items-center justify-center text-[#10B981] group-hover:text-tiger-flame group-hover:scale-110 transition-all duration-300">
                  <Icon size={28} strokeWidth={1.5} />
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
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
