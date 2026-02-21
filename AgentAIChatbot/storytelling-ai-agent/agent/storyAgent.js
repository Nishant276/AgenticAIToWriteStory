

import { GoogleGenerativeAI } from "@google/generative-ai";
import storytellerPrompt from "../prompts/storytellerPrompt.js";
import { addToMemory, getMemory } from "../memory/storyMemory.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function generateStory(userInput) {
  addToMemory("user", userInput);

  // Prepare the prompt for Gemini
  const history = getMemory()
    .map(msg => `${msg.role === "user" ? "User" : "AI"}: ${msg.content}`)
    .join("\n");
  const prompt = `${storytellerPrompt}\n${history}\nUser: ${userInput}`;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const aiMessage = result.response.text();
  addToMemory("assistant", aiMessage);
  return aiMessage;
}
