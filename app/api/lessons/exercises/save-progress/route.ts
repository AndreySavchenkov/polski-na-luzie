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

    const { exerciseId, isCorrect } = await req.json();

    const progress = await db.userExerciseProgress.upsert({
      where: {
        userId_exerciseId: {
          userId: session.user.id,
          exerciseId,
        },
      },
      update: {
        attempts: { increment: 1 },
        correct: isCorrect ? { increment: 1 } : undefined,
        completed: isCorrect,
      },
      create: {
        userId: session.user.id,
        exerciseId,
        attempts: 1,
        correct: isCorrect ? 1 : 0,
        completed: isCorrect,
      },
    });

    if (isCorrect) {
      // Добавляем запись в sentenceProgress для увеличения рейтинга
      await db.sentenceProgress.create({
        data: {
          userId: session.user.id,
          sentenceId: exerciseId,
        },
      });
    }

    // Получаем информацию об упражнении и уроке
    const exercise = await db.lessonExercise.findUnique({
      where: { id: exerciseId },
      include: {
        lesson: {
          include: {
            exercises: {
              include: {
                userProgress: {
                  where: {
                    userId: session.user.id,
                    completed: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (exercise && isCorrect) {
      const completedExercises = exercise.lesson.exercises.filter(
        (ex) => ex.userProgress.length > 0
      ).length;

      await db.userLessonProgress.upsert({
        where: {
          userId_lessonId: {
            userId: session.user.id,
            lessonId: exercise.lesson.id,
          },
        },
        update: {
          completedExercises: completedExercises,
          completed: completedExercises === exercise.lesson.exercises.length,
        },
        create: {
          userId: session.user.id,
          lessonId: exercise.lesson.id,
          completedExercises: completedExercises,
          completed: completedExercises === exercise.lesson.exercises.length,
        },
      });
    }

    return NextResponse.json(progress);
  } catch (error) {
    console.error("Ошибка при сохранении прогресса:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
