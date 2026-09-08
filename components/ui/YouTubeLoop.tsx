"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { youTubeLoopEmbed, youTubeThumb, type YouTubeClip } from "@/lib/data/media";
import { cn } from "@/lib/utils/cn";

type YouTubeLoopProps = {
  clip: YouTubeClip;
  className?: string;
  sizes?: string;
  children?: React.ReactNode;
};

/**
 * A clip that plays itself, in place, forever.
 *
 * Five of these share a page, so the player is not mounted until the card is
 * near the viewport: until then it is just YouTube's poster frame, and nothing
 * is requested from YouTube beyond that one image. The poster stays underneath
 * afterwards so there is never a black gap while the player boots.
 *
 * A Short is 9:16 inside YouTube's 16:9 frame, occupying the middle 31.6% of
 * its width. Scaling the iframe to 316% of the card and centring it therefore
 * makes the video itself fill the card, with the pillarbox cropped away.
 */
export function YouTubeLoop({ clip, className, sizes, children }: YouTubeLoopProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  // Reduced motion gets the same clip, just not moving on its own: the player
  // mounts with its controls so the visitor can start it themselves rather
  // than being left with a poster and no way in.
  const [autoplay, setAutoplay] = useState(true);
  const [thumbQuality, setThumbQuality] = useState<"maxres" | "hq">("maxres");

  useEffect(() => {
    const node = frameRef.current;
    if (!node) return;

    // Autoplaying video is motion the visitor did not ask for.
    const wantsAutoplay = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAutoplay(wantsAutoplay);

    let done = false;
    const start = () => {
      if (done) return;
      done = true;
      setActive(true);
      cleanup();
    };

    if (typeof IntersectionObserver === "undefined") {
      const id = window.setTimeout(start, 0);
      return () => window.clearTimeout(id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) start();
      },
      { rootMargin: "200px" },
    );
    observer.observe(node);

    // Observer callbacks ride the frame loop, which a browser can starve.
    // Measuring as well means a card on screen still starts playing.
    const measure = () => {
      const box = node.getBoundingClientRect();
      if (box.top < window.innerHeight && box.bottom > 0) start();
    };
    const safety = window.setTimeout(measure, 1200);
    window.addEventListener("scroll", measure, { passive: true });

    function cleanup() {
      window.clearTimeout(safety);
      window.removeEventListener("scroll", measure);
      observer.disconnect();
    }
    return cleanup;
  }, []);

  return (
    <div
      ref={frameRef}
      className={cn("relative overflow-hidden bg-placeholder", className)}
    >
      <Image
        src={youTubeThumb(clip.id, thumbQuality)}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        unoptimized
        onError={() => setThumbQuality("hq")}
        className="object-cover"
      />

    {active ? (
 <iframe
  src={youTubeLoopEmbed(clip.id, true)}
  title={clip.title}
  allow="autoplay; encrypted-media"
  tabIndex={-1}
  className="absolute left-1/2 top-1/2 aspect-video w-[316%] -translate-x-1/2 -translate-y-1/2 border-0 pointer-events-none"
/>
) : null}

      {children}
    </div>
  );
}
