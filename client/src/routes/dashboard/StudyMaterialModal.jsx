import React, { useState } from "react";
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
import {
  Plus,
  BookOpen,
  ScrollText,
  CheckSquare,
  ChevronRight,
  GraduationCap,
  X,
  ArrowLeft,
  ArrowRight,
  RotateCw,
} from "lucide-react";

const StudyMaterialModal = ({ isOpen, onClose, material, type }) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  if (!isOpen) return null;

  const handleNextCard = () => {
    setCurrentCardIndex((prev) => prev + 1);
    setIsFlipped(false);
  };

  const handlePrevCard = () => {
    setCurrentCardIndex((prev) => prev - 1);
    setIsFlipped(false);
  };

  const handleAnswerSelect = (questionIndex, option) => {
    if (!isQuizSubmitted) {
      setSelectedAnswers((prev) => ({ ...prev, [questionIndex]: option }));
    }
  };

  const submitQuiz = () => {
    const correctAnswers = material.content.reduce((acc, question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        return acc + 1;
      }
      return acc;
    }, 0);
    setScore(correctAnswers);
    setIsQuizSubmitted(true);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setIsQuizSubmitted(false);
    setScore(0);
  };

  const renderContent = () => {
    switch (type) {
      case "summary":
        return (
          <div className="prose max-w-none">
            <p>{material.content}</p>
          </div>
        );
      case "flashcards":
        const currentCard = material.content[currentCardIndex];
        return (
          <div className="flex flex-col items-center">
            <div className="w-full max-w-lg h-64 perspective-1000 mb-4">
              <div
                className={`relative w-full h-full transition-transform duration-500 transform-style-3d cursor-pointer ${
                  isFlipped ? "rotate-y-180" : ""
                }`}
                onClick={() => setIsFlipped(!isFlipped)}
              >
                {/* Question Side */}
                <Card className="absolute w-full h-full flex items-center justify-center p-6 backface-hidden">
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Question</h3>
                    <p className="text-lg">{currentCard.question}</p>
                  </CardContent>
                </Card>

                {/* Answer Side */}
                <Card className="absolute w-full h-full flex items-center justify-center p-6 bg-blue-50 rotate-y-180 backface-hidden">
                  <CardContent className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Answer</h3>
                    <p className="text-lg">{currentCard.answer}</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-4">
              <Button
                variant="outline"
                onClick={handlePrevCard}
                disabled={currentCardIndex === 0}
              >
                <ArrowLeft className="mr-2" /> Previous
              </Button>
              <span className="text-sm">
                {currentCardIndex + 1} / {material.content.length}
              </span>
              <Button
                variant="outline"
                onClick={handleNextCard}
                disabled={currentCardIndex === material.content.length - 1}
              >
                Next <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        );
      // case "flashcards":
      //   const currentCard = material.content[currentCardIndex];
      //   return (
      //     <div className="flex flex-col items-center">
      //       <div
      //         className="w-full max-w-lg aspect-[3/2] cursor-pointer mb-4"
      //         onClick={() => setIsFlipped(!isFlipped)}
      //       >
      //         <div
      //           className={`relative w-full h-full transition-all duration-500 ${
      //             isFlipped ? "rotate-y-180" : ""
      //           }`}
      //         >
      //           <Card className="absolute inset-0 backface-hidden flex items-center justify-center p-6 text-center">
      //             <CardContent>
      //               <h3 className="text-xl mb-2">Question:</h3>
      //               <p className="text-lg">{currentCard.question}</p>
      //             </CardContent>
      //           </Card>
      //           <Card className="absolute inset-0 backface-hidden rotate-y-180 flex items-center justify-center p-6 text-center bg-blue-50">
      //             <CardContent>
      //               <h3 className="text-xl mb-2">Answer:</h3>
      //               <p className="text-lg">{currentCard.answer}</p>
      //             </CardContent>
      //           </Card>
      //         </div>
      //       </div>
      //       <div className="flex justify-center items-center gap-4">
      //         <Button
      //           variant="outline"
      //           onClick={handlePrevCard}
      //           disabled={currentCardIndex === 0}
      //         >
      //           <ArrowLeft className="mr-2" /> Previous
      //         </Button>
      //         <span className="text-sm">
      //           {currentCardIndex + 1} / {material.content.length}
      //         </span>
      //         <Button
      //           variant="outline"
      //           onClick={handleNextCard}
      //           disabled={currentCardIndex === material.content.length - 1}
      //         >
      //           Next <ArrowRight className="ml-2" />
      //         </Button>
      //       </div>
      //     </div>
      //   );
      case "quiz":
        return (
          <div className="space-y-6">
            {material.content.map((question, index) => (
              <div key={index}>
                <h3 className="font-bold mb-2">Question {index + 1}:</h3>
                <p className="mb-4">{question.question}</p>
                <div className="space-y-2">
                  {question.options.map((option, optIndex) => (
                    <Button
                      key={optIndex}
                      variant={
                        selectedAnswers[index] === option
                          ? "default"
                          : "outline"
                      }
                      className={`w-full justify-start ${
                        isQuizSubmitted && option === question.correctAnswer
                          ? "bg-green-100"
                          : ""
                      } ${
                        isQuizSubmitted &&
                        selectedAnswers[index] === option &&
                        option !== question.correctAnswer
                          ? "bg-red-100"
                          : ""
                      }`}
                      onClick={() => handleAnswerSelect(index, option)}
                    >
                      {option}
                    </Button>
                  ))}
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center pt-4 border-t">
              {isQuizSubmitted ? (
                <>
                  <div className="text-lg font-bold">
                    Score: {score} / {material.content.length}
                  </div>
                  <Button onClick={resetQuiz}>
                    <RotateCw className="mr-2" /> Retry Quiz
                  </Button>
                </>
              ) : (
                <Button
                  onClick={submitQuiz}
                  disabled={
                    Object.keys(selectedAnswers).length !==
                    material.content.length
                  }
                  className="ml-auto"
                >
                  Submit Quiz
                </Button>
              )}
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">{material.title}</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};
export default StudyMaterialModal;
