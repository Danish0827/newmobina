import Link from "next/link";
import { cn } from "@/lib/utils/cn";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export function CTAButton({ href, children, className }: CTAButtonProps) {
  return (
    <Link
      href={href}
      target="_blank"
      className={cn(
        "group inline-flex items-center justify-center rounded-full bg-ink-strong",
        "px-[clamp(1.5rem,2.4vw,2.75rem)] py-[clamp(0.75rem,1.05vw,1.15rem)]",
        "text-[length:var(--text-small)] font-semibold text-white",
        "transition-[transform,background-color,box-shadow] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:bg-brand-blue hover:shadow-[0_14px_34px_-16px_rgba(25,44,132,0.75)]",
        "active:translate-y-0 motion-reduce:hover:translate-y-0",
        className,
      )}
    >
      {children}
    </Link>
  );
}
