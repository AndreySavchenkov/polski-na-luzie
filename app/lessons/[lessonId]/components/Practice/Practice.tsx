"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { speak } from "@/helpers";
import { CompletedState } from "./components/CompletedState";
import { ProgressIndicator } from "./components/ProgressIndicator";

interface Exercise {
  id: string;
  textRu: string;
  textEn: string;
  textPl: string;
  words: string[];
  completed: boolean;
  attempts: number;
  isCurrent: boolean;
}

export const Practice = () => {
  const params = useParams();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [currentExercise, setCurrentExercise] = useState<Exercise | null>(null);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showCompleted, setShowCompleted] = useState(false);
  const [incorrectExercises, setIncorrectExercises] = useState<string[]>([]);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          `/api/lessons/${params.lessonId}/get-lesson`
        );
        if (response.ok) {
          const data = await response.json();
          setExercises(data.exercises);
          const firstIncomplete = data.exercises.find(
            (ex: Exercise) => !ex.completed
          );
          setCurrentExercise(firstIncomplete || data.exercises[0]);

          const incorrectOnes = data.exercises
            .filter((ex: Exercise) => !ex.completed && ex.attempts > 0)
            .map((ex: Exercise) => ex.id);
          setIncorrectExercises(incorrectOnes);
        }
      } catch (error) {
        console.error("Ошибка при получении упражнений:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchExercises();
  }, [params.lessonId]);

  useEffect(() => {
    if (currentExercise) {
      setAvailableWords([...currentExercise.words]);
      setSelectedWords([]);
      setIsCorrect(null);
    }
  }, [currentExercise]);

  const handleWordSelect = (word: string) => {
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((w) => w !== word));
  };

  const handleWordRemove = (index: number) => {
    const word = selectedWords[index];
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
    setAvailableWords([...availableWords, word]);
  };

  const handleCheck = async () => {
    const answer = selectedWords.join(" ");
    const isAnswerCorrect = answer === currentExercise?.textPl;
    setIsCorrect(isAnswerCorrect);

    if (currentExercise) {
      const updatedExercises = exercises.map((ex) => ({
        ...ex,
        attempts: ex.id === currentExercise.id ? ex.attempts + 1 : ex.attempts,
        completed:
          ex.id === currentExercise.id && isAnswerCorrect ? true : ex.completed,
        isCurrent: false,
      }));

      setExercises(updatedExercises);

      if (!isAnswerCorrect) {
        setIncorrectExercises([...incorrectExercises, currentExercise.id]);
      } else {
        setIncorrectExercises(
          incorrectExercises.filter((id) => id !== currentExercise.id)
        );
        speak(currentExercise.textPl);
      }

      await fetch("/api/lessons/exercises/save-progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exerciseId: currentExercise.id,
          isCorrect: isAnswerCorrect,
        }),
      });

      setTimeout(() => {
        const currentIndex = exercises.findIndex(
          (ex) => ex.id === currentExercise.id
        );

        let nextExercise = null;
        for (let i = currentIndex + 1; i < exercises.length; i++) {
          if (!exercises[i].completed) {
            nextExercise = exercises[i];
            break;
          }
        }

        if (!nextExercise) {
          for (let i = 0; i < currentIndex; i++) {
            if (!exercises[i].completed) {
              nextExercise = exercises[i];
              break;
            }
          }
        }

        if (nextExercise) {
          setExercises(
            updatedExercises.map((ex) => ({
              ...ex,
              isCurrent: ex.id === nextExercise.id,
            }))
          );
          setCurrentExercise(nextExercise);
        } else {
          setShowCompleted(true);
        }
        setIsCorrect(null);
        setSelectedWords([]);
      }, 2000);
    }
  };

  const handleReset = async () => {
    setIsLoading(true);
    try {
      await fetch(`/api/lessons/${params.lessonId}/reset-progress`, {
        method: "POST",
      });
      const response = await fetch(
        `/api/lessons/${params.lessonId}/get-lesson`
      );
      if (response.ok) {
        const data = await response.json();
        setExercises(data.exercises);
        setCurrentExercise(data.exercises[0]);
        setShowCompleted(false);
      }
    } catch (error) {
      console.error("Ошибка при сбросе прогресса:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (showCompleted) {
    return <CompletedState onReset={handleReset} />;
  }

  return (
    <div className="space-y-6 pb-24 min-h-[calc(100vh-220px)] max-w-[400px] mx-auto">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">
          {currentExercise?.textRu}
        </h3>
        <p className="text-gray-400">{currentExercise?.textEn}</p>
      </div>

      <div className="min-h-[100px] p-4 border border-gray-700 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {selectedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordRemove(index)}
              className="px-3 py-1 bg-indigo-600 rounded-full"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {availableWords.map((word, index) => (
          <button
            key={index}
            onClick={() => handleWordSelect(word)}
            className="px-3 py-1 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={handleCheck}
        disabled={selectedWords.length === 0}
        className="w-full py-4 bg-indigo-600 rounded-lg disabled:opacity-50 mb-4"
      >
        Проверить
      </button>

      <ProgressIndicator exercises={exercises} />
    </div>
  );
};
