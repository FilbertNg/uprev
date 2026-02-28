import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductFatFooter } from "@/components/sections/products/ProductFatFooter";
import { AiCsHero } from "@/components/sections/products/aics/AiCsHero";
import { AiCsProblem } from "@/components/sections/products/aics/AiCsProblem";
import { AiCsFeatures } from "@/components/sections/products/aics/AiCsFeatures";
import { AiCsRoi } from "@/components/sections/products/aics/AiCsRoi";
import { AiCsHumanControl } from "@/components/sections/products/aics/AiCsHumanControl";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Intelligent AI CS | UpRev",
    description: "Automate your customer service and scale sales with a 24/7 AI-driven intelligent text agent.",
};

export default function AiCsPage() {
    return (
        <main className="min-h-screen bg-[var(--color-carbon)] flex flex-col">
            <Navbar />

            <div className="flex-1">
                <AiCsHero />
                <AiCsProblem />
                <AiCsFeatures />
                <AiCsRoi />
                <AiCsHumanControl />
            </div>

            <ProductFatFooter />
            {/* Standard Footer layout below Fat Footer CTA */}
            <Footer hideCTA={true} />
        </main>
    );
}
