"use client";

import Image from "next/image";
import type { Transformation } from "@/lib/data/transformations";
import { cn } from "@/lib/utils/cn";

type TransformationShowcaseProps = {
  transformation: Transformation;
  /** Hidden while the deck is in motion so the reveal never trails the card. */
  revealed: boolean;
  className?: string;
};

/**
 * The designated AFTER area.
 *
 * It is pinned over the centred card and is driven entirely by the active
 * index: `transformation.after` is whatever the deck has landed on, so the
 * pairing can never drift from the before frame underneath it.
 */
export function TransformationShowcase({
  transformation,
  revealed,
  className,
}: TransformationShowcaseProps) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden rounded-[clamp(14px,1.35vw,26px)]",
        "transition-opacity duration-[420ms] ease-[cubic-bezier(0.22,0.61,0.36,1)]",
        revealed ? "opacity-100" : "opacity-0",
        className,
      )}
    >
      {/* AFTER half — crossfaded and keyed so each case animates in cleanly. */}
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden">
        <div
          key={transformation.id}
          className="absolute inset-0 motion-safe:animate-[showcase-in_700ms_cubic-bezier(0.22,0.61,0.36,1)_both]"
        >
          <Image
            src={transformation.after}
            alt={`${transformation.name} — after treatment`}
            width={1000}
            height={1000}
            sizes="(max-width: 640px) 64vw, (max-width: 1024px) 38vw, 20vw"
            // This sits over the centred card and is the hero's LCP element.
            priority
            className="object-cover h-full w-full"
            draggable={false}
          />
        </div>
        {/* Soft seam between the two halves, as drawn in the comp. */}
        <div className="absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-black/45 to-transparent" />
      </div>

    </div>
  );
}
