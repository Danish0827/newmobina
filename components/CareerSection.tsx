import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type Stat = {
    value: string;
    label: string;
};

type Strategy = {
    label: string;
    heading: string;
    description: string;
};

type ComparisonCardProps = {
    label: string;
    labelClassName: string;
    cardClassName: string;
    profile: {
        /** Omit to fall back to a gradient-ring initials avatar (no logo asset needed). */
        logo?: string;
        logoAlt: string;
        logoClassName?: string;
        logoInitials?: string;
        name: string;
        stats: Stat[];
        description: React.ReactNode;
        link?: string;
        footer?: React.ReactNode;
    };
    /** Short, single-line bullets — the comp does not pair these with a description. */
    points: string[];
    /** Green check marks by default; `false` renders red cross marks (Assure's own gaps). */
    positive?: boolean;
    strategy: Strategy;
    dark?: boolean;
};

const eugenixCard: ComparisonCardProps = {
    label: "Eugenix Hair Sciences",
    labelClassName: "bg-[#292929] text-white",
    cardClassName:
        "border-[#DCE1F0] bg-[#E8EDFF] shadow-[0_5px_20px_rgba(30,40,80,0.12)]",
    profile: {
        logo: "/Mask group.png",
        logoAlt: "Eugenix Hair Sciences",
        name: "Eugenix Hair Sciences",
        stats: [
            { value: "1,895", label: "posts" },
            { value: "106K", label: "followers" },
            { value: "92", label: "following" },
        ],
        description: (
            <>
                Hair replacement service
                <br />
                Best Hair Transplant Clinic in the World
                <br />
                - Natural Before and After Results
                <br />
                - Trusted by Celebrities
                <br />
                - Led by @dr_pradeep_sethi &amp; @dr_arika_bansal
                <br />
                934 &amp; 935P, Opp. Amity International School, Sector 51, Gurugram
            </>
        ),
    },
    points: ["Doctor-Led Authority", "Patient Storytelling", "Instant Format Recognition"],
    positive: true,
    strategy: {
        label: "STRATEGY",
        heading: "Owns Doctor Authority",
        description: "Strong expertise and transformation storytelling.",
    },
};

const maxClinicCard: ComparisonCardProps = {
    label: "Max Clinic India",
    labelClassName: "bg-[#292929] text-white",
    cardClassName:
        "border-[#DCE1F0] bg-[#E8EDFF] shadow-[0_5px_20px_rgba(30,40,80,0.12)]",
    profile: {
        logo: "/Mask group-2.png",
        logoAlt: "Max Hair Clinic",
        name: "MAX HAIR CLINIC",
        stats: [
            { value: "783", label: "posts" },
            { value: "96.2K", label: "followers" },
            { value: "6", label: "following" },
        ],
        description: (
            <>
                Global Haircare Destination
                <br />
                🇮🇳 NABH Accredited
                <br />
                Hair Transplant &amp; Restoration
                <br />
                Ranked No.1 Hair Clinic - TOI... more
            </>
        ),
        link: "api.whatsapp.com/send/?ph... and 3 more",
    },
    points: ["Massive Patient Scale", "High Content Volume", "Consistent Brand Recall"],
    positive: true,
    strategy: {
        label: "STRATEGY",
        heading: "Owns Scale Messaging",
        description: "Experience, patient numbers and global presence.",
    },
};

const assureCard: ComparisonCardProps = {
    label: "Assure today",
    labelClassName: "bg-[#242B73] text-[#F4B72A]",
    cardClassName:
        "border-[#DCE1F0] bg-[#293789] shadow-[0_5px_20px_rgba(20,30,80,0.15)]",
    profile: {
        logo: "/Mask group-1.png",
        logoAlt: "Assure",
        name: "Assure Clinic",
        stats: [
            { value: "885", label: "posts" },
            { value: "24.4K", label: "followers" },
            { value: "5", label: "following" },
        ],
        description: (
            <>
                Health/beauty
                <br />
                Assure Clinics ✨
                <br />
                Experts in Hair, Skin &amp; Cosmetic Transformations
                <br />
                🌎 15+ Centers | India &amp; Dubai
                <br />
                💎 Advanced Techniques | Trusted by 30,000+ Clients
            </>
        ),
        link: "youtu.be/YcWkNJF_D40?si=a... and 2 more",
    },
    points: ["Scale Underused", "Inconsistent Visual Identity", "Low Brand Recall"],
    positive: false,
    strategy: {
        label: "STRATEGIC OPPORTUNITY",
        heading: "Build Content System",
        description: "Patient stories + doctors + education + centres.",
    },
};

