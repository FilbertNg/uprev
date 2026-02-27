export interface NavLink {
    id: string;
    labelId: string;
    labelEn: string;
    href: string;
    descId?: string;
    descEn?: string;
    icon?: string;
    children?: Omit<NavLink, "children">[];
}

export type GridArea = "left" | "right-top" | "right-bottom";
export type MockVisual = "chat" | "chart" | "wireframe";

export interface ProductCard {
    id: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    detailMarkdown?: string;
    gridArea: GridArea;
    mockVisual: MockVisual;
    href: string;
}

export interface ProblemItem {
    number: string;
    title: string;
    titleEn?: string;
    description: string;
    descriptionEn?: string;
    icon: "InvisibleBrand" | "SlowResponse" | "HighCost" | "ZeroRetention";
}

export interface Testimonial {
    id: string;
    quote: string;
    quoteEn?: string;
    authorName: string;
    authorTitle: string;
    countryFlag: string;
}

export interface PricingInfo {
    startingPrice: number;
    currency: string;
    description: string;
    descriptionEn?: string;
}

export type ChatRole = "user" | "assistant";

export interface ChatMessage {
    id: string;
    role: ChatRole;
    content: string;
    timestamp: number;
}

export interface ContactFormPayload {
    email: string;
    source: string;
    locale: "id" | "en";
}

export interface ContactFormResponse {
    success: boolean;
    message: string;
}

export interface SendMessagePayload {
    sessionId: string;
    message: string;
    locale: "id" | "en";
    context?: {
        productId?: string;
    };
}
