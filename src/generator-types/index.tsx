import ColourPalette from "./ColourPalette";
import LoremIpsom from "./LoremIpsom";
import SkibidiIpsum from "./SkibidiIpsum";
import UUID from "./UUID";

export type Generator =
  | "colour-palette"
  | "lorem-ipsum"
  | "skibidi-ipsum"
  | "uuid";
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
    default:
      return () => null;
  }
};
