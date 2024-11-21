import * as React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Plus,
  BookOpen,
  ScrollText,
  CheckSquare,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import "./Header.css";

function Header() {
  // const { isSignedIn, user, isLoaded } = useUser();

  return (
    <div className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <GraduationCap className="h-8 w-8 mr-2" />
            <span className="text-2xl font-bold">StudyBuddies</span>
          </div>
          <Button variant="outline">Sign Out</Button>
        </div>
      </div>
    </div>
  );
}

export default Header;
