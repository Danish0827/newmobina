import { cn } from "@/lib/utils/cn";
import { site } from "@/lib/data/site";
import Image from "next/image";

type LogoProps = {
  className?: string;
  /** `full` renders the mark plus the wordmark lockup; `mark` is the glyph only. */
  variant?: "full" | "mark";
  tone?: "ink" | "light";
};

/**
 * Vector rebuild of the Assure lockup: an ascending triangular mark with the
 * "ASSURE" footer plate, followed by the wordmark and its expert line.
 */
export function Logo({ className, variant = "full", tone = "ink" }: LogoProps) {
  const wordColor = tone === "ink" ? "#141414" : "#FFFFFF";
  const subColor = tone === "ink" ? "#3B3B3B" : "rgba(255,255,255,0.72)";

  return (
    <span className={cn("inline-flex items-center gap-[0.62em]", className)}>
      <Image src="/images/logo.png" alt={`${site.name} logo`} width={500} height={200} />
    </span>
  );
}
