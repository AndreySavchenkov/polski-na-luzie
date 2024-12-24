"use client";

import { Word } from "@/types";
import { useState } from "react";

interface TranslationExerciseProps {
  words: Word[];
  userId: string;
}

const TranslationExercise = ({ words, userId }: TranslationExerciseProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);

  const currentWord = words[currentWordIndex];

  const handleAnswerClick = async (answer: string) => {
    setSelectedAnswer(answer);
    const isAnswerCorrect = answer === currentWord.correctAnswerRu;
    setIsCorrect(isAnswerCorrect);

    await saveProgress(currentWord.id, isAnswerCorrect);

    if (isAnswerCorrect) {
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setIsCorrect(false);
        setSelectedAnswer("");
      }, 1000);
    }
  };

  const saveProgress = async (wordId: string, isCorrect: boolean) => {
    try {
      await fetch("/api/progress/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          wordId,
          isCorrect,
        }),
      });
    } catch (error) {
      console.error("Ошибка при сохранении прогресса:", error);
    }
  };

  if (currentWordIndex >= words.length) {
    return <h1>Упражнение завершено!</h1>;
  }

  return (
    <div>
      <h2>{currentWord.polish}</h2>
      <div>
        {currentWord.russian.map((answer: string) => (
          <button
            key={answer}
            onClick={() => handleAnswerClick(answer)}
            style={{
              backgroundColor:
                selectedAnswer === answer
                  ? isCorrect
                    ? "green"
                    : "red"
                  : "white",
            }}
          >
            {answer}
          </button>
        ))}
      </div>
      {isCorrect && <p>Правильно!</p>}
      {!isCorrect && selectedAnswer && <p>Неправильно, попробуйте снова.</p>}
    </div>
  );
};

export default TranslationExercise;
