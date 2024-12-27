import { useState, useEffect } from "react";
import { shuffleWordsArray, speak } from "@/helpers";
import { Dialog } from "@/types";
import { SpeakerLoudIcon } from "@radix-ui/react-icons";

type Props = {
  dialogId: string;
  onCorrectSentence: (text: string) => void;
};

export const SentenceBuilder = ({ dialogId, onCorrectSentence }: Props) => {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [shuffleWords, setShuffleWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [isCorrect, setIsCorrect] = useState(false);
  const [incorrectIndexes, setIncorrectIndexes] = useState<number[]>([]);
  const [showRetry, setShowRetry] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // Состояние для скрытия компонента

  useEffect(() => {
    const fetchDialog = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dialogs/get-dialog-by-id?dialogId=${dialogId}`
      );

      if (response.ok) {
        const data = await response.json();
        setDialog(data);
        const shuffled = shuffleWordsArray([...data.correctOrder]);
        setShuffleWords(shuffled);
      } else {
        console.error("Ошибка при получении диалога");
      }
    };

    fetchDialog();
  }, [dialogId]);

  const handleWordClick = (word: string) => {
    setShuffleWords((prev) => prev.filter((w) => w !== word));
    setSelectedWords((prev) => [...prev, word]);
  };

  const handleSelectedWordClick = (word: string) => {
    if (!isCorrect) {
      setSelectedWords((prev) => prev.filter((w) => w !== word));
      setShuffleWords((prev) => [...prev, word]);
    }
  };

  const checkOrder = () => {
    const incorrectIndexes = selectedWords.reduce<number[]>(
      (acc, word, index) => {
        if (word.trim() !== dialog?.correctOrder[index].trim()) {
          acc.push(index);
        }
        return acc;
      },
      []
    );

    if (incorrectIndexes.length > 0) {
      setIncorrectIndexes(incorrectIndexes); // Отметить неправильные индексы
      setShowRetry(true); // Показать кнопку "Попробовать еще раз"
    } else {
      setIsCorrect(true);
      speak(dialog?.content || "");
      if (dialog?.content) {
        onCorrectSentence(dialog.content); // Передать текст вверх
      }

      // Таймер для скрытия компонента
      setTimeout(() => {
        setIsHidden(true);
      }, 1500); // Скрыть через 1.5 секунды
    }
  };

  const resetWords = () => {
    if (dialog) {
      const shuffled = shuffleWordsArray([...dialog.correctOrder]);
      setShuffleWords(shuffled);
      setSelectedWords([]);
      setIncorrectIndexes([]);
      setIsCorrect(false);
      setShowRetry(false);
      setIsHidden(false); // Сбрасываем скрытие при повторной попытке
    }
  };

  // Автоматическая проверка при выборе всех слов
  useEffect(() => {
    if (
      dialog &&
      selectedWords.length === dialog.correctOrder.length &&
      !isCorrect
    ) {
      checkOrder();
    }
  }, [selectedWords, dialog, isCorrect]);

  if (!dialog || isHidden) {
    return null; // Если компонент скрыт, ничего не отображаем
  }

  return (
    <div className="flex flex-col max-w-[600px] mx-auto w-full mt-4">
      {!isCorrect && (
        <SpeakerLoudIcon
          onClick={() => speak(dialog.content)}
          className="w-6 h-6 cursor-pointer mb-4 active:scale-90 transition-transform"
        />
      )}

      {!isCorrect && !showRetry && (
        <ul className="flex flex-wrap gap-2 border p-2 rounded">
          {shuffleWords.map((word, index) => (
            <li
              key={index}
              onClick={() => handleWordClick(word)}
              className="cursor-pointer bg-slate-700 p-3 rounded"
            >
              {word}
            </li>
          ))}
        </ul>
      )}

      {selectedWords.length > 0 && (
        <>
          <h2
            className={`${
              isCorrect ? "text-green-500" : ""
            } text-xl font-bold mb-2`}
          >
            {isCorrect ? "Правильно!" : "Собранные слова"}
          </h2>
          <ul
            className={`flex flex-wrap gap-2 p-2 rounded ${
              isCorrect ? "border-green-500" : "border"
            }`}
          >
            {selectedWords.map((word, index) => (
              <li
                key={index}
                onClick={() => handleSelectedWordClick(word)}
                className={`cursor-pointer  p-3 rounded ${
                  incorrectIndexes.includes(index)
                    ? "bg-red-700"
                    : "bg-green-700"
                }`}
              >
                {word}
              </li>
            ))}
          </ul>
        </>
      )}

      {showRetry && (
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
