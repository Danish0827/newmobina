"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Swiper as SwiperClass } from "swiper";

/** How long each transformation holds before the deck advances itself. */
export const AUTOPLAY_DELAY = 3000;

/** Slide transition length. Reduced motion drops it to 0 and stops autoplay. */
export const SLIDE_SPEED = 1000;

export const AUTOPLAY_PARAMS = {
  delay: AUTOPLAY_DELAY,
  // Interaction restarts the timer rather than killing it, so the deck keeps
  // moving after someone browses but never yanks a slide away mid-look.
  disableOnInteraction: false,
  // Hovering holds the deck so a card can be studied; keyboard focus does the
  // same, via `holdHandlers`.
  pauseOnMouseEnter: true,
  // `waitForTransition` stays on (the default): Swiper's own `pause()` resumes
  // immediately when it is off, which would defeat both the hover pause and
  // the focus pause. See the watchdog below for how the resulting dependency
  // on `transitionend` is made safe.
} as const;

/**
 * Owns the hero's auto-advance: whether it is running, why it might be held,
 * and the recovery when Swiper's own resume never arrives.
 */
export function useHeroAutoplay(swiperRef: React.RefObject<SwiperClass | null>) {
  const [speed, setSpeed] = useState(SLIDE_SPEED);

  // The two legitimate reasons autoplay may sit paused. The watchdog resumes
  // only when neither applies.
  const focusInside = useRef(false);
  const userPaused = useRef(false);
  const watchdog = useRef<number | undefined>(undefined);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      const reduce = query.matches;
      setSpeed(reduce ? 0 : SLIDE_SPEED);
      // Content that moves on its own is exactly what this preference is for.
      if (reduce) {
        userPaused.current = true;
        swiperRef.current?.autoplay?.stop();
      }
    };
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, [swiperRef]);

  const clearWatchdog = useCallback(() => {
    if (watchdog.current !== undefined) {
      window.clearTimeout(watchdog.current);
      watchdog.current = undefined;
    }
  }, []);

  /**
   * Swiper pauses autoplay at the start of every transition and waits for a
   * `transitionend` on the track to resume. That event is easy to lose — an
   * interrupted transition, a compositor that never paints — and when it goes
   * missing the deck stops for good with no way back. This re-arms it once the
   * slide has had more than enough time to land.
   */
  const armWatchdog = useCallback(() => {
    clearWatchdog();
    watchdog.current = window.setTimeout(() => {
      const autoplay = swiperRef.current?.autoplay;
      if (!autoplay || !autoplay.running || !autoplay.paused) return;
      if (focusInside.current || userPaused.current) return;
      autoplay.resume();
    }, AUTOPLAY_DELAY + SLIDE_SPEED + 1500);
  }, [clearWatchdog, swiperRef]);

  useEffect(() => clearWatchdog, [clearWatchdog]);

  /** Spread onto the carousel root so keyboard focus holds the deck still. */
  const holdHandlers = {
    onFocusCapture: () => {
      focusInside.current = true;
      swiperRef.current?.autoplay?.pause();
    },
    onBlurCapture: (event: React.FocusEvent<HTMLElement>) => {
      if (event.currentTarget.contains(event.relatedTarget as Node)) return;
      focusInside.current = false;
      if (!userPaused.current) swiperRef.current?.autoplay?.resume();
    },
  };

  /** Spread onto the Swiper so its own autoplay events drive the UI state. */
  const swiperHandlers = {
    onAutoplayStop: clearWatchdog,
    onAutoplayPause: armWatchdog,
    onAutoplayResume: clearWatchdog,
  };

  return { speed, holdHandlers, swiperHandlers };
}
