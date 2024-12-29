import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, wordId, isCorrect, correct } = body;

    if (!userId || !wordId || typeof isCorrect !== "boolean") {
      return new NextResponse("Недостаточно данных", { status: 400 });
    }

    const progress = await db.progress.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      update: {
        attempts: { increment: 1 },
        correct:
          correct !== undefined
            ? correct
            : isCorrect
            ? { increment: 1 }
            : undefined,
      },
      create: {
        userId,
        wordId,
        attempts: 1,
        correct: isCorrect ? 1 : 0,
      },
    });

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error("Ошибка при сохранении прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
