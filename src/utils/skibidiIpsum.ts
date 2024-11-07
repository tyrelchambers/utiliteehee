const loremWords = [
  "Saucy",
  "G",
  "lowkey",
  "highkey",
  "no cap",
  "Periodt",
  "Tea",
  "Lit",
  "Vibes",
  "Salty",
  "ate",
  "rizz",
  "delulu",
  "skibidi",
  "sigma",
  "drip",
  "bussin",
  "gyat",
  "mewing",
  "cap",
  "fanum tax",
  "sus",
  "goat",
  "bet",
  "basic",
  "it's giving",
  "bop",
  "cringe",
  "fire",
  "big yikes",
  "glow-up",
  "flex",
  "slay",
  "ohio",
  "yeet",
  "ick",
  "Lit",
  "Mid",
  "Big W",
  "Big L",
];

function generateSentence() {
  const minWordCount = 5;
  const maxWordCount = 20;
  const wordCount = Math.floor(
    Math.random() * (maxWordCount - minWordCount) + minWordCount
  );
  const words: string[] = [];

  for (let j = 0; j < wordCount; j++) {
    const randomNum = Math.floor(Math.random() * (loremWords.length - 1) + 1);
    let word = loremWords[randomNum];

    word = word.charAt(0).toUpperCase() + word.slice(1);

    if (j === wordCount - 1) {
      word += ".";
    }

    words.push(word);
  }

  return words.join(" ");
}

export function generateLoremIpsum(numParagraphs: number) {
  const paragraphs = [];

  function generateParagraph() {
    const paragraph: string[] = [];

    const sentenceCount = 3;

    for (let i = 0; i < sentenceCount; i++) {
      const sentence = generateSentence();

      paragraph.push(sentence);
    }

    return paragraph.join(" ");
  }

  for (let i = 0; i < numParagraphs; i++) {
    paragraphs.push(generateParagraph());
  }

  return paragraphs;
}
