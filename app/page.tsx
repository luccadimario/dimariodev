"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import {
    profile,
    resumes,
    projects,
    experience,
    publications,
    skills,
    education,
    extras,
    type Accent,
} from "@/lib/content";

const FloatingShapes3D = dynamic(
    () => import("@/components/FloatingShapes3D"),
    { ssr: false },
);

// Full class strings — Tailwind only sees literals, never interpolated names.
const accents: Record<
    Accent,
    {
        text: string;
        border: string;
        shadow: string;
        dot: string;
        bar: string;
        linkHover: string;
        groupLink: string;
    }
> = {
    blue: {
        text: "text-blue-400",
        border: "hover:border-blue-500/40",
        shadow: "hover:shadow-blue-500/10",
        dot: "bg-blue-500",
        bar: "from-blue-500 to-blue-600",
        linkHover: "hover:text-blue-400",
        groupLink: "group-hover:text-blue-400",
    },
    purple: {
        text: "text-purple-400",
        border: "hover:border-purple-500/40",
        shadow: "hover:shadow-purple-500/10",
        dot: "bg-purple-500",
        bar: "from-purple-500 to-purple-600",
        linkHover: "hover:text-purple-400",
        groupLink: "group-hover:text-purple-400",
    },
    amber: {
        text: "text-amber-400",
        border: "hover:border-amber-500/40",
        shadow: "hover:shadow-amber-500/10",
        dot: "bg-amber-500",
        bar: "from-amber-500 to-amber-600",
        linkHover: "hover:text-amber-400",
        groupLink: "group-hover:text-amber-400",
    },
    emerald: {
        text: "text-emerald-400",
        border: "hover:border-emerald-500/40",
        shadow: "hover:shadow-emerald-500/10",
        dot: "bg-emerald-500",
        bar: "from-emerald-500 to-emerald-600",
        linkHover: "hover:text-emerald-400",
        groupLink: "group-hover:text-emerald-400",
    },
};

