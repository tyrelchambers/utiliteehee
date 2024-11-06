export function generateLoremIpsum(numParagraphs: number) {
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
  const paragraphs = [];

  function generateParagraph() {
    const paragraph: string[] = [];
    let minWordCount = 5;
    let maxWordCount = 5;
    let sentenceCount = 3;

    function generateSentence() {
      const wordCount = Math.floor(
        Math.random() * (maxWordCount - minWordCount) + minWordCount
      );

      for (let j = 0; j < wordCount; j++) {
        let word = loremWords[Math.floor(Math.random() * loremWords.length)];

        word = word.charAt(0).toUpperCase() + word.slice(1);

        if (j === wordCount - 1) {
          word += ".";
        }

        paragraph.push(word);
      }

      return paragraph.join(" ");
    }

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