export default function CareerSection() {
    return (
        <section className="relative mt-20 md:mt-30 lg:pt-10 -z-50 bg-white pb-20">
            {/* Background */}
            <div className="absolute left-0 right-0 top-0 z-0 h-full">
                <Image
                    src="/images/career-bg.webp"
                    alt=""
                    width={5000}
                    height={5000}
                    priority
                    className="object-contain object-top pb-20"
                />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
                    <CareerIntro />
                {/* <div className="grid items-stretch gap-10 lg:grid-cols-[0.5fr_1.5fr] lg:gap-12"> */}
                {/* <div className="grid items-stretch gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12"> */}

                    {/* Left Content */}

                    {/* Comparison Cards */}
                    <div className="grid items-stretch gap-5 sm:grid-cols-3">
                        <ComparisonCard {...assureCard} dark />
                        <ComparisonCard {...eugenixCard} />
                        <ComparisonCard {...maxClinicCard} />
                    </div>
                {/* </div> */}
            </div>
        </section>
    );
}

/* -------------------------------------------------------------------------- */
/* Intro                                                                      */
/* -------------------------------------------------------------------------- */

function CareerIntro() {
    return (
        <div className="flex max-w-6xl mx-auto text-center mx-auto flex-col justify-center pb-10 lg:pb-20">
            <p className="mb-4 text-[18px] font-medium text-[#18244F] sm:text-[20px]">
                It Began With A Simple Belief:
            </p>

            <h2 className="text-3xl font-bold leading-[1.12] tracking-[-1.5px] text-[#18244F] sm:text-4xl xl:text-5xl">
                What Is Lost Can
                Find Its Way Back.
            </h2>

            <p className="mt-3 text-[16px] leading-[1.65] text-[#65708D] sm:text-[17px]">
                Assure has built India&apos;s largest doctor-led hair transplant
                network, but no single line owns that story across 14 centers and 2
                countries.
            </p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Comparison Card                                                            */
/* -------------------------------------------------------------------------- */

function ComparisonCard({
    label,
    labelClassName,
    cardClassName,
    profile,
    points,
    positive = true,
    strategy,
    dark = false,
}: ComparisonCardProps & { dark?: boolean }) {
    return (
        <div className="relative flex h-full min-h-0 flex-col pt-7">
            {/* Label */}
            <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
                <div
                    className={`whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold shadow-md ${labelClassName}`}
                >
                    {label}
                </div>
            </div>

            {/* Main Card */}
            <div
                className={`flex h-full min-h-[475px] flex-col overflow-hidden rounded-[25px] border ${cardClassName}`}
            >
                {/* Profile */}
                <ProfileCard profile={profile} />

                {/* Points + strategy */}
                <div
                    className={`flex flex-1 flex-col justify-between gap-6 px-7 py-8 ${dark ? "text-white" : "text-[#222C50]"
                        }`}
                >
                    <div className="space-y-4">
                        {points.map((point) => (
                            <Point key={point} text={point} dark={dark} positive={positive} />
                        ))}
                    </div>

                    <StrategyCallout strategy={strategy} dark={dark} />
                </div>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Profile Card                                                               */
/* -------------------------------------------------------------------------- */

function ProfileCard({
    profile,
}: {
    profile: ComparisonCardProps["profile"];
}) {
    return (
        <div className="relative z-10 min-h-60 pt-10 shrink-0 rounded-[20px] bg-white p-4 shadow-[0_5px_18px_rgba(20,30,70,0.10)]">
            {/* Header */}
            <div className="flex gap-3">
                {/* Logo */}
                {profile.logo ? (
                    <div
                        className={`relative h-[58px] w-[58px] shrink-0 overflow-hidden rounded-full bg-[#222] ${profile.logoClassName ?? ""
                            }`}
                    >
                        <Image
                            src={profile.logo}
                            alt={profile.logoAlt}
                            fill
                            className="object-cover"
                        />
                    </div>
                ) : (
                    <GradientRingAvatar
                        initials={profile.logoInitials ?? profile.name.slice(0, 2).toUpperCase()}
                    />
                )}

                {/* Name + Stats */}
                <div className="min-w-0 flex-1">
                    <h3 className="truncate text-base font-bold text-[#252525]">
                        {profile.name}
                    </h3>

                    <div className="mt-2 grid grid-cols-3 gap-3">
                        {profile.stats.map((stat) => (
                            <Stat
                                key={`${stat.value}-${stat.label}`}
                                value={stat.value}
                                label={stat.label}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Description */}
            <p className="mt-2 text-[12px] leading-[1.5] text-[#4E566A]">
                {profile.description}
            </p>

            {/* Link */}
            {profile.link ? (
                <p className="mt-2 truncate text-[12px] font-semibold text-[#252525]">
                    🔗 {profile.link}
                </p>
            ) : null}

            {/* Footer */}
            {profile.footer && (
                <div className="mt-2 flex gap-4 text-[9px] font-semibold text-[#444]">
                    {profile.footer}
                </div>
            )}
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Gradient-ring avatar — used when a card has no logo asset of its own       */
/* -------------------------------------------------------------------------- */

function GradientRingAvatar({ initials }: { initials: string }) {
    return (
        <div
            className="relative h-[58px] w-[58px] shrink-0 rounded-full p-[2.5px]"
            style={{
                background:
                    "conic-gradient(from 180deg, #F58529, #DD2A7B, #8134AF, #515BD4, #F58529)",
            }}
        >
            <div className="grid h-full w-full place-items-center rounded-full bg-white">
                <span className="text-sm font-extrabold text-[#292929]">{initials}</span>
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Stat                                                                       */
/* -------------------------------------------------------------------------- */

function Stat({ value, label }: Stat) {
    return (
        <div>
            <p className="text-sm font-bold text-[#252525]">{value}</p>
            <p className="text-xs text-[#555]">{label}</p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Point                                                                      */
/* -------------------------------------------------------------------------- */

function Point({
    text,
    dark = false,
    positive = true,
}: {
    text: string;
    dark?: boolean;
    positive?: boolean;
}) {
    return (
        <div className="flex items-center gap-3 text-lg">
            {/* Check / cross */}
            <div
                className={cn(
                    "flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full",
                    positive ? "bg-positive" : "bg-negative",
                )}
            >
                <span className="text-[10px] font-bold text-white">
                    {positive ? "✓" : "✗"}
                </span>
            </div>

            <p
                className={cn(
                    "text-base font-semibold leading-snug",
                    dark ? "text-white" : "text-[#222C50]",
                )}
            >
                {text}
            </p>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/* Strategy callout                                                          */
/* -------------------------------------------------------------------------- */

function StrategyCallout({ strategy, dark = false }: { strategy: Strategy; dark?: boolean }) {
    return (
        <div className={cn("border-t pt-5", dark ? "border-white/15" : "border-[#222C50]/10")}>
            <p
                className={cn(
                    "text-[13px] font-bold uppercase tracking-[0.12em]",
                    dark ? "text-[#F4B72A]/80" : "text-[#65708D]",
                )}
            >
                {strategy.label}
            </p>
            <p
                className={cn(
                    "mt-2 flex items-center gap-2 text-base font-bold",
                    dark ? "text-white" : "text-[#222C50]",
                )}
            >
                <span aria-hidden="true">💡</span>
                {strategy.heading}
            </p>
            <p
                className={cn(
                    "mt-1 text-sm leading-[1.55]",
                    dark ? "text-white/75" : "text-[#4E566A]",
                )}
            >
                {strategy.description}
            </p>
        </div>
    );
}
