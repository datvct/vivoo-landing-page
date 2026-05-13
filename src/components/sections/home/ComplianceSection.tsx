import { BadgeCheck, CircleCheckBig, ShieldCheck, Stamp } from "lucide-react";

type ComplianceItem = {
    id: string;
    title: string;
    icon: React.ReactNode;
};

const complianceItems: ComplianceItem[] = [
    {
        id: "safety-act",
        title: "SAFETY Act Designation",
        icon: <BadgeCheck className="h-9 w-9" />,
    },
    {
        id: "ndaa",
        title: "NDAA Compliant",
        icon: <CircleCheckBig className="h-9 w-9" />,
    },
    {
        id: "soc2",
        title: "SOC2 Type II",
        icon: <ShieldCheck className="h-9 w-9" />,
    },
    {
        id: "iso",
        title: "ISO 27001+ Certified",
        icon: <Stamp className="h-9 w-9" />,
    },
];

export default function ComplianceSection() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-[40px] font-medium tracking-[-0.02em] text-black sm:text-[44px]">
                        Compliance and certifications
                    </h2>
                    <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-black/65 sm:text-base">
                        Our end-to-end security solutions are compliant with global government regulations and built on a trusted,
                        cybersecurity platform - all designed to help you focus on what matters most.
                    </p>
                </div>

                <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
                    {complianceItems.map((item) => (
                        <article key={item.id} className="text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-black/15 text-black">
                                {item.icon}
                            </div>
                            <h3 className="mt-5 text-[22px] font-semibold leading-8 text-black">
                                {item.title}
                            </h3>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}