"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

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
    items = [
        {
            question: "How does video security improve school safety?",
            answer:
                "Video security helps monitor activity, deter incidents and provide evidence for investigations.",
        },
        {
            question:
                "What are the key features to look for in school security products?",
            answer:
                "Look for analytics, low-light performance, easy management and integrations with access control.",
        },
        {
            question:
                "How does access control prevent unauthorized entry in schools?",
            answer:
                "Access control restricts entry points, enforces policies and logs activity for audits.",
        },
    ],
}: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    function toggle(i: number) {
        setOpenIndex((prev) => (prev === i ? null : i));
    }

    return (
        <section className="bg-[#f6f6f6] py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-medium text-black">{title}</h2>
                </div>

                <div className="mx-auto mt-8 max-w-3xl">
                    <div className="space-y-4">
                        {items.map((it, i) => {
                            const open = openIndex === i;

                            return (
                                <div
                                    key={it.question}
                                    className="overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_rgba(15,23,42,0.06)] ring-1 ring-black/5 transition-all duration-300"
                                >
                                    <button
                                        className="flex w-full items-center justify-between px-6 py-5 text-left"
                                        onClick={() => toggle(i)}
                                        aria-expanded={open}
                                    >
                                        <span className="text-lg font-semibold text-black/80">
                                            {it.question}
                                        </span>

                                        <div
                                            className={`ml-4 shrink-0 transition-transform duration-300 ${open ? "rotate-45" : "rotate-0"
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
                                            <div className="px-6 pb-5">
                                                <p className="text-sm leading-7 text-black/70">
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