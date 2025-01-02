import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await db.user.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        progress: {
          where: {
            correct: {
              gte: 3,
            },
          },
        },
        sentenceProgress: true,
      },
    });

    if (!users || users.length === 0) {
      return NextResponse.json([]);
    }

    const leaderboard = users
      .map((user) => ({
        id: user.id,
        name: user.name || "Пользователь",
        image: user.image,
        learnedWords: user.progress?.length || 0,
        sentencePoints: user.sentenceProgress?.length || 0,
        totalScore:
          (user.progress?.length || 0) + (user.sentenceProgress?.length || 0),
      }))
      .sort((a, b) => b.totalScore - a.totalScore)
      .slice(0, 10);

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error("Ошибка при получении рейтинга:", error);
    return NextResponse.json([], { status: 500 });
  }
}
