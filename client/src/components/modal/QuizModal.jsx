import React, { useState } from "react";
import Modal from "./Modal";
import "./QuizModal.css";

const QuizModal = ({ show, onClose, quiz = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const handleNext = () => {
    if (selectedOption === quiz[currentIndex].answer) {
      setScore(score + 1);
      setFeedback("Correct!");
    } else {
      setFeedback(`Wrong! The correct answer is ${quiz[currentIndex].answer}`);
    }
    setTimeout(() => {
      setFeedback("");
      setSelectedOption(null);
      if (currentIndex + 1 === quiz.length) {
        setIsQuizComplete(true);
      } else {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 2000);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const handleStartOver = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setScore(0);
    setFeedback("");
    setIsQuizComplete(false);
  };

  if (!quiz || quiz.length === 0) {
    return (
      <Modal show={show} onClose={onClose} title="Quiz">
        <div className="quiz-message">
          <p>Please upload a PDF to generate quiz</p>
        </div>
      </Modal>
    );
  }

  const percentageScore = ((score / quiz.length) * 100).toFixed(2);
  const questionsRemaining = quiz.length - currentIndex - 1;

  return (
    <Modal show={show} onClose={onClose} title="Quiz">
      <div className="quiz-container">
        {isQuizComplete ? (
          <>
            <div className="quiz-final-score">
              Final Score: {score} / {quiz.length} ({percentageScore}%)
            </div>
            <div className="quiz-start-over">
              <button onClick={handleStartOver}>Start Over</button>
            </div>
          </>
        ) : (
          <>
            <div className="quiz-question">
              <p>{quiz[currentIndex].question}</p>
            </div>
            <div className="quiz-options">
              {quiz[currentIndex].options.map((option, index) => (
                <button
                  key={index}
                  className={`quiz-option-button ${selectedOption === option ? "selected" : ""}`}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                >
                  {option}
                </button>
              ))}
            </div>
            {feedback && (
              <div className={`quiz-feedback ${feedback === "Correct!" ? "correct" : "wrong"}`}>
                {feedback}
              </div>
            )}
            <button className="quiz-submit" onClick={handleNext} disabled={selectedOption === null}>
              Submit
            </button>
            <div className="quiz-score">
              Score: {score} / {quiz.length} ({percentageScore}%)
            </div>
            <div className="quiz-remaining">
              Questions Remaining: {questionsRemaining}
            </div>
            <div className="quiz-start-over">
              <button onClick={handleStartOver}>Start Over</button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default QuizModal;