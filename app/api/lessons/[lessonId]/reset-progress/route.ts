import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ lessonId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    const { lessonId } = await params;

    if (!session?.user?.id) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    const exercises = await db.lessonExercise.findMany({
      where: {
        lessonId,
      },
    });

    await db.userExerciseProgress.deleteMany({
      where: {
        userId: session.user.id,
        exerciseId: {
          in: exercises.map((ex) => ex.id),
        },
      },
    });

    await db.userLessonProgress.deleteMany({
      where: {
        userId: session.user.id,
        lessonId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Ошибка при сбросе прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
