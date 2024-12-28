import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  try {
    const dialogs = await db.dialog.findMany({
      where: {
        setId: params.setId,
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
