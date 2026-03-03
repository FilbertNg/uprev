"use client";

import { motion } from "framer-motion";
import { Sparkles, MousePointer2 } from "lucide-react";
import { useState, useEffect } from "react";

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

export function AICSVisual({ isHovered }: { isHovered: boolean }) {
    // 4 bezier curves: each user corner → center brain
    const paths = [
        "M 35 50 C 100 50, 160 150, 220 150",   // top-left → center
        "M 35 250 C 100 250, 160 150, 220 150",  // bottom-left → center
        "M 405 50 C 340 50, 280 150, 220 150",   // top-right → center
        "M 405 250 C 340 250, 280 150, 220 150"   // bottom-right → center
    ];
    const users = [
        { x: 8, y: 16.7, isRight: false, delay: 0, label: "User 1" },
        { x: 8, y: 83.3, isRight: false, delay: 1.5, label: "User 2" },
        { x: 92, y: 16.7, isRight: true, delay: 3, label: "User 3" },
        { x: 92, y: 83.3, isRight: true, delay: 4.5, label: "User 4" },
    ];
    const dur = 6; // snappier loop
    // On mobile (no hover), auto-play the animation
    const isMobile = useIsMobile();
    const active = isHovered || isMobile;

    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[24px]">
            {/* Inner Grid */}
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            {/* Network Viewport */}
            <div className="absolute bottom-3 left-4 md:bottom-auto md:left-auto md:top-1/2 md:right-8 md:-translate-y-1/2 lg:bottom-24 lg:top-auto lg:right-auto lg:left-1/2 lg:-translate-x-1/2 lg:translate-y-0 w-[750px] sm:w-[900px] md:w-[440px] lg:w-[500px] aspect-[75/30] sm:aspect-[90/30] md:aspect-[44/30] lg:aspect-[50/33] flex items-center justify-center scale-[0.28] sm:scale-[0.35] md:scale-[0.7] lg:scale-100 origin-bottom-left md:origin-right lg:origin-bottom">

                {/* Lines SVG */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 440 300" preserveAspectRatio="none">
                    <defs>
                        <filter id="glow-flame" x="-20%" y="-20%" width="140%" height="140%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Base Cords */}
                    {paths.map((p, i) => (
                        <path key={i} d={p} fill="none" className="stroke-border-light" strokeWidth="1.5" opacity="0.3" />
                    ))}

                    {/* Animated Flames */}
                    {paths.map((p, i) => (
                        <g key={`flames-${i}`}>
                            <Flame d={p} delay={users[i].delay} active={active} isInbound={true} dur={dur} />
                            <Flame d={p} delay={users[i].delay} active={active} isInbound={false} dur={dur} />
                        </g>
                    ))}
                </svg>

                {/* Draw HTML Nodes */}
                {users.map((u, i) => (
                    <UserNode key={i} {...u} active={active} dur={dur} />
                ))}

                {/* Central Brain */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-[-10px] bg-tiger-flame rounded-2xl"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={active ? { opacity: [0, 0.3, 0], scale: [0.8, 1.3, 1.5] } : { opacity: 0, scale: 0.8 }}
                        transition={active ? { duration: 1.8, repeat: Infinity, delay: 0.8 } : { duration: 0.4, ease: "easeOut" }}
                    />
                    <div className="w-14 h-14 border-2 border-border-light bg-[#111111] rounded-2xl rotate-45 flex items-center justify-center shadow-xl relative z-10">
                        <motion.div
                            animate={active ? {
                                color: ["#ffffff", "var(--color-tiger-flame)", "#ffffff"],
                                opacity: [0.5, 1, 0.5],
                                scale: [1, 1.12, 1]
                            } : { opacity: 0.5, color: "#ffffff", scale: 1 }}
                            transition={active ? { duration: 1.8, repeat: Infinity, delay: 0.8 } : { duration: 0.4, ease: "easeOut" }}
                            className="-rotate-45"
                        >
                            <Sparkles className="w-6 h-6 text-current" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}

/**
 * Flame animation — faster travel
 * Inbound (User→Brain):  visible 8%–22% of 6s loop = 0.84s travel
 * Outbound (Brain→User): visible 30%–44% of 6s loop = 0.84s travel
 * Reply appears at 48% — after outbound flame arrives at 44%.
 */
function Flame({ d, delay, active, isInbound, dur }: { d: string, delay: number, active: boolean, isInbound: boolean, dur: number }) {
    const opacityTimes = isInbound
        ? [0, 0.079, 0.08, 0.22, 0.221, 1]
        : [0, 0.299, 0.30, 0.44, 0.441, 1];

    const offsetValues = isInbound
        ? [30, 30, 30, -280, -280, -280]
        : [-280, -280, -280, 30, 30, 30];

    return (
        <motion.path
            d={d}
            fill="none" stroke="var(--color-tiger-flame)" strokeWidth="2.5"
            filter="url(#glow-flame)"
            strokeDasharray="30 350"
            initial={{ opacity: 0, strokeDashoffset: isInbound ? 30 : -280 }}
            animate={active ? {
                opacity: [0, 0, 1, 1, 0, 0],
                strokeDashoffset: offsetValues
            } : { opacity: 0, strokeDashoffset: isInbound ? 30 : -280 }}
            transition={active
                ? { duration: dur, repeat: Infinity, delay, times: opacityTimes }
                : { duration: 0.4, ease: "easeOut" }
            }
        />
    )
}

/**
 * UserNode — tighter sequence on 6s loop:
 * 0%–5%   : Input bubble fades in
 * 8%–22%  : Inbound flame travels to brain
 * 22%–30% : Brain pulses
 * 30%–44% : Outbound flame returns
 * 48%–52% : Reply bubble appears (AFTER flame)
 * 85%–92% : Both bubbles fade
 */
function UserNode({ x, y, isRight, active, delay, dur, label }: { x: number, y: number, isRight?: boolean, active: boolean, delay: number, dur: number, label?: string }) {
    const side = isRight ? 'right-0 mr-4' : 'left-0 ml-4';
    const exitTransition = { duration: 0.4, ease: "easeOut" as const };
    return (
        <div
            className="absolute"
            style={isRight ? { right: `${100 - x}%`, top: `${y}%` } : { left: `${x}%`, top: `${y}%` }}
        >
            {/* The Dot */}
            <div className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-border-light border border-[#555] rounded-full shadow-[0_0_8px_rgba(255,255,255,0.05)]" />

            {/* Label */}
            {label && (
                <span className={`absolute ${side} -top-[58px] text-[12px] font-mono font-semibold tracking-widest uppercase text-[#555] whitespace-nowrap select-none z-30`}>
                    {label}
                </span>
            )}

            {/* Input Bubble */}
            <motion.div
                className={`absolute ${side} -top-[42px] bg-surface border border-border-light rounded-lg ${isRight ? 'rounded-br-sm' : 'rounded-bl-sm'} px-2.5 py-2 w-24 flex flex-col gap-1.5 shadow-md z-20`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={active ? {
                    opacity: [0, 1, 1, 1, 0],
                    scale: [0.85, 1, 1, 1, 0.85]
                } : { opacity: 0, scale: 0.85 }}
                transition={active
                    ? { duration: dur, repeat: Infinity, delay, times: [0, 0.05, 0.85, 0.88, 0.92] }
                    : exitTransition
                }
            >
                <div className="w-full h-1.5 bg-[#555] rounded-full" />
                <div className="w-3/5 h-1.5 bg-[#555] rounded-full" />
            </motion.div>

            {/* Reply Bubble — appears at 48%, after outbound flame ends at 44% */}
            <motion.div
                className={`absolute ${side} top-[12px] bg-tiger-flame/10 border border-tiger-flame/30 rounded-lg ${isRight ? 'rounded-tr-sm' : 'rounded-tl-sm'} px-2.5 py-2 w-28 flex flex-col gap-1.5 shadow-md z-20`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={active ? {
                    opacity: [0, 0, 1, 1, 0],
                    scale: [0.85, 0.85, 1, 1, 0.85]
                } : { opacity: 0, scale: 0.85 }}
                transition={active
                    ? { duration: dur, repeat: Infinity, delay, times: [0, 0.46, 0.52, 0.85, 0.92] }
                    : exitTransition
                }
            >
                <div className="w-full h-1.5 bg-white/50 rounded-full" />
                <div className="w-4/5 h-1.5 bg-white/50 rounded-full" />
                <div className="w-1/2 h-1.5 bg-white/50 rounded-full" />
            </motion.div>
        </div>
    )
}

export function SmartCRMVisual({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[24px]">
            {/* Inner Grid */}
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            <div className="absolute bottom-4 right-4 w-48 h-32 bg-carbon border border-[#333] rounded-xl flex items-end p-4 gap-4 shadow-2xl">
                {/* Data Rows */}
                <div className="flex-1 flex flex-col gap-2 justify-end">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            className="h-2 w-full rounded-full bg-[#333]"
                            animate={isHovered ? { backgroundColor: ["#333", "var(--color-smoke)", "#333"] } : {}}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                        />
                    ))}
                </div>
                {/* Bar Chart */}
                <div className="flex gap-1 h-full items-end pb-2">
                    <motion.div className="w-3 bg-[#333] rounded-t-sm h-[40%]" />
                    <motion.div className="w-3 bg-[#333] rounded-t-sm h-[60%]" animate={{ height: ["60%", "70%", "60%"] }} transition={{ duration: 2, repeat: Infinity }} />
                    <motion.div
                        className="w-3 bg-[#333] rounded-t-sm h-[30%]"
                        animate={isHovered ? { height: "100%", backgroundColor: "var(--color-tiger-flame)" } : { height: "30%", backgroundColor: "#333" }}
                        transition={{ duration: 0.5 }}
                    />
                </div>
            </div>
        </div>
    );
}

export function WebsiteVisual({ isHovered }: { isHovered: boolean }) {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none rounded-[24px]">
            {/* Inner Grid */}
            <div className="absolute inset-0 opacity-[0.1]" style={{ backgroundImage: "linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)", backgroundSize: "20px 20px" }} />

            <motion.div
                className="absolute -bottom-10 left-12 w-64 h-48 bg-carbon border border-[#333] rounded-t-xl overflow-hidden shadow-2xl"
                style={{ transformStyle: "preserve-3d" }}
                animate={{ rotateX: isHovered ? 20 : 10, rotateY: isHovered ? -15 : -5, y: isHovered ? -10 : 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Browser Header */}
                <div className="h-6 border-b border-[#333] bg-[#222] flex items-center px-2 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                    <div className="w-2 h-2 rounded-full bg-[#333]" />
                </div>

                {/* Website Content */}
                <div className="p-4 flex flex-col gap-3 relative">
                    <motion.div
                        className="w-full h-16 bg-[#2A2A2A] rounded-md"
                        animate={isHovered ? { translateZ: 20, y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.5)" } : { translateZ: 0, y: 0, boxShadow: "none" }}
                    />
                    <div className="flex gap-3">
                        <div className="w-1/2 h-8 bg-[#2A2A2A] rounded-md" />
                        <div className="w-1/2 flex flex-col gap-2">
                            <div className="w-full h-2 bg-[#2A2A2A] rounded-full" />
                            <div className="w-3/4 h-2 bg-[#2A2A2A] rounded-full" />
                            <motion.div
                                className="w-1/2 h-4 mt-1 bg-[#333] rounded-sm relative"
                                animate={isHovered ? { translateZ: 10, y: -2, backgroundColor: "var(--color-tiger-flame)" } : { translateZ: 0, y: 0, backgroundColor: "#333" }}
                                transition={{ duration: 0.8, ease: "easeInOut" }}
                            >
                                {/* Ripple */}
                                {isHovered && (
                                    <motion.div
                                        className="absolute inset-0 rounded-sm border border-white"
                                        initial={{ scale: 1, opacity: 0.6 }}
                                        animate={{ scale: 2.5, opacity: 0 }}
                                        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 0.5, ease: "easeOut" }}
                                    />
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Glassy Sheen */}
                    <motion.div
                        className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45"
                        animate={{ x: ["-100%", "50%"] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                {/* Fake Cursor */}
                {isHovered && (
                    <motion.div
                        className="absolute z-50 text-white drop-shadow-lg"
                        initial={{ x: 150, y: 150 }}
                        animate={{ x: 80, y: 55 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <MousePointer2 className="w-6 h-6 fill-black" />
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
}
