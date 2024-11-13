const NUMERIC_RE = /^\d*$/;
const ALPHANUMERIC_RE = /^[\dA-Z $%*+\-./;]*$/;
const LATIN1_RE = /^[\x00-\xff]*$/;
const KANJI_RE =
  /^[\p{Script_Extensions=Han}\p{Script_Extensions=Hiragana}\p{Script_Extensions=Katakana}]*$/u;

// Version 2 example
// length of bits supported per version. V 1-9, V 10-26, V 27-40
const LENGTH_BITS = [
  // Numeric
  [10, 12, 14],
  // Alphanumeric
  [9, 11, 13],
  // byte
  [8, 16, 16],
  // kanji
  [8, 10, 12],
];

export function getEncodingMode(text: string) {
  if (NUMERIC_RE.test(text)) {
    return 0b0001;
  } else if (ALPHANUMERIC_RE.test(text)) {
    return 0b0010;
  } else if (KANJI_RE.test(text)) {
    return 0b1000;
  } else if (LATIN1_RE.test(text)) {
    return 0b0100;
  }

  return 0b0111;
}

export function getLengthBits(mode: number, version: number) {
  const modeIdx = 31 - Math.clz32(mode);
  const bitsIdx = version > 26 ? 2 : version > 9 ? 1 : 0;
  return LENGTH_BITS[modeIdx][bitsIdx];
}
