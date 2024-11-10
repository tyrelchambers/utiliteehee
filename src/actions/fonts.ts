"use server";
interface FetchFont {
  name: string;
  weight: string;
}

const FONT_HOST_URL = process.env.FONT_HOST_URL;

export const fetchFont = async (font: FetchFont) => {
  const formattedName = font.name.replace(" ", "+");
  const resp = await fetch(
    `${FONT_HOST_URL}/?fontName=${formattedName}&weight=${
      font.weight || "regular"
    }`,
    {
      method: "GET",
    }
  )
    .then((res) => res.blob())
    .then((blob) => blob.arrayBuffer())
    .then((buffer) => Buffer.from(buffer).toString("base64"));
  return resp;
};
