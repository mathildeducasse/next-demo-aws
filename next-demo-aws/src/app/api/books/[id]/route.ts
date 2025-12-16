// GET + PUT + DELETE by id route handlers

import { NextResponse } from "next/server";
import {
  getBook,
  updateBook,
  deleteBook,
} from "@/lib/db";

export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const book = getBook(params.id);
  if (!book) {
    return NextResponse.json({}, { status: 404 });
  }
  return NextResponse.json(book);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const data = await req.json();
  const updated = updateBook(params.id, data);

  if (!updated) {
    return NextResponse.json({}, { status: 404 });
  }

  return NextResponse.json(updated);
}

export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const removed = deleteBook(params.id);
  if (!removed) {
    return NextResponse.json({}, { status: 404 });
  }
  return NextResponse.json({}, { status: 204 });
}
