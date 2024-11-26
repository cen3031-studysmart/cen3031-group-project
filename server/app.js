import express from 'express';
import multer from 'multer';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createUser } from './db.js';

dotenv.config();

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

const app = express();

//TODO: Temp Storage, needs to be hooked to DB
const savedContents = [];

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());

const upload = multer({ 
    dest: 'uploads/',
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});
app.use("/api/study-materials", (req, res, next) => {
    req.params.userId = req.params.userId?.toLowerCase();
    next();
});

app.use((req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.originalUrl}`);
    next();
});

// Mock response
const mockData = {
    summaries: [
      {
        id: 1,
        title: "Biology Chapter 1",
        date: "2024-03-20",
        content: "Biology is the study of life and organisms...",
      },
      {
        id: 2,
        title: "History Essay",
        date: "2024-03-19",
        content: "The Renaissance was a pivotal period in history...",
      },
    ],
    flashcards: [
      {
        id: 1,
        title: "Spanish Vocab",
        date: "2024-03-18",
        content: [
          {
            question: "How do you say 'apple' in Spanish?",
            answer: "Manzana",
          },
          {
            question: "What is 'library' in Spanish?",
            answer: "Biblioteca",
          },
        ],
      },
      {
        id: 2,
        title: "Chemistry Terms",
        date: "2024-03-17",
        content: [
          { question: "What is the formula for water?", answer: "H2O" },
          {
            question: "What is the pH of a neutral solution?",
            answer: "7",
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 1,
        title: "Math Quiz",
        date: "2024-03-16",
        content: [
          {
            question: "What is 2 + 2?",
            options: ["3", "4", "5"],
            correctAnswer: "4",
          },
          {
            question: "What is the square root of 16?",
            options: ["2", "4", "8"],
            correctAnswer: "4",
          },
        ],
      },
    ],
  };

// Helper function to clean JSON string
const cleanJsonString = (str) => {
    // Remove code fence if present
    str = str.replace(/```json\n/g, '').replace(/```/g, '');
    // Remove any markdown formatting
    str = str.replace(/\*\*/g, '');
    return str.trim();
};

//Extracts Text From PDF
app.post('/api/extract-text', upload.single('pdf'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log("Received request to /api/extract-text");
    const filePath = req.file.path;
    console.log("File path:", filePath);

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        console.log("PDF processing complete");
        res.json({ text: data.text });
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        res.status(500).json({ error: 'Failed to extract text from PDF' });
    } finally {
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            console.error("Error deleting file:", error);
        }
    }
});

//Call to OpenAI (ChatGPT)
app.post('/api/generate-content', async (req, res) => {
    const { text, mode } = req.body;

    if (!text) {
        return res.status(400).json({ error: 'No text provided' });
    }

    const prompt = `
      You are a helpful assistant. Please read the following text carefully and create three types of content. 
      Respond ONLY with a JSON object in the following exact format, with no additional text or formatting:
      {
        "summary": "concise summary here",
        "flashcards": [
          {"question": "q1", "answer": "a1"},
          {"question": "q2", "answer": "a2"}
        ],
        "quiz": [
          {
            "question": "q1",
            "options": ["o1", "o2", "o3", "o4"],
            "answer": "correct option"
          },
          {
            "question": "q2",
            "options": ["o1", "o2", "o3", "o4"],
            "answer": "correct option"
          }
        ]
      }

      Create a summary, 10 flashcards, and 10 multiple choice questions based on this text: ${text}`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: "system",
                    content: "You are a helpful AI tutor that excels at summarizing text and creating educational content. Always respond with valid JSON only."
                },
                {
                    role: "user",
                    content: prompt
                }
            ],
            temperature: 0.7,
            max_tokens: 3000
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        let result = response.data.choices[0].message.content;
        
        // Clean up the response
        result = cleanJsonString(result);
        
        try {
            const parsedResult = JSON.parse(result);
            console.log('Successfully parsed result');
            
            // Return only the requested content based on mode
            if (mode && parsedResult[mode]) {
                res.json({ [mode]: parsedResult[mode] });
            } else {
                res.json(parsedResult);
            }
        } catch (parseError) {
            console.error('JSON Parse Error:', parseError);
            console.log('Raw result:', result);
            res.status(500).json({ 
                error: 'Failed to parse OpenAI response',
                raw: result 
            });
        }
    } catch (error) {
        console.error('OpenAI API error:', error);
        res.status(500).json({ error: 'Failed to process content' });
    }
});

//TODO: Add db query to fetchStudyMaterials, use mockData (above) as example of format.
// Route to fetch user study materials
app.get("/api/study-materials/:userId", (req, res) => {
    const { userId } = req.params;

    if (!userId) {
        return res.status(400).json({ error: "UserId is required" });
    }

    console.log(`Fetching study materials for userId: ${userId}`);
    res.status(200).json(mockData);
});

// Route to save study content
app.post("/api/save-study-content", (req, res) => {
    const { title, type, content, timestamp, fileName, userId } = req.body;
  
    // Validate the incoming data
    if (!title || !type || !content || !timestamp) {
      return res.status(400).json({ error: "Missing required fields" });
    }
  
    console.log("Saving study content:", req.body);
  
    //TODO: Add Query To Save to DB
    // Simulate saving to a database
    const newContent = {
      id: savedContents.length + 1, // Simulated ID
      title,
      type,
      content,
      timestamp,
      fileName,
      userId: userId || null, // Optional user ID
    };
  
    savedContents.push(newContent);
  
    // Return a success response
    res.status(201).json({
      message: "Study content saved successfully",
      savedContent: newContent,
    });
  });
  
app.post('/api/user', async (req, res) => {
  const userId = req.body.id;
  
  if (userId.length < 100 && userId.length > 0) {
    await createUser(userId);
    res.sendStatus(200);
  } else {
    res.sendStatus(400);
  }
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));