import { Word, Progress } from "@/types";
import { shuffleArray } from "@/helpers";

interface UseWordProgressProps {
  userId: string;
}

export const useWordProgress = ({ userId }: UseWordProgressProps) => {
  const saveProgress = async (
    wordId: string,
    isCorrect: boolean,
    correct?: number
  ) => {
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
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Запрос был отменен из-за таймаута");
      } else {
        console.error("Ошибка при сохранении прогресса:", error);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  const fetchNewWords = async (topicId: string) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch(
        `/api/topics/get-words-by-topic-id?topicId=${topicId}`,
        { signal: controller.signal }
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении слов");
      }

      const words = await response.json();
      const shuffledWords: Word[] = shuffleArray(words);

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

      const wordsWithProgress = shuffledWords.map(
        (word: Word): Word & { progress: Progress | null } => ({
          ...word,
          progress: progressData[word.id] || null,
        })
      );

      const wordsToLearn = wordsWithProgress.filter(
        (word) => !word.progress || word.progress.correct < 3
      );

      clearTimeout(timeoutId);
      return wordsToLearn;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        console.log("Запрос был отменен из-за таймаута");
      } else {
        console.error("Ошибка при загрузке слов:", error);
      }
      return [];
    }
  };

  const getInitialWords = async (words: Word[]) => {
    try {
      const response = await fetch(
        `/api/progress/get-progress-batch?userId=${userId}&wordIds=${words
          .map((w) => w.id)
          .join(",")}`
      );

      if (!response.ok) {
        throw new Error("Ошибка при получении прогресса");
      }

      const progressData = await response.json();

      const wordsWithProgress = words.map((word) => ({
        ...word,
        progress: progressData[word.id] || null,
      }));

      return wordsWithProgress.filter(
        (word) => !word.progress || word.progress.correct < 3
      );
    } catch (error) {
      console.error("Ошибка при получении начальных слов:", error);
      return [];
    }
  };

  return {
    saveProgress,
    fetchNewWords,
    getInitialWords,
  };
};
