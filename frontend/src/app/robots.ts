import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    // Allow fallback to domain if no environment variable is available
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://uprev.id";

    return {
        rules: {
            userAgent: "*",
            allow: "/",
            // Do not allow bots to hit APIs or transactional payment pages
            disallow: [
                "/api/",
                "/payment/",
                "/payment/success/",
                "/payment/failed/"
            ],
        },
        // The explicit sitemap URL enables crawlers to find it from the root robots.txt directly
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}