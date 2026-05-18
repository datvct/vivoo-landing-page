import { ComplianceItem } from "@/types/home-types";
import {
  BadgeCheck,
  CircleCheckBig,
  ShieldCheck,
  Stamp,
} from "lucide-react";

const complianceItems: ComplianceItem[] =
  [
    {
      id: "safety-act",
      title: "SAFETY Act Designation",
      icon: (
        <BadgeCheck className="h-9 w-9" />
      ),
    },
    {
      id: "ndaa",
      title: "NDAA Compliant",
      icon: (
        <CircleCheckBig className="h-9 w-9" />
      ),
    },
    {
      id: "soc2",
      title: "SOC2 Type II",
      icon: (
        <ShieldCheck className="h-9 w-9" />
      ),
    },
    {
      id: "iso",
      title: "ISO 27001+ Certified",
      icon: (
        <Stamp className="h-9 w-9" />
      ),
    },
  ];

export default function ComplianceSection() {
  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
            Compliance and
            certifications
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/65 sm:mt-5 sm:text-[15px] sm:leading-7">
            Our end-to-end security
            solutions are compliant with
            global government
            regulations and built on a
            trusted, cybersecurity
            platform - all designed to
            help you focus on what
            matters most.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {complianceItems.map(
            (item) => (
              <article
                key={item.id}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-black sm:h-16 sm:w-16">
                  {item.icon}
                </div>
                <h3 className="mt-4 text-base leading-7 font-semibold text-black sm:mt-5 sm:text-lg sm:leading-8">
                  {item.title}
                </h3>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
