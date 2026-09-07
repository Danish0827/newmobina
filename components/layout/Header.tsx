"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";
import { Logo } from "@/components/ui/Logo";

/**
 * The comp's header is a single rule-under lockup: mark, wordmark and the deck
 * label. There is no navigation in the design, so none is invented here — the
 * only addition is the sticky behaviour and the condensed state it fades into.
 */
export function Header() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,box-shadow] duration-500 ease-out",
        condensed
          ? "bg-paper-hero shadow-[0_1px_0_0_rgba(26,34,73,0.07)]"
          : "bg-transparent",
      )}
    >
      <div className="container-header">
        <div
          className={cn(
            "flex items-center justify-between border-b border-line transition-[padding,border-color] duration-500 ease-out",
            condensed
              ? "border-transparent py-[clamp(0.6rem,0.95vw,1.05rem)]"
              : "py-[clamp(0.85rem,1.72vw,2.06rem)]",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="text-[clamp(0.85rem,1.56vw,1.875rem)] transition-opacity duration-300 hover:opacity-80"
          >
            <Logo />
          </Link>

          <span className="text-[length:var(--text-small)] font-medium text-ink-muted/70">
            {site.deckLabel}
          </span>
        </div>
      </div>
    </header>
  );
}
