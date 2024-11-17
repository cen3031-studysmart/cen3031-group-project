import axios from 'axios';

const fetchExtractedTextFromPDF = async (pdfFile) => {
    console.log("FETCHING FROM SERVER")
    const formData = new FormData();
    formData.append('pdf', pdfFile);

    try {
        const response = await axios.post('http://localhost:3000/api/uploadPDF', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading PDF:', error);
        throw error;
    }
};

export {fetchExtractedTextFromPDF};