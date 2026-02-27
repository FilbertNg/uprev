"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Video, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ContactDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ContactDrawer({ isOpen, onClose }: ContactDrawerProps) {
    const { t } = useLanguage();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 z-40"
                        onClick={onClose}
                    />

                    {/* Drawer Panel */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            bounce: 0,
                            duration: 0.5,
                        }}
                        className="fixed right-0 top-0 h-screen w-full sm:w-[400px] bg-[#1A1A1A]/95 backdrop-blur-xl border-l border-[#333333] z-50 overflow-y-auto"
                    >
                        <div className="p-8">
                            {/* Header */}
                            <div className="flex items-start justify-between mb-2">
                                <h2 className="font-display text-[24px] font-bold text-[#F5F5F5]">
                                    {t("Hubungi Kami", "Contact Us")}
                                </h2>
                                <button
                                    onClick={onClose}
                                    className="p-1 text-[#A3A3A3] hover:text-white transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            <p className="font-inter text-[16px] text-[#A3A3A3] mt-2 mb-10">
                                Let&apos;s discuss your goals. Online or Offline.
                            </p>

                            {/* Meeting Options */}
                            <div className="space-y-4 mb-10">
                                <a
                                    href="https://uprev.id/api/meet/schedule"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-[#222222] border border-[#333333] rounded-[12px] p-5 transition-colors duration-200 hover:border-[#FF5722] group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <Video className="w-5 h-5 text-[#FF5722]" />
                                        <span className="font-display text-[18px] font-semibold text-[#F5F5F5]">
                                            Online Meeting
                                        </span>
                                    </div>
                                    <p className="font-inter text-[14px] text-[#A3A3A3] ml-8">
                                        Via Zoom / Google Meet
                                    </p>
                                </a>

                                <a
                                    href="https://uprev.id/api/meet/schedule"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block bg-[#222222] border border-[#333333] rounded-[12px] p-5 transition-colors duration-200 hover:border-[#FF5722] group cursor-pointer"
                                >
                                    <div className="flex items-center gap-3 mb-1">
                                        <MapPin className="w-5 h-5 text-[#FF5722]" />
                                        <span className="font-display text-[18px] font-semibold text-[#F5F5F5]">
                                            Offline Meeting
                                        </span>
                                    </div>
                                    <p className="font-inter text-[14px] text-[#A3A3A3] ml-8">
                                        {t("Tatap muka langsung", "Face-to-face meeting")}
                                    </p>
                                </a>
                            </div>

                            {/* Contact List */}
                            <div className="border-t border-[#333333] pt-6 space-y-0">
                                <a
                                    href="https://wa.me/6281357724474"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 py-3 hover:opacity-80 transition-opacity"
                                >
                                    <Phone className="w-5 h-5 text-[#FF5722] flex-shrink-0" />
                                    <span className="font-inter text-[16px] text-[#F5F5F5]">
                                        WhatsApp: +62 813-5772-4474
                                    </span>
                                </a>

                                <a
                                    href="mailto:uprevofficialid@gmail.com"
                                    className="flex items-center gap-3 py-3 hover:opacity-80 transition-opacity"
                                >
                                    <Mail className="w-5 h-5 text-[#FF5722] flex-shrink-0" />
                                    <span className="font-inter text-[16px] text-[#F5F5F5]">
                                        uprevofficialid@gmail.com
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
