// src/contexts/AuthContext.tsx
import React, { createContext, useState, useEffect } from "react";
import { User } from "../types/auth";

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return Boolean(localStorage.getItem("token"));
  });
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mark loading complete (or fetch user details from a "me" endpoint)
    setLoading(false);
  }, []);

  // Update isAuthenticated when user changes
  useEffect(() => {
    setIsAuthenticated(!!user);
  }, [user]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
