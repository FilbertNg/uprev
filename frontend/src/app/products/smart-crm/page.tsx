import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductFatFooter } from "@/components/sections/products/ProductFatFooter";
import { CrmHero } from "@/components/sections/products/crm/CrmHero";
import { CrmProblem } from "@/components/sections/products/crm/CrmProblem";
import { CrmFeatures } from "@/components/sections/products/crm/CrmFeatures";
import { CrmSecurity } from "@/components/sections/products/crm/CrmSecurity";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Automated Smart CRM | UpRev",
    description: "Master your data and maximize customer retention with our centralized Smart CRM.",
};

export default function SmartCrmPage() {
    return (
        <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
            <Navbar />

            <div className="flex-1">
                <CrmHero />
                <CrmProblem />
                <CrmFeatures />
                <CrmSecurity />
            </div>

            <ProductFatFooter />
            {/* Standard Footer layout below Fat Footer CTA */}
            <Footer hideCTA={true} />
        </main>
    );
}
