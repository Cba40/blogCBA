# CBA Blog – Guía de Instalación

¡Bienvenido/a al proyecto **CBA Blog**! 🎉  
Este es un blog full-stack desarrollado con:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + SQLite
- **Base de datos**: Liviana y sin necesidad de instalación externa

Esta guía te ayudará a instalar y ejecutar el proyecto localmente para probarlo, colaborar o proponer mejoras.

---

## 📦 1. Clonar el repositorio


cba-blog/
├── frontend/       → Frontend (React + Vite)
├── backend/        → Backend (Node.js + Express + SQLite)
└── README.md       → Este archivo

# 1. Entrar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
npm run dev

✅ El front se abrirá automáticamente en:
👉 http://localhost:5173

# 1. Entrar a la carpeta backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor
npm run dev

✅ El back-end se ejecutará en:
👉 http://localhost:5000
✅ Verás: ✅ Servidor corriendo en http://localhost:5000


# Dentro de la carpeta backend
node seed.js
✅ 10 artículos cargados en la base de datos

🔐 5. Acceder al Panel de Administración
Visita: http://localhost:5173/admin-login
Usa la contraseña: cba40blog
Serás redirigido a /admin para crear o editar artículos
🔒 Puedes cambiar la contraseña en frontend/src/components/AdminLogin.tsx. 

🧪 6. Probar el funcionamiento
PÁGINA/ URL
Blog principal: http://localhost:5173
Artículo de ejemplo: http://localhost:5173/article/1
Búsqueda:http://localhost:5173/buscar?q=ia
Panel de admin:http://localhost:5173/admin

🛠 Requisitos previos
Asegúrate de tener instalado:

✅ Node.js (versión 18 o superior)/n
✅ npm (incluido con Node.js)
✅ Git
✅ Editor de código (recomendado: VS Code)

📝 Notas importantes
📁 Las imágenes están en frontend/public/imagenes/ImagenesArticulos/
🗃 La base de datos (db.sqlite) se crea automáticamente al correr seed.js
🔁 Si borras db.sqlite, vuelve a ejecutar node seed.js
🌐 El front y el back deben correr al mismo tiempo (en terminales separadas)
🚫 No uses el botón de "atrás" del navegador para volver al panel después de cerrar sesión

🧩 Comandos útiles
COMANDO
DESCRIPCIÓN
npm run dev
(en
frontend/
)
Inicia el servidor de desarrollo del front
npm run dev
(en
backend/
)
Inicia el servidor del back-end
node seed.js
(en
backend/
)
Carga los artículos iniciales
Ctrl + C
Detiene cualquier servidor
npm install
Instala dependencias

✅ ¿Todo funciona?
Si ves:

✅ Artículos en el blog

✅ Imágenes visibles

✅ Búsqueda funcional

✅ Panel de admin accesible

✅ CRUD de artículos (crear, editar, eliminar)

🎉 ¡El proyecto está funcionando correctamente!

📁 Archivos clave
ARCHIVO
FUNCIÓN
frontend/src/components/AdminLogin.tsx
Cambiar contraseña de acceso
backend/seed.js
Cargar artículos iniciales
backend/server.js
API REST con Express
frontend/vite.config.js
Configuración del front-end


