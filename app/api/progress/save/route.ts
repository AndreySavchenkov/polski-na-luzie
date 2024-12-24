import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("Полученные данные:", body);

    // Проверка на null
    if (!body || typeof body !== "object") {
      console.error(
        "Тело запроса не может быть пустым или не является объектом",
        body
      );
      return new NextResponse("Тело запроса не может быть пустым", {
        status: 400,
      });
    }

    const { userId, wordId, isCorrect } = body;

    // Проверка на наличие необходимых полей
    if (!userId || !wordId || typeof isCorrect !== "boolean") {
      console.error("Недостаточно данных", body);
      return new NextResponse("Недостаточно данных", { status: 400 });
    }

    console.log("Attempting to save progress:", { userId, wordId, isCorrect });

    // Сохранение или обновление прогресса
    const progress = await db.progress.upsert({
      where: {
        userId_wordId: {
          userId,
          wordId,
        },
      },
      update: {
        attempts: { increment: 1 },
        correct: isCorrect ? { increment: 1 } : undefined,
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
