/**
 * The pale frame the centred card sits inside.
 *
 * The comp draws it as one silhouette, not a rectangle with a badge floating
 * over it: the top edge rises into a tented peak that houses the brand mark.
 * Measured off the 1920px frame — shell 433 x 732 at y 505, peak 142 wide
 * rising 76 above it, all relative to the 373 x 654 centre card.
 */

import Image from "next/image";

const VIEW_W = 433;
const VIEW_H = 808;
const PEAK = 76;
const RADIUS = 44;
const HALF = VIEW_W / 2;
const PEAK_HALF = 71;

/** Rounded rectangle with a tent rising out of the middle of its top edge. */
const SILHOUETTE = [
  `M ${RADIUS} ${PEAK}`,
  `L ${HALF - PEAK_HALF} ${PEAK}`,
  `L ${HALF - 6.5} 12`,
  `Q ${HALF} 4 ${HALF + 6.5} 12`,
  `L ${HALF + PEAK_HALF} ${PEAK}`,
  `L ${VIEW_W - RADIUS} ${PEAK}`,
  `A ${RADIUS} ${RADIUS} 0 0 1 ${VIEW_W} ${PEAK + RADIUS}`,
  `L ${VIEW_W} ${VIEW_H - RADIUS}`,
  `A ${RADIUS} ${RADIUS} 0 0 1 ${VIEW_W - RADIUS} ${VIEW_H}`,
  `L ${RADIUS} ${VIEW_H}`,
  `A ${RADIUS} ${RADIUS} 0 0 1 0 ${VIEW_H - RADIUS}`,
  `L 0 ${PEAK + RADIUS}`,
  `A ${RADIUS} ${RADIUS} 0 0 1 ${RADIUS} ${PEAK}`,
  "Z",
].join(" ");

export function HeroDeckFrame() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 z-0 -translate-x-1/2"
      style={{
        // The shell's rectangle starts 57 above the card and its peak a
        // further 76, so the frame hangs 133 above the card's top edge.
        top: "calc(-1 * (133 / 654) * var(--card-h))",
        width: "calc((433 / 373) * var(--card-w))",
        height: "calc((808 / 654) * var(--card-h))",
      }}
    >
      <svg
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="h-full w-full "
      >
        <path
          d={SILHOUETTE}
          fill="var(--color-shell)"
          stroke="rgba(255,255,255,0.92)"
          strokeWidth="5"
        />
      </svg>

      {/* The mark sits inside the peak. */}
      <Image src="/images/logoicon.svg" alt="" width={90} height={22} className="w-14 lg:w-20 absolute mt-2 lg:mt-4 left-1/2 top-[calc((22/808)*100%)] -translate-x-1/2" />
      {/* <svg
        viewBox="0 0 64 60"
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "calc((22 / 808) * 100%)",
          width: "calc((90 / 433) * 100%)",
        }}
      >
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
        <path d="M32 26.5 44 52H20l12-25.5Z" fill="#1B1B23" />
      </svg> */}
    </div>
  );
}
