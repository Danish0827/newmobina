import { cn } from "@/lib/utils/cn";

type CarouselButtonProps = {
  direction: "prev" | "next";
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  tone?: "plain" | "brand";
  size?: "md" | "lg";
  className?: string;
  hookClassName?: string;
  icon?: React.ReactNode;
};

const GRADIENT_ID = "carousel-chevron-gradient";

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
      {icon}
    </button>
  );
}