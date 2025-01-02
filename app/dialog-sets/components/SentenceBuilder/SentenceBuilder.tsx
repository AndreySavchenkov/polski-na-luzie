import { useState, useEffect, useCallback } from "react";
import { shuffleArray, speak } from "@/helpers";
import { SpeakerLoudIcon, ResetIcon } from "@radix-ui/react-icons";

type Props = {
  dialogId: string;
  onCorrectSentence: (text: string) => void;
  text: string;
  sentenceId: string;
};

const WordButton = ({
  word,
  index,
  onClick,
  disabled,
  className,
}: {
  word: string;
  index: number;
  onClick: () => void;
  disabled: boolean;
  className: string;
}) => (
  <button
    key={`${index}-${word}`}
    onClick={onClick}
    className={className}
    disabled={disabled}
  >
    {word}
  </button>
);

const ShuffleWordsSection = ({
  words,
  onWordClick,
  isCorrect,
}: {
  words: string[];
  onWordClick: (word: string, index: number) => void;
  isCorrect: boolean;
}) => (
  <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
    {words.map((word, index) => (
      <WordButton
        key={`shuffle-${index}-${word}`}
        word={word}
        index={index}
        onClick={() => onWordClick(word, index)}
        disabled={isCorrect}
        className="cursor-pointer bg-gray-700 px-3 py-2 rounded-lg text-sm md:text-base hover:bg-gray-600 transition-colors active:scale-95 transform"
      />
    ))}
  </div>
);

export const SentenceBuilder = ({
  dialogId,
  onCorrectSentence,
  text,
  sentenceId,
}: Props) => {
  const [shuffleWords, setShuffleWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const words = text.split(" ");
    const shuffled = shuffleArray([...words]);
    setShuffleWords(shuffled);
  }, [text]);

  const handleWordClick = (word: string, index: number) => {
    if (!isCorrect) {
      setShuffleWords((prev) => prev.filter((_, i) => i !== index));
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const handleSelectedWordClick = (word: string, index: number) => {
    if (!isCorrect) {
      setSelectedWords((prev) => prev.filter((_, i) => i !== index));
      setShuffleWords((prev) => [...prev, word]);
    }
  };

  const handleReset = () => {
    const words = text.split(" ");
    const shuffled = shuffleArray([...words]);
    setShuffleWords(shuffled);
    setSelectedWords([]);
    setIsCorrect(false);
    setIsTransitioning(false);
  };

  const isWordInCorrectPosition = (word: string, index: number): boolean => {
    const correctWords = text.split(" ");
    return word === correctWords[index];
  };

  const handleCorrectAnswer = useCallback(async () => {
    setIsCorrect(true);
    speak(text);

    try {
      await fetch("/api/sentence-progress/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sentenceId }),
      });

      window.dispatchEvent(new Event("wordLearned"));
    } catch (error) {
      console.error("Ошибка при сохранении прогресса:", error);
    }

    setTimeout(() => {
      setIsTransitioning(true);
      setTimeout(() => onCorrectSentence(text), 500);
    }, 1000);
  }, [text, onCorrectSentence, sentenceId]);

  const handleSpeak = () => {
    speak(text);
  };

  useEffect(() => {
    const wordsCount = text.split(" ").length;
    if (selectedWords.length === wordsCount) {
      const sentence = selectedWords.join(" ");
      if (sentence === text) {
        handleCorrectAnswer();
      }
    }
  }, [handleCorrectAnswer, selectedWords, text]);

  return (
    <div
      className={`flex flex-col max-w-[600px] mx-auto w-full px-3 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <SpeakerLoudIcon
          onClick={handleSpeak}
          className="w-8 h-8 cursor-pointer active:scale-90 transition-transform p-1.5 bg-gray-700 rounded-full hover:bg-gray-600"
        />
        {selectedWords.length > 0 && !isCorrect && (
          <ResetIcon
            onClick={handleReset}
            className="w-8 h-8 cursor-pointer active:scale-90 transition-transform p-1.5 bg-gray-700 rounded-full hover:bg-gray-600"
          />
        )}
      </div>

      {shuffleWords.length > 0 && (
        <ShuffleWordsSection
          words={shuffleWords}
          onWordClick={handleWordClick}
          isCorrect={isCorrect}
        />
      )}

      {selectedWords.length > 0 && (
        <div>
          {!isCorrect && !isTransitioning && (
            <h2 className="text-lg md:text-xl font-bold mb-1 transition-colors text-gray-200">
              Twoja wersja:
            </h2>
          )}

          <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
            {selectedWords.map((word, index) => (
              <WordButton
                key={`${dialogId}-selected-${index}-${word}`}
                word={word}
                index={index}
                onClick={() => handleSelectedWordClick(word, index)}
                disabled={isCorrect}
                className={`cursor-pointer px-3 py-2 rounded-lg text-sm md:text-base transition-all ${
                  isCorrect
                    ? "bg-green-800 hover:bg-green-700 text-white"
                    : isWordInCorrectPosition(word, index)
                    ? "bg-green-800 text-white"
                    : "bg-red-900 hover:bg-red-800 text-white"
                } active:scale-95 transform`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
