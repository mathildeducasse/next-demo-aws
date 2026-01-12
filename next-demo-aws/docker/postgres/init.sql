CREATE DATABASE wayne;
\connect wayne;

CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(100) NOT NULL,
    author VARCHAR(100) NOT NULL,
    published_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);