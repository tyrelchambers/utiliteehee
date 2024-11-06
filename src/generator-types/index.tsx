import ColourPalette from "./ColourPalette";

export type Generator = "colour-palette";
export const getGenerator = (type: Generator) => {
  switch (type) {
    case "colour-palette":
      return ColourPalette;
  }
};
