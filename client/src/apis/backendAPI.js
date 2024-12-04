import axios from 'axios';

const extractTextFromPDFRequest = async (file) => {
    const formData = new FormData();
    formData.append("pdf", file);
  
    try {
      const response = await axios.post("http://localhost:3000/api/extract-text", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      return response.data; // Return the extracted text data
    } catch (error) {
      console.error("Error in extractTextFromPDFRequest:", error.message || error);
      throw error; // Propagate the error for handling in the calling function
    }
  };

  const generateContentRequest = async (text, mode) => {
    try {
      const response = await axios.post("http://localhost:3000/api/generate-content", {
        text,
        mode,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      return response.data; // Return the generated content data
    } catch (error) {
      console.error("Error in generateContentRequest:", error.message || error);
      throw error; // Propagate the error for handling in the calling function
    }
  };

const fetchUserStudyMaterials = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/api/study-materials/${userId}`);
      console.log("Response:", response.data); 
      return response.data; 
    } catch (error) {
      console.error("Error fetching:", error.message || error);
      throw error;
    }
  };


  const saveStudyContent = async (studyContent) => {
    console.log("Saving Content (backendAPI)");
  
    try {
      const response = await axios.post("http://localhost:3000/api/save-study-content", studyContent, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response from server:", response.data);
      return response.data; // Return the response data for further use
    } catch (error) {
      console.error("Error saving study content:", error.message || error);
      throw error; // Propagate the error for handling by the calling function
    }
  };

export { fetchUserStudyMaterials, saveStudyContent, extractTextFromPDFRequest, generateContentRequest};
