import type { Metadata } from "next";
import { Syne, Figtree, DM_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Yvette Tanila Nchombua — Fullstack Developer",
  description:
    "Fullstack developer based in Umeå, Sweden. Java, Spring Boot, React, Next.js. Open to new opportunities.",
  openGraph: {
    title: "Yvette Tanila Nchombua — Fullstack Developer",
    description:
      "Fullstack developer based in Umeå, Sweden. Java, Spring Boot, React, Next.js.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${figtree.variable} ${dmMono.variable}`}>
      <body className="font-body">{children}</body>
    </html>
  );
}
