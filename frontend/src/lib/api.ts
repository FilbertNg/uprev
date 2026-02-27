import {
    ContactFormPayload,
    ContactFormResponse,
    SendMessagePayload,
    ChatMessage,
    Testimonial,
    ProductCard,
} from "../types";
import { testimonials, products, MOCK_REPLIES } from "../data/mock";

// Simulation delay helper
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function submitContactForm(
    payload: ContactFormPayload
): Promise<ContactFormResponse> {
    // TODO: Replace with real FastAPI endpoint: POST /api/contact
    await delay(800);

    if (!payload.email || !payload.email.includes("@")) {
        return {
            success: false,
            message: "Format email tidak valid.",
        };
    }

    return {
        success: true,
        message: "Terima kasih! Tim kami akan segera menghubungi Anda.",
    };
}

export async function sendChatMessage(
    payload: SendMessagePayload
): Promise<ChatMessage> {
    // TODO: Replace with real FastAPI + LangSmith endpoint: POST /api/chat/message
    await delay(1500 + Math.random() * 1000); // 1.5s - 2.5s simulated thinking time

    const randomReply = MOCK_REPLIES[Math.floor(Math.random() * MOCK_REPLIES.length)];

    return {
        id: crypto.randomUUID(),
        role: "assistant",
        content: randomReply,
        timestamp: Date.now(),
    };
}

export async function getTestimonials(): Promise<Testimonial[]> {
    // TODO: Replace with real FastAPI endpoint: GET /api/testimonials
    await delay(500);
    return testimonials;
}

export async function getProducts(): Promise<ProductCard[]> {
    // TODO: Replace with real FastAPI endpoint: GET /api/products
    await delay(300);
    return products;
}
