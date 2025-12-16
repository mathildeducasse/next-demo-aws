// frontend page to add a new book

"use client"; // “This file must run in the browser, not on the server.”

import { useRouter } from "next/navigation";

export default function NewBook() {
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    await fetch("/api/books", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        author: formData.get("author"),
        publishedYear: Number(formData.get("publishedYear")),
      }),
    });

    router.push("/books");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>New Book</h1>
      <input name="title" placeholder="Title" required />
      <input name="author" placeholder="Author" required />
      <input name="publishedYear" type="number" required />
      <button>Create</button>
    </form>
  );
}