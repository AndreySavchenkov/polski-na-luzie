import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    const body = await req.json();
    const { wordId, isCorrect, correct } = body;

    const progress = await db.progress.upsert({
      where: {
        userId_wordId: {
          userId: session.user.id,
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
        userId: session.user.id,
        wordId,
        attempts: 1,
        correct: isCorrect ? 1 : 0,
      },
    });

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Ошибка при сохранении прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
