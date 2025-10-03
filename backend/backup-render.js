// backup-render.js
import { Client } from 'pg';
import fs from 'fs';

// Datos de conexión a la BD en Render
const client = new Client({
  connectionString: 'postgresql://blogcbauser:Zcz8gMfvIv8CmpEnGwE4xTxMWTOEQQJV@dpg-d2p0ved6ubrc73873860-a.frankfurt-postgres.render.com/blogcba',
  ssl: {
    rejectUnauthorized: false // Necesario para conexiones externas
  }
});

async function backup() {
  try {
    await client.connect();
    console.log('✅ Conectado a la base de datos en Render');

    // Obtener artículos y suscriptores
    const [articlesRes, subscribersRes] = await Promise.all([
      client.query('SELECT * FROM articles'),
      client.query('SELECT id, email, createdat FROM subscribers')
    ]);

    const data = {
      timestamp: new Date().toISOString(),
      articles: articlesRes.rows,
      subscribers: subscribersRes.rows
    };

    // Guardar en archivo
    fs.writeFileSync('backup_cba_blog.json', JSON.stringify(data, null, 2));
    console.log('💾 Backup guardado en backup_cba_blog.json');
    console.log(`📦 ${data.articles.length} artículos y ${data.subscribers.length} suscriptores exportados.`);

    await client.end();
  } catch (err) {
    console.error('❌ Error al hacer backup:', err.message);
    process.exit(1);
  }
}

backup();