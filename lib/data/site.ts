/**
 * Copy inventory transcribed from the Figma frame "Assure".
 * The deck still carries placeholder strings ("Content to be added.") in two
 * places; they are reproduced verbatim so the build stays faithful to the comp.
 */

export const site = {
  name: "Assure",
  tagline: "Hair & Skin Expert",
  deckLabel: "Pitch Deck",
} as const;

export const hero = {
  headline: ["Your Best Hair", "Days Are "],
  headlineAccent: "Ahead.",
  standfirst: "Natural-looking hair transplants, planned and performed by Doctors.",
} as const;

export const belief = {
  kicker: "It Began With A Simple Belief:",
  heading: ["What Is Lost Can", "Find Its Way Back."],
  body: "Assure has built India's largest doctor-led hair transplant network, but no single line owns that story across 14 centers and 2 countries.",
  columns: [
    {
      id: "them",
      label: "Them",
      tone: "muted" as const,
      points: [
        "Content to be added. Content to be added. Content to be added. Content to be added.",
        "Content to be added. Content to be added. Content to be added. Content to be added.",
        "Content to be added. Content to be added. Content to be added. Content to be added.",
      ],
    },
    {
      id: "assure",
      label: "Assure today",
      tone: "brand" as const,
      points: [
        "Content to be added. Content to be added. Content to be added. Content to be added.",
        "Content to be added. Content to be added. Content to be added. Content to be added.",
        "Content to be added. Content to be added. Content to be added. Content to be added.",
      ],
    },
  ],
} as const;

export const feed = {
  eyebrow: "Social Media",
  heading: "The Feed",
  headingConnector: "vs",
  headingTail: "The Full Story",
  /**
   * Each channel card carries two faces: the pitch on the front, and the audit
   * that backs it up on the reverse. Figures transcribed from the audit comp.
   */
  channels: [
    {
      id: "youtube" as const,
      name: "YouTube",
      body: "Long-form, Shorts, and thumbnails built to hold attention and drive watch time",
      handle: "@AssureClinic",
      stats: [
        { value: "1,380", label: "Subscribers" },
        { value: "431", label: "Videos" },
      ],
      highlight: { value: "86 - 2.4k", label: "Typical video views" },
      gaps: [
        "No fixed weekly calendar; no Shorts made from 431 existing videos.",
        "High output, weak conversion: about 3 subscribers per video, no series or thumbnail recall.",
      ],
    },
    {
      id: "instagram" as const,
      name: "Instagram",
      body: "Reels, carousels, and static posts designed for reach, saves, and feed consistency",
      handle: "@assure_clinic",
      stats: [
        { value: "24,300", label: "Followers" },
        { value: "885", label: "Posts" },
      ],
      highlight: { value: "1.7k - 4.2k", label: "Typical reel views" },
      gaps: [
        "4 clashing visual styles, no fixed weekly rhythm. WhatsApp screenshots still stand in for real testimonials.",
        "The 60.5K-view reel was a one-off; no repeatable format was built around it.",
      ],
    },
    {
      id: "linkedin" as const,
      name: "Linkedin",
      body: "Native video, document carousels, and static posts built for authority and engagement.",
      handle: "Assure Clinic",
      stats: [
        { value: "1,177", label: "Followers" },
        { value: "+5.53%", label: "Followers in 90 days" },
      ],
      highlight: { value: "0.10%", label: "Typical post engagement" },
      gaps: [
        "Only 0.10% engagement on a typical post: content is mostly repurposed Instagram material.",
        "Not built for a professional audience; no real founder voice from Dr. Abhishek Pilani.",
      ],
    },
  ],
} as const;

export const creativeSamples = {
  eyebrow: "Social Media",
  heading: "Creative Samples",
  currentLabel: "Current",
  newLabel: "New",
  sample: {
    norwoodScale: "Norwood Scale: 7",
    norwoodAchieved: "Norwood Achieved: 1",
    graftCount: "Graft Count: 7000",
    timeFrame: "Time Frame: 12 Months",
  },
} as const;

