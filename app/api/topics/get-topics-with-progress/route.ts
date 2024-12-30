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

    const topics = await db.topic.findMany({
      include: {
        words: {
          include: {
            Progress: {
              where: {
                userId: session.user.id,
                correct: {
                  gte: 3,
                },
              },
            },
          },
        },
      },
    });

    const topicsWithProgress = topics.map((topic) => ({
      id: topic.id,
      name: topic.name,
      totalWords: topic.words.length,
      learnedWords: topic.words.filter((word) => word.Progress.length > 0)
        .length,
    }));

    return NextResponse.json(topicsWithProgress, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
