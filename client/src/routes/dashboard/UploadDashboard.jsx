import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs";
import { Input } from "../../components/ui/input";
import {
  BookOpen,
  Shuffle,
  Save,
  RefreshCw,
  File,
  FileText,
  Lightbulb,
  CheckSquare,
  Upload,
  ArrowLeft,
} from "lucide-react";
import {
  saveStudyContent,
  extractTextFromPDFRequest,
  generateContentRequest,
} from "../../apis/backendAPI";

const UploadDashboard = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [activeMode, setActiveMode] = useState("summary");
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [studyTitle, setStudyTitle] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }

    setUploadedFile(file);
    // Extract text when file is uploaded
    await extractTextFromPDF(file);
  };

  const extractTextFromPDF = async (file) => {
    setIsLoading(true);

    try {
      const data = await extractTextFromPDFRequest(file);
      setExtractedText(data.text); // Use the extracted text from the response
    } catch (error) {
      console.error("Error extracting text:", error.message || error);
      alert("Failed to extract text from PDF");
    } finally {
      setIsLoading(false);
    }
  };

  const generateContent = async () => {
    if (!extractedText) {
      alert("Please wait for text extraction to complete");
      return;
    }

    setIsLoading(true);

    try {
      const data = await generateContentRequest(extractedText, activeMode);
      setGeneratedContent({
        type: activeMode,
        content: data[activeMode], // Use the mode-specific content from the response
      });
    } catch (error) {
      console.error("Error generating content:", error.message || error);
      alert("Failed to generate content");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = () => {
    if (!studyTitle.trim()) {
      alert("Please enter a title for your study tools");
      return;
    }

    const contentToSave = {
      title: studyTitle,
      type: activeMode,
      content: generatedContent,
      timestamp: new Date().toISOString(),
      fileName: uploadedFile?.name,
      userId: 1, //TODO: Replace with actual userId
    };

    saveStudyContent(contentToSave);

    console.log("Saving content:", contentToSave);
    alert("Content saved successfully!");
  };

  const renderContent = () => {
    if (!generatedContent) return null;

    switch (generatedContent.type) {
      case "summary":
        return (
          <div className="p-4 bg-gray-50 rounded-lg">
            <h3 className="font-bold mb-2">Summary</h3>
            <p>{generatedContent.content}</p>
          </div>
        );
      case "flashcards":
        return (
          <div className="space-y-4">
            {Array.isArray(generatedContent.content) &&
              generatedContent.content.map((card, index) => (
                <Card
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <CardHeader>
                    <CardTitle>Flashcard {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="font-semibold mb-2">Question:</div>
                    <p className="mb-4">{card.question}</p>
                    <div className="font-semibold mb-2">Answer:</div>
                    <p>{card.answer}</p>
                  </CardContent>
                </Card>
              ))}
          </div>
        );
      case "quiz":
        return (
          <div className="space-y-4">
            {Array.isArray(generatedContent.content) &&
              generatedContent.content.map((quizItem, index) => (
                <Card
                  key={index}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <CardHeader>
                    <CardTitle>Question {index + 1}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4">{quizItem.question}</p>
                    <div className="space-y-2">
                      {quizItem.options.map((option, optIndex) => (
                        <Button
                          key={optIndex}
                          variant="outline"
                          className="w-full justify-start"
                        >
                          {option}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* File Upload Section */}
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Upload className="mr-2" /> Upload Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center w-full">
              <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <File className="w-10 h-10 text-gray-400 mb-3" />
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PDF, DOCX, TXT (MAX. 5MB)
                  </p>
                </div>
                <Input
                  type="file"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {uploadedFile && (
              <div className="mt-4 flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                <div className="flex items-center">
                  <FileText className="mr-2 text-gray-600" />
                  <span className="text-sm">{uploadedFile.name}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setUploadedFile(null)}
                >
                  Remove
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content Generation Section */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Study Tools</CardTitle>
            {/* Add title input field */}
            <div className="mt-4">
              <Input
                placeholder="Enter title for your study tools"
                value={studyTitle}
                onChange={(e) => setStudyTitle(e.target.value)}
                className="w-full"
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs
              defaultValue="summary"
              value={activeMode}
              onValueChange={setActiveMode}
            >
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="summary">
                  <BookOpen className="mr-2" /> Summary
                </TabsTrigger>
                <TabsTrigger value="flashcards">
                  <Lightbulb className="mr-2" /> Flashcards
                </TabsTrigger>
                <TabsTrigger value="quiz">
                  <CheckSquare className="mr-2" /> Quiz
                </TabsTrigger>
              </TabsList>

              {/* Action Buttons */}
              <div className="flex space-x-2 mb-4">
                <Button
                  onClick={generateContent}
                  disabled={!uploadedFile || isLoading}
                  className="flex-grow"
                >
                  {isLoading ? "Generating..." : "Generate"}
                </Button>
                <Button
                  variant="outline"
                  onClick={generateContent}
                  disabled={!generatedContent || isLoading}
                >
                  <RefreshCw className="mr-2" /> Regenerate
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSave}
                  disabled={!generatedContent || !studyTitle.trim()}
                >
                  <Save className="mr-2" /> Save
                </Button>
              </div>

              {/* Generated Content Area */}
              <div className="mt-4 max-h-[500px] overflow-y-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center h-64">
                    <Shuffle className="animate-spin text-gray-400" size={48} />
                  </div>
                ) : (
                  renderContent()
                )}
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
      {/* Back to Dashboard Button */}
      <div className="mt-8 flex justify-center">
        <Button
          variant="outline"
          onClick={() => navigate("/")}
          className="w-full max-w-xs"
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default UploadDashboard;
