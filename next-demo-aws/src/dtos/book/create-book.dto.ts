export interface CreateBookDto {
  title: string;
  author: string;
  publishedYear: number;
}

// no id nor createdAt because they are generated internally