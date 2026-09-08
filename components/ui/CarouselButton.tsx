"use client";

import { useId } from "react";

import { cn } from "@/lib/utils/cn";

type CarouselButtonProps = {
  direction: "prev" | "next";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  /** `plain` is the arrow used across the deck; `brand` is the founder chevron. */
  tone?: "plain" | "brand";
  size?: "md" | "lg";
  className?: string;
  /** Lets Swiper's Navigation module bind to the element by selector. */
  hookClassName?: string;
  /** Replaces the default mark. Omit it and the button draws its own arrow. */
  icon?: React.ReactNode;
};

/** The mark the button falls back to when no `icon` is supplied. */
function DefaultArrow({ tone }: { tone: "plain" | "brand" }) {
  const isBrand = tone === "brand";
  // Per instance: several of these can be on screen at once, and a shared id
  // would leave every gradient resolving to whichever one rendered first.
  const gradientId = useId();
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[38%]">
      {isBrand ? (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0873A" />
            <stop offset="55%" stopColor="#E0407E" />
            <stop offset="100%" stopColor="#8B45D6" />
          </linearGradient>
        </defs>
      ) : null}
      <path
        d={isBrand ? "M9 5.5 16 12l-7 6.5" : "M4 12h14M13 6.5 18.5 12 13 17.5"}
        fill="none"
        stroke={isBrand ? `url(#${gradientId})` : "currentColor"}
        strokeWidth={isBrand ? 2.2 : 1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 ease-out group-enabled:group-hover:translate-x-[6%] motion-reduce:transition-none"
      />
    </svg>
  );
}

/**
 * The one previous/next control in the deck. Every carousel had grown its own
 * near-identical copy of this markup, arrow path and hover behaviour.
 */
export function CarouselButton({
  direction,
  label,
  onClick,
  disabled,
  tone = "plain",
  size = "md",
  className,
  hookClassName,
  icon,
}: CarouselButtonProps) {
  const isBrand = tone === "brand";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={cn(
        "group grid aspect-square place-items-center rounded-full border border-line bg-white",
        "transition-[background-color,border-color,transform] duration-300 ease-out",
        "hover:border-ink/25 hover:bg-shell disabled:cursor-not-allowed disabled:opacity-30",
        size === "lg"
          ? "w-[clamp(2.75rem,5.9vw,7.06rem)]"
          : "w-[clamp(2.75rem,3.2vw,3.5rem)]",
        !isBrand && "text-ink",
        direction === "prev" && "rotate-180",
        hookClassName,
        className,
      )}
    >
      {icon ?? <DefaultArrow tone={tone} />}
    </button>
  );
}
