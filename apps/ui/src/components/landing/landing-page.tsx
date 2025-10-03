import { HeroSection } from "./hero-section";
import { FeaturesGrid } from "./features-grid";
import { StatsSection } from "./stats-section";
import { CallToActionSection } from "./call-to-action-section";

export function LandingPage() {
  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesGrid />
        <StatsSection />
        <CallToActionSection />
      </div>
    </div>
  );
}
