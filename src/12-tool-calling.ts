import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateText, type LanguageModel, tool } from "ai";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config({ path: "../.env" });

const openAIModel = openai("gpt-4o");
const googleModel = google("gemini-2.0-flash-001");
const anthropicModel = anthropic("claude-3-7-sonnet-20250219");

const logToConsoleTool = tool({
  description: "Log a message to the console",
  parameters: z.object({
    message: z.string().describe("The message to log to the console"),
  }),
  execute: async ({ message }) => {
    console.log(message);
  },
});

const logToConsole = async (prompt: string, model: LanguageModel) => {
  await generateText({
    model,
    prompt,
    system:
      `Your only role in life is to log ` +
      `messages to the console. ` +
      `Use the tool provided to log the ` +
      `prompt to the console.`,
    tools: {
      logToConsole: logToConsoleTool,
    },
  });
};

logToConsole("Hello, Community Day!", openAIModel);
