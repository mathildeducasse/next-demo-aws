// GET + PUT + DELETE by id route handlers

import { NextResponse } from "next/server";
import { getBook, updateBook, deleteBook } from "@/lib/db";
import { toBookResponse } from "@/lib/book.mapper";
import { updateBookSchema } from "@/validators/book.schema";
import { UpdateBookDto } from "@/dtos/book/update-book.dto";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(
  _: Request,
  { params }: RouteContext
) {
  const { id } = await params;
  const book = getBook(id);

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(toBookResponse(book));
}

export async function PUT(
  req: Request,
  { params }: RouteContext
) {
  const { id } = await params;
  const json: UpdateBookDto = await req.json();

  const parsed = updateBookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.format() },
      { status: 400 }
    );
  }

  const updated = updateBook(id, parsed.data);

  if (!updated) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(toBookResponse(updated));
}

export async function DELETE(
  _: Request,
  { params }: RouteContext
) {
  const { id } = await params;
  const removed = deleteBook(id);

  if (!removed) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}