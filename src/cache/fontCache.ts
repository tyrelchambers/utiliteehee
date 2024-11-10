import { loadFontsFromCache } from "@/actions/fonts";
import { Font } from "@/generator-types/FontPairing";
import { readdirSync } from "fs";
import path from "path";

class FontCache {
  private cache: Map<string, string> = new Map();
  constructor() {
    loadFontsFromCache();
  }

  add(font: Font["items"][0]) {
    // const FONT_FOLDER = "./fonts";
    // const savedFonts = path.resolve(__dirname, FONT_FOLDER);
    // if (!this.cache.has(font.family)) {
    //   this.cache.set(font.family, font.family);
    // }
  }

  get(font: string) {}
}

export default FontCache;
