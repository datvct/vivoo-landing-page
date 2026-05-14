export type SupportResourceCard = {
    title: string;
    description: string;
    buttonLabel: string;
    tone: "blue" | "dark" | "gray";
};

export type SupportContactCard = {
    title: string;
    description: string;
    buttonLabel: string;
    icon: string;
};

export type PhoneRegion = {
    name: string;
    items: Array<{
        country: string;
        phone: string;
    }>;
};
