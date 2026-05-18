export type ServiceDetail = {
  category?: string;
  title?: string;
  subtitle?: string;
  heroImage?: string;
  guideLabel?: string;
  guideHref?: string;
  toc?: string[];
  intro?: string[];
  sections?: {
    id: string;
    title: string;
    content: string[];
  }[];
};

export const serviceDetails: Record<
  string,
  ServiceDetail
> = {
  video: {
    category: "Service",
    subtitle:
      "AI-powered video analytics for smarter monitoring and response.",
    heroImage: "/images/image1.avif",
    guideLabel: "REQUEST A DEMO",
    guideHref: "#demo",
    toc: [
      "Overview",
      "Capabilities",
      "Deployment",
      "Case studies",
      "FAQ",
    ],
    intro: [
      "Our Video Security service pairs high-resolution cameras with AI analytics to deliver accurate detection and rapid investigation.",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "Real-time analytics and flexible recording options.",
        ],
      },
      {
        id: "capabilities",
        title: "Capabilities",
        content: [
          "Object detection, loitering detection and behavioural analytics.",
        ],
      },
      {
        id: "deployment",
        title: "Deployment",
        content: [
          "Edge or cloud deployments with scalable storage options.",
        ],
      },
      {
        id: "casestudies",
        title: "Case studies",
        content: [
          "Used in retail, transport hubs and education for detection and evidence capture.",
        ],
      },
      {
        id: "faq",
        title: "FAQ",
        content: [
          "Licensing, retention and integration questions answered.",
        ],
      },
    ],
  },
  access: {
    category: "Service",
    subtitle:
      "Centralised access control with modern authentication methods.",
    heroImage: "/images/camera-1.avif",
    guideLabel: "REQUEST A QUOTE",
    guideHref: "#quote",
    toc: [
      "Overview",
      "Features",
      "Integration",
      "Support",
    ],
    intro: [
      "Manage doors, credentials and policies from a single pane of glass.",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "Role-based access, scheduling and audit logs.",
        ],
      },
      {
        id: "features",
        title: "Features",
        content: [
          "Mobile credentials, multi-site management and reporting.",
        ],
      },
      {
        id: "integration",
        title: "Integration",
        content: [
          "Integrates with HR systems, cameras and third-party sensors.",
        ],
      },
      {
        id: "support",
        title: "Support",
        content: [
          "SLA-backed support and optional managed services.",
        ],
      },
    ],
  },
  sensors: {
    category: "Service",
    subtitle:
      "Smart perimeter and environmental sensing to reduce risk.",
    heroImage: "/images/camera-2.avif",
    guideLabel: "CONTACT SALES",
    guideHref: "#contact",
    toc: [
      "Overview",
      "Use cases",
      "Installation",
      "Maintenance",
    ],
    intro: [
      "Deploy a network of sensors to detect unusual activity and environmental changes.",
    ],
    sections: [
      {
        id: "overview",
        title: "Overview",
        content: [
          "LoRa, wired and wireless sensor integrations for flexible coverage.",
        ],
      },
      {
        id: "use-cases",
        title: "Use cases",
        content: [
          "Perimeter protection, HVAC monitoring and tamper detection.",
        ],
      },
      {
        id: "installation",
        title: "Installation",
        content: [
          "Site surveys, pilot deployments and full rollouts.",
        ],
      },
      {
        id: "maintenance",
        title: "Maintenance",
        content: [
          "Health checks, firmware updates and spare parts programs.",
        ],
      },
    ],
  },
};

export default serviceDetails;
