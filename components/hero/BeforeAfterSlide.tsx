import Image from "next/image";
import type { Transformation } from "@/lib/data/transformations";
import { cn } from "@/lib/utils/cn";

type BeforeAfterSlideProps = {
  transformation: Transformation;
  /** Position in the set, used for the accessible name and for load priority. */
  index: number;
  total: number;
  eager?: boolean;
};

/**
 * A single carousel item. The slide always renders the *before* frame — the
 * matching *after* is revealed by the showcase that sits over the centred card.
 */
export function BeforeAfterSlide({
  transformation,
  index,
  total,
  eager = false,
}: BeforeAfterSlideProps) {
  return (
    <figure
      className={cn(
        "relative z-999 h-full w-full overflow-hidden rounded-[clamp(14px,1.35vw,26px)]",
        "bg-black shadow-[0_28px_60px_-34px_rgba(16,20,44,0.55)]",
      )}
    >
      <Image
        src={transformation.before}
        alt={`${transformation.name} — before treatment`}
        width={1000}
        height={1000}
        sizes="(max-width: 640px) 64vw, (max-width: 1024px) 38vw, 20vw"
        className="object-cover h-full"
        priority={eager}
        loading={eager ? undefined : "lazy"}
        draggable={false}
      />
      <figcaption className="sr-only">
        {`${transformation.name}, slide ${index + 1} of ${total}. Before treatment.`}
      </figcaption>
    </figure>
  );
}
