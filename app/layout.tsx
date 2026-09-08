import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/**
 * Stand-in only.
 *
 * The site is set in Cal Sans and PP Neue Montreal; Montreal is commercial and
 * its files are not committed (see public/fonts/README.md). This sits at the
 * back of both stacks so the page still reads sensibly until those land.
 * `preload: false` keeps it off the critical path — the browser only fetches it
 * if it actually has to fall back this far. Delete once Montreal is in place.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ageology.in"),
  title: {
    default: "Assure — Your Best Hair Days Are Ahead",
    template: "%s | Assure",
  },
  description:
    "Natural-looking hair transplants, planned and performed by Doctors. Assure has built India's largest doctor-led hair transplant network.",
  openGraph: {
    title: "Assure — Your Best Hair Days Are Ahead",
    description:
      "Natural-looking hair transplants, planned and performed by Doctors.",
    type: "website",
    locale: "en_IN",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-paper text-ink">{children}</body>
    </html>
  );
}
