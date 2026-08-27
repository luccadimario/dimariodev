import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    metadataBase: new URL("https://dimario.dev"),
    title: {
        default: "Carmen Lucca DiMario | Software Engineer",
        template: "%s | Carmen Lucca DiMario",
    },
    description:
        "Software engineer working across embedded systems and full-stack product. M.S. Computer Science candidate at Embry-Riddle, previously embedded software at Garmin. Compiler toolchains, ROS2 autonomy, Go blockchains, iOS, and Next.js.",
    keywords: [
        "Lucca DiMario",
        "Carmen Lucca DiMario",
        "software engineer",
        "embedded software engineer",
        "embedded systems",
        "ROS2 developer",
        "robotics software",
        "compiler engineering",
        "Clang",
        "Go developer",
        "Swift iOS developer",
        "Next.js developer",
        "Embry-Riddle computer science",
        "Garmin",
        "software engineering portfolio",
        "dimario.dev",
    ],
    authors: [{ name: "Carmen Lucca DiMario", url: "https://dimario.dev" }],
    creator: "Carmen Lucca DiMario",
    publisher: "Carmen Lucca DiMario",
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    icons: {
        icon: "/dimariodev2.png",
        apple: "/dimariodev2.png",
    },
    alternates: {
        canonical: "https://dimario.dev",
    },
    openGraph: {
        type: "profile",
        locale: "en_US",
        url: "https://dimario.dev",
        siteName: "Carmen Lucca DiMario",
        title: "Carmen Lucca DiMario | Software Engineer",
        description:
            "Embedded systems and full-stack engineer. Clang toolchains, ROS2 autonomy on UAVs, a post-quantum blockchain in Go, and an AI checkride examiner for pilots.",
        images: [
            {
                url: "/og-image.png",
                width: 1200,
                height: 630,
                alt: "Carmen Lucca DiMario — Software Engineer",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Carmen Lucca DiMario | Software Engineer",
        description:
            "Embedded systems and full-stack engineer. Clang toolchains, ROS2 autonomy, post-quantum crypto, and shipped products.",
        images: ["/og-image.png"],
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
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: "Carmen Lucca DiMario",
        alternateName: "Lucca DiMario",
        url: "https://dimario.dev",
        image: "https://dimario.dev/og-image.png",
        email: "luccadimario@gmail.com",
        jobTitle: "Software Engineer",
        description:
            "Software engineer working across embedded systems, robotics, and full-stack product development.",
        sameAs: ["https://github.com/luccadimario"],
        alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Embry-Riddle Aeronautical University",
        },
        knowsAbout: [
            "Embedded Systems",
            "Compiler Toolchains",
            "ROS2",
            "Robotics",
            "Post-Quantum Cryptography",
            "iOS Development",
            "Next.js",
        ],
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
