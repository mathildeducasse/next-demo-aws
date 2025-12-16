// PATCH + DELETE book by id page

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Book } from "@/types/book";

export default function BookPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    fetch(`/api/books/${id}`)
      .then(res => res.json())
      .then(setBook);
  }, [id]);

  if (!book) return <div>Loading...</div>;

  async function update() {
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(book),
    });
    router.push("/books");
    router.refresh();
  }

  async function remove() {
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    router.push("/books");
    router.refresh();
  }

  return (
    <div>
      <input
        value={book.title}
        onChange={e => setBook({ ...book, title: e.target.value })}
      />
      <input
        value={book.author}
        onChange={e => setBook({ ...book, author: e.target.value })}
      />
      <input
        type="number"
        value={book.publishedYear}
        onChange={e =>
          setBook({ ...book, publishedYear: +e.target.value })
        }
      />
      <button onClick={update}>Save</button>
      <button onClick={remove}>Delete</button>
    </div>
  );
}
