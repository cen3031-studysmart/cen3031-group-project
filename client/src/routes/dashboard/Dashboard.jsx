import * as React from "react";
import { useNavigate } from "react-router-dom";
import UploadPDF from "../../components/UploadPDF";
import FlashcardsDash from "../../components/FlashcardsDash";
import QuizDash from "../../components/QuizDash";
import SummariesDash from "../../components/SummariesDash";
import Modal from "../../components/modal/Modal";
import FlashcardModal from "../../components/modal/FlashcardModal";
import QuizModal from "../../components/modal/QuizModal";
import "./Dashboard.css";
import { summarizePDF } from "../../apis/openai";

function Dashboard() {
  const navigate = useNavigate();
  const [pdfSummary, setPdfSummary] = React.useState("");
  const [pdfFlashcards, setPdfFlashcards] = React.useState([]);
  const [pdfQuiz, setPdfQuiz] = React.useState([]);
  const [showSummaryModal, setShowSummaryModal] = React.useState(false);
  const [showFlashcardModal, setShowFlashcardModal] = React.useState(false);
  const [showQuizModal, setShowQuizModal] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const handlePDFUpload = async (pdfFile) => {
    setIsUploading(true);
    const resp = await summarizePDF(pdfFile);
    setPdfSummary(resp.summary);
    setPdfFlashcards(resp.flashcards);
    setPdfQuiz(resp.multiple_choice_questions);
    setIsUploading(false);
  };

  const handleViewSummaries = () => {
    setShowSummaryModal(true);
  };

  const handleReviewFlashcards = () => {
    setShowFlashcardModal(true);
  };

  const handlePracticeQuiz = () => {
    setShowQuizModal(true);
  };

  const handleCloseModal = () => {
    setShowSummaryModal(false);
    setShowFlashcardModal(false);
    setShowQuizModal(false);
  };

  return (
    <>
      <div className="dashboard-container">
        <div className="page-title-container">
          <h2 className="page-title-text">User Dashboard</h2>
        </div>

        <div className="dashboard-top-section">
          <div className="upload-pdf">
            <UploadPDF onUpload={handlePDFUpload} isUploading={isUploading} />
          </div>
        </div>
        <div className="dashboard-bottom-section">
          <div className="section-container" onClick={handleViewSummaries}>
            <SummariesDash />
          </div>
          <div className="section-container" onClick={handleReviewFlashcards}>
            <FlashcardsDash />
          </div>
          <div className="section-container" onClick={handlePracticeQuiz}>
            <QuizDash />
          </div>
        </div>
      </div>

      <Modal show={showSummaryModal} onClose={handleCloseModal} title="PDF Summary">
        <p>{pdfSummary}</p>
      </Modal>

      <FlashcardModal show={showFlashcardModal} onClose={handleCloseModal} flashcards={pdfFlashcards} />

      <QuizModal show={showQuizModal} onClose={handleCloseModal} quiz={pdfQuiz} />
    </>
  );
}

export default Dashboard;