import "reflect-metadata"; // Crucial for TypeORM decorators to work in tests
import { afterAll, beforeAll } from "vitest";

// This runs once before all tests start
export async function setup() {
  console.log("Global Test Setup Initialized");

  // Optional: Set default environment variables for tests
  process.env.DB_HOST = "localhost";
  process.env.DB_USER = "postgres";
  process.env.DB_PASSWORD = "password";
  process.env.DB_DATABASE = "wayne_test"; // Use a test DB to avoid clearing your dev data
}

// This runs once after all tests finish
export async function teardown() {
  console.log("Global Test Teardown Executed");
}