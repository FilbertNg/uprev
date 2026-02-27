"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Linkedin } from "lucide-react";

const founders = [
    {
        name: "Darrell Benedict Setiawan",
        role: "CEO & Co-Founder",
        image: "/team/darrell.jpg",
        linkedin: "#",
    },
    {
        name: "Filbert Ng",
        role: "CTO & Co-Founder",
        image: "/team/filbert.jpg",
        linkedin: "#",
    },
];

export function FounderCards() {
    const { t } = useLanguage();

    return (
        <section className="pt-8 pb-16 px-4 sm:px-6 bg-[var(--color-carbon)] relative z-10">
            <div className="mx-auto max-w-[1000px]">
                <div className="flex flex-col md:flex-row gap-8 justify-center">
                    {founders.map((founder, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: i * 0.2 }}
                            className="group relative flex-1 max-w-[480px] bg-[#1A1A1A] rounded-[16px] overflow-hidden cursor-default"
                            style={{ minHeight: "500px" }}
                        >
                            {/* Photo */}
                            <div className="relative w-full h-[320px] overflow-hidden">
                                <div
                                    className="w-full h-full bg-cover bg-center bg-[#2A2A2A] transition-all duration-400 grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${founder.image})` }}
                                />
                            </div>

                            {/* Text Content */}
                            <div className="p-6 transition-transform duration-300 group-hover:-translate-y-2">
                                <h3 className="font-display text-[28px] md:text-[32px] font-bold text-[#F5F5F5] mt-2">
                                    {founder.name}
                                </h3>
                                <p className="font-inter text-[16px] font-semibold text-[#FF5722] mt-1">
                                    {founder.role}
                                </p>

                                {/* LinkedIn button — appears on hover */}
                                <a
                                    href={founder.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-[#222222] rounded-full text-[12px] text-white opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                                >
                                    <Linkedin className="w-3.5 h-3.5" />
                                    Connect on LinkedIn
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
