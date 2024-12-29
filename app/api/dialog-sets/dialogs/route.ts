import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const setId = searchParams.get("setId");

    if (!setId) {
      return new NextResponse("setId не предоставлен", { status: 400 });
    }

    const dialogs = await db.dialog.findMany({
      where: {
        setId: setId,
      },
      include: {
        sentences: true,
      },
    });

    return NextResponse.json(dialogs, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении диалогов:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
