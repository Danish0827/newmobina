import Image from "next/image";
import { belief } from "@/lib/data/site";
import { sectionImages } from "@/lib/data/media";
import { cn } from "@/lib/utils/cn";

/** The comp marks "Them" with a crossed disc and "Assure today" with a tick. */
function BulletIcon({ tone }: { tone: "muted" | "brand" }) {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden="true"
      className={cn(
        "mt-[0.2em] h-[1.05em] w-[1.05em] shrink-0",
        tone === "brand" ? "text-ink" : "text-ink-muted/40",
      )}
    >
      <circle cx="10" cy="10" r="9" fill="currentColor" />
      {tone === "brand" ? (
        <path
          d="m6 10.3 2.7 2.7L14 7.6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : (
        <path
          d="m7 7 6 6M13 7l-6 6"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="1.9"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}

const COLUMN_IMAGES: Record<string, string> = {
  them: sectionImages.them,
  assure: sectionImages.today,
};

export function BeliefSection() {
  return (
    <section
      aria-labelledby="belief-heading"
      className="bg-paper pb-[clamp(3rem,9.3vw,11.2rem)] pt-[clamp(2rem,3.7vw,4.4rem)]"
    >
      <div className="container-page">
        <div className="grid gap-y-[clamp(2.5rem,4vw,4rem)] lg:grid-cols-[minmax(0,493fr)_minmax(0,928fr)] lg:gap-x-[12.47%]">
          <div className="reveal lg:pt-[clamp(3rem,9vw,11rem)]">
            <p className="text-[length:var(--text-body)] font-medium text-ink">
              {belief.kicker}
            </p>
            <h2
              id="belief-heading"
              className="mt-[clamp(0.5rem,0.85vw,1rem)] text-[length:var(--text-h2)] font-extrabold leading-[1.105] tracking-[-0.025em] text-ink"
            >
              {belief.heading[0]}
              <br />
              {belief.heading[1]}
            </h2>
            <p className="mt-[clamp(1.25rem,2.1vw,2.5rem)] max-w-[34ch] text-[length:var(--text-small)] leading-[1.65] text-ink-soft">
              {belief.body}
            </p>
          </div>

          <ul className="grid gap-[clamp(1rem,1.7vw,2rem)] sm:grid-cols-2">
            {belief.columns.map((column) => (
              <li key={column.id} className="reveal flex flex-col">
                {/* Reference plate — 471 x 298 in the comp, rounded all round. */}
                <div className="relative h-full overflow-hidden rounded-[clamp(10px,1vw,18px)] bg-white">
                  <Image
                    src={COLUMN_IMAGES[column.id]}
                    alt={`${column.label} social presence`}
                    width={1000}
                    height={1000}
                    priority
                    // sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 25vw"
                    className="object-cover scale-105 pb-10"
                  />
                </div>

                <div className="relative -mt-[clamp(0.6rem,0.83vw,1rem)] flex flex-1 flex-col rounded-[clamp(10px,1vw,18px)] bg-card px-[clamp(1rem,1.56vw,1.875rem)] pb-[clamp(1.5rem,2.4vw,2.9rem)] pt-[clamp(2.5rem,3.4vw,4.1rem)] sm:min-h-[clamp(17rem,34.7vw,41.6rem)]">
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full bg-white px-[clamp(0.9rem,1.25vw,1.5rem)] py-[clamp(0.35rem,0.5vw,0.6rem)] text-[length:var(--text-small)] font-semibold text-ink shadow-[0_10px_24px_-16px_rgba(26,34,73,0.55)]">
                    {column.tone === "brand" ? (
                      <>
                        <span className="text-orange">Assure</span> today
                      </>
                    ) : (
                      column.label
                    )}
                  </span>

                  <ul className="flex flex-col gap-[clamp(1rem,1.6vw,1.9rem)]">
                    {column.points.map((point, index) => (
                      <li
                        key={index}
                        className="flex gap-[clamp(0.5rem,0.73vw,0.875rem)] text-[clamp(0.6875rem,0.83vw,1rem)] leading-[1.6] text-ink-soft"
                      >
                        <BulletIcon tone={column.tone} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
