// GET + POST route handlers

import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { createBook } from "@/lib/db";
import { createBookSchema } from "@/validators/book.schema";
import { toBookResponse } from "@/lib/book.mapper";

export async function POST(req: Request) {
  const json = await req.json();

  const parsed = createBookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.format() },
      { status: 400 }
    );
  }

  const book = createBook({
    id: randomUUID(),
    ...parsed.data,
    createdAt: new Date(),
  });

  return NextResponse.json(toBookResponse(book), { status: 201 });
}
