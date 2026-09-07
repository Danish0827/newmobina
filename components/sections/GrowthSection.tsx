import { growth } from "@/lib/data/site";
import { growthClips, sectionImages } from "@/lib/data/media";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaTile } from "@/components/ui/MediaTile";

/**
 * The comp's collage is four plates in three columns: a tall clip, a stacked
 * pair of stills, and a second tall clip lifted above the others. The two
 * plates carrying a play glyph are the video formats; the middle pair are
 * stills. Below `lg` the same four fall into a two-column mosaic.
 */
export function GrowthSection({ children }: { children?: React.ReactNode }) {
  return (
    <section
      aria-labelledby="growth-heading"
      className="relative isolate overflow-hidden bg-[linear-gradient(158deg,#1B2A76_0%,#192C84_46%,#141F71_100%)]"
    >
      <div aria-hidden="true" className="dot-grid absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(78%_70%_at_88%_6%,rgba(14,20,64,0.85)_0%,rgba(14,20,64,0)_62%)]"
      />

      <div className="container-growth pb-[clamp(3rem,14vw,16.9rem)] pt-[clamp(3.5rem,14.7vw,17.7rem)]">
        <div className="grid items-center gap-[clamp(2rem,3.4vw,4.1rem)] lg:grid-cols-[minmax(0,0.42fr)_minmax(0,1fr)]">
          <div>
            <Eyebrow tone="dark">{growth.eyebrow}</Eyebrow>
            <h2
              id="growth-heading"
              className="mt-[clamp(1rem,1.9vw,2.25rem)] text-[length:var(--text-h2)] font-extrabold leading-[1.18] tracking-[-0.025em] text-white"
            >
              {growth.heading[0]}
              <br />
              {growth.heading[1]}
              <br />
              {growth.heading[2]}
            </h2>
            <p className="mt-[clamp(1rem,1.9vw,2.25rem)] max-w-[34ch] text-[clamp(0.6875rem,0.83vw,1rem)] leading-[1.7] text-white/62">
              {growth.body}
            </p>
          </div>

          <div className="grid grid-cols-2 items-start gap-[clamp(0.75rem,1.35vw,1.6rem)] lg:grid-cols-3">
            {/* Vertical clip */}
            <MediaTile
              kind="youtube"
              clip={growthClips[0]}
              sizes="(max-width: 1024px) 46vw, 20vw"
              className="aspect-[370/704] rounded-[clamp(8px,1.2vw,23px)] lg:order-1 lg:mt-[clamp(2rem,4.7vw,5.6rem)]"
            />

            {/* Second vertical clip — beside the first on small screens, and
                lifted into the comp's third column from lg up. */}
            <MediaTile
              kind="youtube"
              clip={growthClips[1]}
              sizes="(max-width: 1024px) 46vw, 20vw"
              className="aspect-[365/706] rounded-[clamp(8px,1.2vw,23px)] lg:order-3"
            />

            {/* Stills */}
            <div className="col-span-2 grid grid-cols-2 gap-[clamp(0.75rem,1.35vw,1.6rem)] lg:order-2 lg:col-span-1 lg:mt-[clamp(1rem,2.1vw,2.5rem)] lg:grid-cols-1">
              <MediaTile
                kind="image"
                src={sectionImages.current}
                alt="Square ad format still"
                sizes="(max-width: 1024px) 46vw, 20vw"
                className="aspect-[370/337] rounded-[clamp(8px,1.2vw,23px)]"
              />
              <MediaTile
                kind="image"
                src={sectionImages.next}
                alt="Portrait ad format still"
                sizes="(max-width: 1024px) 46vw, 20vw"
                className="aspect-[370/342] rounded-[clamp(8px,1.2vw,23px)]"
              />
            </div>
          </div>
        </div>
      </div>

      {children}
    </section>
  );
}
