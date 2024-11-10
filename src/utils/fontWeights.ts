export const fontWeights = (
  variants: string[] | undefined
): Map<string, string> => {
  if (!variants) return new Map();

  const weights = new Map();

  for (let i = 0; i < variants.length; i++) {
    const element = variants[i];
    const pattern = /(\d+)(\w+)/gi;

    if (element === "regular") {
      weights.set("regular", "");
    } else if (element === "italic") {
      weights.set("regular", "italic");
    }

    /**
     * In ['100', '100italic'] we check to see if "italic" or any string exists so we can capture the weight and style
     */
    if (/[a-zA-Z]+/.test(element)) {
      const matches = element.matchAll(pattern);
      for (const match of matches) {
        const weight = match[1];
        const style = match[2];

        weights.set(weight, style);
      }
    } else {
      weights.set(element, "");
    }
  }

  return weights;
};
