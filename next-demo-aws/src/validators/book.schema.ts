// Zod schemas for validating book data
// describe the shape, types, and constraints of your data (like form inputs or API payloads) and then use it to validate that data at runtime,
// ensuring it's correct before processing, which offers strong type safety and reliable error handling on both client and server sides. 
// 
// used for :
// - server Actions: validating form data before performing actions.
// - API routes: ensuring incoming request bodies and query params are correctly structured.
// - client-Side forms: often combined with libraries like React Hook Form for instant user feedback before server submission. 

import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  publishedYear: z.number().int().gte(0),
});

export const updateBookSchema = createBookSchema.partial();
