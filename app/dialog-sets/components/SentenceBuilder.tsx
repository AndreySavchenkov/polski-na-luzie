import { useState, useEffect, memo } from "react";
import { shuffleArray, speak } from "@/helpers";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

type Props = {
  dialogId: string;
  onCorrectSentence: (text: string) => void;
  text: string;
};

const WordButton = memo(
  ({
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
      key={index}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {word}
    </button>
  )
);

WordButton.displayName = "WordButton";

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
  const [correctPositions, setCorrectPositions] = useState<boolean[]>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCorrectState, setShowCorrectState] = useState(false);

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
      const correctWords = text.split(" ");
      const isOrderCorrect = selectedWords.join(" ") === text;

      if (isOrderCorrect && !hasSpoken) {
        setShowCorrectState(true);
        requestAnimationFrame(() => {
          speak(text);
          setHasSpoken(true);

          setTimeout(() => {
            setIsTransitioning(true);
            setTimeout(() => {
              onCorrectSentence(text);
              setTimeout(() => {
                setIsHidden(true);
              }, 500);
            }, 1000);
          }, 1000);
        });
      } else if (!isOrderCorrect) {
        setShowRetry(true);
        const positions = selectedWords.map(
          (word, index) => word === correctWords[index]
        );
        setCorrectPositions(positions);
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
    <div
      className={`flex flex-col max-w-[600px] mx-auto w-full mt-4 px-3 transition-opacity duration-500 ${
        isTransitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <SpeakerLoudIcon
          onClick={handleSpeak}
          className="w-8 h-8 cursor-pointer active:scale-90 transition-transform p-1.5 bg-gray-700 rounded-full hover:bg-gray-600"
        />
        {showRetry && !isCorrect && (
          <button
            onClick={resetWords}
            className="px-4 py-1.5 bg-gray-700 text-gray-200 rounded-full text-sm hover:bg-gray-600 transition-colors active:scale-95 transform border border-gray-600"
          >
            Spróbuj ponownie
          </button>
        )}
      </div>

      {shuffleWords.length > 0 && (
        <div className="flex flex-wrap gap-2 p-3 rounded-lg border border-gray-700 bg-gray-800/50">
          {shuffleWords.map((word, index) => (
            <WordButton
              key={`${dialogId}-shuffle-${index}-${word}`}
              word={word}
              index={index}
              onClick={() => handleWordClick(word, index)}
              disabled={isCorrect}
              className="cursor-pointer bg-gray-700 px-3 py-2 rounded-lg text-sm md:text-base hover:bg-gray-600 transition-colors active:scale-95 transform"
            />
          ))}
        </div>
      )}

      {selectedWords.length > 0 && !isHidden && (
        <div className="mt-2">
          {!isCorrect && (
            <h2
              className={
                "text-lg md:text-xl font-bold mb-1 transition-colors text-gray-200"
              }
            >
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
                  selectedWords.length === text.split(" ").length
                    ? showCorrectState
                      ? "bg-green-800 hover:bg-green-700 text-white"
                      : correctPositions[index]
                      ? "bg-green-800 hover:bg-green-700 text-white"
                      : "bg-red-800 hover:bg-red-700 text-white"
                    : "bg-gray-700 hover:bg-gray-600 text-white"
                } active:scale-95 transform`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
