"use client";

import { useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { CardsGridSkeleton } from "../components/Card/CardSkeleton";
import { useSession } from "next-auth/react";

interface TopicWithProgress {
  id: string;
  name: string;
  totalWords: number;
  learnedWords: number;
}

export default function WordsPage() {
  const [topics, setTopics] = useState<TopicWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await fetch("/api/topics/get-topics-with-progress");
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

    if (session?.user?.id) {
      fetchTopics();
    }
  }, [session?.user?.id]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Наборы слов</h1>
        <CardsGridSkeleton isWordSet={true} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Наборы слов</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Card
            key={topic.id}
            href={`/words/${topic.id}`}
            title={topic.name}
            totalWords={topic.totalWords}
            learnedWords={topic.learnedWords}
          />
        ))}
      </div>
    </div>
  );
}
