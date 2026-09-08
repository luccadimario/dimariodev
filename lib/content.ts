// ---------------------------------------------------------------------------
// Site content. Everything the portfolio renders lives here so copy edits
// never require touching layout code.
// ---------------------------------------------------------------------------

export const profile = {
    name: "Carmen Lucca DiMario",
    shortName: "Lucca DiMario",
    role: "Software Engineer",
    tagline:
        "I work at both ends of the stack. At the low level, that means compiler toolchains and ROS2 autonomy running on embedded hardware. Higher up, it means iOS apps, Go blockchains, and web platforms.",
    location: "Daytona Beach, FL",
    email: "luccadimario@gmail.com",
    phone: "(484) 467-2466",
    github: "https://github.com/luccadimario",
    status: "M.S. Computer Science @ Embry-Riddle · Open to SWE roles",
} as const;

export interface Resume {
    id: string;
    label: string;
    short: string;
    blurb: string;
    href: string;
}

export const resumes: Resume[] = [
    {
        id: "embedded",
        label: "Embedded & Systems",
        short: "Embedded",
        blurb: "Firmware, compiler toolchains, and robotics autonomy.",
        href: "/carmen-lucca-dimario-resume-embedded.pdf",
    },
    {
        id: "software",
        label: "Software Engineering",
        short: "Software",
        blurb: "Systems, distributed infrastructure, and applied ML.",
        href: "/carmen-lucca-dimario-resume-software.pdf",
    },
    {
        id: "fullstack",
        label: "Full-Stack & Web",
        short: "Full-Stack",
        blurb: "Product engineering across React, Next.js, and PHP backends.",
        href: "/carmen-lucca-dimario-resume-fullstack.pdf",
    },
];

export type Accent = "blue" | "purple" | "amber" | "emerald";

export interface Project {
    name: string;
    subtitle: string;
    kind: string;
    accent: Accent;
    year: string;
    summary: string;
    highlights: string[];
    stack: string[];
    links: { label: string; href: string }[];
    image?: string;
    featured?: boolean;
}

