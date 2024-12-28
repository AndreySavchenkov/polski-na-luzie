"use client";

import { useEffect, useState } from "react";
import { Topic } from "@/types";
import { Card } from "../components/Card";

export default function WordsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/topics/get-topics"); // Запрос к API
      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        console.error("Ошибка при получении уроков");
      }
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Zestawy słów</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              href={`/words/${topic.id}`}
              title={topic.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
