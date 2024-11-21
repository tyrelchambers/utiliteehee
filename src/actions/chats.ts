"use server";

import { convertCommaStringToArray } from "@/utils/convertCommaStringToArray";

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

  const prompt = `Give me a list of business name ideas for ${query} in the ${sector} sector. No other follow up responses. Just the names. Give me an array of JSON structure: ${jsonStructure}. Fill in the blanks appropriately. and return a JSON array. No special characters like backticks. It should be able to be parsed by JSON. Adhere to my jsonStructure. Only return JSON.`;

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
    console.log("Response: ", response);

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

interface WritingPromptProps {
  interests: string | undefined;
  style: string | undefined;
  tone: string | undefined;
  era: string | undefined;
  themes: string | undefined;
  writingStyle: string | undefined;
  constraints: string | undefined;
  additionalInfo: string | undefined;
}

export const generateWritingPrompt = async ({
  interests,
  style,
  tone,
  era,
  themes,
  writingStyle,
  constraints,
  additionalInfo,
}: WritingPromptProps) => {
  const prompt = `
  Give me a writing prompt. No other follow up responses. Just the phrase. this should be suitable for someone wanting to write a story. 

  ---- CONTEXT
  Follow these guidelines if they are present:

  Interests: ${convertCommaStringToArray(interests)}
  Style: ${convertCommaStringToArray(style)}
  Tone: ${convertCommaStringToArray(tone)}
  Era: ${convertCommaStringToArray(era)}
  Themes: ${convertCommaStringToArray(themes)}
  Writing Style: ${convertCommaStringToArray(writingStyle)}
  Constraints: ${convertCommaStringToArray(constraints)}
  Additional Info: ${additionalInfo}

  `;

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

export const getRomanEmpireFacts = async () => {
  const prompt = `Give me a list of facts about the Roman Empire. No follow ups and no fluff. You won't be interacted with.`;
  const structure = {
    model: process.env.OLLAMA_MODEL,
    messages: [
      {
        role: "system",
        content: "You are an expert historian on the roman empire.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
  };

  const resp = await fetchResponse(structure);

  return resp;
};