export const projects: Project[] = [
    {
        name: "Dilithium",
        subtitle: "Post-quantum cryptocurrency, written from scratch in Go",
        kind: "Systems / Cryptography",
        accent: "blue",
        year: "2026",
        featured: true,
        summary:
            "A peer-to-peer proof-of-work blockchain that is quantum-safe from block zero. Every transaction is signed with CRYSTALS-Dilithium Mode3, the NIST FIPS 204 standard, so there is no migration to make when quantum computers arrive. Node, wallet CLI, and CPU/GPU miner all built from first principles.",
        highlights: [
            "NIST Level 3 (192-bit) quantum-safe signatures via CRYSTALS-Dilithium Mode3",
            "Competitive PoW mining across a live P2P network with automatic block and transaction sync",
            "REST API, UPnP port forwarding, and cross-platform builds for Linux, macOS, and Windows",
        ],
        stack: ["Go", "CRYSTALS-Dilithium", "Cloudflare CIRCL", "P2P", "SHA-256"],
        links: [
            { label: "dilithiumcoin.com", href: "https://dilithiumcoin.com" },
            { label: "Source", href: "https://github.com/luccadimario/dilithiumcoin" },
        ],
    },
    {
        name: "PFactor",
        subtitle: "AI oral-exam simulator for FAA checkride prep",
        kind: "iOS / Applied AI",
        accent: "purple",
        year: "2025 — present",
        featured: true,
        summary:
            "Student pilots practice their checkride oral exam by actually talking to an adaptive AI examiner. It asks follow-ups on weak answers, scores each response the way a real DPE would, and delivers per-category debriefs. No typing, no multiple choice.",
        highlights: [
            "Adaptive examiner engine scores responses 1–5, generates targeted follow-ups, and mirrors real DPE behavior",
            "ACS-aligned question banks covering 6 FAA certificates",
            "Serverless Convex backend handling Sign in with Apple, StoreKit 2 subscriptions, and graceful offline degradation to local scoring",
        ],
        stack: ["Swift", "SwiftUI", "Convex", "StoreKit 2", "LLM APIs", "Next.js"],
        links: [{ label: "pfactor.app", href: "https://pfactor.app" }],
    },
    {
        name: "AIRHOUND",
        subtitle: "Vision-based UAV target tracking, middleware lead",
        kind: "Robotics / Embedded",
        accent: "blue",
        year: "2024 — 2026",
        featured: true,
        summary:
            "Built the middleware that turns a camera feed into flight commands. A modular four-node ROS2 pipeline converts RF-DETR detections into yaw commands via pinhole camera intrinsics and publishes them to a PX4 flight controller over Micro XRCE-DDS. Work published at SPIE Defense + Security 2026.",
        highlights: [
            "Diagnosed DDS image-transport serialization as the pipeline bottleneck and replaced it with direct V4L2 capture, cutting mean detection latency from 234 ms to 58.8 ms and eliminating dropouts at 1280x720",
            "Optimized RF-DETR with NVIDIA TensorRT FP16 for real-time inference at 15 FPS on a Jetson Orin",
            "Designed the detection-to-actuation contract so perception and control teams could iterate independently",
        ],
        stack: ["C++", "Python", "ROS2", "RF-DETR", "TensorRT", "PX4", "Jetson Orin", "Micro XRCE-DDS"],
        links: [
            { label: "Paper", href: "https://doi.org/10.1117/12.3094732" },
            { label: "Source", href: "https://github.com/luccadimario/AirHoundMiddleware" },
        ],
    },
    {
        name: "RoboRacer",
        subtitle: "Software lead, competition autonomy stack",
        kind: "Robotics",
        accent: "emerald",
        year: "2025 — 2026",
        summary:
            "Assembled and tuned the RoboRacer platform from bare components, mounting compute, sensors, and motor controller into a competition-ready vehicle, then installed and configured the full ROS2 stack on the onboard computer.",
        highlights: [
            "Deployed an end-to-end autonomy stack from sensor input through planning to actuation",
            "Validated reliable performance under real competition conditions",
        ],
        stack: ["ROS2", "Python", "C++", "SLAM", "Embedded Linux"],
        links: [],
    },
    {
        name: "SiT Trajectory Prediction",
        subtitle: "Pedestrian forecasting from LiDAR on an HPC cluster",
        kind: "Machine Learning",
        accent: "amber",
        year: "2026",
        summary:
            "Pedestrian trajectory prediction on the SiT dataset, fusing LiDAR point-cloud features with kinematic and ego-motion signals. Trains Decision Tree, XGBoost, and a Social Transformer, benchmarked by ADE/FDE.",
        highlights: [
            "45-feature pipeline: 34 kinematic, 4 ego-motion, and 7 LiDAR-derived features",
            "Reproducible PBS/Torque job scripts targeting ERAU's Vega cluster, with a Colab GPU path",
        ],
        stack: ["Python", "PyTorch", "XGBoost", "LiDAR / PCD", "PBS/Torque"],
        links: [{ label: "Source", href: "https://github.com/luccadimario/SiT_vega" }],
    },
    {
        name: "amuse",
        subtitle: "Terminal player for Amazon Music",
        kind: "Systems / TUI",
        accent: "emerald",
        year: "2026",
        summary:
            "Amazon deprecated its desktop app and DRM'd the streams, so amuse wraps the browser tab instead: OS-native media session control (Windows SMTC, Linux MPRIS), a live FFT spectrum visualizer driven by system audio loopback, and album art rendered as true-color ANSI half-blocks.",
        highlights: [
            "WASAPI and PulseAudio/PipeWire loopback capture feeding a real-time FFT visualizer",
            "Per-process volume control through the Windows mixer via pycaw; native MPRIS volume on Linux",
            "No scraping and no unofficial APIs; it drives the same interfaces your media keys do",
        ],
        stack: ["Python", "WASAPI", "MPRIS / D-Bus", "FFT", "Textual"],
        links: [{ label: "Source", href: "https://github.com/luccadimario/amuse-cli" }],
    },
    {
        name: "BMG Aviation",
        subtitle: "Aviation services client site",
        kind: "Freelance",
        accent: "amber",
        year: "2025",
        image: "/projects/bmg-aviation.webp",
        summary:
            "Marketing site designed and shipped end to end for an aviation services company, built for speed and search visibility.",
        highlights: [],
        stack: ["Next.js", "TypeScript", "Tailwind"],
        links: [{ label: "Live site", href: "https://bmg.dimario.dev" }],
    },
    {
        name: "Pocopson Vet Station",
        subtitle: "Veterinary practice client site",
        kind: "Freelance",
        accent: "amber",
        year: "2026",
        image: "/projects/pocopson-vet.webp",
        summary:
            "Full redesign and build for a veterinary practice, from information architecture through deployment.",
        highlights: [],
        stack: ["Next.js", "TypeScript", "Tailwind"],
        links: [{ label: "Live site", href: "https://pocopsonvetstation.dimario.dev" }],
    },
];

