import Image from "next/image";

type Stat = {
    value: string;
    label: string;
};

type Point = {
    title: string;
    text: string;
};

type ComparisonCardProps = {
    label: string;
    labelClassName: string;
    cardClassName: string;
    profile: {
        logo: string;
        logoAlt: string;
        logoClassName?: string;
        name: string;
        stats: Stat[];
        description: React.ReactNode;
        link: string;
        footer?: React.ReactNode;
    };
    points: Point[];
    dark?: boolean;
};

const themCard: ComparisonCardProps = {
    label: "Them",
    labelClassName: "bg-[#292929] text-white",
    cardClassName:
        "border-[#DCE1F0] bg-[#E8EDFF] shadow-[0_5px_20px_rgba(30,40,80,0.12)]",
    profile: {
        logo: "/images/qht-logo.png",
        logoAlt: "QHT",
        logoClassName: "border-[3px] border-[#F4B72A]",
        name: "QHT Hair Transplant Clinic",
        stats: [
            { value: "1,787", label: "posts" },
            { value: "92.2K", label: "followers" },
            { value: "87", label: "following" },
        ],
        description: (
            <>
                Medical &amp; health
                <br />
                Premium Hair Transplant Experts Since 2011
                <br />
                Natural, High-Density Results • Celebrity Choice
                <br />
                QHT Clinic | LA unit of QHT
            </>
        ),
        link: "wa.me/919084723085 and 3 more",
        footer: (
            <>
                <span>@ qhtclinic</span>
                <span>◉ QHT CLINIC</span>
            </>
        ),
    },
    points: [
        {
            title: "Big numbers. Bigger promises.",
            text: "“Thousands of successful procedures. Trusted by lakhs of patients.”",
        },
        {
            title: "Every clinic claims expertise.",
            text: "Advanced technology. Experienced doctors. Natural-looking results.",
        },
        {
            title: "Different names. Same story.",
            text: "Results, reviews, centres and statistics, with little that feels ownable.",
        },
    ],
};

const themCard2: ComparisonCardProps = {
    label: "Them",
    labelClassName: "bg-[#292929] text-white",
    cardClassName:
        "border-[#DCE1F0] bg-[#E8EDFF] shadow-[0_5px_20px_rgba(30,40,80,0.12)]",
    profile: {
        logo: "/images/qht-logo.png",
        logoAlt: "QHT",
        logoClassName: "border-[3px] border-[#F4B72A]",
        name: "QHT Hair Transplant Clinic",
        stats: [
            { value: "1,787", label: "posts" },
            { value: "92.2K", label: "followers" },
            { value: "87", label: "following" },
        ],
        description: (
            <>
                Medical &amp; health
                <br />
                Premium Hair Transplant Experts Since 2011
                <br />
                Natural, High-Density Results • Celebrity Choice
                <br />
                QHT Clinic | LA unit of QHT
            </>
        ),
        link: "wa.me/919084723085 and 3 more",
        footer: (
            <>
                <span>@ qhtclinic</span>
                <span>◉ QHT CLINIC</span>
            </>
        ),
    },
    points: [
        {
            title: "Big numbers. Bigger promises.",
            text: "“Thousands of successful procedures. Trusted by lakhs of patients.”",
        },
        {
            title: "Every clinic claims expertise.",
            text: "Advanced technology. Experienced doctors. Natural-looking results.",
        },
        {
            title: "Different names. Same story.",
            text: "Results, reviews, centres and statistics, with little that feels ownable.",
        },
    ],
};


const assureCard: ComparisonCardProps = {
    label: "Assure today",
    labelClassName: "bg-[#242B73] text-[#F4B72A]",
    cardClassName:
        "border-[#DCE1F0] bg-[#293789] shadow-[0_5px_20px_rgba(20,30,80,0.15)]",
    profile: {
        logo: "/images/assure-logo.png",
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
            </>
        ),
        link: "youtube.be/YcWkNJD_F04?si=... and 2 more",
    },
    points: [
        {
            title: "14 centres. 2 countries.",
            text: "A powerful network, but its scale isn’t yet translated into a distinct brand story.",
        },
        {
            title: "Doctor-led, but not positioned like one.",
            text: "The strongest differentiator gets lost among familiar category claims.",
        },
        {
            title: "Proprietary techniques, under-owned.",
            text: "UHDHT. UFME. DSHI. Distinctive expertise that can become Assure’s signature.",
        },
    ],
};

export default function CareerSection() {
    return (
        <section className="relative mt-30 lg:pt-60 -z-50 bg-white pb-20">
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
                        <ComparisonCard {...themCard} />
                        <ComparisonCard {...themCard2} />
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
        <div className="flex max-w-66xl mx-auto text-center mx-auto flex-col justify-center lg:pb-20">
            <p className="mb-4   text-[18px] font-medium text-[#18244F] sm:text-[20px]">
                It Began With A Simple Belief:
            </p>

            <h2 className="text-[38px]   font-bold leading-[1.12] tracking-[-1.5px] text-[#18244F] sm:text-[48px] lg:text-[42px] xl:text-[48px]">
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

                {/* Points */}
                <div
                    className={`flex flex-1 flex-col justify-between space-y-6 px-7 py-8 ${dark ? "text-white" : "text-[#222C50]"
                        }`}
                >
                    {points.map((point) => (
                        <Point
                            key={point.title}
                            title={point.title}
                            text={point.text}
                            dark={dark}
                        />
                    ))}
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
            <p className="mt-2 text-[11px] leading-[1.4] text-[#4E566A]">
                {profile.description}
            </p>

            {/* Link */}
            <p className="mt-2 truncate text-[11px] font-semibold text-[#252525]">
                🔗 {profile.link}
            </p>

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
    title,
    text,
    dark = false,
}: {
    title: string;
    text: string;
    dark?: boolean;
}) {
    return (
        <div className="flex gap-3">
            {/* Check */}
            <div
                className={`mt-1 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full ${dark ? "bg-white" : "bg-[#29335F]"
                    }`}
            >
                <span
                    className={`text-[10px] font-bold ${dark ? "text-[#29335F]" : "text-white"
                        }`}
                >
                    ✓
                </span>
            </div>

            {/* Content */}
            <div>
                <h4
                    className={`text-base font-bold leading-[1.4] ${dark ? "text-white" : "text-[#222C50]"
                        }`}
                >
                    {title}
                </h4>

                <p
                    className={`mt-1 text-sm leading-[1.55] ${dark ? "text-white/90" : "text-[#222C50]"
                        }`}
                >
                    {text}
                </p>
            </div>
        </div>
    );
}