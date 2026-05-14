type SupportCriticalSectionProps = {
    label: string;
    phoneLabel: string;
    phoneNumber: string;
    linkLabel: string;
};

export default function SupportCriticalSection({
    label,
    phoneLabel,
    phoneNumber,
    linkLabel,
}: SupportCriticalSectionProps) {
    return (
        <section className="pb-16 pt-8 text-center">
            <div className="text-sm font-semibold text-black/70">{label}</div>
            <div className="mt-2 text-sm text-black/60">{phoneLabel} <span className="font-medium text-black">{phoneNumber}</span></div>
            <a href="#" className="mt-2 inline-flex text-sm text-blue-600 transition hover:text-blue-700">
                {linkLabel}
            </a>
        </section>
    );
}
