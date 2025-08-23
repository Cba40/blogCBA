// backend/server.js
import express from 'express';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import cors from 'cors';

const app = express();
const PORT = 5000;

// Habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173',
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

    // Crear tabla 'articles' si no existe
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

    // Crear tabla 'subscribers' si no existe
    await db.exec(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        createdAt TEXT NOT NULL
      )
    `);

    console.log('✅ Base de datos lista');
  } catch (error) {
    console.error('❌ Error al conectar con SQLite:', error);
  }
})();

// 🔹 Ruta: Suscribir correo
app.post('/api/subscribers', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email inválido' });
  }

  try {
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();

    await db.run(
      `INSERT INTO subscribers (id, email, createdAt) VALUES (?, ?, ?)`,
      [id, email, createdAt]
    );

    res.status(201).json({ message: 'Suscrito exitosamente' });
  } catch (error) {
    // Si el email ya existe
    if (error.code === 'SQLITE_CONSTRAINT') {
      res.status(200).json({ message: 'Ya estás suscrito' });
    } else {
      res.status(500).json({ message: 'Error al suscribir' });
    }
  }
});

// 🔹 GET: Todos los suscriptores
app.get('/api/subscribers', async (req, res) => {
  try {
    const subscribers = await db.all('SELECT email, createdAt FROM subscribers ORDER BY createdAt DESC');
    res.json(subscribers);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener suscriptores' });
  }
});

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
    <p><a href="/api/subscribers">Ver suscriptores (protegido)</a></p>
  `);
});

// 🔹 POST: Enviar newsletter a todos los suscriptores
app.post('/api/newsletter', async (req, res) => {
  const { subject, content } = req.body;

  if (!subject || !content) {
    return res.status(400).json({ message: 'Faltan asunto o contenido' });
  }

  try {
    // Obtener suscriptores
    const subscribers = await db.all('SELECT email FROM subscribers');
    const emails = subscribers.map(s => s.email);

    if (emails.length === 0) {
      return res.status(200).json({ message: 'No hay suscriptores' });
    }

    // Configurar Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tucorreo@gmail.com',        // ← Tu correo
        pass: 'tu-app-password',          // ← App Password de 16 caracteres
      },
    });

    // Plantilla HTML profesional
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${subject}</title>
        <style>
          body {
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: #009688;
            color: white;
            padding: 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 500;
          }
          .content {
            padding: 30px;
            font-size: 16px;
            background: #fff;
          }
          .content p {
            margin: 0 0 16px 0;
            color: #444;
          }
          .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #999;
            background: #f9f9f9;
            border-top: 1px solid #eee;
          }
          .footer a {
            color: #009688;
            text-decoration: none;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .btn {
            display: inline-block;
            padding: 12px 24px;
            margin: 16px 0;
            background: #009688;
            color: white !important;
            text-decoration: none;
            border-radius: 6px;
            font-weight: bold;
            text-align: center;
          }
          .btn:hover {
            background: #00796b;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>${subject}</h1>
          </div>
          <div class="content">
            ${content.replace(/\n/g, '<br>')}
          </div>
          <div class="footer">
            <p>
              <a href="https://tudominio.com/unsubscribe">Darse de baja</a> | 
              <a href="https://tudominio.com">Visitar sitio web</a>
            </p>
            <p>&copy; ${new Date().getFullYear()} CBA Blog. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Enviar email
    await transporter.sendMail({
      from: 'CBA Blog <tucorreo@gmail.com>',
      to: emails,
      subject,
      html: htmlTemplate,
    });

    res.json({ message: `✅ Newsletter enviado a ${emails.length} suscriptor(es)` });
  } catch (error) {
    console.error('Error al enviar newsletter:', error);
    res.status(500).json({ message: '❌ Error al enviar emails. Revisa la consola.' });
  }
});
// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});