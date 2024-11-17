import * as React from "react";
import { Link } from "react-router-dom";
import { useUser, UserButton } from "@clerk/clerk-react";
import "./Header.css";

function Header() {
  const { isSignedIn, user, isLoaded } = useUser();

  return (
    <header className="header">
      <div className="logo">
        <h1>StudySmart</h1>
      </div>
      <div className="user-section">
        {isSignedIn ? (
          <div className="user-info">
            <h3>Hello, {user.firstName}</h3>
            <UserButton />
          </div>
        ) : (
          <div className="login-link">
            <Link to="/login">LOGIN</Link>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
