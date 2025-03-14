"use client";

import { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { useParams } from "next/navigation";
import { Dialog } from "../components/Dialog/Dialog";
import { DialogT } from "@/types";
import { DialogSetSkeleton } from "./components/DialogSetSkeleton";

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
    return <DialogSetSkeleton />;
  }

  if (dialogs.length === 0) {
    return <div>Диалоги не найдены</div>;
  }

  const currentDialog = dialogs[currentDialogIndex];

  return (
    <div className="flex flex-col items-center justify-between  w-full min-h-[calc(100vh-56px)]">
      <div className="flex flex-col items-center space-y-2 w-full">
        <div className="flex gap-4 min-w-[350px] justify-between items-center mt-2">
          <button
            onClick={handlePrevious}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition-colors"
            aria-label="Предыдущий диалог"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>

          <h2 className="text-2xl font-bold">{currentDialog.title}</h2>

          <button
            onClick={handleNext}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition-colors"
            aria-label="Следующий диалог"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>
        </div>

        <Dialog key={currentDialog.id} dialog={currentDialog} />
      </div>

      <div className="flex justify-center gap-3 pb-4 mt-auto">
        {dialogs.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentDialogIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentDialogIndex
                ? "bg-indigo-500 scale-125"
                : "bg-gray-800 hover:bg-gray-700"
            }`}
            aria-label={`Перейти к диалогу ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
