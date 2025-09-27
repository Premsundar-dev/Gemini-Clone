// src/config/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
  throw new Error("VITE_GEMINI_API_KEY is not set in your .env file.");
}

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction:
    "You are a helpful and precise assistant. When asked for the full form of an acronym, you MUST state the acronym first and provide the full name correctly. For example: 'HTML stands for HyperText Markup Language.' Never omit the first letter of an acronym.",
});

/**
 * Sanitizes a string by removing zero-width characters and normalizing whitespace.
 * @param {string} str The input string to sanitize.
 * @returns {string} The sanitized string.
 */
function sanitizeText(str) {
  if (!str) return "";
  // remove BOM and zero-width characters
  const cleaned = str.replace(/[\u200B-\u200D\uFEFF]/g, "");
  // normalize and collapse whitespace
  return (cleaned.normalize ? cleaned.normalize("NFKC") : cleaned)
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Generates content using the Gemini model and returns a sanitized response.
 * @param {string} userPrompt The user's prompt.
 * @returns {Promise<string>} The generated and sanitized response.
 */
async function runChat(userPrompt) {
  try {
    const result = await model.generateContent(userPrompt);
    const response = result.response;

    if (!response) {
      console.warn("Empty response object from model.generateContent:", result);
      return "I'm sorry, I couldn't generate a response for that prompt.";
    }

    // Use the SDK's built-in text() method for a reliable text extraction.
    // This handles multi-part responses and problematic characters robustly.
    const rawText = await response.text();
    if (!rawText) {
      return "I'm sorry, I couldn't generate a response for that prompt.";
    }

    // Sanitize the final text to remove any remaining unwanted characters.
    const output = sanitizeText(rawText);

    return output;

  } catch (error) {
    console.error("Error in runChat:", error);
    return "Sorry, there was an error processing your request.";
  }
}

export { runChat };