"use client";

import { Word, Progress } from "@/types";
import { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { shuffleArray, speak } from "@/helpers";
import { LoadingState } from "./components/LoadingState";
import { ErrorState } from "./components/ErrorState";
import { WordDisplay } from "./components/WordDisplay";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { AnswerChoice } from "./components/AnswerChoice";

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
    }, 1000);
  };

  const fetchNewWords = async () => {
    try {
      // Добавляем AbortController для отмены запроса при необходимости
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      // Получаем слова
      const response = await fetch(
        `/api/topics/get-words-by-topic-id?topicId=${filteredWords[0].topicId}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении слов");
      }

      const words = await response.json();
      const shuffledWords: Word[] = shuffleArray(words);

      // Оптимизируем запрос прогресса - получаем все сразу
      const progressResponse = await fetch(
        `/api/progress/get-progress-batch?userId=${userId}&wordIds=${shuffledWords
          .map((w) => w.id)
          .join(",")}`,
        { signal: controller.signal }
      );

      if (!progressResponse.ok) {
        throw new Error("Ошибка при получении прогресса");
      }

      const progressData = await progressResponse.json();
      // Объединяем данные
      const wordsWithProgress = shuffledWords.map(
        (word: Word): Word & { progress: Progress | null } => ({
          ...word,
          progress: progressData[word.id] || null,
        })
      );

      // Фильтруем слова для изучения
      const wordsToLearn = wordsWithProgress.filter(
        (word: Word & { progress: Progress | null }) =>
          !word.progress || word.progress.correct < 3
      );

      clearTimeout(timeoutId);

      if (wordsToLearn.length === 0) {
        setIsLoading(false);
        return;
      }

      setFilteredWords(wordsToLearn);
      setCurrentWordIndex(0);
      setCurrentProgress(0);
    } catch (error) {
      console.error("Ошибка при загрузке слов:", error);
      setIsLoading(false);
    }
  };

  const saveProgress = useCallback(
    async (wordId: string, isCorrect: boolean, correct?: number) => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      try {
        await fetch("/api/progress/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId,
            wordId,
            isCorrect,
            correct: correct !== undefined ? correct : undefined,
          }),
          signal: controller.signal,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Запрос был отменен из-за таймаута");
        } else {
          console.error("Ошибка при сохранении прогресса:", error);
        }
      } finally {
        clearTimeout(timeoutId);
      }
    },
    [userId]
  );

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

  if (isLoading) {
    return <LoadingState />;
  }

  if (currentWordIndex >= filteredWords.length) {
    return <ErrorState />;
  }

  const currentWord = filteredWords[currentWordIndex];

  return (
    <div className="flex flex-col items-center gap-4">
      <Suspense fallback={<LoadingState />}>
        <WordDisplay
          word={currentWord}
          onSpeak={() => speak(currentWord.polish)}
        />
        <div className="flex justify-center items-center gap-2 text-gray-600 w-[420px] flex-wrap">
          {currentWord.russian.map((answer: string) => (
            <AnswerChoice
              key={answer}
              answer={answer}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              handleAnswerClick={handleAnswerClick}
            />
          ))}
        </div>
        <ProgressIndicator currentProgress={currentProgress} />
      </Suspense>
    </div>
  );
};

export default TranslationExercise;
