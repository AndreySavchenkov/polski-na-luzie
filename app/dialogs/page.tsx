"use client";

import { Dialog } from "@/types";
import { useEffect, useState } from "react";
import mainImage from "@/public/geraltAndTailor.jpg";
import Image from "next/image";
import { speak } from "@/helpers";

export default function DialogsPage() {
  const [dialog, setDialog] = useState<Dialog | null>(null);
  const [shuffleWords, setShuffleWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const dialogId = "676d96a60e4e9144d6a821d7";

  console.log(`shuffleWords->${shuffleWords}`);
  console.log(`selectedWords->${selectedWords}`);
  console.log(`dialog->${dialog?.correctOrder}`);

  useEffect(() => {
    const fetchDialog = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/dialogs/get-dialog-by-id?dialogId=${dialogId}`
      );

      if (response.ok) {
        const data = await response.json();
        console.log(`initial array -> ${data.correctOrder}`);
        setDialog(data);
        const shuffled = shuffleArray(data.correctOrder);
        setShuffleWords(shuffled);
      } else {
        console.error("Ошибка при получении диалога");
      }
    };

    fetchDialog();
  }, []);

  const shuffleArray = (array: string[]): string[] => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleWordClick = (word: string) => {
    if (!selectedWords.includes(word)) {
      setSelectedWords((prev) => [...prev, word]);
    }
  };

  const checkOrder = () => {
    if (selectedWords.length !== dialog?.correctOrder.length) {
      alert("Неправильный порядок. Попробуйте снова.");
      return;
    }

    const isCorrectOrder = selectedWords.every(
      (word, index) => word.trim() === dialog?.correctOrder[index].trim()
    );

    if (isCorrectOrder) {
      alert("Правильный порядок! Открываем диалог.");
      alert(dialog?.content);
    } else {
      alert("Неправильный порядок. Попробуйте снова.");
    }
  };

  if (!dialog) {
    return <div>Загрузка диалога...</div>;
  }

  return (
    <div className="p-10">
      <Image src={mainImage} alt="main image" height={800} />
      <p onClick={() => speak(dialog.content)}>{dialog.content}</p>
      <ul className="flex flex-wrap gap-2 border p-2">
        {shuffleWords.map((word, index) => (
          <li
            key={index}
            onClick={() => handleWordClick(word)}
            className="cursor-pointer bg-slate-700 p-2 "
          >
            {word}
          </li>
        ))}
      </ul>
      <h2>Собранные слова:</h2>
      <p>{selectedWords.join(" ")}</p>
      <button onClick={checkOrder}>Проверить порядок</button>
    </div>
  );
}
