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
      },
    });

    const leaderboard = users
      .map((user) => ({
        id: user.id,
        name: user.name || "Пользователь",
        image: user.image,
        learnedWords: user.progress.length,
      }))
      .sort((a, b) => b.learnedWords - a.learnedWords)
      .slice(0, 10);

    return NextResponse.json(leaderboard);
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
