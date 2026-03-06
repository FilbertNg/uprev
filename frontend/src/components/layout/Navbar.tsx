"use client";

import { useState } from "react";
import Link from "next/link";
import { navLinks } from "@/data/mock";
import { useScrollDirection } from "@/hooks/useScrollDirection";
import { NavDropdown } from "./NavDropdown";
import { MobileDrawer } from "./MobileDrawer";
import { ContactDrawer } from "./ContactDrawer";
import { Button } from "@/components/ui/Button";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";

export function Navbar() {
    const { t, lang } = useLanguage();
    const { scrollDirection, isAtTop } = useScrollDirection();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);

    const handleNavItemClick = (href: string) => {
        if (href === "#contact-drawer") {
            setIsContactOpen(true);
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 mx-auto z-50 w-full max-w-[1200px] px-4 sm:px-6 transition-all duration-300",
                    // Show on scroll up or at top, hide on scroll down 
                    scrollDirection === "up" || isAtTop ? "translate-y-6" : "-translate-y-full opacity-0",
                )}
            >
                <div
                    className={cn(
                        "relative flex items-center justify-between rounded-full px-6 py-4 transition-all duration-300",
                        isAtTop
                            ? "bg-transparent border-transparent"
                            : "bg-[#1A1A1A]/70 backdrop-blur-md border border-[var(--color-smoke)]/10 shadow-lg"
                    )}
                >
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 font-display text-xl font-extrabold" data-magnetic>
                        <img src="/uprev_logo_md.png" alt="UpRev Logo" className="h-6 w-auto" />
                        <div>
                            <span className="text-[var(--color-tiger-flame)]">Up</span>
                            <span className="text-[var(--color-smoke)]">Rev</span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center" aria-label="Main navigation">
                        <ul className="flex items-center gap-2 lg:gap-8 m-0 p-0 list-none">
                            {navLinks.map((link) => (
                                <li key={link.id}>
                                    {link.children ? (
                                        <NavDropdown
                                            label={lang === "ID" ? link.labelId : link.labelEn}
                                            items={link.children}
                                            onItemClick={handleNavItemClick}
                                        />
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className="text-[12px] lg:text-[14px] text-[var(--color-muted)] transition-colors duration-300 hover:text-[var(--color-smoke)] whitespace-nowrap"
                                            data-magnetic
                                        >
                                            {lang === "ID" ? link.labelId : link.labelEn}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden lg:flex items-center gap-2 lg:gap-6">
                        <LanguageToggle />
                        <Button size="sm" onClick={() => window.open("https://demo1.uprev.id", "_blank")}>
                            {t("Coba Demo", "Try Demo")}
                        </Button>
                    </div>

                    {/* Hamburger Menu (Mobile/Tablet) */}
                    <button
                        className="lg:hidden text-[var(--color-smoke)] p-2 -mr-2"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open Menu"
                        aria-expanded={isMobileMenuOpen}
                        aria-controls="mobile-drawer"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Menu Drawer */}
            <MobileDrawer isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} onItemClick={handleNavItemClick} />

            {/* Contact Drawer */}
            <ContactDrawer isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
        </>
    );
}

