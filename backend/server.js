import express from 'express';
import { Client } from 'pg';
import cors from 'cors';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS seguro
app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://blogcba.netlify.app',
      'http://cbacuatropuntocero.com.ar',
      'https://cbacuatropuntocero.com.ar'
    ],
    credentials: true,
  })
);

// Manejar preflight OPTIONS
app.options('*', cors());

// Parsear JSON
app.use(express.json());

// Conexión a Supabase (PostgreSQL)
let client;

const connectDB = async () => {
  try {
    client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();
    console.log('✅ Conectado a Supabase (PostgreSQL)');

    // Crear tablas si no existen (opcional – ya deberían estar creadas)
    await client.query(`
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        author TEXT NOT NULL,
        date DATE NOT NULL,
        readTime INTEGER NOT NULL DEFAULT 5,
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
    console.error('❌ Error al conectar con Supabase:', error);
    setTimeout(connectDB, 5000); // Reintento automático
  }
};

connectDB();

// 🔐 RUTA TEMPORAL PARA EXPORTAR DATOS (con token en URL)
app.get('/api/export-data/:token', async (req, res) => {
  const { token } = req.params;

  // Token secreto (cámbialo por uno personalizado)
  if (token !== 'tu-token-seguro-12345') {
    return res.status(403).json({ message: 'Acceso denegado' });
  }

  try {
    const [articlesRes, subscribersRes] = await Promise.all([
      client.query('SELECT * FROM articles'),
      client.query('SELECT id, email, createdat FROM subscribers')
    ]);

    res.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: {
        articles: articlesRes.rows,
        subscribers: subscribersRes.rows
      }
    });
  } catch (err) {
    console.error('Error al exportar:', err);
    res.status(500).json({ message: 'Error interno' });
  }
});

// 🔹 Rutas API


// --- CRUD DE ARTÍCULOS ---

// GET: Todos los artículos
app.get('/api/articles', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM articles ORDER BY date DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener artículos:', error);
    res.status(500).json({ message: 'Error al obtener artículos' });
  }
});

// GET: Un artículo por ID
app.get('/api/articles/:id', async (req, res) => {
  console.log('🔍 Buscando artículo con id:', req.params.id);
  try {
    const result = await client.query('SELECT * FROM articles WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      console.log('❌ Artículo NO encontrado con ese id');
      return res.status(404).json({ message: 'No encontrado' });
    }
    const article = result.rows[0];
    console.log('✅ Artículo encontrado:', article.title);
    res.json(article);
  } catch (error) {
    console.error('❌ Error al obtener artículo:', error);
    res.status(500).json({ message: 'Error al obtener artículo' });
  }
});

// POST: Crear un nuevo artículo
app.post('/api/articles', async (req, res) => {
  const { id, title, excerpt, content, author, date, readTime, category, image, featured } = req.body;
  try {
    const articleId = id || Date.now().toString();

    await client.query(
      `INSERT INTO articles (id, title, excerpt, content, author, date, readTime, category, image, featured) 
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
      [articleId, title, excerpt, content, author, date, readTime || 5, category, image, featured || false]
    );

    const newArticle = {
      id: articleId,
      title,
      excerpt,
      content,
      author,
      date,
      readTime: readTime || 5,
      category,
      image,
      featured: featured || false
    };

    console.log('✅ Artículo creado:', newArticle.title);
    res.status(201).json(newArticle);
  } catch (error) {
    console.error('❌ Error al crear artículo:', error);
    res.status(500).json({ message: 'Error al crear artículo' });
  }
});

// PUT: Actualizar artículo
app.put('/api/articles/:id', async (req, res) => {
  const { title, excerpt, content, author, date, readTime, category, image, featured } = req.body;
  try {
    const result = await client.query(
      `UPDATE articles 
       SET title = $1, excerpt = $2, content = $3, author = $4, date = $5, readTime = $6, category = $7, image = $8, featured = $9 
       WHERE id = $10`,
      [title, excerpt, content, author, date, readTime || 5, category, image, featured || false, req.params.id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }

    const updatedArticle = {
      id: req.params.id,
      title,
      excerpt,
      content,
      author,
      date,
      readTime: readTime || 5,
      category,
      image,
      featured: featured || false
    };

    console.log('✅ Artículo actualizado:', updatedArticle.title);
    res.json(updatedArticle);
  } catch (error) {
    console.error('❌ Error al actualizar artículo:', error);
    res.status(500).json({ message: 'Error al actualizar artículo' });
  }
});

// DELETE: Eliminar artículo
app.delete('/api/articles/:id', async (req, res) => {
  try {
    const result = await client.query('DELETE FROM articles WHERE id = $1', [req.params.id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Artículo no encontrado' });
    }
    console.log('✅ Artículo eliminado con id:', req.params.id);
    res.json({ message: 'Artículo eliminado exitosamente' });
  } catch (error) {
    console.error('❌ Error al eliminar artículo:', error);
    res.status(500).json({ message: 'Error al eliminar artículo' });
  }
});

// --- OTRAS RUTAS ---

// Ruta para contacto
app.post('/api/contact', async (req, res) => {
  const { subject, content } = req.body;
  if (!subject || !content) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Formulario de Contacto" <${process.env.GMAIL_USER}>`,
      to: 'cba4.0cordoba@gmail.com',
      subject,
      text: content,
      html: `<pre>${content}</pre>`,
    });

    res.json({ message: '✅ Mensaje enviado' });
  } catch (error) {
    console.error('Error al enviar contacto:', error);
    res.status(500).json({ message: '❌ Error al enviar' });
  }
});

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

