// lib/entities/Book.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity("books")
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  title: string;

  @Column({ type: "varchar", length: 100 })
  author: string;

  @Column({ name: "published_year", type: "int", nullable: true })
  publishedYear: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}