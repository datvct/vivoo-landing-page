import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

type BlogSection = {
    id: string;
    title: string;
    content: string[];
};

type BlogDetail = {
    slug: string;
    category: string;
    title: string;
    subtitle: string;
    heroImage: string;
    guideLabel: string;
    guideHref: string;
    toc: string[];
    intro: string[];
    sections: BlogSection[];
};

const blogDetails: Record<string, BlogDetail> = {
    "martyns-law-in-education": {
        slug: "martyns-law-in-education",
        category: "Blog",
        title: "Martyn's Law for schools: Guide and checklist",
        subtitle:
            "A practical guide to understanding the law, preparing your campus and building a safer school environment.",
        heroImage: "/images/image1.avif",
        guideLabel: "FREE SCHOOL SAFETY GUIDE",
        guideHref: "#download-guide",
        toc: [
            "Does Martyn's Law apply to schools?",
            "Why schools need to prepare",
            "Martyn's Law school requirements",
            "Practical steps to follow",
            "Martyn's Law timeline and costs",
            "Aligning Martyn's Law with other requirements",
            "Conclusion",
            "Martyn's Law: Education leaders' checklist",
        ],
        intro: [
            "Parents' evenings, school plays and sports days are all special events that help schools come together and build their communities. But whenever your school's expecting a crowd, Martyn's Law is something you'll need to start thinking about.",
            "Created in honour of Martyn Hett, one of the 22 people who tragically lost their lives in 2017's Manchester Arena attack, Martyn's Law is officially termed the Terrorism (Protection of Premises) Act 2025. It's designed to strengthen security in public spaces, ensuring that venues from large stadiums to local schools have sufficient plans in place should the worst-case scenario happen.",
            "The goal isn't to create fear. Following Martyn's Law for schools simply means being prepared. That means supplementing the everyday safeguarding and emergency procedures you probably already have in place. Little things, such as improving staff awareness training and creating a clear response plan, are the first steps to meeting the new government guidelines.",
            "By following these steps, you'll strengthen your school's safeguarding culture while keeping parents, pupils and staff reassured during larger gatherings.",
        ],
        sections: [
            {
                id: "does-martyns-law-apply-to-schools",
                title: "Does Martyn's Law apply to schools?",
                content: [
                    "Anytime your school hosts an event with at least 200 people, Martyn's Law will apply. However, its specific requirements will vary depending on the type of school you work in, as well as the crowd size and the activities taking place.",
                    "The practical takeaway is simple: schools should review their procedures, identify where larger gatherings may create risk and make sure the right response plans are documented and understood by staff.",
                ],
            },
            {
                id: "why-schools-need-to-prepare",
                title: "Why schools need to prepare",
                content: [
                    "Preparation helps reduce confusion during busy periods and supports staff who must react quickly if an issue arises. A well-rehearsed plan improves communication, protects visitors and makes it easier to coordinate with emergency services.",
                    "Even small improvements, such as clearer access control and staff awareness, can make a measurable difference to the overall safety posture of a school.",
                ],
            },
            {
                id: "martyns-law-school-requirements",
                title: "Martyn's Law school requirements",
                content: [
                    "Requirements are intended to be proportionate, but schools should still be able to explain how they assess risks, how they brief staff and how they adapt their response during events.",
                    "That often means documenting entrances, visitor flow, evacuation routes and who is responsible for decisions when the campus is at its busiest.",
                ],
            },
            {
                id: "practical-steps-to-follow",
                title: "Practical steps to follow",
                content: [
                    "Start with a simple audit of your current procedures. Then update staff training, review communication channels, confirm key contacts and test your response plans in realistic scenarios.",
                    "Use the review to identify easy wins, such as better signage, clearer visitor management and more reliable monitoring around key entrances.",
                ],
            },
            {
                id: "martyns-law-timeline-and-costs",
                title: "Martyn's Law timeline and costs",
                content: [
                    "The best approach is to treat the timeline as an opportunity to phase improvements. Prioritize the changes that reduce the most risk first, then schedule more detailed updates over time.",
                    "That spreads the cost, helps your team stay focused and avoids turning compliance into a last-minute rush.",
                ],
            },
            {
                id: "aligning-with-other-requirements",
                title: "Aligning Martyn's Law with other requirements",
                content: [
                    "Schools often have to align safeguarding, access control, fire safety and emergency planning at the same time. Martyn's Law should fit into that broader safety picture rather than sit in isolation.",
                    "A single joined-up plan usually works better than multiple disconnected checklists, especially when staff are under pressure.",
                ],
            },
            {
                id: "conclusion",
                title: "Conclusion",
                content: [
                    "The key is to be ready, keep procedures clear and make sure everyone knows what to do. Martyn's Law is not only about compliance, but about creating a safer, more confident environment for students, staff and visitors.",
                ],
            },
            {
                id: "education-leaders-checklist",
                title: "Martyn's Law: Education leaders' checklist",
                content: [
                    "Review event capacity and visitor flow.",
                    "Confirm who leads incident response.",
                    "Refresh staff training and communication plans.",
                    "Document routes, contacts and escalation steps.",
                ],
            },
        ],
    },
};

