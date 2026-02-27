import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CareersHero } from "@/components/sections/careers/CareersHero";
import { CareersTabLayout } from "@/components/sections/careers/CareersTabLayout";

export default function CareersPage() {
    return (
        <>
            <Navbar />
            <main className="relative z-10 bg-[var(--color-carbon)]">
                <CareersHero />
                <CareersTabLayout />
            </main>
            <Footer hideCTA />
        </>
    );
}
