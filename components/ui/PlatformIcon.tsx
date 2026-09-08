"use client";

import { useId } from "react";
import { cn } from "@/lib/utils/cn";

export type PlatformId = "youtube" | "instagram" | "linkedin" | "facebook";

type PlatformIconProps = {
  platform: PlatformId;
  className?: string;
  /** `app` draws the rounded app tile used in the channel cards. */
  variant?: "app" | "glyph";
};

const LABELS: Record<PlatformId, string> = {
  youtube: "YouTube",
  instagram: "Instagram",
  linkedin: "LinkedIn",
  facebook: "Facebook",
};

/**
 * The comp uses the platforms' rounded app tiles. These are flat vector
 * rebuilds so nothing has to be rasterised or fetched at runtime.
 */
export function PlatformIcon({ platform, className, variant = "app" }: PlatformIconProps) {
  const rounded = variant === "app";
  // Several of these share a page, so the gradient ids have to be per instance
  // or every icon resolves its fill to whichever one rendered first.
  const uid = useId();
  const gid = (name: string) => `${name}-${uid}`;
  return (
    <svg
      viewBox="0 0 64 64"
      role="img"
      aria-label={LABELS[platform]}
      className={cn("block", className)}
    >
      <defs>
        <linearGradient id={gid("pi-ig")} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFC96B" />
          <stop offset="26%" stopColor="#F8703C" />
          <stop offset="58%" stopColor="#D92E7F" />
          <stop offset="100%" stopColor="#6A35D4" />
        </linearGradient>
        <linearGradient id={gid("pi-yt")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF4A4A" />
          <stop offset="100%" stopColor="#D80F0F" />
        </linearGradient>
        <linearGradient id={gid("pi-li")} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#3B9BE0" />
          <stop offset="100%" stopColor="#0A66C2" />
        </linearGradient>
        <linearGradient id={gid("pi-fb")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3B8BEE" />
          <stop offset="100%" stopColor="#0B5FD0" />
        </linearGradient>
      </defs>

      {platform === "youtube" ? (
        <>
          {rounded ? <rect width="64" height="64" rx="16" fill={`url(#${gid("pi-yt")})`} /> : null}
          {!rounded ? <rect y="12" width="64" height="40" rx="11" fill={`url(#${gid("pi-yt")})`} /> : null}
          <path d="M26 21.5 45 32 26 42.5V21.5Z" fill="#FFFFFF" />
        </>
      ) : null}

      {platform === "instagram" ? (
        <>
          <rect width="64" height="64" rx="16" fill={`url(#${gid("pi-ig")})`} />
          <rect
            x="15"
            y="15"
            width="34"
            height="34"
            rx="10.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="4"
          />
          <circle cx="32" cy="32" r="8.5" fill="none" stroke="#FFFFFF" strokeWidth="4" />
          <circle cx="42.6" cy="21.6" r="2.6" fill="#FFFFFF" />
        </>
      ) : null}

      {platform === "linkedin" ? (
        <>
          <rect width="64" height="64" rx="16" fill={`url(#${gid("pi-li")})`} />
          <circle cx="21" cy="21.5" r="4.4" fill="#FFFFFF" />
          <rect x="16.8" y="28" width="8.4" height="20" rx="1.4" fill="#FFFFFF" />
          <path
            d="M30 28h8v2.9c1.5-2.2 4-3.4 6.9-3.4 5.4 0 8.1 3.3 8.1 9.2V48h-8.4V37.9c0-2.6-1-4.2-3.3-4.2-2.1 0-3.3 1.4-3.3 4.2V48H30V28Z"
            fill="#FFFFFF"
          />
        </>
      ) : null}

      {platform === "facebook" ? (
        <>
          <rect width="64" height="64" rx="16" fill={`url(#${gid("pi-fb")})`} />
          <path
            d="M35.6 50V34.4h5.3l.8-6.2h-6.1v-3.9c0-1.8.5-3 3.1-3h3.3v-5.5c-.6-.1-2.5-.3-4.8-.3-4.8 0-8 2.9-8 8.2v4.5h-5.3v6.2h5.3V50h6.4Z"
            fill="#FFFFFF"
          />
        </>
      ) : null}
    </svg>
  );
}
