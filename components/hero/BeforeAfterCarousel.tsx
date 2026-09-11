"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import type { Transformation } from "@/lib/data/transformations";
import { cn } from "@/lib/utils/cn";

type BeforeAfterCarouselProps = {
  transformations: Transformation[];
};

/**
 * A 1:1 port of the hero carousel in the static assure-clinic build
 * (public/js/app.js → heroCarousel). Geometry, easing and the BEFORE → AFTER
 * reveal are unchanged; the look lives in globals.css under "Hero deck".
 *
 * Unlike the original, the deck always autoplays and animates — including
 * when the OS asks for reduced motion — and it keeps moving under the pointer.
 *
 * Offset (% of stage width) and scale per |distance| — measured from Figma:
 * centre card 378 x 656 at x771, neighbours at 451 / 180 / -43 with heights
 * 643 / 578 / 461. Phones use a looser, deeper fan so the active card stays
 * readable instead of being buried under six neighbours at 360px.
 */
const OFF_D = [0, 19.53, 34.45, 47.01, 56.0, 63.0];
const SC_D = [1, 0.98, 0.881, 0.703, 0.56, 0.46];
const OFF_M = [0, 34.0, 58.0, 76.0, 88.0, 96.0];
const SC_M = [1, 0.76, 0.56, 0.42, 0.33, 0.27];
const ROT_D = 55;
const ROT_M = 38;

const MOBILE_QUERY = "(max-width: 767px)";

/** One card per step, independent of scrolling; the position eases between steps. */
const AUTOPLAY_MS = 2000;

const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function sample(arr: number[], d: number) {
  const i = Math.floor(d);
  if (i >= arr.length - 1) return arr[arr.length - 1];
  return lerp(arr[i], arr[i + 1], d - i);
}

/** Shortest signed distance around the ring, so there are always three cards
 *  either side of the active one — as drawn in Figma. */
function wrapDist(i: number, p: number, n: number) {
  let d = (((i - p) % n) + n) % n;
  if (d > n / 2) d -= n;
  return d;
}

