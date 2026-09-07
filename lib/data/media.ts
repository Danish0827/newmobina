/**
 * Every non-hero asset the deck uses, in one place.
 *
 * Paths carry their original spaces and parentheses — `next/image` and the
 * browser encode them once on the way out, so they must not be pre-encoded
 * here or they end up double-escaped.
 */

export const sectionImages = {
  /** Belief section comparison plates. */
  them: "/images/them.webp",
  today: "/images/today.webp",
  /** Creative samples: the existing creative and its replacement. */
  current: "/images/Rectangle 64 (1) (1).webp",
  next: "/images/Rectangle 65.webp",
} as const;

export const channelIcons = {
  youtube: "/images/youtube.svg",
  instagram: "/images/instagram.svg",
  linkedin: "/images/linkedin.svg",
} as const;

/**
 * Campaign footage, hosted on YouTube rather than shipped in `public/`.
 *
 * Only the eleven-character id is stored: the thumbnail, the player URL and
 * the watch link are all derived from it, so a clip is swapped by changing one
 * string. Nothing embeds until a viewer opens the lightbox.
 */
export type YouTubeClip = {
  id: string;
  title: string;
};

/** The five influencer campaign shorts, in card order. */
export const influencerClips: YouTubeClip[] = [
  { id: "8TopyqrcBHc", title: "Influencer campaign short 1" },
  { id: "JXXVLsoxNrM", title: "Influencer campaign short 2" },
  { id: "TSyarQMofmc", title: "Influencer campaign short 3" },
  { id: "YLogC2ArGjA", title: "Influencer campaign short 4" },
  { id: "lD2rupTIm_A", title: "Influencer campaign short 5" },
];

/** The two pay-per-click formats shown in the growth collage. */
export const growthClips: YouTubeClip[] = [
  { id: "NzJBB3P0DVI", title: "Vertical ad format" },
  { id: "y_StGmpfTho", title: "Recovery timelapse format" },
];

/** Poster frame. `maxresdefault` is missing for many Shorts, so callers fall
 *  back to `hqdefault`, which always exists. */
export const youTubeThumb = (id: string, quality: "maxres" | "hq" = "maxres") =>
  `https://i.ytimg.com/vi/${id}/${quality}default.jpg`;

/** Privacy-preserving host, and no autoplay until the lightbox asks for it. */
export const youTubeEmbed = (id: string) =>
  `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
