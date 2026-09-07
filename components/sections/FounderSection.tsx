"use client";

import { useCallback, useRef, useState } from "react";
import { A11y, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import { founder } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { CarouselButton } from "@/components/ui/CarouselButton";

type Profile = (typeof founder.profiles)[number];
type ChannelStat = Profile["channelStats"][number];

function TrendArrow({ up }: { up: boolean }) {
  return (
    <svg
      viewBox="0 0 16 12"
      aria-hidden="true"
      className={cn("h-[0.72em] w-[0.96em]", up ? "text-positive" : "text-negative")}
    >
      <path
        d={up ? "M1 10.5 6 5l3 3 6-6.5" : "M1 1.5 6 7l3-3 6 6.5"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={up ? "M11 1h4v4" : "M11 11h4V7"}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrendChip({ stat }: { stat: ChannelStat }) {
  const up = stat.trend === "up";
  return (
    <div className="flex flex-col items-center rounded-[clamp(8px,0.83vw,16px)] bg-white px-[clamp(0.4rem,1.15vw,1.4rem)] py-[clamp(0.5rem,0.83vw,1rem)] shadow-[0_18px_38px_-24px_rgba(26,34,73,0.55)]">
      <TrendArrow up={up} />
      <p
        className={cn(
          "mt-[0.15em] text-[clamp(1rem,1.87vw,2.25rem)] font-extrabold leading-none",
          up ? "text-positive" : "text-negative",
        )}
      >
        {stat.value}
      </p>
      <p className="mt-[0.4em] text-[clamp(0.5rem,0.62vw,0.75rem)] text-ink-muted">
        {stat.label}
      </p>
    </div>
  );
}

/** The oversized channel glyph ghosted into the right of the panel. */
function InstagramGhost() {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="pointer-events-none absolute right-[6%] top-1/2 -z-10 hidden w-[clamp(8rem,13.4vw,16.1rem)] -translate-y-1/2 text-ink opacity-[0.055] lg:block"
    >
      <rect
        x="8"
        y="8"
        width="48"
        height="48"
        rx="15"
        fill="none"
        stroke="currentColor"
        strokeWidth="4"
      />
      <circle cx="32" cy="32" r="12" fill="none" stroke="currentColor" strokeWidth="4" />
      <circle cx="46.5" cy="17.5" r="3.6" fill="currentColor" />
    </svg>
  );
}
/**
 * One audit panel.
 *
 * Desktop proportions come straight off the comp's 1479 x 731 panel: a 40.2%
 * portrait plate, a 5.7% gutter and a 43.9% text column, with the identity
 * card pulled back over the plate's edge and the channel chips straddling its
 * lower edge. Below `lg` the same pieces stack in reading order.
 */
function ProfilePanel({ profile }: { profile: Profile }) {
  return (
    <article className="relative isolate h-full overflow-hidden rounded-[clamp(12px,1.25vw,24px)] bg-[linear-gradient(104deg,#FEF7F4_0%,#FDF5F7_38%,#F8F4FD_72%,#F6F5FE_100%)] px-[5%] pb-[clamp(1.75rem,5.5vw,6.6rem)] pt-[clamp(1.75rem,4.2vw,5rem)] lg:px-[4%]">
      <InstagramGhost />

      <div className="flex flex-col gap-[clamp(1.5rem,3vw,3.6rem)] lg:flex-row lg:gap-[5.7%]">
        <div className="relative shrink-0 lg:w-[40.2%]">
          <MediaPlaceholder
          src={profile.src}
            label={profile.name + " portrait"}
            className="aspect-[595/573] rounded-[clamp(8px,0.83vw,16px)]"
            sizes="(max-width: 1024px) 90vw, 32vw"
          />
          <ul className="mt-[clamp(0.75rem,1.15vw,1.4rem)] grid grid-cols-3 gap-[clamp(0.4rem,1.67vw,2rem)] lg:absolute lg:inset-x-[6.5%] lg:bottom-0 lg:mt-0 lg:translate-y-[41.4%]">
            {profile.channelStats.map((stat, index) => (
              <li key={index}>
                <TrendChip stat={stat} />
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:w-[43.9%] lg:pt-[1.5%]">
          <div className="flex flex-wrap items-start justify-between gap-[clamp(1rem,1.9vw,2.25rem)] lg:flex-nowrap">
            <div className="flex shrink-0 items-center gap-[clamp(0.6rem,0.94vw,1.125rem)] rounded-[clamp(8px,0.83vw,16px)] bg-white px-[clamp(0.75rem,1.05vw,1.25rem)] py-[clamp(0.6rem,0.83vw,1rem)] shadow-[0_20px_44px_-30px_rgba(26,34,73,0.6)] lg:-ml-[17.6%]">
              <span className="grid aspect-square w-[clamp(2.25rem,3.4vw,4.1rem)] place-items-center rounded-full bg-placeholder ring-2 ring-orange/70 ring-offset-2 ring-offset-white" />
              <span className="flex flex-col">
                <span className="whitespace-nowrap text-[clamp(0.8125rem,1.04vw,1.25rem)] font-bold text-ink">
                  {profile.name}
                </span>
                <span className="mt-[0.2em] whitespace-nowrap text-[clamp(0.625rem,0.78vw,0.94rem)] text-ink-muted">
                  {profile.role}
                </span>
              </span>
            </div>

            <ul className="flex gap-[clamp(1.25rem,2.4vw,2.9rem)]">
              {profile.stats.map((stat, index) => (
                <li key={index} className="text-center">
                  <p className="text-[clamp(1.25rem,2.29vw,2.75rem)] font-extrabold leading-none text-ink">
                    {stat.value}
                  </p>
                  <p className="mt-[0.4em] text-[clamp(0.5625rem,0.68vw,0.82rem)] text-ink-muted">
                    {stat.label}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <dl className="mt-[clamp(1.5rem,3.4vw,4.1rem)] space-y-[clamp(1.25rem,2.4vw,2.9rem)]">
            {[
              { term: "Current Presence", detail: profile.currentPresence },
              { term: "Opportunity", detail: profile.opportunity },
            ].map((row) => (
              <div key={row.term}>
                <dt className="text-[length:var(--text-eyebrow)] font-medium uppercase tracking-[0.2em] text-ink-muted">
                  {row.term}
                </dt>
                <dd className="mt-[clamp(0.4rem,0.73vw,0.875rem)] text-[clamp(0.6875rem,0.83vw,1rem)] leading-[1.7] text-ink-soft">
                  {row.detail}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </article>
  );
}

export function FounderSection() {
  const swiperRef = useRef<SwiperClass | null>(null);
  const [edges, setEdges] = useState({ isBeginning: true, isEnd: false });
  const profiles = founder.profiles;

  const sync = useCallback((swiper: SwiperClass) => {
    setEdges({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
  }, []);

  return (
    <section
      aria-labelledby="founder-heading"
      className="overflow-x-clip bg-paper pb-[clamp(3rem,7.8vw,9.4rem)] pt-[clamp(3rem,10.4vw,12.5rem)]"
    >
      <div className="reveal container-page">
        <SectionHeading eyebrow={founder.eyebrow}>
          <span id="founder-heading">
            {founder.heading}{" "}
            <span className="text-ink-muted/55">{founder.headingMuted}</span>
          </span>
        </SectionHeading>
      </div>

      {/* The comp shows one audit at a time with the next just breaking the
          right edge, and a single forward control low against the panel. */}
      <div className="relative mt-[clamp(2rem,8.3vw,10rem)]">
        <Swiper
          modules={[A11y, Keyboard]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            sync(swiper);
          }}
          onSlideChange={sync}
          onResize={sync}
          slidesPerView={1}
          spaceBetween={16}
          speed={620}
          grabCursor
          watchOverflow
          keyboard={{ enabled: true, onlyInViewport: true }}
          a11y={{
            enabled: true,
            containerMessage: "Founder social audits",
            prevSlideMessage: "Previous founder audit",
            nextSlideMessage: "Next founder audit",
          }}
          breakpoints={{ 1024: { slidesPerView: "auto", spaceBetween: 0 } }}
          className="!px-[var(--gutter)] lg:!px-0"
        >
          {profiles.map((profile) => (
            <SwiperSlide
              key={profile.id}
              className="!h-auto lg:!ml-[4.84vw] lg:!w-[77.03vw]"
            >
              <ProfilePanel profile={profile} />
            </SwiperSlide>
          ))}
        </Swiper>

        {profiles.length > 1 ? (
          <>
            <div className="mt-[clamp(1.25rem,2.1vw,2.5rem)] flex justify-center gap-[clamp(0.5rem,0.83vw,1rem)] lg:hidden">
              <CarouselButton
                direction="prev"
                tone="brand"
                label="Previous founder audit"
                onClick={() => swiperRef.current?.slidePrev()}
                disabled={edges.isBeginning}
              />
              <CarouselButton
                direction="next"
                tone="brand"
                label="Next founder audit"
                onClick={() => swiperRef.current?.slideNext()}
                disabled={edges.isEnd}
              />
            </div>

            <CarouselButton
              direction="next"
              tone="brand"
              size="lg"
              label="Next founder audit"
              onClick={() => swiperRef.current?.slideNext()}
              disabled={edges.isEnd}
              className="absolute right-[2.6vw] top-[84.5%] z-20 hidden -translate-y-1/2 bg-white/90 hover:scale-105 motion-reduce:hover:scale-100 lg:grid"
            />
          </>
        ) : null}
      </div>
    </section>
  );
}
