export const rgbToHex = (r: number, g: number, b: number) => {
  const toHex = (component: number) => component.toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(b)}${toHex(g)}`;
};
