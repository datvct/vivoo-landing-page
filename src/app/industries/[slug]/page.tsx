import { notFound } from "next/navigation";
import {
    CircleCheckBig,
    Fingerprint,
    LockKeyhole,
    ShieldCheck,
} from "lucide-react";
import LogoSection from "@/components/common/LogoSection";
import IndustryHeroSection from "@/components/sections/industries/IndustryHeroSection";
import IndustrySecurityFeaturesSection from "@/components/sections/industries/IndustrySecurityFeaturesSection";
import IndustryProductSection from "@/components/sections/industries/IndustryProductSection";
import IndustryGuideSection from "@/components/sections/industries/IndustryGuideSection";
import SolutionsSection from "@/components/common/SolutionsSection";
import CustomerStoriesSection from "@/components/common/CustomerStoriesSection";
import FAQSection from "@/components/common/FAQSection";
import ContactSection from "@/components/common/ContactSection";

type IndustryContent = {
    slug: string;
    title: string;
    description: string;
    image: string;
    heroBadges: string[];
    logoNames: string[];
    benefitsTitle: string;
    benefitsDescription: string;
};

const industryPages: Record<string, IndustryContent> = {
    construction: {
        slug: "construction",
        title: "Construction security solutions",
        description:
            "Safeguard your jobsite, improve worker safety and protect your equipment with construction site security solutions, including cameras, access control and alarms.",
        image: "/images/image1.avif",
        heroBadges: ["GET PRICING", "FREE SECURITY AUDIT GUIDE"],
        logoNames: [
            "The University of Tennessee",
            "Alabama Power",
            "Zendesk",
            "University of Virginia",
            "Allegion",
            "Domino's",
            "Police",
            "American School of the Deaf",
        ],
        benefitsTitle: "Benefits of construction site security monitoring",
        benefitsDescription:
            "With increased risks of theft and vandalism, construction sites require robust video monitoring and surveillance systems to provide extra protection.",
    },
};

const featureSection = {
    title: "Avigilon police station security technology",
    description:
        "Find the law enforcement agency security system that’s right for your station, with compliant access control and security cameras for police departments and correctional facilities.",
    image: "/images/camera-1.avif",
    linkLabel: "Connect with an expert",
    features: [
        {
            icon: CircleCheckBig,
            title: "High-level compliance",
            description:
                "Our products are compliant with federal procurement and security guidelines, supporting agencies that need trusted deployment standards.",
        },
        {
            icon: Fingerprint,
            title: "Integrated sensor and recognition technology",
            description:
                "Select camera platforms that combine recognition, analytics and alerts to help teams detect, identify and respond in real time.",
        },
        {
            icon: ShieldCheck,
            title: "Anomaly detection and analytics",
            description:
                "Software can understand perimeters and behaviors to classify events, track people or vehicles and send alerts before threats escalate.",
        },
        {
            icon: LockKeyhole,
            title: "Enhance security with multi-factor authentication",
            description:
                "Choose from mobile, key fob and PIN-based credentials to enable layered access control for high-risk buildings and spaces.",
        },
    ],
};

const productSection = {
    title: "Products and casino security technology",
    description:
        "Explore our wide range of video security and access control products designed to help you foster a secure gaming environment.",
    products: [
        {
            title: "Avigilon Unity Video",
            description:
                "An intuitive, AI-enabled video management platform to bring you the most critical information, ensuring you never miss a moment.",
            image: "/images/image1.avif",
            linkLabel: "View product",
        },
        {
            title: "Avigilon Unity Access",
            description:
                "Secure back offices and sensitive areas with our browser-based solution, offering the flexibility to respond from anywhere.",
            image: "/images/camera-1.avif",
            linkLabel: "View product",
        },
        {
            title: "H5A Modular Camera",
            description:
                "Built-in analytics for enhanced object detection and classification. Ready for discrete installation at every game table.",
            image: "/images/camera-2.avif",
            linkLabel: "View product",
        },
        {
            title: "H5A Multisensor Camera",
            description:
                "Be covered from all angles with the H5A Multisensor camera that can deliver 180, 270 or 360-degree views.",
            image: "/images/image1.avif",
            linkLabel: "Learn More",
        },
        {
            title: "NVR6",
            description:
                "High-performance recording and dense storage options with Avigilon Network Video Recorders (NVR).",
            image: "/images/camera-1.avif",
            linkLabel: "View product",
        },
        {
            title: "VB400 Body-Worn Camera",
            description:
                "Capture an entire shift of live video and audio. Connect seamlessly to Unity Video.",
            image: "/images/camera-2.avif",
            linkLabel: "View product",
        },
    ],
};

const guideSection = {
    title: "Get your free healthcare security guide",
    description:
        "Download our healthcare security guide, featuring a comprehensive security checklist, to help you learn the latest healthcare security strategies and audit your healthcare facility’s security posture.",
    image: "/images/image1.avif",
    buttonLabel: "DOWNLOAD FREE GUIDE",
};

export function generateStaticParams() {
    return [{ slug: "construction" }, { slug: "video-security" }];
}

export default async function IndustryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const content = industryPages[slug] ?? industryPages.construction;

    if (!content) {
        notFound();
    }

    return (
        <div className="bg-[#f6f6f6] text-black">
            <IndustryHeroSection
                title={content.title}
                description={content.description}
                image={content.image}
                primaryCta={content.heroBadges[0]}
                secondaryCta={content.heroBadges[1]}
            />

            <LogoSection />
            <SolutionsSection />
            <CustomerStoriesSection />
            <IndustrySecurityFeaturesSection
                title={featureSection.title}
                description={featureSection.description}
                image={featureSection.image}
                features={featureSection.features}
                linkLabel={featureSection.linkLabel}
            />
            <IndustryProductSection
                title={productSection.title}
                description={productSection.description}
                products={productSection.products}
            />

            <IndustryGuideSection
                title={guideSection.title}
                description={guideSection.description}
                image={guideSection.image}
                buttonLabel={guideSection.buttonLabel}
            />
            <FAQSection />
            <ContactSection />
        </div>
    );
}
