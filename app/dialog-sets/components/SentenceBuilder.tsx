import { useState, useEffect } from "react";
import { shuffleArray, speak } from "@/helpers";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

type Props = {
  dialogId: string;
  onCorrectSentence: (text: string) => void;
  text: string;
};

export const SentenceBuilder = ({
  dialogId,
  onCorrectSentence,
  text,
}: Props) => {
  const [shuffleWords, setShuffleWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showRetry, setShowRetry] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [hasSpoken, setHasSpoken] = useState(false);

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

  const handleSpeak = () => {
    speak(text);
  };

  useEffect(() => {
    if (selectedWords.length === text.split(" ").length) {
      const isOrderCorrect = selectedWords.join(" ") === text;
      setIsCorrect(isOrderCorrect);

      if (isOrderCorrect && !hasSpoken) {
        speak(text);
        setHasSpoken(true);
        onCorrectSentence(text);
        setTimeout(() => {
          setIsHidden(true);
        }, 1500);
      } else if (!isOrderCorrect) {
        setShowRetry(true);
      }
    }
  }, [selectedWords, text, onCorrectSentence, hasSpoken]);

  const resetWords = () => {
    const words = text.split(" ");
    const shuffled = shuffleArray([...words]);
    setShuffleWords(shuffled);
    setSelectedWords([]);
    setIsCorrect(false);
    setShowRetry(false);
    setHasSpoken(false);
  };

  if (isHidden) {
    return null;
  }

  return (
    <div className="flex flex-col max-w-[600px] mx-auto w-full mt-4">
      <SpeakerLoudIcon
        onClick={handleSpeak}
        className="w-6 h-6 cursor-pointer mb-4 active:scale-90 transition-transform"
      />

      {shuffleWords.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 rounded border">
          {shuffleWords.map((word, index) => (
            <button
              key={`${dialogId}-shuffle-${index}-${word}`}
              onClick={() => handleWordClick(word, index)}
              className="cursor-pointer bg-slate-700 p-3 rounded"
              disabled={isCorrect}
            >
              {word}
            </button>
          ))}
        </div>
      )}

      {selectedWords.length > 0 && !isHidden && (
        <div className="mt-4">
          <h2
            className={`text-xl font-bold mb-2 ${
              isCorrect ? "text-green-500" : ""
            }`}
          >
            {isCorrect ? "Правильно!" : "Собранные слова:"}
          </h2>
          <div className="flex flex-wrap gap-2 p-2 rounded border">
            {selectedWords.map((word, index) => (
              <button
                key={`${dialogId}-selected-${index}-${word}`}
                onClick={() => handleSelectedWordClick(word, index)}
                className={`cursor-pointer p-3 rounded ${
                  isCorrect ? "bg-green-700" : "bg-blue-700"
                }`}
                disabled={isCorrect}
              >
                {word}
              </button>
            ))}
          </div>
        </div>
      )}

      {showRetry && !isCorrect && (
        <button
          onClick={resetWords}
          className="mt-4 p-2 bg-blue-500 text-white rounded"
        >
          Попробовать еще раз
        </button>
      )}
    </div>
  );
};