export const founder = {
  eyebrow: "Founder Social Audit",
  heading: "Doctor-Led Isn't Just a",
  headingMuted: "Claim",
  profiles: [
    {
      id: "abhishek-pilani",
      name: "Dr. Abhishek Pilani",
      src: "/images/image1.webp",
      role: "Co-Founder, Chief Surgeon",
      stats: [
        { value: "46k", label: "Followers" },
        { value: "46k", label: "Followers" },
      ],
      currentPresence:
        "Strong third-party credibility (BeerBiceps/Ranveer Show feature, ET Edge 40 Under 40, LinkedIn recognition), but this authority isn't being repurposed onto owned channels",
      opportunity:
        "Clip and own this credibility, podcast soundbites, LinkedIn thought-leadership, myth-busting reels in his own voice",
      channelStats: [
        { value: "46k", label: "Followers", trend: "down" as const },
        { value: "46k", label: "Followers", trend: "up" as const },
        { value: "46k", label: "Followers", trend: "down" as const },
      ],
    },
    // The comp shows a second panel peeking in from the right, still on the
    // deck's placeholder copy. Reproduced as a slot rather than invented detail.
    {
      id: "profile-slot-2",
      name: "Content to be added",
      role: "Content to be added",
      src: "/images/image2.webp",
      stats: [
        { value: "46k", label: "Followers" },
        { value: "46k", label: "Followers" },
      ],
      currentPresence: "Content to be added. Content to be added. Content to be added.",
      opportunity: "Content to be added. Content to be added. Content to be added.",
      channelStats: [
        { value: "46k", label: "Followers", trend: "up" as const },
        { value: "46k", label: "Followers", trend: "down" as const },
        { value: "46k", label: "Followers", trend: "up" as const },
      ],
    },
  ],
} as const;

export const influencer = {
  eyebrow: "Influencer Marketing Campaign",
  heading: "Influencing Your Assurance",
  cards: [
    { id: 1, platform: "instagram" as const, views: "1.2M Views", value: "8M - 12M+", label: "Views" },
    { id: 2, platform: "instagram" as const, views: "1.2M Views", value: "5M - 7M+", label: "Reach" },
    { id: 3, platform: "youtube" as const, views: "1.2M Views", value: "300K - 450K+", label: "Engagement" },
    { id: 4, platform: "instagram" as const, views: "1.2M Views", value: "60K - 120K+", label: "Profile Visits" },
    { id: 5, platform: "youtube" as const, views: "1.2M Views", value: "1,500 - 3,000+", label: "High-Intent Actions" },
  ],
  metrics: [
    { value: "60", label: "Days" },
    { value: "11", label: "Cities" },
    { value: "110", label: "Influencers" },
  ],
  breakdown: [
    { value: "22", label: "Macro Creators", note: "2 per city" },
    { value: "88", label: "Micro Creators", note: "8 per city" },
  ],
  closingLead: ["Built For Trust.", "Designed For Action."],
  closingLine: "110 Local Voices Driving Real Consideration For",
  closingAccent: "Assure.",
} as const;

export const growth = {
  eyebrow: "Pay-Per-Click",
  heading: ["Helping", "Growth Find Its", "Way Back."],
  body: "Same proof. Three formats. Built for how people actually scroll.",
} as const;

export const closing = {
  lines: ["What Began As One Belief", "Must Now Become One Brand"],
  accent: "The World Remembers.",
  cta: { label: "Work With Us", href: "#contact" },
  blurb: "Content To Be Added Content To Be Added Content To Be Added",
  contact: {
    heading: "Contact",
    email: "info@healthus.ai",
    phone: "+91 70210 00210",
    address:
      "5th Floor, Comet Building, Office Nos. 505, 506, 507, 508, Gurunanak Rd, opposite Bandra Talao, Bandra West, Mumbai, Maharashtra 400050",
  },
  socials: [
    { id: "linkedin" as const, label: "LinkedIn", href: "#" },
    { id: "instagram" as const, label: "Instagram", href: "#" },
    { id: "facebook" as const, label: "Facebook", href: "#" },
  ],
} as const;
