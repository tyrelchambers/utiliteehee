import ColourPalette from "./ColourPalette";
import LoremIpsom from "./LoremIpsom";
import SkibidiIpsum from "./SkibidiIpsum";

export type Generator = "colour-palette" | "lorem-ipsum" | "skibidi-ipsum";
export const getGenerator = (type: Generator) => {
  switch (type) {
    case "colour-palette":
      return ColourPalette;
    case "lorem-ipsum":
      return LoremIpsom;
    case "skibidi-ipsum":
      return SkibidiIpsum;
    default:
      return () => null;
  }
};
