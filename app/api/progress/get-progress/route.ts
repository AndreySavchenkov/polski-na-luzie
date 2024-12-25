import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const wordId = searchParams.get("wordId");

    // Проверка на наличие необходимых параметров
    if (!userId || !wordId) {
      return new NextResponse("userId и wordId должны быть предоставлены", {
        status: 400,
      });
    }

    const progress = await db.progress.findUnique({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
    });

    if (!progress) {
      const newProgress = await db.progress.create({
        data: {
          userId,
          wordId,
          attempts: 0,
          correct: 0,
          stage: 0,
        },
      });
      return NextResponse.json(newProgress, { status: 200 });
    }

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
