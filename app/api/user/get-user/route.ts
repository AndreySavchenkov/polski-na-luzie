import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    // Проверка на null
    if (!userId) {
      return new NextResponse("userId не предоставлен", { status: 400 });
    }

    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
    });

    // Проверка, найден ли пользователь
    if (!user) {
      return new NextResponse("Пользователь не найден", { status: 404 });
    }

    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
