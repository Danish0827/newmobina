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
import { YouTubeLoop } from "@/components/ui/YouTubeLoop";
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

/**
 * Comp card: 339 x 563. The clip runs the full height of it and the numbers
 * ride over the bottom on a scrim, rather than sitting on a plate beneath.
 */
function CampaignCard({ card, index }: { card: Card; index: number }) {
  return (
    <article className="relative h-full overflow-hidden rounded-[clamp(8px,0.83vw,16px)]">
      <YouTubeLoop
        clip={influencerClips[index % influencerClips.length]}
        sizes="(max-width: 480px) 74vw, (max-width: 768px) 52vw, (max-width: 1280px) 24vw, 19vw"
        className="aspect-[339/563] w-full"
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

        {/* Deep enough at the foot to hold the numbers legible over any frame
            the clip happens to be on, and fading out well before it reaches
            the face above. */}
        <span className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col bg-[linear-gradient(to_top,rgba(8,10,24,0.92)_0%,rgba(8,10,24,0.72)_38%,rgba(8,10,24,0.25)_70%,transparent_100%)] px-[clamp(0.75rem,1.15vw,1.4rem)] pb-[clamp(0.75rem,1.25vw,1.5rem)] pt-[clamp(2rem,3.6vw,4.3rem)] text-left">
          <span className="text-[clamp(0.8125rem,1.15vw,1.375rem)] font-bold leading-tight text-white [text-shadow:0_1px_10px_rgba(0,0,0,0.45)]">
            {card.value}
          </span>
          <span className="mt-[0.3em] text-[clamp(0.5rem,0.62vw,0.75rem)] text-white/75">
            {card.label}
          </span>
        </span>
      </YouTubeLoop>
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
      className="overflow-x-clip bg-paper pb-40 pt-10"
    >
      <div className="reveal container-page">
        <SectionHeading eyebrow={influencer.eyebrow}>
          <span id="influencer-heading">{influencer.heading}</span>
        </SectionHeading>
      </div>

      {/* Five across at desktop, and a swipeable rail below it rather than the
          tall single-file stack the grid used to collapse into. */}
      <div className="relative mt-16">
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
      <div className="container-page mt-40">
        <div className="flex flex-col items-center justify-center  lg:flex-row">
          <ul className="flex items-center pb-10 lg:pb-0">
            {influencer.metrics.map((metric, index) => (
              <li
                key={metric.label}
                className="flex items-center "
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
                    className="h-px w-10 lg:w-30 bg-line"
                  />
                ) : null}
              </li>
            ))}
          </ul>
          <BranchConnector />
          <ul
            className={cn(
              "flex ml-10 gap-[clamp(1.5rem,2.6vw,3.1rem)]",
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
        <p className="mt-[clamp(0.5rem,0.83vw,1rem)] text-2xl lg:text-4xl xl:text-5xl font-bold text-ink">
          {influencer.closingLine}{" "}
          <span className="text-gold">{influencer.closingAccent}</span>
        </p>
      </div>
    </section>
  );
}
