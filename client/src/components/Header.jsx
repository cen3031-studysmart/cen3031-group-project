import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useClerk } from "@clerk/clerk-react";
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
  const clerk = useClerk();
  const navigate = useNavigate();

  return (
    <div className="border-b">
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center">
          <Link to='/'>
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 mr-2" />
              <span className="text-2xl font-bold">StudyBuddies</span>
            </div>
          </Link>
          {clerk.user?
            <Button variant="outline" onClick={() => {
              clerk.signOut();
              navigate('/login');
            }}>Sign Out</Button>
            :
            <Link to="/login">
              <Button>Sign In</Button>
            </Link>
          }
        </div>
      </div>
    </div>
  );
}

export default Header;