export function BeforeAfterCarousel({ transformations }: BeforeAfterCarouselProps) {
  const n = transformations.length;
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const goToRef = useRef<((index: number) => void) | null>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  // Only user-initiated moves are announced; autoplay would otherwise make a
  // screen reader read out a new result every two seconds.
  const [announcement, setAnnouncement] = useState("");

  useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track || !n) return;
    const cards = cardRefs.current.slice(0, n);

    const mqM = window.matchMedia(MOBILE_QUERY);

    let OFF = OFF_D;
    let SC = SC_D;
    let ROT = ROT_D;
    const pickProfile = () => {
      const m = mqM.matches;
      OFF = m ? OFF_M : OFF_D;
      SC = m ? SC_M : SC_D;
      ROT = m ? ROT_M : ROT_D;
    };
    pickProfile();

    let pos = 0;
    let target = 0;
    let raf = 0;
    let lastIdx = 0;

    const apply = () => {
      const w = stage.clientWidth;
      for (let i = 0; i < n; i++) {
        const c = cards[i];
        if (!c) continue;
        const d = wrapDist(i, pos, n);
        const ad = Math.abs(d);
        const sgn = d < 0 ? -1 : 1;

        const x = sgn * (sample(OFF, ad) / 100) * w;
        const s = sample(SC, ad);
        // Figma side cards are 268/237/201 wide against a 378 centre while
        // keeping near-full height — Y rotation reached one step out and held,
        // not accumulated per step.
        const rot = -sgn * Math.min(ad, 1) * ROT;
        // Keep z shallow: a deep push also drags cards toward the vanishing
        // point, which collapses the fan away from the Figma spacing.
        const z = -Math.min(ad, 4) * 18;
        const op = ad > 4.2 ? clamp(1 - (ad - 4.2) * 1.2, 0, 1) : 1;

        c.style.transform =
          `translate3d(${x.toFixed(2)}px,0,${z.toFixed(1)}px) ` +
          `rotateY(${rot.toFixed(2)}deg) scale(${s.toFixed(4)})`;
        c.style.opacity = String(op);
        c.style.zIndex = String(100 - Math.round(ad * 10));

        const active = ad < 0.5;
        if (active !== c.classList.contains("is-active")) {
          c.classList.toggle("is-active", active);
          c.setAttribute("aria-hidden", active ? "false" : "true");
        }
      }
    };

    const tick = () => {
      pos = lerp(pos, target, 0.12);
      if (Math.abs(pos - target) < 0.0006) pos = target;
      apply();
      raf = pos === target ? 0 : requestAnimationFrame(tick);
    };

    const setTarget = (v: number, announce: boolean) => {
      target = v; // free to wrap past either end
      if (!raf) raf = requestAnimationFrame(tick);
      const idx = ((Math.round(target) % n) + n) % n;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIndex(idx);
        if (announce) {
          setAnnouncement(`${transformations[idx].name}, ${idx + 1} of ${n}: before and after treatment.`);
        }
      }
    };

    // Dots, Home and End travel the short way round rather than back through
    // every lap autoplay has run.
    const goTo = (i: number) => {
      const from = Math.round(target);
      setTarget(from + wrapDist(i, from, n), true);
    };

    /* ---- autoplay ----
       Keeps running under the pointer: hovering does not hold the deck. Only a
       drag in progress or keyboard focus holds it (a mouse click on a dot
       leaves that button focused, so plain focus is not enough). */
    let timer = 0;
    let tabOn = !document.hidden;
    let inView = true;
    let dragging = false;

    const canAuto = () => {
      if (!tabOn || !inView || dragging) return false;
      const el = document.activeElement;
      if (el && stage.contains(el) && el.matches(":focus-visible")) return false;
      return true;
    };
    const startAuto = () => {
      window.clearInterval(timer);
      timer = window.setInterval(() => {
        if (canAuto()) setTarget(Math.round(target) + 1, false);
      }, AUTOPLAY_MS);
    };

    // A manual move re-phases the timer.
    goToRef.current = (i) => {
      goTo(i);
      startAuto();
    };

    // Pause when the tab is in the background or the hero is scrolled away.
    const onVisibility = () => {
      tabOn = !document.hidden;
    };
    const io = new IntersectionObserver(
      (es) => {
        inView = es[0].isIntersecting;
      },
      { threshold: 0.15 },
    );
    io.observe(stage);

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setTarget(Math.round(target) + 1, true);
      else if (e.key === "ArrowLeft") setTarget(Math.round(target) - 1, true);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "End") goTo(n - 1);
      else return;
      e.preventDefault();
      startAuto();
    };

    /* ---- touch / pointer drag (primary interaction on mobile) ----
       `touch-action: pan-y` hands vertical gestures to the browser, which
       then cancels the pointer — so scrolling past the hero never drags it. */
    let pointerId = -1;
    let startX = 0;
    let startPos = 0;

    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      dragging = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startPos = target;
      track.setPointerCapture(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      const w = stage.clientWidth || 1;
      // One card step is whatever the active profile puts at |d| = 1.
      setTarget(startPos - (e.clientX - startX) / (w * (OFF[1] / 100)), false);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pointerId) return;
      dragging = false;
      pointerId = -1;
      setTarget(Math.round(target), false);
      startAuto();
    };

    const onProfile = () => {
      pickProfile();
      apply();
    };

    let rz = 0;
    const onResize = () => {
      window.clearTimeout(rz);
      rz = window.setTimeout(apply, 120);
    };

    apply();
    stage.dataset.ready = "";
    startAuto();

    document.addEventListener("visibilitychange", onVisibility);
    track.addEventListener("keydown", onKeyDown);
    track.addEventListener("pointerdown", onDown);
    track.addEventListener("pointermove", onMove);
    track.addEventListener("pointerup", onUp);
    track.addEventListener("pointercancel", onUp);
    mqM.addEventListener("change", onProfile);
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.clearInterval(timer);
      window.clearTimeout(rz);
      io.disconnect();
      goToRef.current = null;
      document.removeEventListener("visibilitychange", onVisibility);
      track.removeEventListener("keydown", onKeyDown);
      track.removeEventListener("pointerdown", onDown);
      track.removeEventListener("pointermove", onMove);
      track.removeEventListener("pointerup", onUp);
      track.removeEventListener("pointercancel", onUp);
      mqM.removeEventListener("change", onProfile);
      window.removeEventListener("resize", onResize);
    };
  }, [n, transformations]);

  return (
    <div ref={stageRef} className="hdeck">
      {/* the arched plate sits BEHIND the active card (Figma: Union 448×820 under the 422×789 card) */}
      <div className="hdeck__frame" aria-hidden="true">
        <span className="hdeck__frameArch" />
        <Image src="/images/logoicon.svg" alt="" width={86} height={79} className="hdeck__frameMark" />
      </div>

      <div
        ref={trackRef}
        className="hdeck__track"
        role="group"
        aria-roledescription="carousel"
        aria-label="Patient results, before and after"
        tabIndex={0}
      >
        {transformations.map((item, i) => (
          <article
            key={item.id}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className={cn("hcard", i === 0 && "is-active")}
            aria-hidden={i === 0 ? "false" : "true"}
          >
            <span className="hcard__in">
              {/* Every frame loads up front, so a reveal never plays over an
                  image that is still arriving. */}
              <Image
                className="hcard__img is-before"
                src={item.before}
                alt={`${item.name} before treatment`}
                fill
                sizes="(max-width: 767px) 56vw, 20vw"
                loading="eager"
                draggable={false}
              />
              <Image
                className="hcard__img is-after"
                src={item.after}
                alt={`${item.name} after treatment`}
                fill
                sizes="(max-width: 767px) 56vw, 20vw"
                loading="eager"
                fetchPriority={i === 0 ? "high" : undefined}
                draggable={false}
              />
              <span className="hcard__sheen" />
            </span>
          </article>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>

      <div className="hdeck__dots" role="group" aria-label="Choose a result">
        {transformations.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className={cn("hdeck__dot", i === activeIndex && "is-on")}
            aria-label={`Result ${i + 1} of ${n}`}
            aria-current={i === activeIndex ? "true" : undefined}
            onClick={() => goToRef.current?.(i)}
          >
            <span />
          </button>
        ))}
      </div>
    </div>
  );
}
