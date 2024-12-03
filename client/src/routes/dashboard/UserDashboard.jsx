import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "../../components/ui/card";
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
} from "lucide-react";
import { fetchUserStudyMaterials } from "../../apis/backendAPI";
import StudyMaterialModal from "./StudyMaterialModal";
import { useUser } from '@clerk/clerk-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMaterials, setSavedMaterials] = useState({
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
  });

  const { isSignedIn, user: userObject, isLoaded } = useUser();
  // console.log({ isSignedIn, isLoaded, userObject });

  let user;
  if (!isSignedIn) {
    user = {
      id: 1,
      fullName: "John",
    }
  } else {
    user = userObject;
  }

  useEffect(() => {
    const getStudyMaterials = async (userId) => {
      try {
        const studyMaterials = await fetchUserStudyMaterials(userId);
        setSavedMaterials(studyMaterials);
        // throw error;
      } catch (error) {
        console.error("Error fetching study materials:", error);
      }
    };

    // console.log('isSignedIn: ' + isSignedIn);
    if (isSignedIn) {
      getStudyMaterials(user.id);
    }
  }, [isSignedIn]);

  const handleNewMaterial = () => {
    navigate("/upload");
  };

  const handleOpenMaterial = (material, type) => {
    setSelectedMaterial(material);
    setSelectedType(type);
    setIsModalOpen(true);
  };

  const renderStudyCard = (item, type) => (
    <Card
      key={item.id}
      className="hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => handleOpenMaterial(item, type)}
    >
      <CardContent className="flex justify-between items-center p-4">
        <div>
          <h3 className="font-semibold">{item.title}</h3>
          <p className="text-sm text-gray-500">
            {new Date(item.date).toLocaleDateString()}
          </p>
        </div>
        <Button variant="ghost" size="sm">
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );

  if (!isLoaded) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800">Loading...</h1>
      </div>
    );
  }

  return (
    <div>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {isSignedIn ? "Hello, " + user.fullName + "👋": "Welcome to StudyBuddies! 👋"}
          </h1>
          <p className="text-gray-600 mt-2">
            {isSignedIn
              ? "Welcome back to your study dashboard"
              : <span><Link to="/login">Sign in</Link> or <Link to="/login">create an account</Link> to get started</span>}
          </p>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">My Study Materials</h2>
          <Button onClick={handleNewMaterial}>
            <Plus className="mr-2 h-4 w-4" /> Create New Study Material
          </Button>
        </div>

        <Tabs defaultValue="summaries">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="summaries">
              <BookOpen className="mr-2" /> Summaries
            </TabsTrigger>
            <TabsTrigger value="flashcards">
              <ScrollText className="mr-2" /> Flashcards
            </TabsTrigger>
            <TabsTrigger value="quizzes">
              <CheckSquare className="mr-2" /> Quizzes
            </TabsTrigger>
          </TabsList>

          <TabsContent value="summaries" className="space-y-4">
            {savedMaterials.summaries.map((item) =>
              renderStudyCard(item, "summary")
            )}
          </TabsContent>

          <TabsContent value="flashcards" className="space-y-4">
            {savedMaterials.flashcards.map((item) =>
              renderStudyCard(item, "flashcards")
            )}
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-4">
            {savedMaterials.quizzes.map((item) =>
              renderStudyCard(item, "quiz")
            )}
          </TabsContent>
        </Tabs>
      </div>

      {isModalOpen && (
        <StudyMaterialModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          material={selectedMaterial}
          type={selectedType}
        />
      )}
    </div>
  );
};

export default UserDashboard;
