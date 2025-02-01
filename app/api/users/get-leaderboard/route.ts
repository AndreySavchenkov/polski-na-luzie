import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const [users, totalUsers] = await Promise.all([
      db.user.findMany({
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
      }),
      db.user.count(),
    ]);

    if (!users || users.length === 0) {
      return NextResponse.json({ users: [], totalUsers: 0 });
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

    return NextResponse.json({ users: leaderboard, totalUsers });
  } catch (error) {
    console.error("Ошибка при получении рейтинга:", error);
    return NextResponse.json({ users: [], totalUsers: 0 }, { status: 500 });
  }
}
