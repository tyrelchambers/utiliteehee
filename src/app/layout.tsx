import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./utilitee.css";
import { Toaster } from "@/components/ui/toaster";
import { Faculty_Glyphic } from "next/font/google";

import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const facultyFont = Faculty_Glyphic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-faculty",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Utiliteehee",
  description: "Free-range. Vegan. Whole-grain. Non-GMO. Utilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          defer
          data-domain="utiliteehee.com"
          src="https://plausible.io/js/script.js"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${facultyFont.variable} antialiased bg-background`}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
