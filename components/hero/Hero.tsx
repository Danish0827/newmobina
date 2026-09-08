'use client'
import { hero } from "@/lib/data/site";
import { transformations } from "@/lib/data/transformations";
import { BeforeAfterCarousel } from "./BeforeAfterCarousel";
import Link from "next/link";
import { Logo } from "../ui/Logo";
import { site } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";
import { useEffect, useState } from "react";

export function Hero() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      aria-labelledby="hero-heading"
      className=" relative isolate overflow-x-clip pb-[clamp(3rem,5.2vw,6.5rem)] bg-[url('/images/hero-bg.png')] bg-cover bg-center bg-no-repeat"
    >
      <div className="container-header">
        <div
          className={cn(
            "flex items-center justify-between border-b border-line transition-[padding,border-color] duration-500 ease-out",
            condensed
              ? "border-transparent py-[clamp(0.6rem,0.95vw,1.05rem)]"
              : "py-3",
          )}
        >
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="text-[clamp(0.85rem,1.56vw,1.875rem)] transition-opacity duration-300 hover:opacity-80"
          >
           <Logo className="h-10 w-50 mt-2"  />
          </Link>

          <span className="text-[length:var(--text-small)] font-medium text-ink-muted/70">
            {site.deckLabel}
          </span>
        </div>
      </div>

      <div className="container-page">
        <div className="grid items-end gap-y-[clamp(1.5rem,2.4vw,2.75rem)] pt-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-x-[clamp(2rem,4vw,5rem)]">
          <h1
            id="hero-heading"
            className="text-[length:var(--text-display)] font-extrabold leading-[1.17] tracking-[-0.025em] text-ink"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
            <span className="text-gold">{hero.headlineAccent}</span>
          </h1>

          <p className="relative max-w-[34ch] border-l-2 border-gold pl-[clamp(0.875rem,1.15vw,1.375rem)] text-[length:var(--text-body)] font-medium leading-[1.55] text-ink lg:mb-[clamp(0.5rem,1.2vw,1.75rem)]">
            {hero.standfirst}
          </p>
        </div>
      </div>

      <div className="relative top-30 lg:top-60">
        <BeforeAfterCarousel transformations={transformations} />
      </div>
    </section>
  );
}
