// GET + PUT + DELETE by id route handlers

import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { Book } from "@/lib/book";
import { toBookResponse } from "@/lib/book.mapper";
import { updateBookSchema } from "@/validators/book.schema";
import { UpdateBookDto } from "@/dtos/book/update-book.dto";

type RouteContext = { params: Promise<{ id: string }> };

async function getRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Book);
}

export async function GET(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const repository = await getRepo();
  const book = await repository.findOneBy({ id })

  if (!book) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return NextResponse.json(toBookResponse(book));
}

export async function PUT(req: Request, { params }: RouteContext) {
  const { id } = await params;
  const json: UpdateBookDto = await req.json();

  const parsed = updateBookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.format() },
      { status: 400 }
    );
  }

  const repository = await getRepo();
  const result = await repository.update(id, parsed.data);

  if (result.affected === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  // Fetch the updated entity to return it via mapper
  const updatedBook = await repository.findOneBy({ id });
  
  if (!updatedBook) {
    return NextResponse.json({ message: "Update failed" }, { status: 500 });
  }
  
  return NextResponse.json(toBookResponse(updatedBook!));
}

export async function DELETE(_: Request, { params }: RouteContext) {
  const { id } = await params;
  const repository = await getRepo();
  
  const result = await repository.delete(id);

  if (result.affected === 0) {
    return NextResponse.json({ message: "Book not found" }, { status: 404 });
  }

  return new NextResponse(null, { status: 204 });
}