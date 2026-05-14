"use client";

import { useState } from "react";
import type { PhoneRegion } from "./support-detail-types";

type SupportPhoneSectionProps = {
    title: string;
    description: string;
    regions: PhoneRegion[];
};

export default function SupportPhoneSection({ title, description, regions }: SupportPhoneSectionProps) {
    const [activeRegion, setActiveRegion] = useState(0);
    const region = regions[activeRegion];

    return (
        <section className="bg-white py-14">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-2xl font-semibold tracking-[-0.03em] text-black sm:text-[30px]">{title}</h2>
                    <p className="mt-4 text-sm leading-6 text-black/55 sm:text-base">{description}</p>
                </div>

                <div className="mx-auto mt-8 max-w-3xl">
                    <div className="flex flex-wrap justify-center gap-2">
                        {regions.map((item, index) => (
                            <button
                                key={item.name}
                                type="button"
                                onClick={() => setActiveRegion(index)}
                                className={`rounded-full border px-4 py-2 text-sm font-medium transition ${activeRegion === index
                                    ? "border-[#1f4c95] bg-[#1f4c95] text-white"
                                    : "border-black/15 bg-white text-black/70 hover:border-black/30"
                                }`}
                            >
                                {item.name}
                            </button>
                        ))}
                    </div>

                    <div className="mt-10 grid gap-8 text-center md:grid-cols-3">
                        {region.items.map((item) => (
                            <div key={item.country}>
                                <div className="text-sm font-semibold text-black">{item.country}</div>
                                <div className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-black/45">Phone</div>
                                <a href={`tel:${item.phone.replace(/[^\d+]/g, "")}`} className="mt-2 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700">
                                    {item.phone}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
