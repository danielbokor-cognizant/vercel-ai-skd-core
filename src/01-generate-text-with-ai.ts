// import { openai } from "@ai-sdk/openai";
// import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// const model = openai("gpt-4o");
// const model = google("gemini-2.0-flash-001");
const model = anthropic("claude-3-haiku-20240307");

async function answerMyQuestion(prompt: string) {
  const { text } = await generateText({
    model,
    prompt,
  });

  return text;
}

const answer = await answerMyQuestion(
  "what is the chemical formula for dihydrogen monoxide?"
);

console.log(answer);
