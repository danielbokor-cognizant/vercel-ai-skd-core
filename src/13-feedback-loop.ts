import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { LanguageModel, streamText, tool } from "ai";
import dotenv from "dotenv";
import z from "zod";
dotenv.config({ path: "../.env" });

const openAIModel = openai("gpt-4o");
const googleModel = google("gemini-2.0-flash-001");
const anthropicModel = anthropic("claude-3-7-sonnet-20250219");

const getWeatherTool = tool({
  description: "Get the current weather in a specified city.",
  parameters: z.object({
    city: z.string().describe("The city to get the wearther for."),
  }),
  execute: async ({ city }) => {
    return `The weather in ${city} is 20 degrees Celsius and sunny.`;
  },
});

async function getWeather(prompt: string, model: LanguageModel) {
  const { textStream } = await streamText({
    model,
    prompt,
    system: `Your purpose is to get the weather for the specified city.`,
    tools: {
      getWeather: getWeatherTool,
    },
    maxSteps: 2,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }
}

getWeather("What is the weather like in Cluj-Napoca?", openAIModel);
