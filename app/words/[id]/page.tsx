"use client";

import TranslationExercise from "@/app/components/TranslationExercise/TranslationExercise";
import { TranslationExerciseSkeleton } from "@/app/components/TranslationExercise/components/TranslationExerciseSkeleton";
import { Topic, Word } from "@/types";
import { useSession } from "next-auth/react";
import { useEffect, useState, use } from "react";
import { shuffleArray } from "@/helpers";

interface TopicPageProps {
  params: Promise<{ id: string }>;
}

export default function WordPage({ params }: TopicPageProps) {
  const [topic, setTopic] = useState<Topic | null>(null);
  const [words, setWords] = useState<Word[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { data: session } = useSession();
  const userId = session?.user?.id;

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

        const [topicData, wordsData] = (await Promise.all([
          topicResponse.json(),
          wordsResponse.json(),
        ])) as [Topic, Word[]];

        const finalShuffledWords = shuffleArray(wordsData);

        setTopic(topicData);
        setWords(finalShuffledWords);
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
      <div className="flex items-center flex-col gap-4">
        <TranslationExerciseSkeleton />
      </div>
    );
  }

  if (!topic) {
    return <h1 className="text-center text-2xl mt-8">Урок не найден</h1>;
  }

  return (
    <div className="flex items-center flex-col gap-4">
      <TranslationExercise words={words} userId={userId} />
    </div>
  );
}
