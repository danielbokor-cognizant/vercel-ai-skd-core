// // import { openai } from "@ai-sdk/openai";
// import { google } from "@ai-sdk/google";
import { anthropic } from "@ai-sdk/anthropic";
import { generateText } from "ai";
import dotenv from "dotenv";
dotenv.config({ path: "../.env" });

// const model = openai("gpt-4o");
// const model = google("gemini-2.0-flash-001");
const model = anthropic("claude-3-7-sonnet-20250219");

async function summarizeText(input: string) {
  const { text } = await generateText({
    model,
    prompt: input,
    system:
      `You are a text summarizer. ` +
      `Summarize the text you receive. ` +
      `Be concise. ` +
      `Return only the summary. ` +
      `Do not use the phrase "here is a summary". ` +
      `Highlight relevant phrases in bold. ` +
      `The summary should be two sentences long. `,
  });

  return text;
}

const longText = `In a quiet little cottage tucked at the edge of the woods, an unlikely friendship blossomed between a curious cat named Miso and a clever mouse named Pip. Instead of playing the traditional roles of predator and prey, the two found comfort in each other's company. Miso, with her sleek gray fur and gentle paws, would often nap in the sun-drenched windowsill while Pip perched on her back, telling stories about the tunnels he'd explored beneath the floorboards. They shared crumbs from the kitchen and played games in the garden, chasing leaves rather than each other.

Their bond grew stronger with each passing day, built on trust and an unspoken understanding that friendship could break even the oldest of instincts. When Pip fell ill one winter morning, Miso curled around him, keeping him warm with her purring and bringing little bits of food to his side. And when Miso got caught in a tangle of yarn, it was Pip who chewed her free. Together, they proved that friendship isn't about appearances or expectations—it's about kindness, loyalty, and choosing each other again and again.`;

const summary = await summarizeText(longText);

console.log(summary);
