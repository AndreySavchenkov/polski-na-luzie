import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dialogId = searchParams.get("dialogId");

    if (!dialogId) {
      return new NextResponse("id не предоставлен", { status: 400 });
    }

    const dialog = await db.dialog.findUnique({
      where: { id: dialogId },
    });

    if (!dialog) {
      return new NextResponse("Диалог не найден :(", { status: 404 });
    }

    return NextResponse.json(dialog, { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}
