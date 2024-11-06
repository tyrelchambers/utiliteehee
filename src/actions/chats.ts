"use server";

const WEBUI_CHATS_URL = `${process.env.WEBUI_URL}/api/chat/completions`;

export const getDailyMotivation = async () => {
  const prompt = `Give me some motivation to start my day in 3 sentences or less. No preamble. Just the 3 sentences or less.`;

  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await fetch(WEBUI_CHATS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WEBUI_TOKEN}`,
    },
    body: JSON.stringify(structure),
    next: {
      revalidate: 86400,
    },
  }).then((res) => res.json());

  if (!response) {
    throw new Error("Failed to fetch daily motivation: " + response);
  }

  return response.choices[0].message.content;
};
