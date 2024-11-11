import ColourPalette from "./ColourPalette";
import FontPairing from "./FontPairing";
import LoremIpsom from "./LoremIpsom";
import QRCodeGen from "./QRCodeGen";
import SkibidiIpsum from "./SkibidiIpsum";
import UUID from "./UUID";

export type Generator =
  | "colour-palette"
  | "lorem-ipsum"
  | "skibidi-ipsum"
  | "uuid"
  | "font-pairing"
  | "qr-code";
export const getGenerator = (type: Generator) => {
  switch (type) {
    case "colour-palette":
      return ColourPalette;
    case "lorem-ipsum":
      return LoremIpsom;
    case "skibidi-ipsum":
      return SkibidiIpsum;
    case "uuid":
      return UUID;
    case "font-pairing":
      return FontPairing;
    case "qr-code":
      return QRCodeGen;
    default:
      return () => null;
  }
};
