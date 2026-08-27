import { ImageResponse } from "next/og";
import { profile } from "@/lib/content";

export const alt = "Carmen Lucca DiMario — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time so the preview card can never drift from the site.
export default function OpengraphImage() {
    return new ImageResponse(
        (
            <div
                style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: "#030303",
                    padding: "80px",
                    position: "relative",
                }}
            >
                {/* Ambient glows, mirroring the hero */}
                <div
                    style={{
                        position: "absolute",
                        top: -160,
                        right: -80,
                        width: 620,
                        height: 620,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(59,130,246,0.30), rgba(59,130,246,0) 70%)",
                    }}
                />
                <div
                    style={{
                        position: "absolute",
                        bottom: -220,
                        left: -120,
                        width: 560,
                        height: 560,
                        borderRadius: "50%",
                        background:
                            "radial-gradient(circle, rgba(139,92,246,0.26), rgba(139,92,246,0) 70%)",
                    }}
                />

                {/* Eyebrow */}
                <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                    <div
                        style={{
                            width: 64,
                            height: 3,
                            background:
                                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                        }}
                    />
                    <div
                        style={{
                            fontSize: 22,
                            letterSpacing: 6,
                            color: "#a1a1aa",
                            textTransform: "uppercase",
                        }}
                    >
                        {profile.role}
                    </div>
                </div>

                {/* Name */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        marginTop: 34,
                    }}
                >
                    <div
                        style={{
                            fontSize: 96,
                            fontWeight: 700,
                            color: "#ffffff",
                            lineHeight: 1.02,
                        }}
                    >
                        CARMEN LUCCA
                    </div>
                    <div
                        style={{
                            fontSize: 96,
                            fontWeight: 700,
                            lineHeight: 1.02,
                            background:
                                "linear-gradient(90deg, #3b82f6, #8b5cf6)",
                            backgroundClip: "text",
                            color: "transparent",
                        }}
                    >
                        DIMARIO
                    </div>
                </div>

                {/* Focus areas */}
                <div style={{ display: "flex", gap: 14, marginTop: 44 }}>
                    {[
                        "Embedded Systems",
                        "Robotics",
                        "Compilers",
                        "Full-Stack",
                    ].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                display: "flex",
                                fontSize: 24,
                                color: "#d4d4d8",
                                border: "1px solid #27272a",
                                background: "rgba(24,24,27,0.85)",
                                borderRadius: 999,
                                padding: "10px 24px",
                            }}
                        >
                            {tag}
                        </div>
                    ))}
                </div>

                {/* Footer line */}
                <div
                    style={{
                        display: "flex",
                        marginTop: 52,
                        fontSize: 26,
                        color: "#71717a",
                    }}
                >
                    dimario.dev
                </div>
            </div>
        ),
        size,
    );
}
