// GET + POST route handlers

import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/database";
import { Book } from "@/lib/book";
import { createBookSchema } from "@/validators/book.schema";
import { toBookResponse } from "@/lib/book.mapper";
import { CreateBookDto } from "@/dtos/book/create-book.dto";

async function getRepo() {
  const dataSource = await getDataSource();
  return dataSource.getRepository(Book);
}

export async function GET() {
  const repository = await getRepo();
  const books = await repository.find(); // TypeORLM find all
  return NextResponse.json(books.map(toBookResponse));
}

export async function POST(req: Request) {
  // Use the DTO to type the parsed JSON
  const json: CreateBookDto = await req.json();

  const parsed = createBookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { errors: parsed.error.format() },
      { status: 400 }
    );
  }

  const repository = await getRepo();

  const newBook = repository.create(parsed.data);
  const savedBook = await repository.save(newBook);

  return NextResponse.json(toBookResponse(savedBook), { status: 201 });
}
