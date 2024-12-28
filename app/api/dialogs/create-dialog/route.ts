import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { setId, title, imagePath, sentences } = await req.json();

    if (!setId || !title || !imagePath) {
      return new NextResponse("Недостаточно данных для создания диалога", { status: 400 });
    }

    const dialogSet = await db.dialogSet.findUnique({ where: { id: setId } });

    if (!dialogSet) {
      return new NextResponse("Набор диалогов не найден", { status: 404 });
    }

    const newDialog = await db.dialog.create({
      data: {
        title,
        imagePath,
        setId,
        sentences: {
          create: sentences, // Предложения должны быть массивом объектов { text, top, left }
        },
      },
    });

    return NextResponse.json(newDialog, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании диалога:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}