import FontPairingBody from "@/components/FontPairingBody";
import Heading from "@/components/Heading";
import GeneratorWrapper from "@/layouts/GeneratorWrapper";
import React from "react";

const fav = {
  name: "font-pairing",
  label: "Font Pairing",
};

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
    <GeneratorWrapper
      title="Font Pairing"
      description="Find the best font pairings in the universe with this handy font pairing tool."
      favourite={fav}
    >
      <FontPairingBody fonts={allFonts} />
    </GeneratorWrapper>
  );
};

export default FontPairing;
