import { anthropic } from "@ai-sdk/anthropic";
import { google } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateObject, type LanguageModel } from "ai";
import dotenv from "dotenv";
import { z } from "zod";
dotenv.config({ path: "../.env" });

const openAIModel = openai("gpt-4o");
const googleModel = google("gemini-2.0-flash-001");
const anthropicModel = anthropic("claude-3-7-sonnet-20250219");

const schema = z.object({
  name: z.string().describe("The name of the person."),
  age: z.number().describe("The age of the person."),
  email: z.string().describe("The email of the person."),
});

async function generateArray(prompt: string, model: LanguageModel) {
  const { object } = await generateObject({
    model,
    output: "array",
    schema,
    prompt,
    system: `You are generating fake data.`,
  });

  return object;
}

const fakeData = await generateArray(
  "Generate 5 users from Romania.",
  anthropicModel
);

console.dir(fakeData, { depth: null });
