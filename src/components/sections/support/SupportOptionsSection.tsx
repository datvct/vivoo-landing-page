import SupportOptionCard from "./SupportOptionCard";
import type { SupportOption } from "../../../types/support-types";

type SupportOptionsSectionProps = {
  options: SupportOption[];
};

export default function SupportOptionsSection({
  options,
}: SupportOptionsSectionProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-10">
      <div className="mt-6 grid gap-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {options.map((option) => (
          <SupportOptionCard
            key={option.title}
            title={option.title}
            logoText={option.logoText}
            subtitle={option.subtitle}
            buttonLabel={
              option.buttonLabel
            }
            link={option.link}
          />
        ))}
      </div>
    </section>
  );
}
