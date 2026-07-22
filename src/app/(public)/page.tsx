import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import DashboardPreview from "@/components/Home/DashboardPreview";
import StatisticsSection from "@/components/Home/StatisticsSection";
import CTASection from "@/components/Home/CTASection";

export default function HomePage() {
  return (
    <main className="overflow-hidden">
      <HeroSection />

      <FeaturesSection />

      <HowItWorksSection />

      <DashboardPreview />

      <StatisticsSection />

      <CTASection />
    </main>
  );
}
