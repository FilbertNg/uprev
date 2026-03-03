import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductFatFooter } from "@/components/sections/products/ProductFatFooter";
import { WebHero } from "@/components/sections/products/website/WebHero";
import { WebProblem } from "@/components/sections/products/website/WebProblem";
import { WebFeatures } from "@/components/sections/products/website/WebFeatures";
import { WebScalability } from "@/components/sections/products/website/WebScalability";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "High-Performance Website | UpRev",
  description:
    "Designed for speed, built for scale. From landing pages to enterprise web apps engineered for performance and conversion.",
};

export default function WebsitePage() {
  return (
    <main className="min-h-screen bg-carbon flex flex-col">
      <Navbar />

      <div className="flex-1">
        <WebHero />
        <WebProblem />
        <WebFeatures />
        <WebScalability />
      </div>

      <ProductFatFooter />
      {/* Standard Footer layout below Fat Footer CTA */}
      <Footer hideCTA={true} />
    </main>
  );
}
