import type { Metadata } from "next";
import { Syne, Figtree, DM_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-figtree",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://yvette-portfolio-six.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Yvette Tanila Nchombua — Fullstack Developer",
  description:
    "Fullstack developer based in Umeå, Sweden. Java, Spring Boot, React, Next.js. Open to new opportunities.",
  keywords: [
    "Yvette Tanila",
    "Yvette Nchombua",
    "Fullstack Developer",
    "Java Developer",
    "Spring Boot",
    "React",
    "Next.js",
    "Umeå",
    "Sweden",
  ],
  authors: [{ name: "Yvette Tanila Nchombua" }],
  creator: "Yvette Tanila Nchombua",
  openGraph: {
    title: "Yvette Tanila Nchombua — Fullstack Developer",
    description:
      "Fullstack developer based in Umeå, Sweden. Java, Spring Boot, React, Next.js.",
    url: SITE_URL,
    siteName: "Yvette Tanila Nchombua",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yvette Tanila Nchombua — Fullstack Developer",
    description:
      "Fullstack developer based in Umeå, Sweden. Java, Spring Boot, React, Next.js.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${figtree.variable} ${dmMono.variable}`}
    >
      <body className="font-body">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
