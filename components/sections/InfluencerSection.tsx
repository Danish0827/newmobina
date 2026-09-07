"use client";

import { useCallback, useRef, useState } from "react";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { influencer } from "@/lib/data/site";
import { influencerClips } from "@/lib/data/media";
import { cn } from "@/lib/utils/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlatformIcon } from "@/components/ui/PlatformIcon";
import { MediaTile } from "@/components/ui/MediaTile";
import { CarouselButton } from "@/components/ui/CarouselButton";

function EyeIcon() {
  return (
    <svg viewBox="0 0 20 14" aria-hidden="true" className="h-[0.85em] w-[1.2em]">
      <path
        d="M1 7s3.2-5.4 9-5.4S19 7 19 7s-3.2 5.4-9 5.4S1 7 1 7Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="10" cy="7" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type Card = (typeof influencer.cards)[number];

/** Comp card: 339 x 563 with a solid darker plate carrying the numbers. */
function CampaignCard({ card, index }: { card: Card; index: number }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[clamp(8px,0.83vw,16px)] bg-placeholder">
      <MediaTile
        kind="youtube"
        clip={influencerClips[index % influencerClips.length]}
        sizes="(max-width: 480px) 74vw, (max-width: 768px) 52vw, (max-width: 1280px) 24vw, 19vw"
        className="aspect-[339/448] w-full"
      >
        <span className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-[clamp(0.4rem,0.62vw,0.75rem)]">
          <PlatformIcon
            platform={card.platform}
            className="w-[clamp(1.1rem,1.46vw,1.75rem)] rounded-[0.28em] shadow-[0_4px_10px_-4px_rgba(0,0,0,0.5)]"
          />
          <span className="flex items-center gap-[0.45em] rounded-full bg-black/45 px-[0.7em] py-[0.32em] text-[clamp(0.4rem,0.52vw,0.625rem)] font-medium text-white">
            <EyeIcon />
            {card.views}
          </span>
        </span>
      </MediaTile>

      <div className="flex flex-1 flex-col justify-center bg-[#787878] px-[clamp(0.75rem,1.15vw,1.4rem)] py-[clamp(0.75rem,1.25vw,1.5rem)]">
        <p className="text-[clamp(0.8125rem,1.15vw,1.375rem)] font-bold leading-tight text-white">
          {card.value}
        </p>
        <p className="mt-[0.3em] text-[clamp(0.5rem,0.62vw,0.75rem)] text-white/70">
          {card.label}
        </p>
      </div>
    </article>
  );
}

/** The 110-influencers circle branching into the macro/micro split. */
function BranchConnector() {
  return (
    <svg
      viewBox="0 0 120 200"
      aria-hidden="true"
      className="hidden h-[clamp(6rem,10vw,12rem)] w-[clamp(2.5rem,4.7vw,5.6rem)] text-line lg:block"
    >
      <path
        d="M0 100h40a20 20 0 0 0 20-20V40a20 20 0 0 1 20-20h40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M0 100h40a20 20 0 0 1 20 20v40a20 20 0 0 0 20 20h40"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}

export function InfluencerSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });

  const sync = useCallback((swiper: SwiperClass) => {
    setEdges({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  }, []);

  return (
    <section
      aria-labelledby="influencer-heading"
      className="overflow-x-clip bg-paper pb-[clamp(3.5rem,9vw,10.8rem)] pt-[clamp(3rem,10.4vw,12.5rem)]"
    >
      <div className="reveal container-page">
        <SectionHeading eyebrow={influencer.eyebrow}>
          <span id="influencer-heading">{influencer.heading}</span>
        </SectionHeading>
      </div>

      {/* Five across at desktop, and a swipeable rail below it rather than the
          tall single-file stack the grid used to collapse into. */}
      <div className="relative mt-[clamp(2rem,9.4vw,11.3rem)]">
        <Swiper
          modules={[A11y, Keyboard]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            sync(swiper);
          }}
          onSlideChange={sync}
          onResize={sync}
          slidesPerView={1.35}
          spaceBetween={14}
          speed={520}
          grabCursor
          watchOverflow
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{
            enabled: true,
            containerMessage: "Influencer campaign results",
            prevSlideMessage: "Previous campaign card",
            nextSlideMessage: "Next campaign card",
          }}
          breakpoints={{
            480: { slidesPerView: 1.9, spaceBetween: 16 },
            768: { slidesPerView: 3.2, spaceBetween: 20 },
            1024: { slidesPerView: 4.2, spaceBetween: 24 },
            1280: { slidesPerView: 5, spaceBetween: 30 },
          }}
          className="!px-[var(--gutter-wide)]"
        >
          {influencer.cards.map((card, index) => (
            <SwiperSlide key={card.id} className="!h-auto">
              <CampaignCard card={card} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="mt-[clamp(1.25rem,2.1vw,2.5rem)] flex justify-center gap-[clamp(0.5rem,0.83vw,1rem)] xl:hidden">
          <CarouselButton
            direction="prev"
            label="Previous campaign card"
            onClick={() => swiperRef.current?.slidePrev()}
            disabled={edges.isBeginning}
          />
          <CarouselButton
            direction="next"
            label="Next campaign card"
            onClick={() => swiperRef.current?.slideNext()}
            disabled={edges.isEnd}
          />
        </div>
      </div>

      {/* Campaign shape: three headline metrics branching into the creator mix. */}
      <div className="container-page mt-[clamp(2.5rem,7.3vw,8.75rem)]">
        <div className="flex flex-col items-center justify-center gap-[clamp(1.5rem,2.6vw,3.1rem)] lg:flex-row">
          <ul className="flex items-center gap-[clamp(0.5rem,1.4vw,1.75rem)]">
            {influencer.metrics.map((metric, index) => (
              <li
                key={metric.label}
                className="flex items-center gap-[clamp(0.5rem,1.4vw,1.75rem)]"
              >
                <div className="grid aspect-square w-[clamp(5rem,13.9vw,16.7rem)] place-items-center rounded-full border border-line text-center">
                  <div>
                    <p className="text-[clamp(1.5rem,3.6vw,4.3rem)] font-extrabold leading-none tracking-[-0.03em] text-ink">
                      {metric.value}
                    </p>
                    <p className="mt-[0.55em] text-[clamp(0.45rem,0.68vw,0.82rem)] uppercase tracking-[0.16em] text-ink-muted">
                      {metric.label}
                    </p>
                  </div>
                </div>
                {index < influencer.metrics.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="h-px w-[clamp(0.5rem,1.9vw,2.25rem)] bg-line"
                  />
                ) : null}
              </li>
            ))}
          </ul>

          <BranchConnector />

          <ul
            className={cn(
              "flex gap-[clamp(1.5rem,2.6vw,3.1rem)]",
              "flex-row lg:flex-col lg:gap-[clamp(1.5rem,3.4vw,4.1rem)]",
            )}
          >
            {influencer.breakdown.map((item) => (
              <li key={item.label}>
                <p className="text-[clamp(1.25rem,2.08vw,2.5rem)] font-extrabold leading-none tracking-[-0.02em] text-ink">
                  {item.value}
                </p>
                <p className="mt-[0.45em] text-[clamp(0.5625rem,0.73vw,0.875rem)] uppercase tracking-[0.14em] text-ink-soft">
                  {item.label}
                </p>
                <p className="mt-[0.3em] text-[clamp(0.5rem,0.62vw,0.75rem)] uppercase tracking-[0.12em] text-ink-muted/70">
                  {item.note}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="reveal container-page mt-[clamp(2.5rem,8.3vw,10rem)] text-center">
        <p className="text-[clamp(0.875rem,1.15vw,1.375rem)] font-semibold text-ink-muted">
          {influencer.closingLead[0]}
          <span className="inline-block w-[1.4em]" />
          {influencer.closingLead[1]}
        </p>
        <p className="mt-[clamp(0.5rem,0.83vw,1rem)] text-[clamp(0.9375rem,1.25vw,1.5rem)] font-bold text-ink">
          {influencer.closingLine}{" "}
          <span className="text-gold">{influencer.closingAccent}</span>
        </p>
      </div>
    </section>
  );
}
