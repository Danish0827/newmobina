import { hero } from "@/lib/data/site";
import { transformations } from "@/lib/data/transformations";
import { BeforeAfterCarousel } from "./BeforeAfterCarousel";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="hero-lattice relative isolate overflow-x-clip pb-[clamp(3rem,5.2vw,6.5rem)]"
    >
      <div className="container-page">
        <div className="grid items-end gap-y-[clamp(1.5rem,2.4vw,2.75rem)] pt-[clamp(2.5rem,8.49vw,10.2rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,31rem)] lg:gap-x-[clamp(2rem,4vw,5rem)]">
          <h1
            id="hero-heading"
            className="text-[length:var(--text-display)] font-extrabold leading-[1.17] tracking-[-0.025em] text-ink"
          >
            {hero.headline[0]}
            <br />
            {hero.headline[1]}
            <span className="text-gold">{hero.headlineAccent}</span>
          </h1>

          <p className="relative max-w-[34ch] border-l-2 border-gold pl-[clamp(0.875rem,1.15vw,1.375rem)] text-[length:var(--text-body)] font-medium leading-[1.55] text-ink lg:mb-[clamp(0.5rem,1.2vw,1.75rem)]">
            {hero.standfirst}
          </p>
        </div>
      </div>

      <div className="mt-[clamp(3rem,5.7vw,6.8rem)]">
        <BeforeAfterCarousel transformations={transformations} />
      </div>
    </section>
  );
}
