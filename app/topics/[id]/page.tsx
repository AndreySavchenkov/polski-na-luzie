"use client";

import TranslationExercise from "@/app/components/TranslationExercise";
import { useUser } from "@/context/UserContext";
import { Topic, Word } from "@/types";
import { useEffect, useState, use } from "react";

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export default function TopicPage({ params }: TopicPageProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [words, setWords] = useState<Word[]>([]);

  const { userId } = useUser();

  const { id } = use(params);

  useEffect(() => {
    const fetchTopic = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/topics/get-topic-by-id?id=${id}`
      );
      if (response.ok) {
        const topic = await response.json();
        setTopic(topic);
        console.log(topic);
      }
    };

    const fetchWords = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/topics/get-words-by-topic-id?topicId=${id}`
      );
      if (response.ok) {
        const words = await response.json();
        setWords(words);
        console.log(words);
      }
    };

    fetchTopic();
    fetchWords();
  }, [id]);

  if (!topic) {
    return <h1>Урок не найден</h1>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center flex-col gap-4">
        <TranslationExercise words={words} userId={userId!} />
      </div>
    </div>
  );
}
