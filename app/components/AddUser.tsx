"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

const AddUser = () => {
  const { userExists, checkUserExists } = useUser();
  const [username, setUsername] = useState("");
  const [language, setLanguage] = useState("ru");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      checkUserExists(storedUserId);
      fetchUserName(storedUserId);
    }
  }, []);

  const fetchUserName = async (id: string) => {
    try {
      const response = await fetch(`/api/user/get-user?userId=${id}`);
      if (response.ok) {
        const user = await response.json();
        setUserName(user.username);
      } else {
        console.error("Ошибка при получении имени пользователя");
      }
    } catch (error) {
      console.error("Ошибка при получении имени пользователя:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, language }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при добавлении пользователя");
      }

      const data = await response.json();
      console.log("Пользователь добавлен:", data);
      localStorage.setItem("userId", data.id);
      checkUserExists(data.id);
      setUsername("");
      setLanguage("ru");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {userExists ? (
        <p>{userName}</p>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label>
            Имя пользователя:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Язык:
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="ru">Русский</option>
              <option value="en">Английский</option>
            </select>
          </label>
          <button type="submit">Добавить пользователя</button>
        </form>
      )}
    </div>
  );
};

export default AddUser;
