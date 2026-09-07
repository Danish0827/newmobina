"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { youTubeEmbed } from "@/lib/data/media";

/** What the lightbox is currently showing. */
export type LightboxItem =
  | { kind: "youtube"; id: string; title: string }
  | { kind: "image"; src: string; alt: string };

type LightboxContextValue = {
  open: (item: LightboxItem) => void;
};

const LightboxContext = createContext<LightboxContextValue | null>(null);

export function useLightbox() {
  const context = useContext(LightboxContext);
  if (!context) throw new Error("useLightbox must be used inside <LightboxProvider>");
  return context;
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="w-[42%]">
      <path
        d="M6 6l12 12M18 6L6 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * A single dialog shared by every piece of media on the page.
 *
 * Only one player can exist at a time, which is the point: the YouTube iframe
 * is mounted when something is opened and unmounted when it closes, so no
 * embed loads — and nothing is sent to YouTube — until a viewer asks for it.
 */
export function LightboxProvider({ children }: { children: React.ReactNode }) {
  const [item, setItem] = useState<LightboxItem | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const restoreFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback((next: LightboxItem) => {
    restoreFocusRef.current = document.activeElement as HTMLElement | null;
    setItem(next);
  }, []);

  const close = useCallback(() => {
    setItem(null);
    restoreFocusRef.current?.focus?.();
  }, []);

  // Escape closes, and the page behind must not scroll while it is open.
  useEffect(() => {
    if (!item) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [item, close]);

  return (
    <LightboxContext.Provider value={{ open }}>
      {children}

      {item ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={item.kind === "youtube" ? item.title : item.alt}
          className="fixed inset-0 z-[100] flex items-center justify-center p-[clamp(1rem,4vw,4rem)] motion-safe:animate-[lightbox-in_240ms_ease-out_both]"
        >
          {/* Backdrop doubles as the click-away target. */}
          <button
            type="button"
            aria-label="Close"
            tabIndex={-1}
            onClick={close}
            className="absolute inset-0 cursor-default bg-ink/85 backdrop-blur-sm"
          />

          <div
            className={
              item.kind === "youtube"
                ? "relative aspect-[9/16] max-h-full w-auto max-w-full overflow-hidden rounded-[clamp(12px,1.5vw,24px)] bg-black shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
                : "relative max-h-full max-w-[min(1100px,100%)] overflow-hidden rounded-[clamp(12px,1.5vw,24px)] shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)]"
            }
          >
            {item.kind === "youtube" ? (
              <iframe
                src={youTubeEmbed(item.id)}
                title={item.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full border-0"
              />
            ) : (
              <Image
                src={item.src}
                alt={item.alt}
                width={1600}
                height={1600}
                className="h-auto max-h-[86vh] w-auto object-contain"
              />
            )}
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-[clamp(0.75rem,2vw,2rem)] top-[clamp(0.75rem,2vw,2rem)] grid aspect-square w-[clamp(2.75rem,3vw,3.25rem)] place-items-center rounded-full bg-white/12 text-white transition-colors duration-300 hover:bg-white/25"
          >
            <CloseIcon />
          </button>
        </div>
      ) : null}
    </LightboxContext.Provider>
  );
}
