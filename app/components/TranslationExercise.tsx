"use client";

import { Word } from "@/types";
import { useState } from "react";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

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
      speakWord(currentWord.polish);
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

  const speakWord = (word: string) => {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "pl-PL";
    window.speechSynthesis.speak(utterance);
  };

  if (currentWordIndex >= words.length) {
    return <h1>Упражнение завершено!</h1>;
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={() => speakWord(currentWord.polish)}
        className="flex gap-2 items-center text-2xl font-bold text-center cursor-pointer"
      >
        {currentWord.polish}
        <SpeakerLoudIcon className="w-4 h-4" />
      </div>
      <div className="flex justify-center items-center gap-2 text-gray-600 w-[420px] flex-wrap">
        {currentWord.russian.map((answer: string) => (
          <button
            className="p-2 rounded-md w-[150px] text-center h-[150px]"
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
    </div>
  );
};

export default TranslationExercise;
