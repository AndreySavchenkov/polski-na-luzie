"use client";

import { useEffect, useState } from "react";
import { Card } from "../components/Card/Card";
import { DialogSet } from "@/types";
import { CardsGridSkeleton } from "../components/Card/CardSkeleton";

export default function DialogSetsPage() {
  const [dialogSets, setDialogSets] = useState<DialogSet[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDialogSets = async () => {
      try {
        const response = await fetch("/api/dialog-sets/get-dialog-sets");
        if (response.ok) {
          const data = await response.json();
          setDialogSets(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке наборов диалогов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDialogSets();
  }, []);

  if (isLoading) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Zestawy dialogów</h1>
        <CardsGridSkeleton />
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Zestawy dialogów</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dialogSets.map((set) => (
          <Card
            key={set.id}
            href={`/dialog-sets/${set.id}`}
            title={`${set.name} (${set.dialogs.length + 1})`}
          />
        ))}
      </div>
    </div>
  );
}
