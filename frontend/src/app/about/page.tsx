import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AboutHero } from "@/components/sections/about/AboutHero";
import { MissionSection } from "@/components/sections/about/MissionSection";
import { PhilosophyCards } from "@/components/sections/about/PhilosophyCards";

export default function AboutPage() {
    return (
        <>
            <Navbar />
            <main className="relative z-10 bg-[var(--color-carbon)]">
                <AboutHero />
                <MissionSection />
                <PhilosophyCards />
            </main>
            <Footer hideCTA />
        </>
    );
}
