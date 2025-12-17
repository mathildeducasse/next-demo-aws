// frontend page to list books

import Link from "next/link";
import { Book } from "@/types/book";

async function getBooks(): Promise<Book[]> {
  const res = await fetch("http://localhost:3000/api/books", {
    cache: "no-store",
  });
  return res.json();
}

export default async function BooksPage() {
  const books = await getBooks();

  return (
    <div>
      <h1>Books</h1>
      <Link href="/books/add">Add New</Link>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <Link href={`/books/${book.id}`}>
              {book.title} — {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
