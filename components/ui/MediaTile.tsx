"use client";

import { useState } from "react";
import Image from "next/image";
import { youTubeThumb, type YouTubeClip } from "@/lib/data/media";
import { cn } from "@/lib/utils/cn";
import { useLightbox } from "./Lightbox";

type MediaTileProps = {
  className?: string;
  /** Sizes hint passed straight to `next/image`. */
  sizes?: string;
  children?: React.ReactNode;
} & (
  | { kind: "youtube"; clip: YouTubeClip }
  | { kind: "image"; src: string; alt: string }
);

function PlayGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 46" aria-hidden="true" className={className}>
      <path d="M3 3 37 23 3 43V3Z" fill="currentColor" />
    </svg>
  );
}

/**
 * A poster frame that opens the shared lightbox.
 *
 * For a clip this is just YouTube's thumbnail — no iframe, no YouTube script,
 * nothing loaded from their domain beyond one image until someone presses it.
 */
export function MediaTile(props: MediaTileProps) {
  const { className, sizes = "(max-width: 768px) 46vw, 20vw", children } = props;
  const { open } = useLightbox();
  // Shorts frequently have no `maxresdefault`; `hqdefault` always exists.
  const [thumbQuality, setThumbQuality] = useState<"maxres" | "hq">("maxres");

  const isClip = props.kind === "youtube";
  const src = isClip ? youTubeThumb(props.clip.id, thumbQuality) : props.src;
  const label = isClip ? props.clip.title : props.alt;

  return (
    <button
      type="button"
      onClick={() =>
        open(
          isClip
            ? { kind: "youtube", id: props.clip.id, title: props.clip.title }
            : { kind: "image", src: props.src, alt: props.alt },
        )
      }
      aria-label={isClip ? `Play ${label}` : `View ${label}`}
      className={cn(
        "group relative block w-full overflow-hidden bg-placeholder",
        "transition-transform duration-500 ease-out hover:scale-[1.015] motion-reduce:hover:scale-100",
        className,
      )}
    >
      <Image
        src={src}
        alt=""
        aria-hidden="true"
        fill
        sizes={sizes}
        unoptimized={isClip}
        onError={() => isClip && setThumbQuality("hq")}
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
      />

      {/* A touch of shade so the play mark and any overlay stay legible. */}
      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/15 opacity-80 transition-opacity duration-500 group-hover:opacity-95"
      />

      {isClip ? (
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 grid w-[clamp(1.75rem,4.2vw,5rem)] -translate-x-1/2 -translate-y-1/2 place-items-center text-white drop-shadow-[0_6px_18px_rgba(0,0,0,0.55)] transition-transform duration-500 ease-out group-hover:scale-110 motion-reduce:group-hover:scale-100"
        >
          <PlayGlyph className="w-full" />
        </span>
      ) : null}

      {children}
    </button>
  );
}
