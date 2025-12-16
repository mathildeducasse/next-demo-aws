// this uses an in-memory array to simulate a database

import { Book } from "@/types/book";

let books: Book[] = [];

export function getBooks() {
  return books;
}

export function getBook(id: string) {
  return books.find(b => b.id === id);
}

export function createBook(book: Book) {
  books.push(book);
  return book;
}

export function updateBook(id: string, data: Partial<Book>) {
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return null;
  books[index] = { ...books[index], ...data };
  return books[index];
}

export function deleteBook(id: string) {
  const before = books.length;
  books = books.filter(b => b.id !== id);
  return books.length < before;
}
