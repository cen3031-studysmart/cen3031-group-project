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

const UserDashboard = () => {
  const navigate = useNavigate();
  const [selectedMaterial, setSelectedMaterial] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [savedMaterials, setSavedMaterials] = useState(null);

  const user = {
    id: 1,
    name: "John", // TODO: Replace with actual user data
  };

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
    getStudyMaterials(user.id);
  }, []);

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

  if (!savedMaterials) {
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
            Hello, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Welcome back to your study dashboard
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
