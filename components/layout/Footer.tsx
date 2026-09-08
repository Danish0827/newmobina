import Link from "next/link";
import { closing, site } from "@/lib/data/site";
import { Logo } from "@/components/ui/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

/** The comp's footer marks are flat navy glyphs, not the colour app tiles. */
const SOCIAL_ICONS = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
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

        <div className="grid gap-[clamp(1.75rem,3vw,3.6rem)] pt-[clamp(1.75rem,4.7vw,5.6rem)] lg:grid-cols-[_minmax(0,0.68fr)_minmax(0,1fr)_minmax(0,0.68fr)]">
          <div>
            <Link
            href="/"
            aria-label={site.name + " — home"}
            className="w-fit text-[clamp(1.1rem,2.7vw,3.25rem)] transition-opacity duration-300 hover:opacity-80"
          >
           <Image src="/images/healthus.png" alt={`${site.name} logo`} className="w-50" width={1000} height={1000} />
          </Link>
          </div>
          <div>
            <p className="max-w-[26ch] text-[clamp(0.9375rem,1.56vw,1.875rem)] font-normal leading-[1.45] text-ink">
              {closing.blurb}
            </p>

            <ul className="mt-[clamp(1.5rem,2.6vw,3.1rem)] flex gap-[clamp(0.75rem,1.15vw,1.4rem)]">
  {closing.socials.map((social) => {
    const Icon = SOCIAL_ICONS[social.id as keyof typeof SOCIAL_ICONS];

    if (!Icon) return null;

    return (
      <li key={social.id}>
        <a
          href={social.href}
          aria-label={social.label}
          className="block text-ink transition-opacity duration-300 hover:opacity-60"
        >
          <Icon
            aria-hidden="true"
            className="h-[clamp(1.1rem,1.35vw,1.625rem)] w-[clamp(1.1rem,1.35vw,1.625rem)]"
            strokeWidth={2}
          />
        </a>
      </li>
    );
  })}
</ul>
          </div>

          <div>
  <h2 className="text-[length:var(--text-eyebrow)] font-semibold uppercase tracking-[0.08em] text-ink">
    {closing.contact.heading}
  </h2>

  <address className="mt-[clamp(0.75rem,1.35vw,1.625rem)] flex flex-col items-start gap-[clamp(0.6rem,0.94vw,1.125rem)] not-italic text-[clamp(0.6875rem,0.83vw,1rem)] leading-[1.65] text-ink-soft">
    <a
      href={"mailto:" + closing.contact.email}
      className="flex items-center gap-2 underline decoration-ink-muted/40 underline-offset-4 transition-colors duration-300 hover:text-ink"
    >
      <Mail
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        strokeWidth={1.8}
      />
      <span>{closing.contact.email}</span>
    </a>

    <a
      href={"tel:" + closing.contact.phone.replace(/\s+/g, "")}
      className="flex items-center gap-2 underline decoration-ink-muted/40 underline-offset-4 transition-colors duration-300 hover:text-ink"
    >
      <Phone
        aria-hidden="true"
        className="h-4 w-4 shrink-0"
        strokeWidth={1.8}
      />
      <span>{closing.contact.phone}</span>
    </a>

    <span className="flex items-start gap-2 max-w-[42ch] underline decoration-ink-muted/40 underline-offset-4">
      <MapPin
        aria-hidden="true"
        className="mt-1 h-4 w-4 shrink-0"
        strokeWidth={1.8}
      />
      <span>{closing.contact.address}</span>
    </span>
  </address>
</div>
        </div>
      </div>
    </footer>
  );
}
