import FontPairingBody from "@/components/FontPairingBody";
import React from "react";

export interface Font {
  items: {
    family: string;
    variants: string[];
    subsets: string[];
    category: string;
    kind: string;
    version: string;
    lastModified: string;
    axes: {
      tag: string;
      start: number;
      end: number;
    }[];
  }[];
}

const getFonts = async () => {
  const fonts: Font = await fetch(
    `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.GOOGLE_API_KEY}`,
    {
      cache: "default",
    }
  ).then((res) => res.json());
  return fonts.items;
};

const FontPairing = async () => {
  const allFonts = await getFonts();

  return (
    <section>
      <h1 className="h1">Font Pairing</h1>
      <p className="text-muted-foreground mb-6">
        Find the best font pairings in the universe with this handy font pairing
        tool.
      </p>
      <FontPairingBody fonts={allFonts} />
    </section>
  );
};

export default FontPairing;
