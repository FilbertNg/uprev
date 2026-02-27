"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { problems } from "@/data/mock";
import { useLanguage } from "@/contexts/LanguageContext";

function ProblemCard({ problem, index }: { problem: typeof problems[0]; index: number }) {
    const { lang } = useLanguage();
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-20%", amount: 0.5 });

    return (
        <motion.div
            ref={ref}
            className="relative mb-24 flex flex-col gap-3 pl-8 md:pl-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        >
            <span className="absolute -left-4 md:-left-6 top-1 font-inter text-[16px] font-bold text-[var(--color-tiger-flame)] bg-[var(--color-carbon)] py-1">
                {problem.number}
            </span>
            <h3 className="font-display text-[28px] font-bold text-[var(--color-smoke)]">
                {lang === "ID" ? problem.title : (problem.titleEn || problem.title)}
            </h3>
            <p className="font-inter text-[16px] leading-[1.625] text-[var(--color-muted)] max-w-lg">
                {lang === "ID" ? problem.description : (problem.descriptionEn || problem.description)}
            </p>
        </motion.div>
    );
}

export function ProblemTimeline() {
    const { t } = useLanguage();
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"],
    });

    const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    return (
        <section
            id="solusi"
            ref={containerRef}
            className="bg-gradient-to-b from-[var(--color-carbon)] to-[#111111] py-32 px-4 sm:px-6 relative"
        >
            <div className="mx-auto flex max-w-[1200px] flex-col lg:flex-row gap-16 lg:gap-8">

                {/* Left: Sticky Header */}
                <div className="lg:w-[40%]">
                    <div className="sticky top-32 flex flex-col gap-4">
                        <span className="text-[14px] font-bold uppercase tracking-[0.2em] text-[var(--color-tiger-flame)]">
                            {t("The Bitter Truth", "The Bitter Truth")}
                        </span>
                        <h2 className="font-display text-[32px] md:text-[48px] font-extrabold leading-[1.2] text-[var(--color-smoke)]">
                            {t("Mengapa Bisnis Sulit Berkembang di Era Digital?", "Why is it Hard for Businesses to Grow in the Digital Era?")}
                        </h2>
                    </div>
                </div>

                {/* Right: Scrolling Timeline */}
                <div className="lg:w-[60%] relative pl-4 md:pl-0 mt-8 lg:mt-0">
                    {/* Base invisible outline line */}
                    <div className="absolute bottom-0 left-[2px] md:left-2 top-0 w-[2px] bg-[var(--color-border-light)]" />

                    {/* Animated fill line */}
                    <motion.div
                        className="absolute left-[2px] md:left-2 top-0 w-[2px] bg-[var(--color-tiger-flame)] origin-top"
                        style={{ height: lineHeight }}
                    />

                    <div className="relative z-10 pt-8 pb-32">
                        {problems.map((problem, i) => (
                            <ProblemCard key={problem.number} problem={problem} index={i} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
