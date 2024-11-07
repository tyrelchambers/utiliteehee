const loremWords = [
  "sunt",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "ut",
  "aliquip",
  "ex",
  "ea",
  "commodo",
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
