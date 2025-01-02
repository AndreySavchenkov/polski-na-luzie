"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { StarIcon } from "@radix-ui/react-icons";

interface LeaderboardUser {
  id: string;
  name: string;
  image: string | null;
  learnedWords: number;
  sentencePoints: number;
  totalScore: number;
}

export const Leaderboard = () => {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch("/api/users/get-leaderboard");
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (error) {
        console.error("Ошибка при загрузке рейтинга:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return (
      <div className="w-full max-w-2xl mx-auto mt-8 p-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-800/50 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <StarIcon className="w-6 h-6 text-yellow-500" />
        Рейтинг пользователей
      </h2>

      <div className="space-y-4">
        {users.map((user, index) => (
          <div
            key={user.id}
            className="flex items-center gap-4 p-4 bg-gray-800/30 backdrop-blur-sm rounded-lg border border-gray-700"
          >
            <div className="text-2xl font-bold text-gray-400 w-8">
              {index + 1}
            </div>

            <div className="relative w-12 h-12">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name}
                  fill
                  className="rounded-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-700 rounded-full" />
              )}
            </div>

            <div className="flex-1">
              <div className="font-medium text-lg">{user.name}</div>
              <div className="text-sm text-gray-400">
                Общий счет: {user.totalScore}
              </div>
            </div>

            {index < 3 && (
              <div className="text-3xl">
                {index === 0 && "🥇"}
                {index === 1 && "🥈"}
                {index === 2 && "🥉"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
