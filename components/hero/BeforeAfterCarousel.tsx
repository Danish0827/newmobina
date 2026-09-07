"use client";

import { useEffect, useRef, useState } from "react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import type { Transformation } from "@/lib/data/transformations";
import { BeforeAfterSlide } from "./BeforeAfterSlide";
import { TransformationShowcase } from "./TransformationShowcase";
import { FAN_PERSPECTIVE } from "./carousel-geometry";
import { useFanLayout } from "./useFanLayout";
import { AUTOPLAY_PARAMS, useHeroAutoplay } from "./useHeroAutoplay";

type BeforeAfterCarouselProps = {
  transformations: Transformation[];
};

/**
 * Referentially stable so re-rendering on slide change never makes swiper/react
 * tear its modules down and rebuild them mid-transition.
 */
const KEYBOARD = { enabled: true, onlyInViewport: true } as const;
const A11Y = {
  enabled: true,
  containerMessage: "Hair transformation results",
  prevSlideMessage: "Previous transformation",
  nextSlideMessage: "Next transformation",
} as const;

export function BeforeAfterCarousel({ transformations }: BeforeAfterCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [settled, setSettled] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);

  const { layoutFan, syncTransition } = useFanLayout(swiperRef);
  const { speed, holdHandlers, swiperHandlers } = useHeroAutoplay(swiperRef);

  useEffect(() => {
    // The first reveal waits a beat after mount so it fades in rather than pops.
    const id = window.setTimeout(() => setSettled(true), 140);
    return () => window.clearTimeout(id);
  }, []);

  const activeTransformation = transformations[activeIndex] ?? transformations[0];

  // Swiper's loop shuffles slides between the two ends of the track. Repeating
  // the set once keeps that shuffle beyond ±4, where the fan has already faded
  // out, so the wrap is never visible on stage.
  const slides = [...transformations, ...transformations];

  return (
    <div
      {...holdHandlers}
      className="relative w-full [--card-h:calc(var(--card-w)*654/373)] [--card-w:min(54vw,230px)] [--fan-spread:0.86] sm:[--card-w:min(38vw,300px)] sm:[--fan-spread:0.88] lg:[--card-w:clamp(280px,19.43vw,373px)] lg:[--fan-spread:1]"
    >
      <div className="relative mx-auto flex justify-center">
        {/* Device shell — the pale frame the centred card sits inside. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 rounded-[clamp(22px,2.1vw,40px)] bg-shell shadow-[0_40px_90px_-56px_rgba(20,26,60,0.5)]"
          style={{
            width: "calc(var(--card-w) + (60 / 373) * var(--card-w))",
            height: "calc(var(--card-h) + (78 / 654) * var(--card-h))",
            marginTop: "calc((18 / 654) * var(--card-h))",
          }}
        />

        {/* Brand mark cresting the shell, as drawn in the comp. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 z-20 -translate-x-1/2"
          style={{
            bottom: "calc(100% - (58 / 654) * var(--card-h))",
            width: "calc((114 / 373) * var(--card-w))",
          }}
        >
          <svg viewBox="0 0 64 60" className="w-full">
            <defs>
              <linearGradient id="hero-mark-l" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0%" stopColor="#F7B267" />
                <stop offset="100%" stopColor="#F59B4A" />
              </linearGradient>
              <linearGradient id="hero-mark-r" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#F0873A" />
                <stop offset="100%" stopColor="#D9541F" />
              </linearGradient>
            </defs>
            <path d="M31.2 6 8.4 52h9.4L32.8 22 31.2 6Z" fill="url(#hero-mark-l)" />
            <path d="M32.8 6 55.6 52h-9.4L31.2 22 32.8 6Z" fill="url(#hero-mark-r)" />
            <path d="M32 26.5 44 52H20l12-25.5Z" fill="#EEEFF5" />
          </svg>
        </div>

        <Swiper
          modules={[A11y, Autoplay, Keyboard]}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            layoutFan(swiper);
          }}
          onProgress={layoutFan}
          onResize={(swiper) => {
            swiper.update();
            layoutFan(swiper);
          }}
          onSetTransition={syncTransition}
          onSlideChange={(swiper) =>
            setActiveIndex(swiper.realIndex % transformations.length)
          }
          onTransitionStart={() => setSettled(false)}
          onTransitionEnd={() => setSettled(true)}
          onTouchStart={() => setSettled(false)}
          onTouchEnd={(swiper) => {
            // A tap that never moved the deck still has to bring the reveal back.
            if (!swiper.animating) setSettled(true);
          }}
          {...swiperHandlers}
          loop
          loopAdditionalSlides={3}
          watchSlidesProgress
          centeredSlides
          slidesPerView="auto"
          spaceBetween={0}
          speed={speed}
          grabCursor
          threshold={4}
          // Longer, softer finger tracking so a flick settles instead of snapping.
          resistanceRatio={0.72}
          longSwipesRatio={0.28}
          touchAngle={38}
          autoplay={AUTOPLAY_PARAMS}
          keyboard={KEYBOARD}
          a11y={A11Y}
          className="hero-swiper w-[var(--card-w)] shrink-0"
          style={{
            perspective: `calc(${FAN_PERSPECTIVE} * var(--card-w))`,
            // swiper/css ships unlayered, so it outranks Tailwind's utility
            // layer; the fan has to paint outside the one-card viewport.
            overflow: "visible",
          }}
          wrapperClass="swiper-wrapper [transform-style:preserve-3d]"
        >
          {slides.map((item, index) => (
            <SwiperSlide
              key={`${item.id}-${index}`}
              className="![backface-visibility:hidden] !h-[var(--card-h)] !w-[var(--card-w)] [transform-style:preserve-3d]"
            >
              <BeforeAfterSlide
                transformation={item}
                index={index % transformations.length}
                total={transformations.length}
                eager={index < 3}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* The designated AFTER area: pinned to the centre, keyed to activeIndex. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "var(--card-w)", height: "var(--card-h)" }}
        >
          <TransformationShowcase
            transformation={activeTransformation}
            revealed={settled}
          />
        </div>
      </div>

      <p className="sr-only" role="status">
        {`Showing ${activeTransformation.name}: before and after treatment.`}
      </p>
    </div>
  );
}
