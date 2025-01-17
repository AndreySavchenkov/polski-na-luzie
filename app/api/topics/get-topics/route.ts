import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const topics = await db.topic.findMany(); // Получаем все уроки
    return NextResponse.json(topics, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
