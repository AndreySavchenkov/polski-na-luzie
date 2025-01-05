"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { speak } from "@/helpers";
import { CompletedState } from "./components/CompletedState";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

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
  const [isChecking, setIsChecking] = useState(false);
  const [showColors, setShowColors] = useState(false);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch(
          `/api/lessons/${params.lessonId}/get-lesson`
        );
        if (response.ok) {
          const data = await response.json();
          setExercises(data.exercises);

          const allCompleted = data.exercises.every(
            (ex: Exercise) => ex.completed
          );
          if (allCompleted) {
            setShowCompleted(true);
            return;
          }

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
    setIsChecking(true);
    setShowColors(true);
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
        window.dispatchEvent(new Event("wordLearned"));
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

    setTimeout(() => {
      setShowColors(false);
      setIsChecking(false);
    }, 2000);
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

  const isWordInCorrectPosition = (word: string, index: number) => {
    const correctWords = currentExercise?.textPl.split(" ") || [];
    return word === correctWords[index];
  };

  const handleSpeak = () => {
    if (currentExercise) {
      speak(currentExercise.textPl);
    }
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (showCompleted) {
    return <CompletedState onReset={handleReset} />;
  }

  return (
    <div className="space-y-6 pb-24 min-h-[calc(100vh-220px)] max-w-[600px] mx-auto">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <h3 className="text-xl font-semibold">{currentExercise?.textRu}</h3>
          <SpeakerLoudIcon
            onClick={handleSpeak}
            className="w-6 h-6 cursor-pointer active:scale-90 transition-transform text-gray-400 hover:text-gray-300"
          />
        </div>
        <p className="text-gray-400">{currentExercise?.textEn}</p>
      </div>

      <div className="min-h-[100px] p-4 border border-gray-700 rounded-lg">
        <div className="flex flex-wrap gap-2">
          {selectedWords.map((word, index) => (
            <button
              key={index}
              onClick={() => handleWordRemove(index)}
              className={`px-3 py-2 rounded-full transition-all duration-300 ${
                showColors
                  ? isCorrect
                    ? "bg-green-600"
                    : isWordInCorrectPosition(word, index)
                    ? "bg-green-600"
                    : "bg-red-600"
                  : "bg-indigo-600"
              }`}
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
            className="px-3 py-2 bg-gray-700 rounded-full hover:bg-gray-600"
          >
            {word}
          </button>
        ))}
      </div>

      <button
        onClick={handleCheck}
        disabled={selectedWords.length === 0 || isChecking}
        className={`
          w-full py-4 bg-indigo-600 rounded-lg
          disabled:opacity-50 mb-4
          transition-all duration-300 transform
          hover:bg-indigo-700
          active:scale-[0.98]
          disabled:hover:bg-indigo-600
          disabled:cursor-not-allowed
          relative
          ${isChecking ? "animate-pulse" : ""}
        `}
      >
        <div className="flex items-center justify-center gap-2">
          {isChecking ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Проверяем...</span>
            </>
          ) : (
            <span>Проверить</span>
          )}
        </div>
      </button>

      <ProgressIndicator exercises={exercises} />
    </div>
  );
};
