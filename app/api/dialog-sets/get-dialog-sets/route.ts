import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dialogSets = await db.dialogSet.findMany({
      include: {
        dialogs: {
          select: {
            id: true,
            title: true,
            imagePath: true,
          },
        },
      },
    });
    return NextResponse.json(dialogSets, { status: 200 });
  } catch (error) {
    console.error("Ошибка при получении наборов диалогов:", error);
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 }
    );
  }
}
