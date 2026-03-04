import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/chat/ChatWidget";
import { Providers } from "@/contexts/Providers";
import { MagneticCursor } from "@/components/effects/MagneticCursor";
import { NoiseOverlay } from "@/components/effects/NoiseOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://uprev.id"),
  title: "UpRev | Mitra Transformasi Digital Anda",
  description:
    "Automate Operations. Maximize Profits. UpRev provides intelligent AI CS, Smart CRM, and high-performance websites to scale your business.",
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon/site.webmanifest",
  openGraph: {
    title: "UpRev | Mitra Transformasi Digital Anda",
    description:
      "Automate Operations. Maximize Profits. UpRev provides intelligent AI CS, Smart CRM, and high-performance websites to scale your business.",
    siteName: "UpRev",
    images: [
      {
        url: "/favicon/web-app-manifest-512x512.png",
        width: 512,
        height: 512,
        alt: "UpRev Logo",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "UpRev | Mitra Transformasi Digital Anda",
    description:
      "Automate Operations. Maximize Profits. UpRev provides intelligent AI CS, Smart CRM, and high-performance websites to scale your business.",
    images: ["/favicon/web-app-manifest-512x512.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body
        className={`${plusJakartaSans.variable} ${inter.variable} antialiased bg-[var(--color-carbon)] text-[var(--color-smoke)]`}
      >
        <Providers>
          <NoiseOverlay />
          <MagneticCursor />
          {children}
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
