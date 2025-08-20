import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors'; // ✅ 1. Importa cors

const app = express();
const PORT = 5000;

// ✅ 2. Habilita CORS (antes de cualquier ruta)
app.use(cors({
  origin: 'http://localhost:5173', // Permite solo tu front
  credentials: true,
}));

app.use(express.json());

// Abrir base de datos
let db;

(async () => {
  try {
    db = await open({
      filename: './db.sqlite',
      driver: sqlite3.Database,
    });

    // Crear tabla si no existe
    await db.exec(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        date TEXT NOT NULL,
        readTime INTEGER NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        featured INTEGER DEFAULT 0
      )
    `);
    console.log('✅ Base de datos lista');
  } catch (error) {
    console.error('❌ Error al conectar con SQLite:', error);
  }
})();

// 🔹 GET: Todos los artículos
app.get('/api/articles', async (req, res) => {
  try {
    const articles = await db.all('SELECT * FROM articles ORDER BY rowid DESC');
    res.json(articles.map(a => ({ ...a, featured: Boolean(a.featured) })));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos' });
  }
});

// 🔹 GET: Artículo por ID
app.get('/api/articles/:id', async (req, res) => {
  try {
    const article = await db.get('SELECT * FROM articles WHERE id = ?', req.params.id);
    if (!article) return res.status(404).json({ message: 'No encontrado' });
    res.json({ ...article, featured: Boolean(article.featured) });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículo' });
  }
});

// 🔹 POST: Nuevo artículo
app.post('/api/articles', async (req, res) => {
  const { id, title, excerpt, content, author, date, readTime, category, image, featured } = req.body;

  if (!id || !title || !excerpt || !content) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }

  try {
    await db.run(
      `INSERT INTO articles (id, title, excerpt, content, author, date, readTime, category, image, featured)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, excerpt, content, author, date, readTime, category, image, featured ? 1 : 0]
    );
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear artículo', error: error.message });
  }
});

// 🔹 PUT: Actualizar artículo
app.put('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, author, date, readTime, category, image, featured } = req.body;

  try {
    const article = await db.get('SELECT * FROM articles WHERE id = ?', id);
    if (!article) return res.status(404).json({ message: 'No encontrado' });

    await db.run(
      `UPDATE articles SET
        title = ?, excerpt = ?, content = ?, author = ?, date = ?,
        readTime = ?, category = ?, image = ?, featured = ?
       WHERE id = ?`,
      [title, excerpt, content, author, date, readTime, category, image, featured ? 1 : 0, id]
    );

    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
});

// 🔹 DELETE: Eliminar artículo
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const result = await db.run('DELETE FROM articles WHERE id = ?', req.params.id);
    if (result.changes === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Artículo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar' });
  }
});

// 🔹 Ruta de prueba
app.get('/', (req, res) => {
  res.send(`
    <h1>✅ API del CBA Blog</h1>
    <p>Base de datos: SQLite (db.sqlite)</p>
    <p><a href="/api/articles">Ver artículos</a></p>
  `);
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});