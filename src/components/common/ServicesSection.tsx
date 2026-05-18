import { Service } from "@/types/service-types";
import ServiceCard from "./ServiceCard";

const services: Service[] = [
  {
    id: "managed",
    title: "Managed Security",
    slug: "managed-security",
    description:
      "Proactive monitoring, threat hunting and incident response delivered by security experts to keep your environment safe.",
    image: "/images/product.avif",
  },
  {
    id: "cloud",
    title: "Cloud Security",
    slug: "cloud-security",
    description:
      "Architect, deploy and harden cloud-native workloads with best-practice security controls and automation.",
    image: "/images/image1.avif",
  },
  {
    id: "integration",
    title: "Integration & Consulting",
    slug: "integration-consulting",
    description:
      "Strategy, systems integration and professional services to align security with business goals.",
    image: "/images/camera-1.avif",
  },
  {
    id: "support",
    title: "Support & Maintenance",
    slug: "support-maintenance",
    description:
      "Technical support, maintenance plans and SLA-backed services to keep systems operational.",
    image: "/images/camera-2.avif",
  },
  {
    id: "compliance",
    title: "Compliance & Training",
    slug: "compliance-training",
    description:
      "Compliance assessments, audits and tailored training programs for your teams.",
    image: "/images/product.avif",
  },
];

export default function ServicesSection() {
  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-gray-600">
            Our services help you
            design, deploy and operate
            secure, resilient systems at
            scale.
          </p>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard
              key={s.id}
              service={s}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
