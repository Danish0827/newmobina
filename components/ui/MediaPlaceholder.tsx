import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type MediaPlaceholderProps = {
  className?: string;
  /** Describes the slot; also becomes the alt text once `src` is supplied. */
  label: string;
  src?: string;
  /** Passed straight through to `next/image` when a source is present. */
  sizes?: string;
  priority?: boolean;
  children?: React.ReactNode;
};

/**
 * Several frames in the deck ship as flat grey plates rather than photography.
 * This renders that designed ground, and swaps to a real optimised image the
 * moment a `src` is provided — so filling the deck in is a data-only change.
 */
export function MediaPlaceholder({
  className,
  label,
  src,
  sizes = "(max-width: 768px) 100vw, 45vw",
  priority,
  children,
}: MediaPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[clamp(10px,1vw,18px)] bg-placeholder",
        className,
      )}
    >
      {src ? (
        <Image
          src={src}
          alt={label}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <span className="sr-only">{label}</span>
      )}
      {children}
    </div>
  );
}
