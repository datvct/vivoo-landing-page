import Link from "next/link";

type SupportOptionCardProps = {
    title: string;
    logoText: string;
    subtitle?: string;
    buttonLabel: string;
    link: string;
};

export default function SupportOptionCard({ title, logoText, subtitle, buttonLabel, link }: SupportOptionCardProps) {
    return (
        <article className="overflow-hidden bg-white shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/5 transition-transform duration-300 hover:-translate-y-1">
            <div className="flex h-48 items-center justify-center bg-[#f7f7f7] px-6 text-center">
                <div>
                    <div className="text-3xl font-semibold tracking-[-0.04em] text-blue-700 sm:text-4xl">
                        {logoText}
                    </div>
                    {subtitle ? <div className="mt-1 text-xs font-medium text-black/55">{subtitle}</div> : null}
                </div>
            </div>

            <div className="px-6 py-6 text-center">
                <h2 className="text-lg font-semibold text-black">{title}</h2>
                <Link
                    href={link}
                    className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-black px-6 text-xs font-semibold tracking-[0.08em] text-white transition hover:bg-black/85"
                >
                    {buttonLabel}
                </Link>
            </div>
        </article>
    );
}
