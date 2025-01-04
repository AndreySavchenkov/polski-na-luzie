import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { shuffleArray } from "@/helpers";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get("topicId");

    if (!topicId) {
      return new NextResponse("topicId не предоставлен", { status: 400 });
    }

    const words = await db.word.findMany({
      where: { topicId: topicId },
    });

    // Перемешиваем варианты ответов для каждого слова
    const wordsWithShuffledAnswers = words.map((word) => ({
      ...word,
      russian: shuffleArray([...word.russian]),
    }));

    return NextResponse.json(wordsWithShuffledAnswers, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
