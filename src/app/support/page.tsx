import SupportCriticalSection from "@/components/sections/support/SupportCriticalSection";
import SupportHeroSection from "@/components/sections/support/SupportHeroSection";
import SupportOptionsSection from "@/components/sections/support/SupportOptionsSection";
import type { SupportOption } from "@/types/support-types";

const supportOptions: SupportOption[] =
  [
    {
      title: "Avigilon Unity",
      logoText: "VIVOO UNITY",
      buttonLabel: "GET SUPPORT",
      link: "/support/unity",
    },
    {
      title: "Alta Video",
      logoText: "VIVOO ALTA",
      subtitle: "Formerly Alta",
      buttonLabel: "GET SUPPORT",
      link: "/support/alta-video",
    },
    {
      title: "Alta Access Control",
      logoText: "VIVOO ALTA",
      subtitle: "Formerly openpath",
      buttonLabel: "GET SUPPORT",
      link: "/support/alta-access-control",
    },
  ];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-10 lg:py-16">
        <SupportHeroSection
          title="Technical support options"
          description="Need help with your Avigilon Unity and Alta products? Click on the appropriate product below to see what support channels are available, or head directly to our 24/7 online self service support community to find quick answers."
        />
      </section>

      <SupportOptionsSection
        options={supportOptions}
      />

      <SupportCriticalSection
        label="For critical support:"
        phoneLabel="North America:"
        phoneNumber="+1 213-297-2180"
        linkLabel="International numbers"
      />
    </main>
  );
}
