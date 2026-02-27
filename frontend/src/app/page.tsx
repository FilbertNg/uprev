import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemTimeline } from "@/components/sections/ProblemTimeline";
import { BentoGrid } from "@/components/sections/BentoGrid";
import { DemoShowcase } from "@/components/sections/DemoShowcase";
import { Testimonials } from "@/components/sections/Testimonials";
import { Pricing } from "@/components/sections/Pricing";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="relative z-10 bg-[var(--color-carbon)]">
        <HeroSection />
        <ProblemTimeline />
        <BentoGrid />
        <DemoShowcase />
        <Testimonials />
        <Pricing />
      </main>

      <Footer />
    </>
  );
}
