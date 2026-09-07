import Image from "next/image";
import { creativeSamples } from "@/lib/data/site";
import { sectionImages } from "@/lib/data/media";
import { Eyebrow } from "@/components/ui/Eyebrow";

function Caption({ children }: { children: React.ReactNode }) {
  return (
    <span className="absolute bottom-0 left-1/2 z-10 -translate-x-1/2 translate-y-1/2 whitespace-nowrap rounded-full bg-white px-[clamp(1rem,1.35vw,1.6rem)] py-[clamp(0.35rem,0.5vw,0.62rem)] text-[length:var(--text-small)] font-semibold text-ink shadow-[0_12px_28px_-16px_rgba(26,34,73,0.6)]">
      {children}
    </span>
  );
}

export function CreativeSamplesSection() {
  return (
    <section aria-labelledby="creative-heading" className="bg-paper">
      <div className="reveal container-page pb-[clamp(1rem,1.9vw,2.25rem)] pt-[clamp(2.5rem,12.9vw,15.5rem)]">
        <Eyebrow>{creativeSamples.eyebrow}</Eyebrow>
        <h2
          id="creative-heading"
          className="mt-[clamp(0.6rem,0.9vw,1.1rem)] text-[length:var(--text-h2)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink"
        >
          {creativeSamples.heading}
        </h2>
      </div>

      {/* Full-bleed comparison band, split down the middle as in the comp. */}
      <div className="grid sm:grid-cols-2">
        <div className="relative flex items-center justify-center px-[clamp(1.25rem,4vw,5rem)] py-[clamp(3rem,7.5vw,9rem)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(96deg,#F4F4F4_0%,#EDEDED_46%,#DCDCDC_100%)]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 opacity-60 [background-image:radial-gradient(rgba(26,34,73,0.055)_1px,transparent_1.2px)] [background-size:15px_15px]"
          />
          <div className="relative w-full max-w-[482px]">
            <div className="relative aspect-[482/570] overflow-hidden rounded-[clamp(6px,0.5vw,10px)] bg-[#EDEDED] shadow-[0_26px_60px_-38px_rgba(26,34,73,0.7)]">
              <Image
                src={sectionImages.current}
                alt="Assure's current social creative"
                fill
                sizes="(max-width: 640px) 92vw, 26vw"
                className="object-contain"
              />
            </div>
            <Caption>{creativeSamples.currentLabel}</Caption>
          </div>
        </div>

        <div className="relative flex items-center justify-center px-[clamp(1.25rem,4vw,5rem)] py-[clamp(3rem,7.5vw,9rem)]">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(118%_96%_at_50%_44%,#EAF4FF_0%,#B4DAFF_30%,#7FBEFA_62%,#4C9BEE_100%)]"
          />
          <div className="relative w-full max-w-[482px]">
            <div className="relative aspect-[482/570] overflow-hidden rounded-[clamp(6px,0.5vw,10px)] bg-[#101739] shadow-[0_30px_70px_-40px_rgba(9,17,53,0.85)]">
              <Image
                src={sectionImages.next}
                alt="The proposed Assure creative: a before and after transformation card"
                fill
                sizes="(max-width: 640px) 92vw, 26vw"
                className="object-contain"
              />
            </div>
            <Caption>{creativeSamples.newLabel}</Caption>
          </div>
        </div>
      </div>
    </section>
  );
}
