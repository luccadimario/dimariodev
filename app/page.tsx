"use client";

import { useEffect, useState } from "react";

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [loaded, setLoaded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Contact form state
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        projectType: "",
        message: "",
    });
    const [formStatus, setFormStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [formError, setFormError] = useState("");

    const handleFormChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >,
    ) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus("loading");
        setFormError("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to send message");
            }

            setFormStatus("success");
            setFormData({ name: "", email: "", projectType: "", message: "" });
        } catch (error) {
            setFormStatus("error");
            setFormError(
                error instanceof Error ? error.message : "Something went wrong",
            );
        }
    };

    useEffect(() => {
        setLoaded(true);
        const handleMouse = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY });
        };
        window.addEventListener("mousemove", handleMouse);
        return () => window.removeEventListener("mousemove", handleMouse);
    }, []);

    return (
        <main className="bg-[#030303] text-white min-h-screen overflow-x-hidden">
            {/* Noise texture overlay */}
            <div className="noise-overlay" />

            {/* Mouse glow effect */}
            <div
                className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.15), transparent 60%)`,
                }}
            />

            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/70 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="text-lg font-bold group">
                        <span className="text-white group-hover:text-blue-400 transition-colors">
                            DIMARIO
                        </span>
                        <span className="text-zinc-500">.DEV</span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <a
                            href="#services"
                            className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
                        >
                            Services
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </a>
                        <a
                            href="#work"
                            className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
                        >
                            Work
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </a>
                        <a
                            href="#contact"
                            className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
                        >
                            Contact
                            <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                        </a>
                        <a
                            href="#contact"
                            className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            Get in Touch
                        </a>
                    </div>

                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            {menuOpen ? (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            ) : (
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            )}
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4">
                        <a
                            href="#services"
                            onClick={() => setMenuOpen(false)}
                            className="block text-zinc-400 hover:text-white transition-colors"
                        >
                            Services
                        </a>
                        <a
                            href="#work"
                            onClick={() => setMenuOpen(false)}
                            className="block text-zinc-400 hover:text-white transition-colors"
                        >
                            Work
                        </a>
                        <a
                            href="#contact"
                            onClick={() => setMenuOpen(false)}
                            className="block text-zinc-400 hover:text-white transition-colors"
                        >
                            Contact
                        </a>
                    </div>
                )}
            </nav>

            {/* ===== HERO ===== */}
            <section className="min-h-screen flex items-center relative">
                {/* Animated background blurs */}
                <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div
                    className="absolute top-1/3 left-[20%] w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow"
                    style={{ animationDelay: "2s" }}
                />

                {/* Floating geometric shapes */}
                <div className="absolute top-1/4 right-[20%] w-20 h-20 border border-zinc-800/50 rotate-45 animate-float opacity-30" />
                <div className="absolute top-1/3 left-[15%] w-12 h-12 border border-blue-500/20 rounded-full animate-float-delayed" />
                <div
                    className="absolute bottom-1/4 right-[30%] w-16 h-16 border border-purple-500/20 rotate-12 animate-float"
                    style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-[60%] right-[10%] w-3 h-3 bg-amber-500 rounded-full animate-pulse-glow" />
                <div
                    className="absolute top-[40%] left-[25%] w-2 h-2 bg-blue-400 rounded-full animate-pulse-glow"
                    style={{ animationDelay: "1.5s" }}
                />
                <div
                    className="absolute bottom-[35%] left-[10%] w-2 h-2 bg-purple-400 rounded-full animate-pulse-glow"
                    style={{ animationDelay: "3s" }}
                />

                <div className="max-w-5xl mx-auto px-6 pt-24 pb-16 w-full relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left column - Text */}
                        <div
                            className={`space-y-6 ${loaded ? "animate-slide-in-left" : "opacity-0"}`}
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                                <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                                    Web & App Development
                                </span>
                            </div>

                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
                                <span className="text-white">DIMARIO</span>
                                <br />
                                <span className="gradient-text-cool">
                                    DEVELOPMENT
                                </span>
                            </h1>

                            <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
                                Skip the corporate runaround. We're a private
                                studio that delivers high-quality websites and
                                apps — fast, affordable, and with a real person
                                you can actually reach.
                            </p>

                            {/* Value props */}
                            <div className="flex flex-wrap gap-3 pt-2">
                                <span className="text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400">
                                    Privately Owned
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400">
                                    Fast Turnaround
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400">
                                    Affordable Rates
                                </span>
                                <span className="text-xs px-3 py-1.5 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400">
                                    Direct Communication
                                </span>
                            </div>

                            <div className="flex flex-wrap gap-4 pt-4">
                                <a
                                    href="#work"
                                    className="group inline-flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:gap-3"
                                >
                                    View Our Work
                                    <svg
                                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="#contact"
                                    className="group inline-flex items-center gap-2 border border-zinc-700 text-white font-medium px-6 py-3 rounded-full hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                                >
                                    Start a Project
                                </a>
                            </div>
                        </div>

                        {/* Right column - Visual */}
                        <div
                            className={`relative ${loaded ? "animate-slide-in-right" : "opacity-0"}`}
                        >
                            <div className="relative max-w-sm mx-auto lg:ml-auto">
                                {/* Animated background card */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl rotate-6 translate-x-3 translate-y-3 animate-float"
                                    style={{ animationDelay: "0.5s" }}
                                />

                                {/* Main card */}
                                <div className="relative bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-3xl p-8 flex flex-col items-center justify-center aspect-square">
                                    <div className="w-16 h-16 border-2 border-zinc-700 rounded-2xl flex items-center justify-center mb-6 group-hover:border-blue-500 transition-colors">
                                        <svg
                                            className="w-8 h-8 text-zinc-500"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                            />
                                        </svg>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="w-24 h-2 bg-zinc-800 rounded-full" />
                                        <div className="w-16 h-2 bg-zinc-800 rounded-full mx-auto" />
                                    </div>

                                    {/* Animated corner accents */}
                                    <div className="absolute top-0 right-0 w-20 h-20 border-b border-l border-blue-500/30 rounded-bl-3xl" />
                                </div>

                                {/* Floating logo block */}
                                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-zinc-900 rounded-2xl animate-float shadow-lg shadow-blue-500/25 flex items-center justify-center overflow-hidden border border-zinc-800">
                                    <img
                                        src="/dimariodev2.png"
                                        alt="DiMario Dev Logo"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Small floating dot */}
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-amber-500 rounded-full animate-pulse-glow shadow-lg shadow-amber-500/50" />
                            </div>
                        </div>
                    </div>

                    {/* Scroll indicator */}
                    <div
                        className={`hidden lg:flex items-center gap-3 mt-16 ${loaded ? "animate-slide-up delay-500" : "opacity-0"}`}
                    >
                        <div className="w-px h-12 bg-gradient-to-b from-zinc-600 to-transparent" />
                        <span
                            className="text-xs text-zinc-600 uppercase tracking-widest"
                            style={{ writingMode: "vertical-rl" }}
                        >
                            Scroll
                        </span>
                    </div>
                </div>
            </section>

            {/* ===== SERVICES ===== */}
            <section id="services" className="py-28 relative">
                {/* Background accent */}
                <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] -translate-y-1/2 animate-pulse-glow" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                            What We Do
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                            Services
                        </h2>
                        <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
                            Quality work without the agency markup. We keep
                            overhead low so you get professional results at
                            rates that make sense.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {/* Service 1 */}
                        <div className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-7 hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10">
                            <span className="text-xs font-mono text-blue-400">
                                01
                            </span>
                            <h3 className="text-xl font-semibold mt-4 mb-3 group-hover:text-blue-400 transition-colors">
                                Web Development
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                Custom websites and web applications built with
                                modern technologies. Fast, responsive, and SEO
                                optimized.
                            </p>
                            <ul className="space-y-2 text-xs text-zinc-500">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    Next.js & React
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    Performance Optimized
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                    SEO Ready
                                </li>
                            </ul>
                            {/* Hover line */}
                            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-500 to-blue-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                        </div>

                        {/* Service 2 */}
                        <div className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-7 hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10">
                            <span className="text-xs font-mono text-purple-400">
                                02
                            </span>
                            <h3 className="text-xl font-semibold mt-4 mb-3 group-hover:text-purple-400 transition-colors">
                                App Development
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                Native and cross-platform mobile applications
                                that deliver seamless experiences across all
                                devices.
                            </p>
                            <ul className="space-y-2 text-xs text-zinc-500">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                    iOS & Android
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                    React Native
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-purple-500 rounded-full" />
                                    App Store Ready
                                </li>
                            </ul>
                            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-purple-500 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                        </div>

                        {/* Service 3 */}
                        <div className="group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-7 hover:border-amber-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-amber-500/10">
                            <span className="text-xs font-mono text-amber-400">
                                03
                            </span>
                            <h3 className="text-xl font-semibold mt-4 mb-3 group-hover:text-amber-400 transition-colors">
                                Web Consultation
                            </h3>
                            <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                                Strategic guidance to help you make the right
                                technology decisions for your business goals.
                            </p>
                            <ul className="space-y-2 text-xs text-zinc-500">
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                    Tech Strategy
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                    Code Audits
                                </li>
                                <li className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                    Architecture Planning
                                </li>
                            </ul>
                            <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-amber-500 to-amber-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== WORK ===== */}
            <section id="work" className="py-28 relative">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-glow" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                            Portfolio
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold mt-4">
                            Selected Work
                        </h2>
                        <p className="text-zinc-400 mt-4 max-w-xl mx-auto">
                            Real projects for real clients — delivered on time
                            and on budget.
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Project 1 - Pocopson Vet Station */}
                        <a
                            href="https://pocopsonvetstation.dimario.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-500/10"
                        >
                            <div className="aspect-video bg-gradient-to-br from-blue-900/30 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-500" />
                                <div className="text-center relative z-10">
                                    <div className="w-14 h-14 mx-auto bg-blue-500/20 border border-blue-500/30 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300">
                                        <svg
                                            className="w-7 h-7 text-blue-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 21a9 9 0 01-9-9c0-2.52 1.02-4.8 2.67-6.45L12 0l6.33 5.55A9 9 0 0121 12a9 9 0 01-9 9zm0-3a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs text-blue-400 uppercase tracking-wider">
                                    Web Development
                                </span>
                                <h3 className="text-lg font-semibold mt-1 group-hover:text-blue-400 transition-colors">
                                    Pocopson Veterinary Station
                                </h3>
                                <p className="text-zinc-400 text-sm mt-2">
                                    Modern, responsive website for a local
                                    veterinary practice.
                                </p>
                                <div className="flex items-center gap-2 mt-4 text-sm text-zinc-500 group-hover:text-blue-400 transition-colors">
                                    <span>View Live Site</span>
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Project 2 - BMG */}
                        <a
                            href="https://bmg.dimario.dev"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden hover:border-purple-500/40 transition-all duration-500 hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-500/10"
                        >
                            <div className="aspect-video bg-gradient-to-br from-purple-900/30 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:to-blue-500/10 transition-all duration-500" />
                                <div className="text-center relative z-10">
                                    <div className="w-14 h-14 mx-auto bg-purple-500/20 border border-purple-500/30 rounded-2xl flex items-center justify-center mb-2 group-hover:scale-110 transition-all duration-300">
                                        <svg
                                            className="w-7 h-7 text-purple-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs text-purple-400 uppercase tracking-wider">
                                    Web Development
                                </span>
                                <h3 className="text-lg font-semibold mt-1 group-hover:text-purple-400 transition-colors">
                                    BMG
                                </h3>
                                <p className="text-zinc-400 text-sm mt-2">
                                    Professional business website with modern
                                    design.
                                </p>
                                <div className="flex items-center gap-2 mt-4 text-sm text-zinc-500 group-hover:text-purple-400 transition-colors">
                                    <span>View Live Site</span>
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </a>

                        {/* Project 3 - iOS App Website (Coming Soon) */}
                        <div className="group bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden relative">
                            <div className="absolute top-4 right-4 z-10">
                                <span className="text-xs font-medium bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full border border-amber-500/30">
                                    Coming Soon
                                </span>
                            </div>
                            <div className="aspect-video bg-gradient-to-br from-amber-900/30 to-zinc-900 flex items-center justify-center relative overflow-hidden">
                                <div className="text-center relative z-10">
                                    <div className="w-14 h-14 mx-auto bg-amber-500/20 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-2">
                                        <svg
                                            className="w-7 h-7 text-amber-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={1.5}
                                                d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <span className="text-xs text-amber-400 uppercase tracking-wider">
                                    App Development
                                </span>
                                <h3 className="text-lg font-semibold mt-1 text-zinc-300">
                                    iOS App Landing Page
                                </h3>
                                <p className="text-zinc-500 text-sm mt-2">
                                    Marketing website for upcoming iOS
                                    application.
                                </p>
                                <div className="flex items-center gap-2 mt-4 text-sm text-zinc-600">
                                    <span>In Development</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center mt-14">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
                        >
                            Have a project in mind?
                            <span className="text-white font-medium group-hover:text-blue-400 transition-colors">
                                Let's talk
                            </span>
                            <svg
                                className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                                />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section id="contact" className="py-28 relative">
                {/* Background accents */}
                <div className="absolute bottom-0 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-glow" />
                <div
                    className="absolute top-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse-glow"
                    style={{ animationDelay: "2s" }}
                />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Left - Info */}
                        <div>
                            <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                                Get in Touch
                            </span>
                            <h2 className="text-4xl sm:text-5xl font-bold mt-4 leading-tight">
                                Let's build
                                <br />
                                <span className="gradient-text">
                                    something great
                                </span>
                            </h2>
                            <p className="text-zinc-400 mt-6 max-w-sm">
                                No contact forms that go nowhere. No waiting
                                weeks for a response. Just reach out and talk
                                directly with the person who'll build your
                                project.
                            </p>

                            <a
                                href="mailto:hello@dimario.dev"
                                className="inline-flex items-center gap-4 mt-8 text-zinc-400 hover:text-white transition-colors group"
                            >
                                <span className="w-12 h-12 border border-zinc-800 rounded-full flex items-center justify-center group-hover:border-blue-500/50 group-hover:bg-blue-500/10 transition-all duration-300">
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={1.5}
                                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                        />
                                    </svg>
                                </span>
                                <span className="group-hover:text-blue-400 transition-colors">
                                    hello@dimario.dev
                                </span>
                            </a>

                            <div className="flex gap-3 mt-8">
                                {["GitHub", "LinkedIn", "Twitter"].map(
                                    (social) => (
                                        <a
                                            key={social}
                                            href="#"
                                            className="w-11 h-11 border border-zinc-800 rounded-full flex items-center justify-center text-zinc-500 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                                        >
                                            {social === "GitHub" && (
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                    />
                                                </svg>
                                            )}
                                            {social === "LinkedIn" && (
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            )}
                                            {social === "Twitter" && (
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                                </svg>
                                            )}
                                        </a>
                                    ),
                                )}
                            </div>
                        </div>

                        {/* Right - Form */}
                        <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 sm:p-8 hover:border-zinc-700 transition-colors duration-300">
                            {formStatus === "success" ? (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 mx-auto bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-4">
                                        <svg
                                            className="w-8 h-8 text-green-400"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Message Sent!
                                    </h3>
                                    <p className="text-zinc-400 mb-6">
                                        Thanks for reaching out. We'll get back
                                        to you soon.
                                    </p>
                                    <button
                                        onClick={() => setFormStatus("idle")}
                                        className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form
                                    onSubmit={handleSubmit}
                                    className="space-y-5"
                                >
                                    <div className="grid sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                                                placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm text-zinc-400 mb-2">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleFormChange}
                                                required
                                                className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors duration-300"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">
                                            Project Type
                                        </label>
                                        <select
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleFormChange}
                                            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors duration-300"
                                        >
                                            <option value="">
                                                Select a service
                                            </option>
                                            <option value="web">
                                                Web Development
                                            </option>
                                            <option value="app">
                                                App Development
                                            </option>
                                            <option value="consultation">
                                                Web Consultation
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-zinc-400 mb-2">
                                            Message
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleFormChange}
                                            required
                                            rows={4}
                                            className="w-full bg-zinc-900/80 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500 transition-colors duration-300 resize-none"
                                            placeholder="Tell us about your project..."
                                        />
                                    </div>
                                    {formStatus === "error" && (
                                        <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3 text-red-400 text-sm">
                                            {formError}
                                        </div>
                                    )}
                                    <button
                                        type="submit"
                                        disabled={formStatus === "loading"}
                                        className="w-full bg-white text-black font-medium py-3.5 rounded-xl hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {formStatus === "loading"
                                            ? "Sending..."
                                            : "Send Message"}
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="py-8 border-t border-zinc-900/50">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-600">
                        © 2025 DiMario Development. All rights reserved.
                    </p>
                    <a href="#" className="text-lg font-bold group">
                        <span className="text-white group-hover:text-blue-400 transition-colors">
                            DIMARIO
                        </span>
                        <span className="text-zinc-500">.DEV</span>
                    </a>
                </div>
            </footer>
        </main>
    );
}
