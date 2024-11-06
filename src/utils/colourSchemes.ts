import { hexToHsl } from "./convertHexToHsl";

export const generateAnalogousScheme = (hex: string, colourCount: number) => {
  const n = colourCount;
  const degree = 15;
  const [h, s, l] = hexToHsl(hex);

  const shades = [];

  const startingHue = h - (degree * n) / 2;
  for (let index = 0; index < n; index++) {
    shades.push([startingHue + degree * index, s, l]);
  }

  return shades;
};

export const generateComplimentaryScheme = (hex: string) => {
  const [h, s, l] = hexToHsl(hex);
  return [
    [h, s, l],
    [h + 180, s, l],
  ];
};

export const generateMonochrome = (hex: string, colourCount: number) => {
  const numOfColours = colourCount;
  const [h, s] = hexToHsl(hex);
  const colours = [];

  for (let i = 0; i < numOfColours; i++) {
    let newL;

    if (i === 0) {
      newL = (1 / numOfColours) * (i + 0.35) * 100;
    } else {
      newL = (1 / numOfColours) * i * 100;
    }

    colours.push([h, s, newL]);
  }

  return colours;
};

export const generateTriadic = (hex: string) => {
  const [h, s, l] = hexToHsl(hex);

  const shades = [];

  for (let index = 1; index < 3; index++) {
    if (index === 1) {
      shades.push([h, s, l]);
    }
    const hue = h + 120 * index;
    shades.push([hue, s, l]);
  }

  return shades;
};

export const generateTetradic = (hex: string) => {
  const [h, s, l] = hexToHsl(hex);

  const shades = [];

  for (let index = 1; index < 4; index++) {
    if (index === 1) {
      shades.push([h, s, l]);
    }
    const hue = h + 90 * index;
    shades.push([hue, s, l]);
  }

  return shades;
};
