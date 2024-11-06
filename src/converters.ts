import { ColourType } from "./types";
import { hslToHex } from "./utils/hslToHex";
import { hslToRgb } from "./utils/hslToRgb";

export const toJson = (colors: number[][], type: ColourType) => {
  const payload: Record<string, string | number> = {};

  for (let i = 0; i < colors.length; i++) {
    let c;

    switch (type) {
      case "hex":
        c = hslToHex(colors[i][0], colors[i][1], colors[i][2]);
        break;
      case "rgb":
        c = `rgb(${colors[i][0]}, ${colors[i][1]}, ${colors[i][2]})`;
        break;
      case "hsl":
        c = `hsl(${colors[i][0]}, ${colors[i][1]}%, ${colors[i][2]}%)`;
        break;
    }

    payload[`color-${i + 1}`] = c;
  }
  return payload;
};

export const toCss = (colors: number[][], type: ColourType) => {
  let payload;
  switch (type) {
    case "hex":
      payload = colors
        .map((c, i) => `--color-${i + 1}: ${hslToHex(c[0], c[1], c[2])};`)
        .join("\n");
      break;
    case "rgb":
      payload = `${colors
        .map((c, i) => `--color-${i + 1}: rgb(${c[0]}, ${c[1]}, ${c[2]});`)
        .join("\n")})`;
      break;
    case "hsl":
      payload = `${colors
        .map((c, i) => `--color-${i + 1}: hsl(${c[0]}, ${c[1]}%, ${c[2]}%);`)
        .join("\n")}`;
      break;
  }
  return payload;
};

export const toSass = (colors: number[][], type: ColourType) => {
  let payload;
  switch (type) {
    case "hex":
      payload = colors
        .map((c, i) => `$color-${i + 1}: ${hslToHex(c[0], c[1], c[2])};`)
        .join("\n");
      break;
    case "rgb":
      payload = `${colors
        .map((c, i) => `$color-${i + 1}: rgb(${c[0]}, ${c[1]}, ${c[2]});`)
        .join("\n")})`;
      break;
    case "hsl":
      payload = `${colors
        .map((c, i) => `$color-${i + 1}: hsl(${c[0]}, ${c[1]}%, ${c[2]}%);`)
        .join("\n")}`;
      break;
  }

  return payload;
};
