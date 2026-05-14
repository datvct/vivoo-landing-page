import ComplianceSection from "@/components/sections/home/ComplianceSection";
import ContactSection from "@/components/common/ContactSection";
import HeroSection from "@/components/sections/home/HeroSection";
import DiscoverMoreSection from "@/components/sections/home/DiscoverMoreSection";
import CustomerStoriesSection from "@/components/common/CustomerStoriesSection";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import LogoSection from "@/components/common/LogoSection";
import SolutionsSection from "@/components/common/SolutionsSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <LogoSection />
      <SolutionsSection />
      <IndustriesSection />
      <CustomerStoriesSection />
      <DiscoverMoreSection />
      <ComplianceSection />
    </>
  );
}
