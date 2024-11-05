import { hexToRgb } from "./convertHexToRgb";

export function hexToHsl(hex: string) {
  const [r, g, b] = hexToRgb(hex);

  // Convert RGB to HSL
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let delta = max - min;

  if (delta < 0) {
    delta *= -1;
  }

  let h;
  if (max === min) {
    // achromatic
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (60 * ((g - b) / delta) + 360) % 360;
        break;
      case g:
        h = (60 * ((b - r) / delta) + 120) % 360;
        break;
      default: // b
        h = (60 * ((r - g) / delta) + 240) % 360;
    }
  }

  const l = (max + min) / 2 / 255;

  let s = 0;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1)) / 255;
  } else {
    // achromatic
    s = 0;
  }

  return [
    Number(h.toFixed(0)),
    Number((s * 100).toFixed(0)),
    Number((l * 100).toFixed(0)),
  ];
}