export function generateStaticParams() {
    return Object.keys(blogDetails).map((slug) => ({ slug }));
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const detail = blogDetails[slug];

    if (!detail) {
        notFound();
    }

    return (
        <main className="min-h-screen text-black">
            <section className="bg-white">
                <div className="mx-auto max-w-7xl px-6 pt-6 lg:px-10">
                    <div className="flex items-center gap-2 text-xs text-black/45">
                        <Link href="/" className="hover:text-black">Home</Link>
                        <span>›</span>
                        <Link href="/blog" className="hover:text-black">Blog</Link>
                        <span>›</span>
                        <span className="text-black/65">{detail.title}</span>
                    </div>
                </div>

                <div className="mx-auto mt-6 max-w-7xl px-6 pb-8 lg:px-10 lg:pb-10">
                    <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_1fr]">
                        <div className="max-w-xl">
                            <div className="text-sm font-medium uppercase tracking-[0.2em] text-black/45">
                                {detail.category}
                            </div>
                            <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-black sm:text-5xl lg:text-[58px] lg:leading-[1.05]">
                                {detail.title}
                            </h1>
                            <p className="mt-5 max-w-lg text-[15px] leading-7 text-black/65 sm:text-base">
                                {detail.subtitle}
                            </p>

                            <div className="mt-7 flex flex-wrap gap-3">
                                <a
                                    href="#table-of-contents"
                                    className="inline-flex h-12 items-center justify-center rounded-full bg-black px-6 text-sm font-semibold text-white transition hover:bg-black/85"
                                >
                                    VIEW SOLUTIONS
                                </a>
                                <a
                                    href={detail.guideHref}
                                    className="inline-flex h-12 items-center justify-center rounded-full border border-black/45 bg-white px-6 text-sm font-semibold text-black transition hover:border-black hover:bg-black/5"
                                >
                                    {detail.guideLabel}
                                </a>
                            </div>
                        </div>

                        <div className="relative min-h-70 overflow-hidden bg-[#ece7e0] lg:min-h-90">
                            <div className="absolute left-[-6%] top-0 h-full w-[62%] skew-x-[-24deg] bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.04)]" />
                            <div className="absolute inset-0">
                                <Image
                                    src={detail.heroImage}
                                    alt={detail.title}
                                    fill
                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="border-y border-black/5 bg-[#fbfbfa] py-7">
                <div className="mx-auto max-w-7xl px-6 lg:px-10">
                    <div className="flex flex-wrap flex-col items-center justify-center gap-x-10 gap-y-4 text-center text-sm text-black/55">
                        <span className="font-medium text-black/75">Trusted by 100,000+ organizations globally</span>
                        <div className="flex flex-row gap-4">
                            <span>University of Tennessee</span>
                            <span>Alabama Power</span>
                            <span>Zendesk</span>
                            <span>University of Virginia</span>
                            <span>Allegion</span>
                            <span>Domino&apos;s</span>
                            <span>Police</span>
                            <span>American School of the Deaf</span>
                        </div>
                    </div>
                </div>
            </section>

            <section id="table-of-contents" className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
                <div className="grid gap-10 lg:grid-cols-[260px_1fr]">
                    <aside className="lg:sticky lg:top-8 lg:self-start">
                        <div className="text-sm font-semibold text-black">Table of Contents</div>
                        <ol className="mt-4 space-y-3 text-sm leading-6 text-black/70">
                            {detail.toc.map((item, index) => {
                                const section = detail.sections[index];
                                return (
                                    <li key={item}>
                                        <a href={`#${section.id}`} className="transition hover:text-black">
                                            {index + 1}. {item}
                                        </a>
                                    </li>
                                );
                            })}
                        </ol>

                        <a
                            id="download-guide"
                            href="#"
                            className="mt-6 inline-flex h-10 items-center justify-center rounded-full bg-black px-5 text-sm font-semibold text-white transition hover:bg-black/85"
                        >
                            FREE GUIDE
                        </a>
                    </aside>

                    <article className="space-y-12 text-[15px] leading-7 text-black/65">
                        {detail.intro.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}

                        {detail.sections.map((section) => (
                            <section key={section.id} id={section.id} className="scroll-mt-8">
                                <h2 className="text-[30px] font-medium tracking-[-0.03em] text-black sm:text-[34px]">
                                    {section.title}
                                </h2>
                                <div className="mt-4 space-y-4">
                                    {section.content.map((paragraph) => (
                                        <p key={paragraph}>{paragraph}</p>
                                    ))}
                                </div>
                            </section>
                        ))}
                    </article>
                </div>
            </section>
        </main>
    );
}
