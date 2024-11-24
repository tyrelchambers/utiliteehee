import FontPairingBody from "@/components/FontPairingBody";
import Heading from "@/components/Heading";
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
    `https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyDowpwb2Kg_riAn97y7Rcg9LqmxFSEr1SI`,
    {
      cache: "default",
    }
  ).then((res) => res.json());
  return fonts.items;
};

const FontPairing = async () => {
  const allFonts = await getFonts();

  return (
    <section className="section">
      <Heading module="font-pairing">
        <h1 className="h1">Font Pairing</h1>
      </Heading>
      <p className="text-muted-foreground mb-6">
        Find the best font pairings in the universe with this handy font pairing
        tool.
      </p>
      <FontPairingBody fonts={allFonts} />
    </section>
  );
};

export default FontPairing;
