"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { useSiteSettingQuery } from "@/services/site-settings/queries";

type FaqItem = {
  question: string;
  answer: string;
};

type FAQSectionProps = {
  title?: string;
  items?: FaqItem[];
};

export default function FAQSection({
  title = "FAQs about school safety technologies",
  items,
}: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { data: settingData } = useSiteSettingQuery("general");

  const defaultItems = [
    {
      question: "How does video security improve school safety?",
      answer: "Video security helps monitor activity, deter incidents and provide evidence for investigations.",
    },
    {
      question: "What are the key features to look for in school security products?",
      answer: "Look for analytics, low-light performance, easy management and integrations with access control.",
    },
    {
      question: "How does access control prevent unauthorized entry in schools?",
      answer: "Access control restricts entry points, enforces policies and logs activity for audits.",
    },
  ];

  const dbFaqs = settingData?.data?.value?.faqs?.map((faq: { question: string; answer: string }) => ({
    question: faq.question,
    answer: faq.answer,
  }));

  const displayItems: FaqItem[] = items || dbFaqs || defaultItems;

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <section className="bg-white py-6 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-xl font-semibold text-black sm:text-2xl">
            {title}
          </h2>
        </div>

        <div className="mx-auto mt-6 max-w-3xl sm:mt-8">
          <div className="space-y-3 sm:space-y-4">
            {displayItems.map((it, i) => {
              const open =
                openIndex === i;

              return (
                <div
                  key={it.question}
                  className="overflow-hidden rounded-xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-all duration-300 sm:rounded-2xl"
                >
                  <button
                    className="flex w-full items-center justify-between px-4 py-4 text-left sm:px-6 sm:py-5"
                    onClick={() =>
                      toggle(i)
                    }
                    aria-expanded={open}
                  >
                    <span className="pr-4 text-sm leading-6 font-semibold text-black/80 sm:text-lg">
                      {it.question}
                    </span>

                    <div
                      className={`ml-4 shrink-0 transition-transform duration-300 ${open
                          ? "rotate-45"
                          : "rotate-0"
                        }`}
                    >
                      <Plus size={18} />
                    </div>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ease-in-out ${open
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <div className="px-4 pb-4 sm:px-6 sm:pb-5">
                        <p className="text-sm leading-6 text-black/70 sm:leading-7">
                          {it.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
