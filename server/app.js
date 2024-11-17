import express from 'express';
import multer from 'multer';
import fs from 'fs';
// import pdfExtract from 'pdf-extract';
import pdfParse from 'pdf-parse';
import cors from 'cors';

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
};

const app = express();
app.use(cors(corsOptions));
const upload = multer({ dest: 'uploads/' });

app.post('/api/uploadPDF', upload.single('pdf'), async (req, res) => {
    console.log("Received request to /api/uploadPDF");
    const filePath = req.file.path;
    console.log("File path:", filePath);

    try {
        const dataBuffer = fs.readFileSync(filePath);
        const data = await pdfParse(dataBuffer);
        console.log("PDF processing complete");
        res.send({ text: data.text });
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        res.status(500).send({ error: 'Failed to extract text from PDF' });
    } finally {
        fs.unlinkSync(filePath); // Clean up
    }
});

app.listen(3000, () => console.log('App running on port 3000'));