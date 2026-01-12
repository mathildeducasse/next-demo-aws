import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "@/lib/book";

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST || "localhost",
  port: 5432,
  username: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  database: "wayne",
  synchronize: true, // Set to false in production
  logging: true,
  entities: [Book],
  subscribers: [],
  migrations: [],
});

// Avoid creating multiple connections in development
let dataSource: DataSource;

export const getDataSource = async () => {
  if (dataSource && dataSource.isInitialized) {
    return dataSource;
  }
  dataSource = await AppDataSource.initialize();
  return dataSource;
};