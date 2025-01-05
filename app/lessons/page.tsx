"use client";

import { useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { CardsGridSkeleton } from "../components/Card/CardSkeleton";
import { useSession } from "next-auth/react";

interface LessonWithProgress {
  id: string;
  title: string;
  description: string;
  order: number;
  totalExercises: number;
  completedExercises: number;
  completed: boolean;
  isAvailable: boolean;
}

export default function LessonsPage() {
  const [lessons, setLessons] = useState<LessonWithProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchLessons = async () => {
      try {
        const response = await fetch("/api/lessons/get-lessons");
        if (response.ok) {
          const data = await response.json();
          setLessons(data);
        }
      } catch (error) {
        console.error("Ошибка при получении уроков:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (session?.user?.id) {
      fetchLessons();
    }
  }, [session?.user?.id]);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Доступные Уроки</h1>
        <CardsGridSkeleton isWordSet={false} />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Доступные Уроки</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            href={lesson.isAvailable ? `/lessons/${lesson.id}` : ""}
            title={`Урок ${lesson.order}: ${lesson.title}`}
            totalWords={lesson.totalExercises}
            learnedWords={lesson.completedExercises}
          />
        ))}
      </div>
    </div>
  );
}
