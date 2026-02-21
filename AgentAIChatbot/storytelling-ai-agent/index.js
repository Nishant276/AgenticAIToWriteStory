import dotenv from "dotenv";
import readline from "readline";
import path from "path";
import { fileURLToPath } from "url";
import { generateStory } from "./agent/storyAgent.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log("📖 Storytelling AI Agent is running!");

function start() {
  rl.question("> ", async (input) => {
    const response =await generateStory(input)
    console.log("\n" + response + "\n");
    start();
  });
}

start();
