export interface BookResponseDto {
  id: string;
  title: string;
  author: string;
  publishedYear: number;
}

// no createdAt nor internal fields because not needed