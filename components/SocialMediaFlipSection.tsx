"use client";

import React from "react";
import Image from "next/image";

import { channelIcons } from "@/lib/data/media";

type Platform = "youtube" | "instagram" | "linkedin";

type SocialCard = {
  platform: Platform;
  title: string;
  handle: string;
  description: string;

  stats: {
    value: string;
    label: string;
    fullWidth?: boolean;
  }[];

  issues: string[];
};

const cards: SocialCard[] = [
  {
    platform: "youtube",
    title: "YouTube",
    handle: "@AssureClinic",
    description:
      "Long-form, Shorts, and thumbnails built to hold attention and drive watch time",

    stats: [
      {
        value: "1,380",
        label: "Subscribers",
      },
      {
        value: "431",
        label: "Videos",
      },
      {
        value: "86 - 2.4k",
        label: "Typical video views",
        fullWidth: true,
      },
    ],

    issues: [
      "No fixed weekly calendar; no Shorts made from 431 existing videos.",
      "High output, weak conversion: about 3 subscribers per video, no series or thumbnail recall.",
    ],
  },

  {
    platform: "instagram",
    title: "Instagram",
    handle: "@assure_clinic",
    description:
      "Reels, carousels, and static posts designed for reach, saves, and feed consistency",

    stats: [
      {
        value: "24,300",
        label: "Followers",
      },
      {
        value: "885",
        label: "Posts",
      },
      {
        value: "1.7k - 4.2k",
        label: "Typical reel views",
        fullWidth: true,
      },
    ],

    issues: [
      "4 clashing visual styles, no fixed weekly rhythm; WhatsApp screenshots still stand in for real testimonials.",
      "The 60.5K-view reel was a one-off; no repeatable format was built around it.",
    ],
  },

  {
    platform: "linkedin",
    title: "LinkedIn",
    handle: "Assure Clinic",
    description:
      "Native video, document carousels, and static posts built for authority and engagement.",

    stats: [
      {
        value: "1,177",
        label: "Followers",
      },
      {
        value: "+5.53%",
        label: "Followers in 90 days",
      },
      {
        value: "0.10%",
        label: "Typical post engagement",
        fullWidth: true,
      },
    ],

    issues: [
      "Only 0.10% engagement on a typical post; content is mostly repurposed Instagram material.",
      "Not built for a professional audience; no real founder voice from Dr. Abhishek Pilani.",
    ],
  },
];

/* =========================================================
   ICON
========================================================= */

function SocialIcon({
  className,
  platform,
  size = 100,
}: {
  className?: string;
  platform: Platform;
  size?: number;
}) {
  return (
    <Image
      src={channelIcons[platform]}
      alt=""
      aria-hidden="true"
      width={size}
      height={size}
      className={`shrink-0 ${className || ""}`}
      style={{ width: size, height: "auto" }}
    />
  );
}



/* =========================================================
   MAIN SECTION
========================================================= */

export default function SocialMediaFlipSection() {
  return (
    <section className="w-full bg-white px-4  sm:px-6 lg:px-10">
      <div className="social-section">

        {/* Background */}

        <div className="social-glow" />

        <div className="social-rays" />

        <div className="relative z-10">

          {/* Heading */}

          <div className="mb-10 text-center sm:mb-12 lg:mb-14">
            <p
              className="
                mb-4
                text-[10px]
                font-medium
                uppercase
                tracking-[0.35em]
                text-white/35
                sm:text-xs
              "
            >
              SOCIAL MEDIA
            </p>

            <h2
              className="
                text-[30px]
                font-bold
                leading-tight
                tracking-[-0.04em]
                text-white
                sm:text-[38px]
                lg:text-[42px]
              "
            >
              The Feed{" "}
              <span className="text-white/40">vs</span>{" "}
              The Full Story
            </h2>
          </div>

          {/* Cards */}

          <div className="container lg:px-24 mx-auto grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 lg:gap-7">
            {cards.map((card) => (
              <FlipCard
                key={card.platform}
                card={card}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

/* =========================================================
   FLIP CARD
   Reanimated-style:
   FRONT: 0 -> 180
   BACK: 180 -> 360
========================================================= */

function FlipCard({
  card,
}: {
  card: SocialCard;
}) {
  return (
    <div className="flip-card">

      <div className="flip-card-container">

        {/* ================================================
            FRONT
        ================================================= */}

        <div className="flip-face flip-front">

          <h3 className="text-[22px] font-bold tracking-[-0.02em] text-white sm:text-[24px]">
            {card.title}
          </h3>

          <div className="mt-14">
            <SocialIcon
              platform={card.platform}
              size={300}
              className="-mt-10"
            />
          </div>

          <p className="mt-auto max-w-[225px] pb-1 text-center text-[11px] leading-[1.65] text-white/75">
            {card.description}
          </p>

        </div>

        {/* ================================================
            BACK
        ================================================= */}

        <div className="flip-face flip-back">

          {/* Account */}

          <div className="flex items-center gap-3">

            <SocialIcon
              platform={card.platform}
              size={34}
            />

            <span className="text-[13px] font-medium text-[#182451]">
              {card.handle}
            </span>

          </div>

          {/* Stats */}

          <div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-6">

            {card.stats.map((stat) => (
              <div
                key={stat.label}
                className={stat.fullWidth ? "col-span-2" : ""}
              >
                <div className="text-[23px] font-bold leading-none tracking-[-0.045em] text-[#182451] sm:text-[24px]">
                  {stat.value}
                </div>

                <div className="mt-2 text-[10px] leading-tight text-[#182451]/55">
                  {stat.label}
                </div>
              </div>
            ))}

          </div>

          {/* Divider */}

          <div className="my-6 h-px w-full bg-[#182451]/10" />

          {/* Issues */}

          <div className="space-y-5">

            {card.issues.map((issue, index) => (
              <div
                key={index}
                className="flex gap-3"
              >
                <span
                  className="
                    mt-[2px]
                    flex
                    h-[14px]
                    w-[14px]
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-[#f22e36]
                    text-[10px]
                    font-bold
                    leading-none
                    text-white
                  "
                >
                  ×
                </span>

                <p className="text-[10.5px] leading-[1.55] text-[#172452] sm:text-[11px]">
                  {issue}
                </p>
              </div>
            ))}

          </div>

        </div>
      </div>
    </div>
  );
}