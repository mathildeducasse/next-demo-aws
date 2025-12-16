export interface UpdateBookDto {
  title?: string;
  author?: string;
  publishedYear?: number;
}

// ? because not every field is required when updating