import Link from "next/link";
import { closing, site } from "@/lib/data/site";
import { Logo } from "@/components/ui/Logo";
import { CTAButton } from "@/components/ui/CTAButton";

/** The comp's footer marks are flat navy glyphs, not the colour app tiles. */
const SOCIAL_PATHS: Record<string, string> = {
  linkedin:
    "M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM2.4 10.2h5.2V21H2.4V10.2Zm7.4 0h4.98v1.48h.07c.7-1.24 2.4-2.05 4.1-2.05 4.38 0 5.19 2.68 5.19 6.17V21h-5.2v-4.6c0-1.1-.02-2.5-1.6-2.5-1.6 0-1.85 1.19-1.85 2.42V21H9.8V10.2Z",
  instagram:
    "M12 2.2c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.8 3.8 0 0 1-1.38-.9 3.8 3.8 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.98c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 3.37a5.45 5.45 0 1 1 0 10.9 5.45 5.45 0 0 1 0-10.9Zm0 8.99a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm6.94-9.2a1.27 1.27 0 1 1-2.55 0 1.27 1.27 0 0 1 2.55 0Z",
  facebook:
    "M13.5 21v-8.2h2.8l.42-3.24H13.5V7.5c0-.94.26-1.58 1.6-1.58h1.72V3.02c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.3v2.37H7.32v3.24h2.82V21h3.36Z",
};

export function Footer() {
  return (
    <footer id="contact" className="container-wide">
      <div className="rounded-t-[clamp(14px,2.1vw,40px)] bg-white px-[clamp(1.25rem,6vw,7.1rem)] pb-[clamp(2rem,7.3vw,8.75rem)] pt-[clamp(2.25rem,7.3vw,8.75rem)]">
        <div className="grid items-center gap-[clamp(1.75rem,3vw,3.6rem)] lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)]">
          <Link
            href="/"
            aria-label={site.name + " — home"}
            className="w-fit text-[clamp(1.1rem,2.7vw,3.25rem)] transition-opacity duration-300 hover:opacity-80"
          >
            <Logo />
          </Link>

          <div>
            <p className="text-[clamp(0.9375rem,1.77vw,2.125rem)] font-normal leading-[1.42] text-ink">
              {closing.lines[0]}
              <br />
              {closing.lines[1]}
            </p>
            <p className="mt-[clamp(0.4rem,0.83vw,1rem)] text-[clamp(1.25rem,2.76vw,3.3rem)] font-extrabold leading-[1.2] tracking-[-0.02em] text-gold">
              {closing.accent}
            </p>
            <CTAButton href={closing.cta.href} className="mt-[clamp(1.25rem,2.4vw,2.9rem)]">
              {closing.cta.label}
            </CTAButton>
          </div>
        </div>

        <hr className="mt-[clamp(2rem,5.2vw,6.25rem)] border-line" />

        <div className="grid gap-[clamp(1.75rem,3vw,3.6rem)] pt-[clamp(1.75rem,4.7vw,5.6rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,0.68fr)]">
          <div>
            <p className="max-w-[26ch] text-[clamp(0.9375rem,1.56vw,1.875rem)] font-normal leading-[1.45] text-ink">
              {closing.blurb}
            </p>

            <ul className="mt-[clamp(1.5rem,2.6vw,3.1rem)] flex gap-[clamp(0.75rem,1.15vw,1.4rem)]">
              {closing.socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="block text-ink transition-opacity duration-300 hover:opacity-60"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                      className="w-[clamp(1.1rem,1.35vw,1.625rem)]"
                    >
                      <path d={SOCIAL_PATHS[social.id]} fill="currentColor" />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink">
              {closing.contact.heading}
            </h2>
            <address className="mt-[clamp(0.75rem,1.35vw,1.625rem)] flex flex-col items-start gap-[clamp(0.6rem,0.94vw,1.125rem)] not-italic text-[clamp(0.6875rem,0.83vw,1rem)] leading-[1.65] text-ink-soft">
              <a
                href={"mailto:" + closing.contact.email}
                className="underline decoration-ink-muted/40 underline-offset-4 transition-colors duration-300 hover:text-ink"
              >
                {closing.contact.email}
              </a>
              <a
                href={"tel:" + closing.contact.phone.replace(/\s+/g, "")}
                className="underline decoration-ink-muted/40 underline-offset-4 transition-colors duration-300 hover:text-ink"
              >
                {closing.contact.phone}
              </a>
              <span className="max-w-[42ch] underline decoration-ink-muted/40 underline-offset-4">
                {closing.contact.address}
              </span>
            </address>
          </div>
        </div>
      </div>
    </footer>
  );
}
