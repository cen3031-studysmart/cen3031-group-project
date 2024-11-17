import OpenAI from "openai";
// import { extractTextFromPDF } from "../utils/extractTextFromPDF";
import { fetchExtractedTextFromPDF } from "./backendAPI";
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_KEY,
  dangerouslyAllowBrowser: true,
});

async function summarizePDF(pdfFile) {
  console.log("Starting summarization for:", pdfFile.name);

  try {
    const resp = await fetchExtractedTextFromPDF(pdfFile); // Extract text from PDF
    console.log("Text extracted successfully.");
    const extractedText = resp.text;

    const prompt = `
      You are a helpful assistant. I will provide you with a long text. Please read the text carefully and return a JSON object that includes the following three elements:
      
      1. **Summary**: A concise summary of the main points in the text.
      2. **Flashcards**: A list of 10 flashcards. Each flashcard should be in the format {"question": "", "answer": ""} and should cover key concepts, terms, or ideas from the text.
      3. **Multiple Choice Questions**: A list of 10 multiple-choice questions. Each question should be in the format {"question": "", "options": ["", "", "", ""], "answer": ""} where "answer" is the correct option.
      
      Please ensure that the JSON is structured as follows:
      {
          "summary": "Your summary here",
          "flashcards": [
              {"question": "Flashcard question 1", "answer": "Flashcard answer 1"},
              {"question": "Flashcard question 2", "answer": "Flashcard answer 2"},
              ...
          ],
          "multiple_choice_questions": [
              {
                  "question": "Multiple choice question 1",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "answer": "Correct answer"
              },
              {
                  "question": "Multiple choice question 2",
                  "options": ["Option A", "Option B", "Option C", "Option D"],
                  "answer": "Correct answer"
              },
              ...
          ]
      }
      
      Please parse the text carefully and ensure each element is accurate and relevant.
      
      Text: ${extractedText}
      `;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      max_tokens: 2000,
      messages: [
        { role: "system", content: prompt },
      ],
    });
    console.log("Response from OpenAI:", response.choices[0].message.content);
    const result = JSON.parse(response.choices[0].message.content.trim());
    return result;
  } catch (error) {
    console.error("Error summarizing PDF:", error);
    throw error;
  }
}

export { summarizePDF };
