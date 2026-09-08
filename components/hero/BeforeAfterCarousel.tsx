"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { A11y, Autoplay, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import "swiper/css";

import type { Transformation } from "@/lib/data/transformations";
import { BeforeAfterSlide } from "./BeforeAfterSlide";
import { TransformationShowcase } from "./TransformationShowcase";
import { HeroDeckFrame } from "./HeroDeckFrame";
import { FAN_PERSPECTIVE } from "./carousel-geometry";
import { useFanLayout } from "./useFanLayout";
import { AUTOPLAY_PARAMS, SLIDE_SPEED, useHeroAutoplay } from "./useHeroAutoplay";

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

/**
 * How long the deck rests on centre before the AFTER frame starts to reveal.
 * Together with the 600ms fade this has to finish inside the autoplay gap —
 * at the 3s cadence that is 200 + 600, holding at full for the last ~2.2s.
 */
const REVEAL_DELAY = 200;

export function BeforeAfterCarousel({ transformations }: BeforeAfterCarouselProps) {
  // What the deck is on, announced as soon as Swiper knows — used for the
  // status line, which should not wait for the animation.
  const [activeIndex, setActiveIndex] = useState(0);
  // What the AFTER area shows. Held back until the card has actually landed,
  // so the reveal can never belong to a slide that is still travelling.
  const [revealIndex, setRevealIndex] = useState(0);
  const [settled, setSettled] = useState(false);
  const swiperRef = useRef<SwiperClass | null>(null);
  const revealTimer = useRef<number | undefined>(undefined);

  const { layoutFan, syncTransition } = useFanLayout(swiperRef);
  const { speed, holdHandlers, swiperHandlers } = useHeroAutoplay(swiperRef);

  const clearRevealTimer = useCallback(() => {
    if (revealTimer.current !== undefined) {
      window.clearTimeout(revealTimer.current);
      revealTimer.current = undefined;
    }
  }, []);

  /** Points the AFTER area at whatever is centred right now. */
  const syncRevealIndex = useCallback(() => {
    const swiper = swiperRef.current;
    if (swiper) setRevealIndex(swiper.realIndex % transformations.length);
  }, [transformations.length]);

  /**
   * The deck has started moving: dim the reveal and cancel any pending one.
   *
   * Also arms a fallback. The landing below hangs off `transitionend`, which is
   * easy to lose — an interrupted transition, a tab that never paints — and
   * without a way back the AFTER frame would sit at 0.3 for good.
   */
  const holdReveal = useCallback(() => {
    clearRevealTimer();
    setSettled(false);
    revealTimer.current = window.setTimeout(() => {
      syncRevealIndex();
      setSettled(true);
    }, SLIDE_SPEED + REVEAL_DELAY + 400);
  }, [clearRevealTimer, syncRevealIndex]);

  /**
   * The deck has stopped. Swap the AFTER frame to whatever is now centred,
   * then fade it up after a beat. Cancelling first is what keeps a fast run of
   * autoplay steps, or a flurry of swipes, from stacking stale reveals.
   */
  const landReveal = useCallback(() => {
    clearRevealTimer();
    syncRevealIndex();
    revealTimer.current = window.setTimeout(() => setSettled(true), REVEAL_DELAY);
  }, [clearRevealTimer, syncRevealIndex]);

  useEffect(() => {
    // The first card is already centred, so it only owes the same short beat.
    revealTimer.current = window.setTimeout(() => setSettled(true), REVEAL_DELAY);
    return clearRevealTimer;
  }, [clearRevealTimer]);

  const activeTransformation = transformations[activeIndex] ?? transformations[0];
  const revealedTransformation = transformations[revealIndex] ?? transformations[0];

  // Swiper's loop shuffles slides between the two ends of the track. Repeating
  // the set once keeps that shuffle beyond ±4, where the fan has already faded
  // out, so the wrap is never visible on stage.
  const slides = [...transformations, ...transformations];

  return (
    <div
      {...holdHandlers}
      // The frame's peak juts 133/654 of a card-height above the deck, so the
      // wrapper reserves that space rather than letting it ride up over the
      // standfirst. Spread is wider on small screens than the fan alone needs:
      // the frame is 1.161x the card, and the neighbours have to clear it.
      className="relative w-full  [--card-h:calc(var(--card-w)*654/373)] [--card-w:min(54vw,230px)] [--fan-spread:0.95] sm:[--card-w:min(38vw,300px)] sm:[--fan-spread:0.95] lg:[--card-w:clamp(280px,19.43vw,373px)] lg:[--fan-spread:1]"
    >
      <div className="relative mx-auto flex justify-center">
        <HeroDeckFrame />

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
          onTransitionStart={holdReveal}
          onTransitionEnd={landReveal}
          onTouchStart={holdReveal}
          onTouchEnd={(swiper) => {
            // A tap that never moved the deck still has to bring the reveal back;
            // a real drag will land through onTransitionEnd instead.
            if (!swiper.animating) landReveal();
          }}
          {...swiperHandlers}
          loop
          loopAdditionalSlides={3}
          watchSlidesProgress
          centeredSlides
          // No free mode: the deck has to snap each card to centre, which is
          // what gives the landing the reveal below hangs off.
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

        {/* The designated AFTER area: pinned to the centre, keyed to the
            settled index rather than the active one. */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2"
          style={{ width: "var(--card-w)", height: "var(--card-h)" }}
        >
          <TransformationShowcase
            transformation={revealedTransformation}
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
