import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://dimario.dev"),
    title: {
        default: "DiMario Development | Custom Web & App Development Services",
        template: "%s | DiMario Development",
    },
    description:
        "Professional web and mobile app development studio. We build fast, affordable, custom websites and applications with direct communication and quick turnaround. Next.js, React, React Native specialists.",
    keywords: [
        "web development",
        "app development",
        "mobile app development",
        "website design",
        "custom web development",
        "React developer",
        "Next.js developer",
        "React Native developer",
        "freelance web developer",
        "affordable web development",
        "small business website",
        "web development agency",
        "DiMario Development",
        "dimario.dev",
    ],
    authors: [{ name: "DiMario Development", url: "https://dimario.dev" }],
    creator: "DiMario Development",
    publisher: "DiMario Development",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: "/dimariodev2.png",
        apple: "/dimariodev2.png",
    },
    openGraph: {
        type: "website",
        locale: "en_US",
        url: "https://dimario.dev",
        siteName: "DiMario Development",
        title: "DiMario Development | Custom Web & App Development",
        description:
            "Skip the corporate runaround. Professional web and mobile app development with fast turnaround, affordable rates, and direct communication.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "DiMario Development - Web & App Development",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "DiMario Development | Custom Web & App Development",
        description:
            "Professional web and mobile app development with fast turnaround and affordable rates.",
        images: ["/og-image.png"],
        creator: "@dimariodev",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
    verification: {
        // Add your Google Search Console verification code here
        // google: "your-google-verification-code",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        name: "DiMario Development",
        description:
            "Professional web and mobile app development studio specializing in custom websites, web applications, and mobile apps.",
        url: "https://dimario.dev",
        logo: "https://dimario.dev/dimariodev2.png",
        image: "https://dimario.dev/og-image.png",
        email: "hello@dimario.dev",
        priceRange: "$$",
        serviceType: [
            "Web Development",
            "Mobile App Development",
            "Web Consultation",
        ],
        areaServed: "Worldwide",
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Web Development Services",
            itemListElement: [
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Web Development",
                        description:
                            "Custom websites and web applications built with modern technologies like Next.js and React.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "App Development",
                        description:
                            "Native and cross-platform mobile applications for iOS and Android using React Native.",
                    },
                },
                {
                    "@type": "Offer",
                    itemOffered: {
                        "@type": "Service",
                        name: "Web Consultation",
                        description:
                            "Strategic guidance for technology decisions, code audits, and architecture planning.",
                    },
                },
            ],
        },
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
                />
            </head>
            <body className={inter.className}>{children}</body>
        </html>
    );
}
