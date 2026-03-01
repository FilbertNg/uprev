import {
    ContactFormPayload,
    ContactFormResponse,
    ChatMessage,
    Testimonial,
    ProductCard,
} from "../types";
import { testimonials, products } from "../data/mock";

// ── Chat API ────────────────────────────────────────────────────────────────

/**
 * Send a user message to the AI Sales Agent.
 * Uses credentials: "include" so the thread_id cookie is sent automatically.
 */
export async function sendChatMessage(message: string): Promise<ChatMessage> {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ message }),
    });

    if (!res.ok) {
        throw new Error(`Chat request failed: ${res.status}`);
    }

    const data = await res.json();

    return {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.reply,
        timestamp: Date.now(),
    };
}

/**
 * Load chat history for the current thread (based on thread_id cookie).
 * Returns an array of ChatMessage objects.
 */
export async function getChatHistory(): Promise<{ threadId: string; messages: ChatMessage[] }> {
    const res = await fetch("/api/chat/history", {
        method: "GET",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(`History request failed: ${res.status}`);
    }

    const data = await res.json();

    return {
        threadId: data.thread_id,
        messages: (data.messages || []).map((msg: { id: string; role: string; content: string; timestamp: number }) => ({
            id: msg.id || crypto.randomUUID(),
            role: msg.role as "user" | "assistant",
            content: msg.content,
            timestamp: msg.timestamp || Date.now(),
        })),
    };
}

// ── Other APIs (still mock for now) ─────────────────────────────────────────

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
