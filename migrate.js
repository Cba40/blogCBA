import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Conexión a SQLite
const sqlite = await open({
  filename: './backend/db.sqlite', // Ajusta la ruta si es necesario
  driver: sqlite3.Database,
});

// Conexión a PostgreSQL
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

await client.connect();
console.log('✅ Conectado a PostgreSQL');

// Leer datos de SQLite
const articles = await sqlite.all('SELECT * FROM articles');
const subscribers = await sqlite.all('SELECT * FROM subscribers');

// Insertar artículos
for (const article of articles) {
  await client.query(
    `INSERT INTO articles (id, title, excerpt, content, author, date, readtime, category, image, featured)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
     ON CONFLICT (id) DO NOTHING`,
    [
      article.id,
      article.title,
      article.excerpt,
      article.content,
      article.author,
      article.date,
      article.readTime,
      article.category,
      article.image,
      Boolean(article.featured)
    ]
  );
}

// Insertar suscriptores
for (const sub of subscribers) {
  await client.query(
    `INSERT INTO subscribers (id, email, createdat)
     VALUES ($1, $2, $3)
     ON CONFLICT (email) DO NOTHING`,
    [sub.id, sub.email, sub.createdAt]
  );
}

console.log(`✅ Migrados ${articles.length} artículos y ${subscribers.length} suscriptores`);
await client.end();
await sqlite.close();