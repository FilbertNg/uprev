import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
    // Use NEXT_PUBLIC_SITE_URL from environment or fallback to production URL
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uprev.id";

    // Product pages (High Priority)
    const products = [
        "/products/ai-cs",
        "/products/smart-crm",
        "/products/website",
        "/products/custom-ai",
    ];

    // Company and informational pages (Medium Priority)
    const companyRoutes = ["/about", "/team", "/careers"];

    const productEntries: MetadataRoute.Sitemap = products.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.9,
    }));

    const companyEntries: MetadataRoute.Sitemap = companyRoutes.map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    return [
        // Home page (Highest Priority)
        {
            url: `${baseUrl}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1.0,
        },
        ...productEntries,
        ...companyEntries,
    ];
}