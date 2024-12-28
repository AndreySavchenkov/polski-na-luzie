import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { name } = await req.json();

    if (!name) {
      return new NextResponse("Название набора диалогов не предоставлено", { status: 400 });
    }

    const existingSet = await db.dialogSet.findUnique({ where: { name } });

    if (existingSet) {
      return new NextResponse("Набор диалогов с таким названием уже существует", { status: 409 });
    }

    const newSet = await db.dialogSet.create({
      data: {
        name,
      },
    });

    return NextResponse.json(newSet, { status: 201 });
  } catch (error) {
    console.error("Ошибка при создании набора диалогов:", error);
    return new NextResponse("Внутренняя ошибка сервера", { status: 500 });
  }
}