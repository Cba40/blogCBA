import express from 'express';
import { Client } from 'pg';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ⚠️ CORRECCIÓN: Sin espacios, y manejo de preflight OPTIONS
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://blogcba.netlify.app'], // ✅ Sin espacios
    credentials: true,
  })
);

// Manejar preflight OPTIONS (importante para PUT/POST con credenciales)
app.options('*', cors());

// Parsear JSON
app.use(express.json());

// Conexión a PostgreSQL
let client;

const connectDB = async () => {
  try {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false,
      },
    });
    await client.connect();
    console.log('✅ Conectado a PostgreSQL');

    // Crear tablas si no existen
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        date TEXT NOT NULL,
        readtime INTEGER NOT NULL,
        category TEXT NOT NULL,
        image TEXT NOT NULL,
        featured BOOLEAN DEFAULT false
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS subscribers (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        createdat TEXT NOT NULL
      );
    `);

    console.log('✅ Tablas listas');
  } catch (error) {
    console.error('❌ Error al conectar con PostgreSQL:', error);
    setTimeout(connectDB, 5000);
  }
};

connectDB();

// 🔹 Rutas API

// Suscribirse
app.post('/api/subscribers', async (req, res) => {
  const { email } = req.body;
  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Email inválido' });
  }
  try {
    const id = Date.now().toString();
    const createdAt = new Date().toISOString();
    await client.query(
      `INSERT INTO subscribers (id, email, createdat) VALUES ($1, $2, $3)`,
      [id, email, createdAt]
    );
    res.status(201).json({ message: 'Suscrito exitosamente' });
  } catch (error) {
    if (error.code === '23505') {
      res.status(200).json({ message: 'Ya estás suscrito' });
    } else {
      res.status(500).json({ message: 'Error al suscribir' });
    }
  }
});

app.get('/api/subscribers', async (req, res) => {
  try {
    const result = await client.query('SELECT email, createdat FROM subscribers ORDER BY createdat DESC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener suscriptores' });
  }
});

app.get('/api/articles', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM articles ORDER BY id DESC');
    res.json(result.rows.map(a => ({ ...a, featured: a.featured })));
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener artículos' });
  }
});

app.get('/api/articles/:id', async (req, res) => {
  console.log('🔍 Buscando artículo con id:', req.params.id); // ← Para ver qué ID está buscando
  try {
    const result = await client.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      console.log('❌ Artículo NO encontrado con ese id');
      return res.status(404).json({ message: 'No encontrado' });
    }
    const article = result.rows[0];
    console.log('✅ Artículo encontrado:', article.title);
    res.json({ ...article, featured: article.featured });
  } catch (error) {
    console.error('❌ Error al obtener artículo:', error);
    res.status(500).json({ message: 'Error al obtener artículo' });
  }
});

app.post('/api/articles', async (req, res) => {
  const { id, title, excerpt, content, author, date, readTime, category, image, featured } = req.body;
  if (!id || !title || !excerpt || !content) {
    return res.status(400).json({ message: 'Faltan campos requeridos' });
  }
  try {
    await client.query(
      `INSERT INTO articles (id, title, excerpt, content, author, date, readtime, category, image, featured)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [id, title, excerpt, content, author, date, readTime, category, image, featured]
    );
    res.status(201).json(req.body);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear artículo', error: error.message });
  }
});

app.put('/api/articles/:id', async (req, res) => {
  const { id } = req.params;
  const { title, excerpt, content, author, date, readTime, category, image, featured } = req.body;
  try {
    const result = await client.query('SELECT * FROM articles WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'No encontrado' });

    await client.query(
      `UPDATE articles SET
        title = $1, excerpt = $2, content = $3, author = $4, date = $5,
        readtime = $6, category = $7, image = $8, featured = $9
       WHERE id = $10`,
      [title, excerpt, content, author, date, readTime, category, image, featured, id]
    );
    res.json({ id, ...req.body });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar', error: error.message });
  }
});

app.delete('/api/articles/:id', async (req, res) => {
  try {
    const result = await client.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) return res.status(404).json({ message: 'No encontrado' });
    res.json({ message: 'Artículo eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar' });
  }
});

