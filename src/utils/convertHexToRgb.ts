export function hexToRgb(hex: string) {
  // Remove the '#' from the start of the string
  hex = hex.replace(/^#/, "");

  // Convert the hexadecimal value to an integer
  const int = parseInt(hex, 16);

  // Calculate the red, green, and blue values by shifting the bits of the integer
  const r = (int >> 16) & 0xff;
  const g = (int >> 8) & 0xff;
  const b = int & 0xff;

  return [r, g, b];
}
