"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Topic } from "@/types";

export default function Topics() {
  const [topics, setTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const fetchTopics = async () => {
      const response = await fetch("/api/topics/get-topics"); // Запрос к API
      if (response.ok) {
        const data = await response.json();
        setTopics(data);
      } else {
        console.error("Ошибка при получении уроков");
      }
    };

    fetchTopics();
  }, []);

  return (
    <div>
      <div className="flex flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Уроки</h1>
        {topics.map((topic) => (
          <li key={topic.id}>
            <Link href={`/topics/${topic.id}`}>{topic.name}</Link>
          </li>
        ))}
      </div>
    </div>
  );
}