export interface Job {
    company: string;
    role: string;
    period: string;
    bullets: string[];
    stack: string[];
}

export const experience: Job[] = [
    {
        company: "Garmin",
        role: "Embedded Software Development Intern",
        period: "May 2026 — August 2026",
        bullets: [
            "Implemented Clang compiler support as a replacement for legacy ARMcc toolchains",
            "Extended embedded library support to 64-bit architectures, resolving data type alignment and pointer-width issues to broaden platform compatibility",
            "Developed a system test suite for a proprietary avionics communication interface, validating real-time engine metric transmission and protocol correctness under embedded constraints",
        ],
        stack: ["C", "C++", "Clang", "ARMcc", "GNU ASM", "Avionics protocols"],
    },
    {
        company: "JRC Integrated Systems",
        role: "RISE Intern / CO-OP Participant",
        period: "June 2025 — May 2026",
        bullets: [
            "Upgraded the PETSc linear algebra library across a major version boundary to enable GPU acceleration, reducing complex computation time",
            "Analyzed an advanced C/C++ codebase to identify differences in Linear Energy Transfer (LET) calculations through various substrates",
            "Rebuilt the Accuro test suite from hard-coded shell scripts into a Python framework with parallel execution and selectable test subsets, cutting a multi-hour run to roughly 25 minutes",
        ],
        stack: ["C", "C++", "PETSc", "Numerical methods", "Test infrastructure"],
    },
    {
        company: "ivDash",
        role: "Full Stack Development Intern",
        period: "May 2024 — August 2024",
        bullets: [
            "Led development of an admin dashboard consolidating functionality for doctors, nurses, and product providers across a digitalized healthcare distribution platform",
            "Built interactive web interfaces in Next.js against an existing Symfony PHP backend",
            "Streamlined Auth0 JWT authentication to work across both the Symfony PHP and Next.js applications",
        ],
        stack: ["Next.js", "TypeScript", "Symfony", "PHP", "Auth0 / JWT"],
    },
];

export const publications = [
    {
        citation:
            'DiMario, C., Bacha, R., & Butka, B. "Combatting Senior Scams Using a Large Language Model-Created Rubric."',
        venue: "ASSE '24, ACM, 2024",
        href: "https://doi.org/10.1145/3702138.3702140",
    },
    {
        citation:
            'Malarchick, R., DiMario, C., et al. "Predictive Target Pursuit for Autonomous UAVs Using RF-DETR with Depth-Aware State Estimation and Physics-Informed Trajectory Prediction."',
        venue: "Proc. SPIE 14030, Machine Learning from Challenging Data 2026, 140300O",
        href: "https://doi.org/10.1117/12.3094732",
    },
];

export const skills = [
    { group: "Languages", items: ["C", "C++", "Swift", "GNU ASM", "TypeScript", "JavaScript", "Go", "Java", "Python", "SQL", "Bash"] },
    { group: "Embedded & Robotics", items: ["ROS2", "PX4", "STM32", "Jetson Orin", "Clang", "ARMcc", "TensorRT", "UNIX"] },
    { group: "Web & Mobile", items: ["React", "Next.js", "SwiftUI", "Convex", "Symfony", "Laravel", "Tailwind"] },
    { group: "Practice", items: ["Agile", "Scrum", "Test infrastructure", "Technical writing"] },
];

export const education = [
    {
        school: "Embry-Riddle Aeronautical University",
        degree: "M.S. Computer Science",
        period: "Expected May 2027",
    },
    {
        school: "Embry-Riddle Aeronautical University",
        degree: "B.S. Computer Science",
        period: "May 2026",
    },
];

export const extras = [
    "ERAU Cyber Rodeo 2026: first place, individual",
    "ERAU Division II Cross-Country / Track, roughly 30 hours of training weekly",
    "FAA Part 107 Remote Pilot Certification",
];
