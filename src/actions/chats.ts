"use server";

const WEBUI_CHATS_URL = `${process.env.WEBUI_URL}/api/chat/completions`;

const fetchResponse = async (
  structure: Record<string, any>,
  nextOpts?: NextFetchRequestConfig
) => {
  const response = await fetch(WEBUI_CHATS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.WEBUI_TOKEN}`,
    },
    body: JSON.stringify(structure),
    next: nextOpts,
  }).then((res) => res.json());

  if (!response) {
    throw new Error("Failed to fetch daily motivation: " + response);
  }

  return response.choices[0].message.content;
};

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

  return await fetchResponse(structure, {
    revalidate: 86400,
  });
};

export const getFantasyName = async (universe: string | undefined) => {
  const jsonStructure = `{
    name: "",
    backstory: ""
  }`;
  const prompt = `Give me a fantasy name ${
    universe ? `in the ${universe} universe` : ""
  }. No other follow up responses. Just the names with maybe a fun one sentence backstory accompanying the name. Give me an array of JSON structure: ${jsonStructure}. Fill in the blanks appropriately. and return a JSON array. No special characters like backticks.`;

  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "system",
        content:
          "You are a fantasy name generator. If anyone asks for something other than what sounds like it could be a universe of characters, reject it.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await fetchResponse(structure);

  try {
    JSON.parse(response);
  } catch (error) {
    console.log(error);
    Error("Failed to parse JSON: " + response);
  }

  return response;
};

export const generateBusinessName = async (
  query: string | undefined,
  sector: string | undefined
) => {
  const jsonStructure = `{
    name: ""
  }`;

  const prompt = `Give me a list of business name ideas for ${query} in the ${sector} sector. No other follow up responses. Just the names. Give me an array of JSON structure: ${jsonStructure}. Fill in the blanks appropriately. and return a JSON array. No special characters like backticks.`;

  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await fetchResponse(structure);

  try {
    JSON.parse(response);
  } catch (error) {
    console.log(error);
    Error("Failed to parse JSON: " + response);
  }

  return response;
};

export const generateCatchPhrase = async () => {
  const prompt = `Give me a catchy catchphrase for myself. Something that would be a little over and above, funny and outlandish. No other follow up responses. Just the phrase.`;
  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const resp = await fetchResponse(structure);

  return resp;
};

export const generateExcuse = async () => {
  const prompt = `Give me an excuse for getting out of an event or a reason why I can't go somewhere or do something. Something that would be a little over and above, funny and outlandish. No other follow up responses. Just the phrase.`;
  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const resp = await fetchResponse(structure);

  return resp;
};

export const generateNickname = async () => {
  const jsonStructure = `{
    name: ""
  }`;

  const prompt = `Give me a list of nicknames. Something that would be a little over and above, funny and outlandish. No other follow up responses. Just the phrase. Give me an array of JSON structure: ${jsonStructure}. Fill in the blanks appropriately. and return a JSON array. No special characters like backticks.`;
  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const response = await fetchResponse(structure);

  try {
    JSON.parse(response);
  } catch (error) {
    console.log(error);
    Error("Failed to parse JSON: " + response);
  }

  return response;
};
