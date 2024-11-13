export function toTitleCase(str: string) {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function toSentenceCase(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function toSarcasticCase(str: string) {
  const newStr = [];
  let toggle = true;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === " ") {
      newStr.push(" ");
      continue;
    }

    if (toggle) {
      newStr.push(str[i].toUpperCase());
    } else {
      newStr.push(str[i].toLowerCase());
    }
    toggle = !toggle;
  }

  return newStr.join("");
}
