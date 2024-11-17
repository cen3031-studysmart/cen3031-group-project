import React, { useState } from 'react';
import Modal from './Modal';
import './FlashcardModal.css';

const FlashcardModal = ({ show, onClose, flashcards = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcards.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + flashcards.length) % flashcards.length);
  };

  const toggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  if (flashcards.length === 0) {
    return (
      <Modal show={show} onClose={onClose} title="Flashcards">
        <div className="flashcard">
          <div className="flashcard-content">
            Please upload a PDF to generate flashcards
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal show={show} onClose={onClose} title="Flashcards">
      <div className="flashcard">
        <div className="flashcard-title">
          {showAnswer ? 'Answer' : 'Question'}
        </div>
        <div className="flashcard-content" onClick={toggleAnswer}>
          {showAnswer ? flashcards[currentIndex].answer : flashcards[currentIndex].question}
        </div>
        <div className="flashcard-controls">
          <button onClick={handlePrev}>Previous</button>
          <button onClick={handleNext}>Next</button>
        </div>
        <div className="flashcard-index">
          Flashcard {currentIndex + 1} of {flashcards.length}
        </div>
      </div>
    </Modal>
  );
};

export default FlashcardModal;