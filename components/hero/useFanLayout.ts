"use client";

import { useCallback, useEffect } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { sampleFan } from "./carousel-geometry";

type SlideElement = HTMLElement & { progress: number };

/**
 * Places every card on the comp's fan curve.
 *
 * Swiper spaces the slides evenly and translates the track; this converts each
 * slide's own progress into the measured position, turn and scale, correcting
 * for the even baseline it started from.
 */
export function useFanLayout(swiperRef: React.RefObject<SwiperClass | null>) {
  const layoutFan = useCallback((swiper: SwiperClass) => {
    const cardWidth = swiper.slides[0]?.offsetWidth ?? 0;
    if (!cardWidth) return;

    // How far the fan opens: full on desktop, pulled in on narrow screens so
    // the neighbours still peek into the viewport. Read once, not per slide.
    const spread =
      Number.parseFloat(
        getComputedStyle(swiper.el).getPropertyValue("--fan-spread"),
      ) || 1;

    swiper.slides.forEach((element) => {
      const slide = element as SlideElement;
      // Swiper counts progress up as a slide falls *behind* the active one, so
      // the seat a slide occupies on stage is its negated progress.
      const seat = -slide.progress;
      const fan = sampleFan(seat);
      const correction = (fan.x * spread - seat) * cardWidth;

      slide.style.transform =
        `translate3d(${correction.toFixed(2)}px, 0, ${(fan.z * cardWidth).toFixed(2)}px)` +
        ` rotateY(${fan.rotate.toFixed(2)}deg) scale(${fan.scale.toFixed(4)})`;
      slide.style.opacity = fan.opacity.toFixed(3);
      slide.style.pointerEvents = Math.abs(seat) > 3.5 ? "none" : "";
    });
  }, []);

  const syncTransition = useCallback((swiper: SwiperClass, duration: number) => {
    swiper.slides.forEach((element) => {
      element.style.transitionDuration = `${duration}ms`;
    });
  }, []);

  /**
   * The slide width is driven by `--card-w`, a viewport unit. Swiper's own
   * resize observer does not reliably catch that — it watches the element, and
   * a hidden or backgrounded tab can starve it — which strands the cached
   * slide grid at the old width and skews the whole fan. Remeasuring off the
   * viewport is cheap and never misses. Deliberately not deferred to rAF,
   * which is starved in exactly the same situations.
   */
  useEffect(() => {
    const onViewportResize = () => {
      const swiper = swiperRef.current;
      if (!swiper || swiper.destroyed) return;
      swiper.update();
      layoutFan(swiper);
    };
    window.addEventListener("resize", onViewportResize);
    window.addEventListener("orientationchange", onViewportResize);
    return () => {
      window.removeEventListener("resize", onViewportResize);
      window.removeEventListener("orientationchange", onViewportResize);
    };
  }, [layoutFan, swiperRef]);

  return { layoutFan, syncTransition };
}
