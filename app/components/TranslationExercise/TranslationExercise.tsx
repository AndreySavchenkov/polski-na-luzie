"use client";

import { Word, Progress } from "@/types";
import { useState, useEffect, useRef, Suspense } from "react";
import { speak } from "@/helpers";
import { ErrorState } from "./components/ErrorState";
import { WordDisplay } from "./components/WordDisplay";
import { ProgressIndicator } from "./components/ProgressIndicator";
import { AnswerChoice } from "./components/AnswerChoice";
import { useWordProgress } from "@/hooks/useWordProgress";
import { CompletedState } from "./components/CompletedState";
import { TranslationExerciseSkeleton } from "./components/TranslationExerciseSkeleton";

interface TranslationExerciseProps {
  words: Word[];
  userId: string;
}

const TranslationExercise = ({ words, userId }: TranslationExerciseProps) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [filteredWords, setFilteredWords] = useState<
    (Word & { progress: Progress | null })[]
  >([]);
  const [currentProgress, setCurrentProgress] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);

  const { saveProgress, getInitialWords, fetchNewWords } = useWordProgress({
    userId,
  });

  const isFirstRender = useRef(true);

  const handleAnswerClick = async (answer: string) => {
    setSelectedAnswer(answer);
    const currentWord = filteredWords[currentWordIndex];
    const isAnswerCorrect = answer === currentWord.correctAnswerRu;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setCurrentProgress((prev) => Math.min(prev + 1, 3));
      await saveProgress(currentWord.id, true);
    } else {
      setCurrentProgress(0);
      await saveProgress(currentWord.id, false, 0);
    }

    speak(currentWord.polish);

    setTimeout(() => {
      if (currentWordIndex + 1 >= filteredWords.length) {
        handleFetchNewWords();
      } else {
        setCurrentWordIndex((prevIndex) => prevIndex + 1);

        setSelectedAnswer("");
      }
    }, 2000);
  };

  const handleReset = async () => {
    setIsLoading(true);
    if (words.length > 0) {
      await Promise.all(words.map((word) => saveProgress(word.id, false, 0)));
      const initialWords = await getInitialWords(words);
      setFilteredWords(initialWords);
      setCurrentWordIndex(0);
      setCurrentProgress(0);
      setSelectedAnswer("");
    }
    setIsLoading(false);
  };

  const handleFetchNewWords = async () => {
    setIsLoading(true);
    if (filteredWords.length > 0) {
      const newWords = await fetchNewWords(filteredWords[0].topicId);
      if (newWords.length === 0) {
        setFilteredWords([]);
        setIsLoading(false);
        return;
      }
      setFilteredWords(newWords);
      setCurrentWordIndex(0);
      setCurrentProgress(0);
      setSelectedAnswer("");
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const initializeWords = async () => {
      if (words.length > 0 && isFirstRender.current) {
        setIsLoading(true);
        const initialWords = await getInitialWords(words);
        setFilteredWords(initialWords);
        setIsLoading(false);
        isFirstRender.current = false;
      }
    };

    initializeWords();
  }, [words, getInitialWords]);

  useEffect(() => {
    const currentWord = filteredWords[currentWordIndex];
    if (currentWord) {
      setCurrentProgress(currentWord.progress?.correct || 0);
    }
  }, [currentWordIndex, filteredWords]);

  if (isLoading) {
    return <TranslationExerciseSkeleton />;
  }

  if (filteredWords.length === 0) {
    return <CompletedState onReset={handleReset} />;
  }

  const currentWord = filteredWords[currentWordIndex];

  if (!currentWord) {
    return <ErrorState />;
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full max-w-2xl mx-auto px-2 py-4">
      <Suspense fallback={<TranslationExerciseSkeleton />}>
        <WordDisplay
          word={currentWord}
          onSpeak={() => speak(currentWord.polish)}
        />
        <div className="grid grid-cols-2 gap-4 w-full">
          {currentWord.russian.map((answer: string) => (
            <AnswerChoice
              key={answer}
              answer={answer}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentWord.correctAnswerRu}
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
