/**
 * Converts a hexadecimal color code to an HSL value.
 *
 * @param {string} hex - The hexadecimal color code (e.g. '#FFFFFF', 'FF0000').
 * @returns {Array<number>} An array with the hue, saturation, and lightness values of the HSL color.
 */
export function hexToHsl(hex: string) {
  // Remove the '#' from the start of the string
  hex = hex.replace(/^#/, "");

  // Convert the hexadecimal value to an integer
  const int = parseInt(hex, 16);

  // Calculate the red, green, and blue values by shifting the bits of the integer
  const r = (int >> 16) & 0xff;
  const g = (int >> 8) & 0xff;
  const b = int & 0xff;
  console.log(int, r, g, b);

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

  return [h, (s * 100).toFixed(0), (l * 100).toFixed(0)];
}