app.post('/api/newsletter', async (req, res) => {
  const { subject, content } = req.body;
  if (!subject || !content) {
    return res.status(400).json({ message: 'Faltan asunto o contenido' });
  }
  try {
    const subscribers = await client.query('SELECT email FROM subscribers');
    const emails = subscribers.rows.map(s => s.email);
    if (emails.length === 0) {
      return res.status(200).json({ message: 'No hay suscriptores' });
    }
    const featuredResult = await client.query(`
      SELECT * FROM articles 
      WHERE featured = true 
      ORDER BY date DESC 
      LIMIT 1
    `);
    const featuredArticle = featuredResult.rows[0];
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });
    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>${subject}</title>
        <style>
          body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: #009688; color: white; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 500; }
          .content { padding: 30px; font-size: 16px; background: #fff; }
          .content p { margin: 0 0 16px 0; color: #444; }
          .featured { border-left: 4px solid #009688; margin: 20px 0; padding: 15px; background: #f9f9f9; border-radius: 8px; }
          .featured h2 { margin: 0 0 10px 0; font-size: 20px; color: #009688; }
          .featured img { max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0; }
          .btn { display: inline-block; padding: 10px 20px; margin: 15px 0; background: #009688; color: white !important; text-decoration: none; border-radius: 6px; font-weight: bold; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; background: #f9f9f9; border-top: 1px solid #eee; }
          .footer a { color: #009688; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>${subject}</h1></div>
          <div class="content">${content.replace(/\n/g, '<br>')}${featuredArticle ? `
            <div class="featured">
              <h2>${featuredArticle.title}</h2>
              <img src="https://blogcba.netlify.app${featuredArticle.image}" alt="${featuredArticle.title}" style="max-width: 100%; height: auto; border-radius: 8px; margin: 10px 0;" />
              <p><strong>${featuredArticle.excerpt}</strong></p>
              <a href="${process.env.DOMAIN}/article/${featuredArticle.id}" class="btn">Leer más</a>
            </div>` : ''}</div>
          <div class="footer">
            <p><a href="${process.env.DOMAIN}/unsubscribe">Darse de baja</a> | <a href="${process.env.DOMAIN}">Visitar sitio web</a></p>
            <p>&copy; ${new Date().getFullYear()} CBA Blog. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `;
    await transporter.sendMail({
      from: 'CBA Blog <tucorreo@gmail.com>',
      to: emails,
      subject,
      html: htmlTemplate,
    });
    res.json({ message: `✅ Newsletter enviado a ${emails.length} suscriptor(es)` });
  } catch (error) {
    console.error('Error al enviar newsletter:', error);
    res.status(500).json({ message: '❌ Error al enviar emails' });
  }
});

// Ruta para darse de baja con token
app.get('/api/unsubscribe', async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).send(`
      <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
        <h2>❌ Token no proporcionado</h2>
        <p>Falta el token de desuscripción.</p>
        <a href="https://blogcba.netlify.app" style="color: #009688;">Volver al blog</a>
      </div>
    `);
  }

  try {
    // Busca el suscriptor por su id (token)
    const result = await client.query('SELECT email FROM subscribers WHERE id = $1', [token]);
    if (result.rows.length === 0) {
      return res.status(404).send(`
        <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
          <h2>❌ No encontrado</h2>
          <p>Ya te diste de baja o el enlace no es válido.</p>
          <a href="https://blogcba.netlify.app" style="color: #009688;">Volver al blog</a>
        </div>
      `);
    }

    const email = result.rows[0].email;

    // Elimina al suscriptor
    await client.query('DELETE FROM subscribers WHERE id = $1', [token]);

    // Respuesta exitosa
    res.send(`
      <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
        <h2>✅ Te has dado de baja con éxito</h2>
        <p><strong>${email}</strong></p>
        <p>Ya no recibirás más newsletters de CBA Blog.</p>
        <a href="https://blogcba.netlify.app" style="color: #009688;">Volver al blog</a>
      </div>
    `);
  } catch (error) {
    console.error('Error al darse de baja:', error);
    res.status(500).send(`
      <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
        <h2>❌ Error técnico</h2>
        <p>Intenta más tarde.</p>
        <a href="https://blogcba.netlify.app" style="color: #009688;">Volver al blog</a>
      </div>
    `);
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});