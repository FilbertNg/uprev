"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getTestimonials } from "@/lib/api";
import { Testimonial } from "@/types";
import { useLanguage } from "@/contexts/LanguageContext";

export function Testimonials() {
    const { t, lang } = useLanguage();
    const [data, setData] = useState<Testimonial[]>([]);

    useEffect(() => {
        getTestimonials().then(setData);
    }, []);

    return (
        <section id="testimoni" className="bg-[#F5F5F5] py-32 px-4 sm:px-6 relative z-10">
            <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-16">
                <h2 className="text-center font-display text-[32px] md:text-[40px] font-extrabold text-[#1A1A1A]">
                    {t("Dampak Nyata. Dipercaya Lintas Batas.", "Real Impact. Trusted Across Borders.")}
                </h2>

                <div className="grid w-full grid-cols-1 md:grid-cols-2 gap-8">
                    {data.map((item, index) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                                ease: "easeOut"
                            }}
                            whileHover={{ y: -5 }}
                            className="relative flex flex-col justify-between overflow-hidden rounded-[16px] border border-[#E5E5E5] bg-white p-8 shadow-lg transition-transform duration-300"
                        >
                            {/* Large quote icon in background */}
                            <Quote className="absolute right-6 top-6 h-24 w-24 text-[var(--color-tiger-flame)] opacity-20" />

                            <p className="relative z-10 mb-8 font-inter text-[16px] leading-relaxed text-[#333333]">
                                "{lang === "ID" ? item.quote : (item.quoteEn || item.quote)}"
                            </p>

                            <div className="relative z-10 flex items-center justify-between border-t border-[#E5E5E5] pt-6">
                                <div>
                                    <p className="font-bold text-[#1A1A1A] text-[14px]">{item.authorName}</p>
                                    <p className="text-[#A3A3A3] text-[12px]">{item.authorTitle}</p>
                                </div>
                                <div className="text-2xl">{item.countryFlag}</div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
