"use client";

import { useState } from "react";
import Image from "next/image";
import { feed } from "@/lib/data/site";
import { channelIcons } from "@/lib/data/media";
import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";

type Channel = (typeof feed.channels)[number];

/** Ground tints for the audit face, one per channel. */
const AUDIT_TINT: Record<Channel["id"], string> = {
  youtube: "bg-[linear-gradient(178deg,#FDEFEF_0%,#FAE2E4_100%)]",
  instagram: "bg-[linear-gradient(178deg,#FEF7ED_0%,#FCEDDD_100%)]",
  linkedin: "bg-[linear-gradient(178deg,#EEF5FE_0%,#E3EDFB_100%)]",
};

function GapIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className="mt-[0.15em] h-[1.05em] w-[1.05em] shrink-0 text-[#E5372F]"
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      <path
        d="m7 7 6 6M13 7l-6 6"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** The pitch — the face the comp shows at rest. */
function PitchFace({ channel }: { channel: Channel }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between overflow-hidden rounded-[clamp(14px,1.46vw,28px)] bg-white/[0.07] px-[clamp(1rem,1.6vw,1.9rem)] pb-[clamp(1.5rem,2.6vw,3.1rem)] pt-[clamp(1.5rem,3.4vw,4.06rem)] text-center ring-1 ring-inset ring-white/[0.16] [backface-visibility:hidden]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[46%] aspect-square w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 opacity-0 blur-3xl transition-opacity duration-500 ease-out group-hover:opacity-100"
      />

      <h3 className="relative text-[clamp(1rem,1.46vw,1.75rem)] font-bold text-white">
        {channel.name}
      </h3>

      <Image
        src={channelIcons[channel.id]}
        alt=""
        aria-hidden="true"
        width={193}
        height={191}
        className="relative w-[clamp(3.5rem,10.05vw,12.06rem)]"
      />

      <p className="relative max-w-[30ch] text-[clamp(0.625rem,0.78vw,0.94rem)] leading-[1.7] text-white/70">
        {channel.body}
      </p>
    </div>
  );
}

/** The audit that backs the pitch up, revealed on the reverse. */
function AuditFace({ channel }: { channel: Channel }) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex flex-col overflow-hidden rounded-[clamp(14px,1.46vw,28px)] px-[clamp(1rem,1.66vw,2rem)] pb-[clamp(1rem,1.87vw,2.25rem)] pt-[clamp(1.1rem,1.87vw,2.25rem)] text-left ring-1 ring-inset ring-white/60 [backface-visibility:hidden] [transform:rotateY(180deg)]",
        AUDIT_TINT[channel.id],
      )}
    >
      <div className="flex items-center gap-[clamp(0.4rem,0.6vw,0.72rem)]">
        <Image
          src={channelIcons[channel.id]}
          alt=""
          aria-hidden="true"
          width={193}
          height={191}
          className="w-[clamp(1.6rem,2.29vw,2.75rem)]"
        />
        <span className="truncate text-[clamp(0.6875rem,0.94vw,1.125rem)] font-semibold text-ink">
          {channel.handle}
        </span>
      </div>

      <dl className="mt-[clamp(1.1rem,2.4vw,2.9rem)] grid grid-cols-2 gap-x-[clamp(0.5rem,1vw,1.2rem)] gap-y-[clamp(0.9rem,1.87vw,2.25rem)]">
        {[...channel.stats, channel.highlight].map((stat, index) => (
          // Column-reverse keeps the term before its value in the DOM while the
          // comp shows the number on top, so nothing is announced twice.
          <div
            key={stat.label}
            className={cn("flex flex-col-reverse", index === 2 && "col-span-2")}
          >
            <dt className="mt-[0.5em] text-[clamp(0.5rem,0.73vw,0.875rem)] text-ink-muted">
              {stat.label}
            </dt>
            <dd className="m-0 text-[clamp(1.15rem,2.08vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em] text-ink">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>

      <ul className="mt-[clamp(1.25rem,2.6vw,3.1rem)] flex flex-col gap-[clamp(0.85rem,1.66vw,2rem)]">
        {channel.gaps.map((gap) => (
          <li
            key={gap}
            className="flex gap-[clamp(0.45rem,0.73vw,0.875rem)] text-[clamp(0.5625rem,0.83vw,1rem)] leading-[1.6] text-ink-soft"
          >
            <GapIcon />
            <span>{gap}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  // Hover covers pointers; this covers touch, where there is no hover at all.
  const [pinned, setPinned] = useState(false);

  return (
    <li className="group relative [perspective:1600px]">
      <div
        className={cn(
          "relative aspect-[412/560] w-full transition-transform sm:aspect-[412/654] duration-[750ms] ease-[cubic-bezier(0.22,0.61,0.36,1)] [transform-style:preserve-3d]",
          "group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]",
          pinned && "[transform:rotateY(180deg)]",
        )}
      >
        <PitchFace channel={channel} />
        <AuditFace channel={channel} />
      </div>

      {/* One real control over the whole card: it gives the flip to keyboard
          and touch without wrapping the card's headings inside a button. */}
      <button
        type="button"
        onClick={() => setPinned((value) => !value)}
        aria-pressed={pinned}
        aria-label={
          pinned
            ? `Hide the ${channel.name} channel audit`
            : `Show the ${channel.name} channel audit`
        }
        className="absolute inset-0 z-10 rounded-[clamp(14px,1.46vw,28px)]"
      />
    </li>
  );
}

export function FeedSection() {
  return (
    <section aria-labelledby="feed-heading" className="bg-paper">
      <div className="container-wide">
        <div className="relative isolate overflow-hidden rounded-[clamp(18px,2.5vw,48px)] px-[clamp(1.25rem,3vw,4rem)] pb-[clamp(2.5rem,9.375vw,11.25rem)] pt-[clamp(2rem,6.77vw,8.125rem)]">
          {/* Deep navy ground with the comp's broad light sweep on the left. */}
          <div aria-hidden="true" className="absolute inset-0 -z-20 bg-[#2A3465]" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(78%_62%_at_2%_52%,#A9B2FF_0%,#7E8CE0_26%,#4E5BA6_54%,rgba(42,52,101,0)_78%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-20 bg-[radial-gradient(90%_80%_at_88%_8%,#232C5E_0%,rgba(35,44,94,0)_60%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-[0.13] [background-image:repeating-linear-gradient(74deg,rgba(255,255,255,0.85)_0_1px,transparent_1px_18px)]"
          />

          <div className="relative flex flex-col items-center text-center">
            <Eyebrow tone="dark">{feed.eyebrow}</Eyebrow>
            <h2
              id="feed-heading"
              className="mt-[clamp(0.75rem,1.15vw,1.375rem)] text-[length:var(--text-h2)] font-extrabold leading-[1.1] tracking-[-0.025em] text-white"
            >
              {feed.heading}{" "}
              <span className="font-semibold text-white/45">{feed.headingConnector}</span>{" "}
              {feed.headingTail}
            </h2>
          </div>

          {/* Comp cards are 412 x 654 with an 88px gutter inside a 1404 row. */}
          <ul className="relative mx-auto mt-[clamp(2.25rem,8.6vw,10.3rem)] grid w-full max-w-[1404px] gap-[clamp(1rem,4.58vw,5.5rem)] sm:grid-cols-2 lg:grid-cols-3">
            {feed.channels.map((channel) => (
              <ChannelCard key={channel.id} channel={channel} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
