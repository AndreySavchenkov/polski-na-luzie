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

    const { sentenceId } = await req.json();

    const progress = await db.sentenceProgress.create({
      data: {
        userId: session.user.id,
        sentenceId,
      },
    });

    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("wordLearned"));
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Ошибка при сохранении прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
