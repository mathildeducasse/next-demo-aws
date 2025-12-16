// define a book entity

export interface Book {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
  createdAt: Date;
}