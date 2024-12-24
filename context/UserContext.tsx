"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface UserContextType {
  userId: string | null;
  userExists: boolean;
  checkUserExists: (id: string) => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [userExists, setUserExists] = useState<boolean>(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
      checkUserExists(storedUserId);
    }
  }, []);

  const checkUserExists = async (id: string) => {
    try {
      const response = await fetch(`/api/user/get-user?userId=${id}`);
      if (response.ok) {
        setUserExists(true);
      } else {
        setUserExists(false);
      }
    } catch (error) {
      console.error("Ошибка при проверке пользователя:", error);
      setUserExists(false);
    }
  };

  return (
    <UserContext.Provider value={{ userId, userExists, checkUserExists }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};