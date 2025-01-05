import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { shuffleArray } from "@/helpers";

export async function GET(
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
        lessonId: lessonId,
      },
      include: {
        userProgress: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    const formattedExercises = exercises.map((exercise) => ({
      id: exercise.id,
      textRu: exercise.textRu,
      textEn: exercise.textEn,
      textPl: exercise.textPl,
      words: shuffleArray(exercise.words),
      completed: exercise.userProgress[0]?.completed || false,
      attempts: exercise.userProgress[0]?.attempts || 0,
      isCurrent: false,
    }));

    const currentExercise =
      formattedExercises.find((ex) => !ex.completed) || formattedExercises[0];
    if (currentExercise) {
      currentExercise.isCurrent = true;
    }

    const lesson = await db.lesson.findUnique({
      where: {
        id: lessonId,
      },
      include: {
        userProgress: {
          where: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!lesson) {
      return new NextResponse("Урок не найден", { status: 404 });
    }

    return NextResponse.json({
      ...lesson,
      exercises: formattedExercises,
      completed: lesson.userProgress[0]?.completed || false,
    });
  } catch (error) {
    console.error("Ошибка при получении урока:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
