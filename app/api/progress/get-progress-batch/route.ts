import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { Progress } from "@/types";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const wordIds = searchParams.get("wordIds")?.split(",");

    if (!wordIds) {
      return new NextResponse("Отсутствуют необходимые параметры", {
        status: 400,
      });
    }

    const progress = await db.progress.findMany({
      where: {
        userId: session.user.id,
        wordId: {
          in: wordIds,
        },
      },
    });

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
