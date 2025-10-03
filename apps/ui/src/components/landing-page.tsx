import { HeroSection } from "./landing/hero-section";
import { FeaturesGrid } from "./landing/features-grid";
import { StatsSection } from "./landing/stats-section";
import { CallToActionSection } from "./landing/call-to-action-section";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container mx-auto px-4 py-16">
        <HeroSection />
        <FeaturesGrid />
        <StatsSection />
        <CallToActionSection />
      </div>
    </div>
  );
}
