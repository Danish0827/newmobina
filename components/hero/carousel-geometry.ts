/**
 * Fan geometry for the hero carousel.
 *
 * The comp's deck is not a rigid 3D projection — each card off centre is drawn
 * both smaller *and* turned, in proportions no single perspective camera
 * produces. So the curve below carries an explicit `scale` alongside the
 * rotation, and reproduces the silhouette measured off the Figma frame at
 * 1920px: bounding boxes of 373, 269, 240 and ~150 wide at centre offsets of
 * 0, 377, 666 and 885.
 *
 * `x` and `z` are multiples of the centre card's width so the same curve holds
 * at every breakpoint. Index 0 is the centred card.
 */
export const FAN_KEYFRAMES = [
  { x: 0, z: 0, rotate: 0, scale: 1, opacity: 1 },
  { x: 1.053, z: -0.08, rotate: 26, scale: 0.929, opacity: 1 },
  { x: 1.87, z: -0.16, rotate: 22.6, scale: 0.88, opacity: 1 },
  { x: 2.518, z: -0.24, rotate: 29.1, scale: 0.707, opacity: 1 },
  { x: 2.95, z: -0.32, rotate: 32, scale: 0.62, opacity: 0 },
] as const;

/**
 * Camera distance, also a multiple of the centre card's width. Kept long
 * enough that the scales above survive the projection, but short enough that
 * each turned card still reads as a trapezoid the way the comp draws it.
 */
export const FAN_PERSPECTIVE = 4;

export type FanTransform = {
  x: number;
  z: number;
  rotate: number;
  scale: number;
  opacity: number;
};

/**
 * Samples the keyframe curve at an arbitrary (fractional, signed) slide
 * progress so the fan stays continuous while the user drags.
 */
export function sampleFan(progress: number): FanTransform {
  const dir = progress < 0 ? -1 : 1;
  const abs = Math.min(Math.abs(progress), FAN_KEYFRAMES.length - 1);
  const lower = Math.floor(abs);
  const upper = Math.min(lower + 1, FAN_KEYFRAMES.length - 1);
  const t = abs - lower;

  const a = FAN_KEYFRAMES[lower];
  const b = FAN_KEYFRAMES[upper];
  const lerp = (from: number, to: number) => from + (to - from) * t;

  return {
    x: dir * lerp(a.x, b.x),
    z: lerp(a.z, b.z),
    // A card right of centre turns its far (outer) edge away, and vice versa,
    // so the inner edge of every card stays the one nearest the viewer.
    rotate: dir * lerp(a.rotate, b.rotate),
    scale: lerp(a.scale, b.scale),
    opacity: lerp(a.opacity, b.opacity),
  };
}
