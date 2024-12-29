import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Progress } from "@/types";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    const wordIds = searchParams.get("wordIds")?.split(",");

    if (!userId || !wordIds) {
      return new NextResponse("Отсутствуют необходимые параметры", {
        status: 400,
      });
    }

    const progress = await db.progress.findMany({
      where: {
        userId,
        wordId: {
          in: wordIds,
        },
      },
    });

    // Преобразуем в объект для быстрого доступа
    const progressMap = progress.reduce((acc, curr) => {
      acc[curr.wordId] = curr;
      return acc;
    }, {} as Record<string, Progress>);

    return NextResponse.json(progressMap);
  } catch (error) {
    console.error("Ошибка при получении прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
