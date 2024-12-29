"use client";

import { useEffect, useState } from "react";
import { Card } from "../components/Card";
import { DialogSet } from "@/types";

export default function DialogSetsPage() {
  const [dialogSets, setDialogSets] = useState<DialogSet[]>([]);

  useEffect(() => {
    const fetchDialogSets = async () => {
      const response = await fetch("/api/dialog-sets/get-dialog-sets");
      if (response.ok) {
        const data = await response.json();
        setDialogSets(data);
      } else {
        console.error("Ошибка при загрузке наборов диалогов");
      }
    };

    fetchDialogSets();
  }, []);

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
