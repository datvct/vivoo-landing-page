import { notFound } from "next/navigation";
import SupportDetailHeroSection from "@/components/sections/support/SupportDetailHeroSection";
import SupportResourcesSection from "@/components/sections/support/SupportResourcesSection";
import SupportContactSection from "@/components/sections/support/SupportContactSection";
import SupportPhoneSection from "@/components/sections/support/SupportPhoneSection";
import SupportWeekendSection from "@/components/sections/support/SupportWeekendSection";
import type { SupportContactCard, SupportResourceCard, PhoneRegion } from "@/components/sections/support/support-detail-types";

type SupportDetail = {
	slug: string;
	title: string;
	subtitle: string;
	heroImage: string;
};

const supportDetails: Record<string, SupportDetail> = {
	unity: {
		slug: "unity",
		title: "Avigilon Unity support",
		subtitle: "Need help with your Unity product? Explore resources, contact support and phone options below.",
		heroImage: "/images/image1.avif",
	},
	"alta-video": {
		slug: "alta-video",
		title: "Alta Video support",
		subtitle: "Find self-service resources and support channels for Alta Video.",
		heroImage: "/images/image1.avif",
	},
	"alta-access-control": {
		slug: "alta-access-control",
		title: "Alta Access Control support",
		subtitle: "Get support for your access control platform with quick links and contact channels.",
		heroImage: "/images/image1.avif",
	},
};

const resourceCards: SupportResourceCard[] = [
	{
		title: "Unity Knowledge Library",
		description: "Find answers to product questions, how-to articles and troubleshooting resources.",
		buttonLabel: "LEARN MORE",
		tone: "blue",
	},
	{
		title: "Unity Discussion Forums",
		description: "Join the community forum and ask questions, share ideas and connect with peers.",
		buttonLabel: "LEARN MORE",
		tone: "dark",
	},
	{
		title: "Unity Video Library",
		description: "Take advantage of quick video lessons and product walkthroughs.",
		buttonLabel: "LEARN MORE",
		tone: "gray",
	},
];

const contactCards: SupportContactCard[] = [
	{
		title: "WhatsApp",
		description: "Get in touch with the support team through WhatsApp for quick replies.",
		buttonLabel: "CHAT IN WHATSAPP",
		icon: "💬",
	},
	{
		title: "Live Chat",
		description: "Use live chat during business hours for real-time help from an agent.",
		buttonLabel: "LIVE CHAT",
		icon: "💻",
	},
	{
		title: "SMS",
		description: "Send a text to the support team for quick contact and updates.",
		buttonLabel: "SEND A TEXT",
		icon: "📱",
	},
	{
		title: "Create a Case",
		description: "Open a new support case so the team can review your issue in detail.",
		buttonLabel: "CREATE A CASE",
		icon: "📝",
	},
];

const phoneRegions: PhoneRegion[] = [
	{
		name: "Americas",
		items: [
			{ country: "United States (US)", phone: "Phone: +1 888 123 4567" },
			{ country: "Canada (CA)", phone: "Phone: +1 888 234 5678" },
			{ country: "Brazil (BR)", phone: "Phone: +55 11 2345 6789" },
		],
	},
	{
		name: "Europe",
		items: [
			{ country: "United Kingdom (UK)", phone: "Phone: +44 20 1234 5678" },
			{ country: "Germany (DE)", phone: "Phone: +49 30 1234 5678" },
			{ country: "France (FR)", phone: "Phone: +33 1 2345 6789" },
		],
	},
	{
		name: "APAC",
		items: [
			{ country: "Australia (AU)", phone: "Phone: +61 2 1234 5678" },
			{ country: "Singapore (SG)", phone: "Phone: +65 1234 5678" },
			{ country: "Japan (JP)", phone: "Phone: +81 3 1234 5678" },
		],
	},
	{
		name: "Middle East, Africa, India",
		items: [
			{ country: "United Arab Emirates (UAE)", phone: "Phone: +971 4 123 4567" },
			{ country: "South Africa (ZA)", phone: "Phone: +27 11 123 4567" },
			{ country: "India (IN)", phone: "Phone: +91 80 1234 5678" },
		],
	},
];

export function generateStaticParams() {
	return Object.keys(supportDetails).map((slug) => ({ slug }));
}

export default async function SupportDetailPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params;
	const detail = supportDetails[slug];

	if (!detail) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-white text-black">
			<SupportDetailHeroSection title={detail.title} subtitle={detail.subtitle} image={detail.heroImage} />
			<SupportResourcesSection
				title="Resources"
				description="Need help with your Avigilon Unity products? Click on the support options below to see the available channels, or visit our 24/7 online self-service community to find quick answers."
				callToActionLabel="support community"
				cards={resourceCards}
			/>
			<SupportContactSection
				title="Contact Support"
				description="Get in touch with our support team by choosing one of the contact methods below."
				cards={contactCards}
			/>
			<SupportPhoneSection
				title="Phone Support"
				description="Explore the regional support contacts below to find the right number for your location."
				regions={phoneRegions}
			/>
			<SupportWeekendSection
				title="Weekend phone support for critical issues"
				description="If you need support outside of standard business hours, our weekend phone support is available for critical issues. Please review the regional contact information above or use the support community for guidance while you wait for assistance."
				image="/images/camera-2.avif"
			/>
		</main>
	);
}
