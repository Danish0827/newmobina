import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

/**
 * The comp is set in Gilroy, which is not freely licensable. Plus Jakarta Sans
 * is the closest available match on the tells that matter here — double-storey
 * `a`, straight-tailed `y`, tall x-height, geometric bowls. Swap in a licensed
 * Gilroy via `next/font/local` and only this block changes.
 */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
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
