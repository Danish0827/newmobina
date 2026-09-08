"use client";

import Image from "next/image";
import type { Transformation } from "@/lib/data/transformations";
import { cn } from "@/lib/utils/cn";

type TransformationShowcaseProps = {
  transformation: Transformation;
  /**
   * False while the deck is travelling and for a short beat after it lands;
   * the carousel flips it true once the card has settled, which starts the
   * reveal. See `REVEAL_DELAY` in BeforeAfterCarousel.
   */
  revealed: boolean;
  className?: string;
};

/**
 * The designated AFTER area.
 *
 * Pinned over the centred card and driven entirely by the settled index, so
 * the pairing can never drift from the before frame underneath it.
 *
 * The reveal is a single opacity transition — 0.3 while the deck moves, 1 once
 * it has landed. Deliberately one animation and not two: an entrance keyframe
 * on the inner frame used to run at the same time and the overlap read as a
 * flicker.
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
        "transition-opacity duration-[600ms] ease-out",
        revealed ? "opacity-100" : "opacity-30",
        className,
      )}
    >
      <div className="absolute inset-y-0 right-0 w-full overflow-hidden">
        <Image
          // Keyed so React swaps the element outright rather than mutating the
          // src of a decoded one, which flashed the previous frame.
          key={transformation.id}
          src={transformation.after}
          alt={`${transformation.name} — after treatment`}
          width={1000}
          height={1000}
          // sizes="(max-width: 640px) 64vw, (max-width: 1024px) 38vw, 20vw"
          // This sits over the centred card and is the hero's LCP element.
          priority
          className="h-full w-full object-cover"
          draggable={false}
        />
        {/* Soft seam between the two halves, as drawn in the comp. */}
        <div className="absolute inset-y-0 left-0 w-[14%] bg-gradient-to-r from-black/45 to-transparent" />
      </div>
    </div>
  );
}
