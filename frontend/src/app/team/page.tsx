import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamHero } from "@/components/sections/team/TeamHero";
import { FounderCards } from "@/components/sections/team/FounderCards";
import { GlobalBase } from "@/components/sections/team/GlobalBase";

export default function TeamPage() {
    return (
        <>
            <Navbar />
            <main className="relative z-10 bg-[var(--color-carbon)]">
                <TeamHero />
                <FounderCards />
                <GlobalBase />
            </main>
            <Footer hideCTA />
        </>
    );
}
