"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { Dialog } from "../components/Dialog/Dialog";
import { DialogT } from "@/types";

export default function DialogSetPage() {
  const params = useParams();
  const [dialogs, setDialogs] = useState<DialogT[]>([]);
  const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDialogs = async () => {
      try {
        const response = await fetch(
          `/api/dialog-sets/dialogs?setId=${params.setId}`
        );
        if (response.ok) {
          const data = await response.json();
          setDialogs(data);
        } else {
          console.error("Ошибка при загрузке диалогов");
        }
      } catch (error) {
        console.error("Ошибка при загрузке диалогов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.setId) {
      fetchDialogs();
    }
  }, [params.setId]);

  const handleNext = () => {
    setCurrentDialogIndex((prevIndex) =>
      prevIndex < dialogs.length - 1 ? prevIndex + 1 : 0
    );
  };

  const handlePrevious = () => {
    setCurrentDialogIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : dialogs.length - 1
    );
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (dialogs.length === 0) {
    return <div>Диалоги не найдены</div>;
  }

  const currentDialog = dialogs[currentDialogIndex];

  return (
    <div className="flex flex-col items-center space-y-4 w-full">
      <div className="flex gap-4 min-w-[300px] justify-between items-center mt-4">
        <button
          onClick={handlePrevious}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition-colors"
          aria-label="Предыдущий диалог"
        >
          <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <h2>{currentDialog.title}</h2>

        <button
          onClick={handleNext}
          className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition-colors"
          aria-label="Следующий диалог"
        >
          <ChevronRightIcon className="w-6 h-6" />
        </button>
      </div>

      <Dialog key={currentDialog.id} dialog={currentDialog} />

      <div className="flex justify-center gap-2 pb-4">
        {dialogs.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentDialogIndex ? "bg-blue-500" : "bg-gray-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
