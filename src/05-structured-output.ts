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
  recipe: z.object({
    name: z.string().describe("The title of the recipe"),
    ingredients: z
      .array(
        z.object({
          name: z.string(),
          amount: z.string(),
        })
      )
      .describe("The ingredients needed for the recipe"),
    steps: z.array(z.string()).describe("The steps to make the recipe"),
  }),
});

async function createRecipe(prompt: string, model: LanguageModel) {
  const { object } = await generateObject({
    model,
    system:
      `You are helping a user create a recipe. ` +
      `Use British English variants of ingredient names, like Coriander over Cilantro.`,
    schemaName: "Recipe",
    schema,
    prompt,
  });

  return object.recipe;
}

const recipe = await createRecipe("How to make baba ganoush?", openAIModel);

console.log(recipe);
