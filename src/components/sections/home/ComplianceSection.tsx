import LucideIcon from "@/components/common/LucideIcon";

type ComplianceItem = {
  id: string;
  title: string;
  iconName: string;
};

const defaultComplianceItems: ComplianceItem[] =
  [
    {
      id: "safety-act",
      title: "SAFETY Act Designation",
      iconName: "BadgeCheck",
    },
    {
      id: "ndaa",
      title: "NDAA Compliant",
      iconName: "CircleCheckBig",
    },
    {
      id: "soc2",
      title: "SOC2 Type II",
      iconName: "ShieldCheck",
    },
    {
      id: "iso",
      title: "ISO 27001+ Certified",
      iconName: "Stamp",
    },
  ];

type ComplianceSectionProps = {
  title?: string;
  description?: string;
  complianceList?: ComplianceItem[];
};

export default function ComplianceSection({
  title = "Compliance and certifications",
  description = "Our end-to-end security solutions are compliant with global government regulations and built on a trusted, cybersecurity platform - all designed to help you focus on what matters most.",
  complianceList = [],
}: ComplianceSectionProps) {
  const activeItems = complianceList && complianceList.length > 0 ? complianceList : defaultComplianceItems;

  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-black sm:text-3xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-black/65 sm:mt-5 sm:text-[15px] sm:leading-7">
            {description}
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-14 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
          {activeItems.map(
            (item) => (
              <article
                key={item.id}
                className="text-center"
              >
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-black/15 text-black sm:h-16 sm:w-16">
                  <LucideIcon name={item.iconName} className="h-9 w-9" />
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
