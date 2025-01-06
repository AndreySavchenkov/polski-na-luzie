import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return new NextResponse("Не авторизован", { status: 401 });
    }

    const lessons = await db.lesson.findMany({
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
        userProgress: {
          where: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        order: "asc",
      },
    });

    const formattedLessons = lessons.map((lesson, index, array) => {
      const previousLesson = array.find((l) => l.order === lesson.order - 1);
      const isAvailable =
        !previousLesson || previousLesson.userProgress[0]?.completed;

      return {
        id: lesson.id,
        title: lesson.title,
        description: lesson.description,
        order: lesson.order,
        totalExercises: lesson.exercises.length,
        completedExercises: lesson.exercises.filter(
          (ex) => ex.userProgress.length > 0
        ).length,
        completed: lesson.userProgress[0]?.completed || false,
        isAvailable: isAvailable,
      };
    });

    return NextResponse.json(formattedLessons);
  } catch (error) {
    console.error("Ошибка при получении уроков:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
