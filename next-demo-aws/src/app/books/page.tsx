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
    /* Add these Tailwind classes to the container */
    <div className="min-h-screen bg-white p-8 text-black dark:bg-black dark:text-white">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <Link 
        href="/books/add" 
        className="inline-block mb-6 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Add New
      </Link>
      <ul className="space-y-2">
        {books.map(book => (
          <li key={book.id} className="border-b pb-2">
            <Link href={`/books/${book.id}`} className="hover:text-blue-600">
              {book.title} — {book.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
