"use client";

import { useEffect, useState } from "react";
import { DialogTopic } from "@/types";
import { Card } from "../components/Card/Card";

export default function DialogTopicsPage() {
  const [topics, setTopics] = useState<DialogTopic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/dialog-topics/get-topics");
      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        console.error("Ошибка при получении тем диалогов");
      }
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Zestawy dialogów</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {topics.map((topic) => (
            <Card
              key={topic.id}
              href={`/dialog-topics/${topic.id}`}
              title={topic.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
