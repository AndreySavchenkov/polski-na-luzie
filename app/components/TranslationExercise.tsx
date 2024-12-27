"use client";

import { Word, Progress } from "@/types";
import { useState, useEffect, useRef } from "react";
import { SpeakerLoudIcon, TimerIcon } from "@radix-ui/react-icons";
import { speak } from "@/helpers";

interface TranslationExerciseProps {
  words: Word[];
  userId: string;
}

const TranslationExercise = ({ words, userId }: TranslationExerciseProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredWords, setFilteredWords] = useState<
    (Word & { progress: Progress | null })[]
  >([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const fetchWordsAndProgress = async () => {
      setIsLoading(true);
      const responses = await Promise.all(
        words.map((word) =>
          fetch(`/api/progress/get-progress?userId=${userId}&wordId=${word.id}`)
        )
      );

      const progressData = await Promise.all(
        responses.map((response) => response.json())
      );

      const wordsWithProgress = words.map((word, index) => ({
        ...word,
        progress: progressData[index] || null,
      }));

      const wordsToLearn = wordsWithProgress.filter(
        (word) => word.progress && word.progress.correct < 3
      );
      const shuffledWords = wordsToLearn.sort(() => Math.random() - 0.5);

      setFilteredWords(shuffledWords);
      setIsLoading(false);
    };

    if (words.length > 0 && isFirstRender.current) {
      fetchWordsAndProgress();
      isFirstRender.current = false;
    }
  }, [words, userId]);

  useEffect(() => {
    const currentWord = filteredWords[currentWordIndex];
    if (currentWord) {
      setCurrentProgress(currentWord.progress?.correct || 0);
    }
  }, [currentWordIndex, filteredWords]);

  const handleAnswerClick = async (answer: string) => {
    setSelectedAnswer(answer);
    const currentWord = filteredWords[currentWordIndex];
    const isAnswerCorrect = answer === currentWord.correctAnswerRu;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setCurrentProgress((prev) => Math.min(prev + 1, 3));
      await saveProgress(currentWord.id, true);
      speak(currentWord.polish);
    } else {
      if (currentProgress > 0) {
        setCurrentProgress((prev) => prev - 1);
      }
      if (currentWord.progress && currentWord.progress.correct > 0) {
        await saveProgress(
          currentWord.id,
          false,
          currentWord.progress.correct - 1
        );
      }
    }

    setTimeout(() => {
      if (currentWordIndex + 1 >= filteredWords.length) {
        fetchNewWords();
      } else {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);
        setIsCorrect(false);
        setSelectedAnswer("");
      }
    }, 1500);
  };

  const fetchNewWords = async () => {
    const response = await fetch(
      `/api/topics/get-words-by-topic-id?topicId=${filteredWords[0].topicId}`
    );
    if (response.ok) {
      const newWords = await response.json();
      const shuffledWords = newWords.sort(() => Math.random() - 0.5);

      const responses = await Promise.all(
        shuffledWords.map((word: Word) =>
          fetch(`/api/progress/get-progress?userId=${userId}&wordId=${word.id}`)
        )
      );

      const progressData = await Promise.all(
        responses.map((response) => response.json())
      );

      const wordsWithProgress = shuffledWords.map(
        (word: Word, index: number) => ({
          ...word,
          progress: progressData[index] || null,
        })
      );

      const wordsToLearn = wordsWithProgress.filter(
        (word: Word & { progress: Progress | null }) => {
          return word.progress && word.progress.correct < 3;
        }
      );

      setFilteredWords(wordsToLearn);
      setCurrentWordIndex(0);
      setCurrentProgress(0);
    }
  };

  const saveProgress = async (
    wordId: string,
    isCorrect: boolean,
    correct?: number
  ) => {
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
          correct: correct !== undefined ? correct : undefined,
        }),
      });
    } catch (error) {
      console.error("Ошибка при сохранении прогресса:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex gap-2 items-center justify-center mt-4">
        <TimerIcon /> <h2>Подготовка урока...</h2>
      </div>
    );
  }

  if (currentWordIndex >= filteredWords.length) {
    return <h1>Все слова выучены!</h1>;
  }

  const currentWord = filteredWords[currentWordIndex];

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        onClick={() => speak(currentWord.polish)}
        className="flex gap-2 items-center text-2xl font-bold text-center cursor-pointer"
      >
        {currentWord.polish}
        <SpeakerLoudIcon className="w-4 h-4 active:scale-90 transition-transform" />
      </div>
      <div className="flex justify-center items-center gap-2 text-gray-600 w-[420px] flex-wrap">
        {currentWord.russian.map((answer: string) => (
          <button
            className={`p-2 rounded-md w-[150px] text-center h-[150px] transition-colors duration-300 ${
              selectedAnswer === answer
                ? isCorrect
                  ? "bg-green-500"
                  : "bg-red-500"
                : "bg-white"
            }`}
            key={answer}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {[...Array(3)].map((_, index) => {
          const isLearned = index < currentProgress;
          return (
            <div
              key={index}
              className={`w-6 h-6 rounded-full transition-colors duration-300 ${
                isLearned ? "bg-green-500" : "bg-gray-300"
              }`}
            />
          );
        })}
      </div>
    </div>
  );
};

export default TranslationExercise;
