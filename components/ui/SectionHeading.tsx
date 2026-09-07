import { cn } from "@/lib/utils/cn";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  children: React.ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
  headingClassName?: string;
  /** Renders an `h3` instead of the default `h2` where the outline requires it. */
  as?: "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  children,
  align = "center",
  tone = "light",
  className,
  headingClassName,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <Tag
        className={cn(
          "text-[length:var(--text-h2)] font-extrabold leading-[1.1] tracking-[-0.02em] text-balance",
          eyebrow && "mt-[clamp(0.75rem,1.15vw,1.375rem)]",
          tone === "light" ? "text-ink" : "text-white",
          headingClassName,
        )}
      >
        {children}
      </Tag>
    </div>
  );
}