// Listar suscriptores
app.get('/api/subscribers', async (req, res) => {
  try {
    const result = await client.query('SELECT email, createdat FROM subscribers ORDER BY createdat DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error al obtener suscriptores:', error);
    res.status(500).json({ message: 'Error al obtener suscriptores' });
  }
});

// Newsletter
app.post('/api/newsletter', async (req, res) => {
  const { subject, content } = req.body;
  if (!subject || !content) {
    return res.status(400).json({ message: 'Faltan asunto o contenido' });
  }

  try {
    const subscribers = await client.query('SELECT id, email FROM subscribers');
    const subscriberList = subscribers.rows;
    if (subscriberList.length === 0) {
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

    const domain = 'https://cbacuatropuntocero.com.ar/blog';
    const unsubscribeBase = 'https://cbacuatropuntocero.com.ar/blog/api/unsubscribe';

    for (const subscriber of subscriberList) {
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
                <img src="${domain}${featuredArticle.image}" alt="${featuredArticle.title}" />
                <p><strong>${featuredArticle.excerpt}</strong></p>
                <a href="${domain}/article/${featuredArticle.id}" class="btn">Leer más</a>
              </div>` : ''}</div>
            <div class="footer">
              <p>
                <a href="${unsubscribeBase}?token=${subscriber.id}">Darse de baja</a> |
                <a href="${domain}">Visitar sitio web</a>
              </p>
              <p>&copy; ${new Date().getFullYear()} CBA Blog. Todos los derechos reservados.</p>
            </div>
          </div>
        </body>
        </html>
      `;

      await transporter.sendMail({
        from: `"CBA Blog" <${process.env.GMAIL_USER}>`,
        to: subscriber.email,
        subject,
        html: htmlTemplate,
      });
    }

    res.json({ message: `✅ Newsletter enviado a ${subscriberList.length} suscriptor(es)` });
  } catch (error) {
    console.error('Error al enviar newsletter:', error);
    res.status(500).json({ message: '❌ Error al enviar emails' });
  }
});

// Ruta para darse de baja
app.get('/api/unsubscribe', async (req, res) => {
  const { token } = req.query;
  if (!token) {
    return res.status(400).send(`
      <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
        <h2>❌ Token no proporcionado</h2>
        <p>Falta el token de desuscripción.</p>
        <a href="https://cbacuatropuntocero.com.ar/blog" style="color: #009688;">Volver al blog</a>
      </div>
    `);
  }

  try {
    const result = await client.query('SELECT email FROM subscribers WHERE id = $1', [token]);
    if (result.rows.length === 0) {
      return res.status(404).send(`
        <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
          <h2>❌ No encontrado</h2>
          <p>Ya te diste de baja o el enlace no es válido.</p>
          <a href="https://cbacuatropuntocero.com.ar/blog" style="color: #009688;">Volver al blog</a>
        </div>
      `);
    }

    const email = result.rows[0].email;
    await client.query('DELETE FROM subscribers WHERE id = $1', [token]);

    res.send(`
      <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
        <h2>✅ Te has dado de baja con éxito</h2>
        <p><strong>${email}</strong></p>
        <p>Ya no recibirás más newsletters de CBA Blog.</p>
        <a href="https://cbacuatropuntocero.com.ar/blog" style="color: #009688;">Volver al blog</a>
      </div>
    `);
  } catch (error) {
    console.error('Error al darse de baja:', error);
    res.status(500).send(`
      <div style="text-align: center; padding: 40px; font-family: Arial, sans-serif;">
        <h2>❌ Error técnico</h2>
        <p>Intenta más tarde.</p>
        <a href="https://cbacuatropuntocero.com.ar/blog" style="color: #009688;">Volver al blog</a>
      </div>
    `);
  }
});

// --- RUTA RAÍZ (monitoreo) ---
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'ok', 
    message: 'API CBA Blog activa', 
    timestamp: new Date().toISOString() 
  });
});

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
});