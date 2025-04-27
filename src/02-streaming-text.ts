// import { openai } from "@ai-sdk/openai";
// import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// const model = openai("gpt-4o");
// const model = google("gemini-2.0-flash-001");
const model = anthropic("claude-3-7-sonnet-20250219");

async function answerMyQuestion(prompt: string) {
  const { textStream } = await streamText({
    model,
    prompt,
  });

  for await (const text of textStream) {
    process.stdout.write(text);
  }

  return textStream;
}

await answerMyQuestion("what is the chemical formula for dihydrogen monoxide?");
