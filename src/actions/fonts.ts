"use server";

import { Font } from "@/generator-types/FontPairing";
import { readdirSync } from "fs";
import path from "path";

export const loadFontsFromCache = async () => {
  const savedFonts = path.resolve(__dirname, "../cache/fonts");
  console.log("---> ", __filename);

  console.log(readdirSync(savedFonts));
};
