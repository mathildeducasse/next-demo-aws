import { describe, it, expect, vi, beforeEach } from "vitest";
import { GET, POST } from "./route";
import { getDataSource } from "@/lib/database";
import { toBookResponse } from "@/lib/book.mapper";

// 1. Mock the database and mapper modules
vi.mock("@/lib/database", () => ({
  getDataSource: vi.fn(),
}));

vi.mock("@/lib/book.mapper", () => ({
  toBookResponse: vi.fn((book) => ({
    id: String(book.id),
    title: book.title,
    author: book.author,
    publishedYear: book.publishedYear,
  })),
}));

describe("Books API Route Handlers", () => {
  // Create shared mock objects for the repository and data source
  const mockRepository = {
    find: vi.fn(),
    create: vi.fn(),
    save: vi.fn(),
  };

  const mockDataSource = {
    getRepository: vi.fn().mockReturnValue(mockRepository),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Ensure getDataSource always returns our mockDataSource
    vi.mocked(getDataSource).mockResolvedValue(mockDataSource as any);
  });

  // --- GET TEST ---
  it("GET should return a list of mapped books", async () => {
    const mockEntities = [
      { id: 1, title: "Next.js Guide", author: "Wayne", publishedYear: 2024 },
    ];
    mockRepository.find.mockResolvedValue(mockEntities);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
    expect(data[0].title).toBe("Next.js Guide");
    expect(mockRepository.find).toHaveBeenCalledTimes(1);
  });

  // --- POST TEST (Success) ---
  it("POST should create and return a new book when valid", async () => {
    const payload = { title: "New Book", author: "Author", publishedYear: 2025 };
    const savedEntity = { id: 99, ...payload };

    // Mock TypeORM behavior: create returns the object, save returns it with ID
    mockRepository.create.mockReturnValue(payload);
    mockRepository.save.mockResolvedValue(savedEntity);

    const request = new Request("http://localhost/api/books", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.id).toBe("99");
    expect(mockRepository.save).toHaveBeenCalledWith(payload);
  });

  // --- POST TEST (Failure) ---
  it("POST should return 400 for invalid data", async () => {
    const invalidPayload = { title: "" }; // Missing author, fails Zod validation

    const request = new Request("http://localhost/api/books", {
      method: "POST",
      body: JSON.stringify(invalidPayload),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty("errors");
    expect(mockRepository.save).not.toHaveBeenCalled();
  });
});