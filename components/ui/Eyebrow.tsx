import { cn } from "@/lib/utils/cn";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
  tone?: "light" | "dark";
};

/** Small letter-spaced label that sits above every section heading in the comp. */
export function Eyebrow({ children, className, tone = "light" }: EyebrowProps) {
  return (
    <p
      className={cn(
        "text-[length:var(--text-eyebrow)] font-medium uppercase tracking-[0.22em]",
        tone === "light" ? "text-ink-muted" : "text-white/55",
        className,
      )}
    >
      {children}
    </p>
  );
}
