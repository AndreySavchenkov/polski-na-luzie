"use client";

import { useEffect, useState } from "react";
import { Topic } from "@/types";
import { Card } from "../components/Card/Card";
import { CardsGridSkeleton } from "../components/Card/CardSkeleton";

export default function WordsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics/get-topics");
        if (response.ok) {
          const data = await response.json();
          setTopics(data);
        }
      } catch (error) {
        console.error("Ошибка при получении уроков:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Zestawy słów</h1>
        <CardsGridSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Zestawy słów</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card key={topic.id} href={`/words/${topic.id}`} title={topic.name} />
        ))}
      </div>
    </div>
  );
}
