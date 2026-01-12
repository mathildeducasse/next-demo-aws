// frontend page to list books

import Link from "next/link";
import { Book } from "@/lib/book";
import { getDataSource } from "@/lib/database";
import { toBookResponse } from "@/lib/book.mapper";

export default async function BooksPage() {
  try {
    const dataSource = await getDataSource();
    const repository = dataSource.getRepository(Book);
    const rawBooks = await repository.find();
    const books = rawBooks.map(toBookResponse);

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
 } catch (error) {
  console.error("Error fetching books:", error);
  return <div className="min-h-screen bg-white p-8 text-black dark:bg-black dark:text-white">
    <h1 className="text-2xl font-bold mb-4">Books</h1>
    <p className="text-red-600">Failed to load books. Please try again later.</p>
  </div>;
 }
}
