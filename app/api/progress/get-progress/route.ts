import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const wordId = searchParams.get("wordId");

    if (!wordId) {
      return new NextResponse("wordId должен быть предоставлен", {
        status: 400,
      });
    }

    const progress = await db.progress.findUnique({
      where: {
        userId_wordId: {
          userId: session.user.id,
          wordId,
        },
      },
    });

    if (!progress) {
      const newProgress = await db.progress.create({
        data: {
          userId: session.user.id,
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
