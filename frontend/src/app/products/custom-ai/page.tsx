import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductFatFooter } from "@/components/sections/products/ProductFatFooter";
import { AiHero } from "@/components/sections/products/customai/AiHero";
import { AiCapabilities } from "@/components/sections/products/customai/AiCapabilities";
import { AiTimeline } from "@/components/sections/products/customai/AiTimeline";
import { AiVipCta } from "@/components/sections/products/customai/AiVipCta";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom AI Integration | UpRev",
  description:
    "Tailor-made AI solutions for Enterprise infrastructure and rapid MVP launches. We build what you need.",
};

export default function CustomAIPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] flex flex-col">
      <Navbar />

      <div className="flex-1">
        <AiHero />
        <AiCapabilities />
        <AiTimeline />
        <AiVipCta />
      </div>

      {/* Standard Footer layout below Fat Footer CTA */}
      <Footer hideCTA={true} />
    </main>
  );
}
