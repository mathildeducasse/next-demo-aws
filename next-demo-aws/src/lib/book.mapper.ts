// a mapper is used to convert between different data representations
// here we convert from the internal Book type to the BookResponseDto for API responses
// not to leak internal fields like createdAt

import { Book } from "@/lib/book";
import { BookResponseDto } from "@/dtos/book/book-response.dto";

export function toBookResponse(book: Book): BookResponseDto {
  return {
    id: book.id.toString(),
    title: book.title,
    author: book.author,
    publishedYear: book.publishedYear,
  };
}