const navLinks = [
    { href: "#work", label: "Work" },
    { href: "#experience", label: "Experience" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
];

/** Fades a section in the first time it scrolls into view. */
function Reveal({
    children,
    delay = 0,
    className = "",
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShown(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`transition-all duration-700 ease-out ${
                shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            } ${className}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
}

function ArrowIcon({ className = "" }: { className?: string }) {
    return (
        <svg
            className={className}
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
    );
}

function SectionHeading({
    eyebrow,
    title,
    blurb,
}: {
    eyebrow: string;
    title: string;
    blurb?: string;
}) {
    return (
        <div className="mb-14">
            <div className="flex items-center gap-3">
                <div className="w-10 h-px bg-gradient-to-r from-blue-500 to-purple-500" />
                <span className="text-xs text-zinc-500 uppercase tracking-[0.2em]">
                    {eyebrow}
                </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mt-4">{title}</h2>
            {blurb && (
                <p className="text-zinc-400 mt-4 max-w-2xl leading-relaxed">
                    {blurb}
                </p>
            )}
        </div>
    );
}

export default function Home() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [loaded, setLoaded] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [copied, setCopied] = useState(false);

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
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(profile.email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Clipboard unavailable — the mailto link below still works.
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

    const featured = projects.filter((p) => p.featured);
    const rest = projects.filter((p) => !p.featured);

    return (
        <main className="bg-[#030303] text-white min-h-screen overflow-x-hidden">
            <div className="noise-overlay" />

            {/* Mouse glow */}
            <div
                className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
                style={{
                    background: `radial-gradient(800px at ${mousePos.x}px ${mousePos.y}px, rgba(59,130,246,0.13), transparent 60%)`,
                }}
            />

            {/* ===== NAVBAR ===== */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-[#030303]/70 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <a href="#" className="text-lg font-bold group">
                        <span className="text-white group-hover:text-blue-400 transition-colors">
                            CARMEN
                        </span>
                        <span className="text-zinc-500">.DIMARIO</span>
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm text-zinc-400 hover:text-white transition-colors relative group"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-full transition-all duration-300" />
                            </a>
                        ))}
                        <a
                            href="#contact"
                            className="text-sm font-medium bg-white text-black px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                        >
                            Résumé
                        </a>
                    </div>

                    <button
                        className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label="Toggle menu"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d={
                                    menuOpen
                                        ? "M6 18L18 6M6 6l12 12"
                                        : "M4 6h16M4 12h16M4 18h16"
                                }
                            />
                        </svg>
                    </button>
                </div>

                {menuOpen && (
                    <div className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-t border-white/5 px-6 py-4 space-y-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMenuOpen(false)}
                                className="block text-zinc-400 hover:text-white transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        {resumes.map((cv) => (
                            <a
                                key={cv.id}
                                href={cv.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                {cv.short} résumé ↗
                            </a>
                        ))}
                    </div>
                )}
            </nav>

            {/* ===== HERO ===== */}
            <section className="min-h-screen flex items-center relative">
                <div className="absolute top-20 right-[10%] w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse-glow" />
                <div
                    className="absolute top-1/3 left-[20%] w-[300px] h-[300px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse-glow"
                    style={{ animationDelay: "2s" }}
                />

                <FloatingShapes3D mousePos={mousePos} />

                <div className="max-w-5xl mx-auto px-6 pt-28 pb-20 w-full relative z-10">
                    <div
                        className={`space-y-7 max-w-3xl ${loaded ? "animate-slide-in-left" : "opacity-0"}`}
                    >
                        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-emerald-500/25 bg-emerald-500/5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-70" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                            </span>
                            <span className="text-xs text-emerald-300/90">
                                {profile.status}
                            </span>
                        </div>

                        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.95]">
                            <span className="text-white">CARMEN LUCCA</span>
                            <br />
                            <span className="gradient-text-cool">DIMARIO</span>
                        </h1>

                        <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                            {profile.tagline}
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                            <a
                                href="#work"
                                className="group inline-flex items-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 hover:gap-3"
                            >
                                See the work
                                <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#contact"
                                className="inline-flex items-center gap-2 border border-zinc-700 text-white font-medium px-6 py-3 rounded-full hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300"
                            >
                                Download résumé
                            </a>
                            <a
                                href={profile.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 border border-zinc-800 text-zinc-300 font-medium px-6 py-3 rounded-full hover:border-zinc-600 hover:text-white transition-all duration-300"
                            >
                                <svg
                                    className="w-4 h-4"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.5 18.3 4.8 18.3 4.8c.7 1.6.2 2.8.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3" />
                                </svg>
                                GitHub
                            </a>
                        </div>

                    </div>
                </div>
            </section>

            {/* ===== WORK ===== */}
            <section id="work" className="py-28 relative scroll-mt-16">
                <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse-glow" />
                <div
                    className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-pulse-glow"
                    style={{ animationDelay: "2s" }}
                />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Selected Work"
                            title="Things I've built"
                            blurb="A post-quantum blockchain, an AI checkride examiner, and the middleware flying a drone. Each one was shipped, tested, or published."
                        />
                    </Reveal>

                    {/* Featured projects */}
                    <div className="space-y-6">
                        {featured.map((project, i) => {
                            const a = accents[project.accent];
                            return (
                                <Reveal key={project.name} delay={i * 80}>
                                    <article
                                        className={`group relative bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-7 sm:p-9 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${a.border} ${a.shadow}`}
                                    >
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <span
                                                className={`text-xs font-mono ${a.text}`}
                                            >
                                                {project.kind}
                                            </span>
                                            <span className="text-zinc-700">
                                                /
                                            </span>
                                            <span className="text-xs text-zinc-500 font-mono">
                                                {project.year}
                                            </span>
                                        </div>

                                        <h3 className="text-2xl sm:text-3xl font-bold">
                                            {project.name}
                                        </h3>
                                        <p className="text-zinc-400 mt-1">
                                            {project.subtitle}
                                        </p>

                                        <p className="text-zinc-400 text-sm leading-relaxed mt-5 max-w-3xl">
                                            {project.summary}
                                        </p>

                                        {project.highlights.length > 0 && (
                                            <ul className="mt-6 space-y-2.5 max-w-3xl">
                                                {project.highlights.map((h) => (
                                                    <li
                                                        key={h}
                                                        className="flex gap-3 text-sm text-zinc-400"
                                                    >
                                                        <span
                                                            className={`mt-[7px] w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`}
                                                        />
                                                        <span className="leading-relaxed">
                                                            {h}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}

                                        <div className="flex flex-wrap gap-2 mt-6">
                                            {project.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="text-[11px] px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {project.links.length > 0 && (
                                            <div className="flex flex-wrap gap-5 mt-7">
                                                {project.links.map((link) => (
                                                    <a
                                                        key={link.href}
                                                        href={link.href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center gap-1.5 text-sm font-medium text-zinc-300 ${a.linkHover} transition-colors`}
                                                    >
                                                        {link.label}
                                                        <span className="text-xs">
                                                            ↗
                                                        </span>
                                                    </a>
                                                ))}
                                            </div>
                                        )}

                                        <div
                                            className={`absolute bottom-0 left-8 right-8 h-0.5 bg-gradient-to-r ${a.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                                        />
                                    </article>
                                </Reveal>
                            );
                        })}
                    </div>

                    {/* Remaining projects */}
                    <Reveal>
                        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mt-16 mb-6">
                            Also built
                        </h3>
                    </Reveal>

                    <div className="grid md:grid-cols-2 gap-6">
                        {rest.map((project, i) => {
                            const a = accents[project.accent];
                            const href = project.links[0]?.href;
                            const Wrapper = href ? "a" : "div";
                            return (
                                <Reveal key={project.name} delay={i * 60}>
                                    <Wrapper
                                        {...(href
                                            ? {
                                                  href,
                                                  target: "_blank",
                                                  rel: "noopener noreferrer",
                                              }
                                            : {})}
                                        className={`group relative flex flex-col h-full bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:-translate-y-1 hover:shadow-xl ${a.border} ${a.shadow}`}
                                    >
                                        {project.image && (
                                            <div className="aspect-[16/9] overflow-hidden border-b border-zinc-800 bg-zinc-950">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={project.image}
                                                    alt={`${project.name} screenshot`}
                                                    className="w-full h-full object-cover object-top opacity-80 group-hover:opacity-100 group-hover:scale-[1.03] transition-all duration-500"
                                                />
                                            </div>
                                        )}
                                        <div className="p-6 flex flex-col flex-1">
                                            <div className="flex items-center gap-2 mb-3">
                                                <span
                                                    className={`text-xs font-mono ${a.text}`}
                                                >
                                                    {project.kind}
                                                </span>
                                                <span className="text-zinc-700">
                                                    /
                                                </span>
                                                <span className="text-xs text-zinc-500 font-mono">
                                                    {project.year}
                                                </span>
                                            </div>

                                            <h4 className="text-lg font-semibold">
                                                {project.name}
                                            </h4>
                                            <p className="text-xs text-zinc-500 mt-0.5">
                                                {project.subtitle}
                                            </p>
                                            <p className="text-sm text-zinc-400 leading-relaxed mt-4">
                                                {project.summary}
                                            </p>

                                            {project.highlights.length > 0 && (
                                                <ul className="mt-4 space-y-2">
                                                    {project.highlights.map(
                                                        (h) => (
                                                            <li
                                                                key={h}
                                                                className="flex gap-2.5 text-xs text-zinc-500"
                                                            >
                                                                <span
                                                                    className={`mt-[6px] w-1 h-1 rounded-full shrink-0 ${a.dot}`}
                                                                />
                                                                <span className="leading-relaxed">
                                                                    {h}
                                                                </span>
                                                            </li>
                                                        ),
                                                    )}
                                                </ul>
                                            )}

                                            <div className="flex flex-wrap gap-2 mt-auto pt-5 border-t border-zinc-800/70">
                                                {project.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-[11px] px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            {href && (
                                                <span
                                                    className={`inline-flex items-center gap-1.5 text-sm font-medium mt-5 text-zinc-300 ${a.groupLink} transition-colors`}
                                                >
                                                    {project.links[0].label}
                                                    <span className="text-xs">
                                                        ↗
                                                    </span>
                                                </span>
                                            )}
                                        </div>

                                        <div
                                            className={`absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r ${a.bar} scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full`}
                                        />
                                    </Wrapper>
                                </Reveal>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ===== EXPERIENCE ===== */}
            <section
                id="experience"
                className="py-28 relative scroll-mt-16 border-t border-white/5"
            >
                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Experience"
                            title="Where I've worked"
                        />
                    </Reveal>

                    <div className="relative">
                        {/* Timeline rail */}
                        <div className="absolute left-0 sm:left-[7.5rem] top-2 bottom-2 w-px bg-gradient-to-b from-blue-500/40 via-purple-500/25 to-transparent" />

                        <div className="space-y-12">
                            {experience.map((job, i) => (
                                <Reveal key={job.company} delay={i * 100}>
                                    <div className="relative pl-8 sm:pl-0 sm:grid sm:grid-cols-[7.5rem_1fr] sm:gap-10">
                                        <div className="hidden sm:block text-right pr-10 pt-0.5">
                                            <span className="text-xs font-mono text-zinc-500 leading-snug block">
                                                {job.period}
                                            </span>
                                        </div>

                                        {/* Node */}
                                        <span className="absolute left-0 sm:left-[7.5rem] top-2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-[#030303]" />

                                        <div className="sm:pl-2">
                                            <h3 className="text-xl font-semibold">
                                                {job.role}
                                            </h3>
                                            <p className="text-blue-400 text-sm mt-1">
                                                {job.company}
                                            </p>
                                            <p className="sm:hidden text-xs font-mono text-zinc-500 mt-1">
                                                {job.period}
                                            </p>

                                            <ul className="mt-5 space-y-2.5">
                                                {job.bullets.map((bullet) => (
                                                    <li
                                                        key={bullet}
                                                        className="flex gap-3 text-sm text-zinc-400"
                                                    >
                                                        <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-zinc-600 shrink-0" />
                                                        <span className="leading-relaxed">
                                                            {bullet}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>

                                            <div className="flex flex-wrap gap-2 mt-5">
                                                {job.stack.map((tech) => (
                                                    <span
                                                        key={tech}
                                                        className="text-[11px] px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400"
                                                    >
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Reveal>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ===== ABOUT: skills, publications, education ===== */}
            <section
                id="about"
                className="py-28 relative scroll-mt-16 border-t border-white/5"
            >
                <div className="absolute top-1/3 right-0 w-[350px] h-[350px] bg-amber-500/8 rounded-full blur-[110px] animate-pulse-glow" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <SectionHeading
                            eyebrow="About"
                            title="Background"
                            blurb="Finishing a B.S. and M.S. in Computer Science at Embry-Riddle while running Division II cross-country. Two peer-reviewed publications, an FAA Part 107 certificate, and a habit of building the thing rather than reading about it."
                        />
                    </Reveal>

                    {/* Skills */}
                    <Reveal>
                        <div className="grid sm:grid-cols-2 gap-6">
                            {skills.map((group) => (
                                <div
                                    key={group.group}
                                    className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-6 hover:border-zinc-700 transition-colors"
                                >
                                    <h3 className="text-sm font-semibold text-zinc-300 mb-4">
                                        {group.group}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {group.items.map((item) => (
                                            <span
                                                key={item}
                                                className="text-xs px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-950 text-zinc-400"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Reveal>

                    {/* Publications */}
                    <Reveal>
                        <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mt-16 mb-6">
                            Publications
                        </h3>
                        <div className="space-y-4">
                            {publications.map((pub) => (
                                <a
                                    key={pub.href}
                                    href={pub.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 hover:border-amber-500/40 hover:-translate-y-0.5 transition-all duration-300"
                                >
                                    <p className="text-sm text-zinc-300 leading-relaxed group-hover:text-white transition-colors">
                                        {pub.citation}
                                    </p>
                                    <p className="text-xs text-amber-400/80 mt-2 font-mono">
                                        {pub.venue} ↗
                                    </p>
                                </a>
                            ))}
                        </div>
                    </Reveal>

                    {/* Education + extras */}
                    <Reveal>
                        <div className="grid sm:grid-cols-2 gap-6 mt-16">
                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-5">
                                    Education
                                </h3>
                                <div className="space-y-5">
                                    {education.map((edu) => (
                                        <div key={edu.degree}>
                                            <p className="font-medium text-zinc-200">
                                                {edu.degree}
                                            </p>
                                            <p className="text-sm text-zinc-500 mt-0.5">
                                                {edu.school}
                                            </p>
                                            <p className="text-xs font-mono text-blue-400/80 mt-1">
                                                {edu.period}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
                                <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-500 mb-5">
                                    Beyond the keyboard
                                </h3>
                                <ul className="space-y-3">
                                    {extras.map((item) => (
                                        <li
                                            key={item}
                                            className="flex gap-3 text-sm text-zinc-400"
                                        >
                                            <span className="mt-[7px] w-1.5 h-1.5 rounded-full bg-purple-500 shrink-0" />
                                            <span className="leading-relaxed">
                                                {item}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            {/* ===== CONTACT ===== */}
            <section
                id="contact"
                className="py-28 relative scroll-mt-16 border-t border-white/5"
            >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/10 rounded-full blur-[120px] animate-pulse-glow" />

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <Reveal>
                        <SectionHeading
                            eyebrow="Contact"
                            title="Get in touch"
                            blurb="Open to software engineering roles and internships in embedded, systems, or full-stack. The fastest way to reach me is email."
                        />
                    </Reveal>

                    <div className="grid lg:grid-cols-[0.8fr_1fr] gap-10">
                        {/* Direct channels */}
                        <Reveal>
                            <div className="space-y-4">
                                <button
                                    onClick={copyEmail}
                                    className="group w-full text-left bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-blue-500/40 transition-all duration-300"
                                >
                                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                                        Email
                                    </p>
                                    <p className="text-zinc-200 mt-1.5 group-hover:text-blue-400 transition-colors break-all">
                                        {profile.email}
                                    </p>
                                    <p className="text-xs text-zinc-600 mt-2">
                                        {copied
                                            ? "Copied to clipboard"
                                            : "Click to copy"}
                                    </p>
                                </button>

                                <a
                                    href={profile.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-purple-500/40 transition-all duration-300"
                                >
                                    <p className="text-xs uppercase tracking-widest text-zinc-500">
                                        GitHub
                                    </p>
                                    <p className="text-zinc-200 mt-1.5 group-hover:text-purple-400 transition-colors">
                                        @luccadimario ↗
                                    </p>
                                </a>

                                {resumes.map((cv) => (
                                    <a
                                        key={cv.id}
                                        href={cv.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block bg-zinc-900/50 border border-zinc-800 rounded-2xl p-5 hover:border-amber-500/40 transition-all duration-300"
                                    >
                                        <p className="text-xs uppercase tracking-widest text-zinc-500">
                                            Résumé · {cv.label}
                                        </p>
                                        <p className="text-zinc-200 mt-1.5 group-hover:text-amber-400 transition-colors">
                                            Download PDF ↗
                                        </p>
                                        <p className="text-xs text-zinc-600 mt-2">
                                            {cv.blurb}
                                        </p>
                                    </a>
                                ))}
                            </div>
                        </Reveal>

                        {/* Form */}
                        <Reveal delay={100}>
                            <form
                                onSubmit={handleSubmit}
                                className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-2xl p-7 space-y-5"
                            >
                                <div className="grid sm:grid-cols-2 gap-5">
                                    <div>
                                        <label
                                            htmlFor="name"
                                            className="block text-xs uppercase tracking-widest text-zinc-500 mb-2"
                                        >
                                            Name
                                        </label>
                                        <input
                                            id="name"
                                            name="name"
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={handleFormChange}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                                            placeholder="Jane Recruiter"
                                        />
                                    </div>
                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-xs uppercase tracking-widest text-zinc-500 mb-2"
                                        >
                                            Email
                                        </label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={handleFormChange}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="projectType"
                                        className="block text-xs uppercase tracking-widest text-zinc-500 mb-2"
                                    >
                                        Reason
                                    </label>
                                    <select
                                        id="projectType"
                                        name="projectType"
                                        value={formData.projectType}
                                        onChange={handleFormChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500/60 transition-colors"
                                    >
                                        <option value="">Select one</option>
                                        <option value="role">
                                            Job or internship opportunity
                                        </option>
                                        <option value="freelance">
                                            Freelance project
                                        </option>
                                        <option value="collab">
                                            Research or collaboration
                                        </option>
                                        <option value="other">Something else</option>
                                    </select>
                                </div>

                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-xs uppercase tracking-widest text-zinc-500 mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleFormChange}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-blue-500/60 transition-colors resize-none"
                                        placeholder="What's on your mind?"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    disabled={formStatus === "loading"}
                                    className="group w-full inline-flex items-center justify-center gap-2 bg-white text-black font-medium px-6 py-3 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {formStatus === "loading"
                                        ? "Sending…"
                                        : "Send message"}
                                    {formStatus !== "loading" && (
                                        <ArrowIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    )}
                                </button>

                                {formStatus === "success" && (
                                    <p className="text-sm text-emerald-400 text-center">
                                        Message sent. I&apos;ll get back to you
                                        soon.
                                    </p>
                                )}
                                {formStatus === "error" && (
                                    <p className="text-sm text-red-400 text-center">
                                        {formError}
                                    </p>
                                )}
                            </form>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ===== FOOTER ===== */}
            <footer className="border-t border-white/5 py-10 relative z-10">
                <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-zinc-600">
                        © {new Date().getFullYear()} {profile.name}
                    </p>
                    <p className="text-xs text-zinc-600 text-center sm:text-right">
                        Also available for freelance web &amp; app work.{" "}
                        <a
                            href="#contact"
                            className="text-zinc-400 hover:text-blue-400 transition-colors underline underline-offset-4 decoration-zinc-700"
                        >
                            Get in touch
                        </a>
                        .
                    </p>
                </div>
            </footer>
        </main>
    );
}
