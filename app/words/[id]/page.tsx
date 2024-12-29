"use client";

import TranslationExercise from "@/app/components/TranslationExercise/TranslationExercise";
import { TranslationExerciseSkeleton } from "@/app/components/TranslationExercise/components/TranslationExerciseSkeleton";
import { useUser } from "@/context/UserContext";
import { Topic, Word } from "@/types";
import { useEffect, useState, use } from "react";

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export default function WordPage({ params }: TopicPageProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { userId } = useUser();
  const { id } = use(params);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [topicResponse, wordsResponse] = await Promise.all([
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/topics/get-topic-by-id?id=${id}`
          ),
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/api/topics/get-words-by-topic-id?topicId=${id}`
          ),
        ]);

        if (!topicResponse.ok || !wordsResponse.ok) {
          throw new Error("Ошибка при загрузке данных");
        }

        const [topicData, wordsData] = await Promise.all([
          topicResponse.json(),
          wordsResponse.json(),
        ]);

        setTopic(topicData);
        setWords(wordsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Произошла ошибка");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (!userId) {
    return (
      <h1 className="text-center text-2xl mt-8">Пользователь не найден</h1>
    );
  }

  if (error) {
    return <h1 className="text-center text-2xl mt-8 text-red-500">{error}</h1>;
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <div className="flex items-center flex-col gap-4">
          <TranslationExerciseSkeleton />
        </div>
      </div>
    );
  }

  if (!topic) {
    return <h1 className="text-center text-2xl mt-8">Урок не найден</h1>;
  }

  return (
    <div className="p-4">
      <div className="flex items-center flex-col gap-4">
        <TranslationExercise words={words} userId={userId} />
      </div>
    </div>
  );
}
