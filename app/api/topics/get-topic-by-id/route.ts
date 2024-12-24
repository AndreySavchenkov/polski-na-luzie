import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const topicId = searchParams.get("id");

    if (!topicId) {
      return new NextResponse("id не предоставлен", { status: 400 });
    }

    const topic = await db.topic.findUnique({
      where: { id: topicId },
    });

    if (!topic) {
      return new NextResponse("Топик не найден", { status: 404 });
    }

    return NextResponse.json(topic, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
