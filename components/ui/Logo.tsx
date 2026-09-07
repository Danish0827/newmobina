import { cn } from "@/lib/utils/cn";
import { site } from "@/lib/data/site";

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
      <svg
        viewBox="0 0 56 56"
        role="img"
        aria-label={`${site.name} logo`}
        className="h-[1.55em] w-[1.55em] shrink-0"
      >
        <defs>
          <linearGradient id="assure-mark-left" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#F7B267" />
            <stop offset="100%" stopColor="#F59B4A" />
          </linearGradient>
          <linearGradient id="assure-mark-right" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#F0873A" />
            <stop offset="100%" stopColor="#D9541F" />
          </linearGradient>
        </defs>
        {/* Left face of the ascending mark */}
        <path
          d="M27.4 3.6 6.6 41.2a3.4 3.4 0 0 0 2.9 5.1h7.7L28.9 24 27.4 3.6Z"
          fill="url(#assure-mark-left)"
        />
        {/* Right face, folded slightly darker */}
        <path
          d="M28.6 3.6 49.4 41.2a3.4 3.4 0 0 1-2.9 5.1h-7.7L27.1 24l1.5-20.4Z"
          fill="url(#assure-mark-right)"
        />
        {/* Inner counter that reads as the crossbar of the A */}
        <path d="M28 20.5 38.1 39H17.9L28 20.5Z" fill="#FFFFFF" />
        {/* Footer plate carrying the ASSURE micro-wordmark */}
        <rect x="12.6" y="41.4" width="30.8" height="10.4" rx="2.2" fill="#151515" />
        <text
          x="28"
          y="48.9"
          textAnchor="middle"
          fill="#FFFFFF"
          fontSize="6.4"
          letterSpacing="0.9"
          fontFamily="var(--font-display)"
          fontWeight="600"
        >
          ASSURE
        </text>
      </svg>

      {variant === "full" ? (
        <span className="flex flex-col leading-none">
          <span
            className="text-[1.72em] font-bold tracking-[-0.015em]"
            style={{ color: wordColor }}
          >
            {site.name}
          </span>
          <span
            className="mt-[0.28em] text-[0.62em] font-normal tracking-[0.02em]"
            style={{ color: subColor }}
          >
            {site.tagline}
          </span>
        </span>
      ) : null}
    </span>
  );
}
