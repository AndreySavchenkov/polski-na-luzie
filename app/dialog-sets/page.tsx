"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type DialogSet = {
  id: string;
  name: string;
  dialogs: {
    id: string;
    title: string;
    imagePath: string;
  }[];
};

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
      <h1 className="text-2xl font-bold mb-4">Наборы Диалогов</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dialogSets.map((set) => (
          <div key={set.id} className="border p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{set.name}</h2>
            <ul>
              {set.dialogs.map((dialog) => (
                <li key={dialog.id} className="mb-2">
                  <Link href={`/dialog-sets/${set.id}`} className="text-blue-500 hover:underline">
                    {dialog.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
