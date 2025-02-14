import React from "react";
import Button from "../ui/button";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
      <h1 className="text-xl font-bold">Smart Farm</h1>
      {isAuthenticated && (
        <Button
          onClick={() => {
            logout();
            navigate("/auth/login");
          }}
        >
          Logout
        </Button>
      )}
    </header>
  );
};

export default Header;
