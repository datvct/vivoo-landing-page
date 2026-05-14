import ComplianceSection from "@/components/sections/home/ComplianceSection";
import HeroSection from "@/components/sections/home/HeroSection";
import DiscoverMoreSection from "@/components/sections/home/DiscoverMoreSection";
import CustomerStoriesSection from "@/components/common/CustomerStoriesSection";
import IndustriesSection from "@/components/sections/home/IndustriesSection";
import LogoSection from "@/components/common/LogoSection";
import SolutionsSection from "@/components/common/SolutionsSection";
import HeroSectionMobile from "@/components/sections/home/HeroSectionMobile";

export default function HomePage() {
  return (
    <>
      <div className="hidden sm:block">
        <HeroSection />
      </div>
      <div className="block sm:hidden">
        <HeroSectionMobile />
      </div>
      <LogoSection />
      <SolutionsSection />
      <IndustriesSection />
      <CustomerStoriesSection />
      <DiscoverMoreSection />
      <ComplianceSection />
    </>
  );
}
