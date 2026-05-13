import ComplianceSection from "@/components/sections/home/ComplianceSection";
import ContactSection from "@/components/sections/home/ContactSection";
import HeroSection from "@/components/sections/home/HeroSection";
import DiscoverMoreSection from "@/components/sections/home/DiscoverMoreSection";
import CustomerStoriesSection from "@/components/sections/home/CustomerStoriesSection";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import LogoSection from "@/components/sections/home/LogoSection";
import SolutionsSection from "@/components/sections/home/SolutionsSection";

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
      <ContactSection />
    </>
  );
}
