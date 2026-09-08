import { Header } from "@/components/layout/Header";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { LightboxProvider } from "@/components/ui/Lightbox";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/hero/Hero";
import { BeliefSection } from "@/components/sections/BeliefSection";
import { FeedSection } from "@/components/sections/FeedSection";
import { CreativeSamplesSection } from "@/components/sections/CreativeSamplesSection";
import { FounderSection } from "@/components/sections/FounderSection";
import { InfluencerSection } from "@/components/sections/InfluencerSection";
import { GrowthSection } from "@/components/sections/GrowthSection";
import CareerSection from "@/components/CareerSection";
import SocialMediaFlipSection from "@/components/SocialMediaFlipSection";

export default function Page() {
  return (
    <LightboxProvider>
      <SmoothScroll />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Skip to content
      </a>

      <Header />

      <main id="main" className="flex-1">
        <Hero />
        <CareerSection/>
        <SocialMediaFlipSection/>
        {/* <BeliefSection /> */}
        {/* <FeedSection /> */}
        <CreativeSamplesSection />
        <FounderSection />
        <InfluencerSection />
        <GrowthSection>
          <Footer />
        </GrowthSection>
      </main>
    </LightboxProvider>
  );
}
