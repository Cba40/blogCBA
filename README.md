<<<<<<< HEAD
# CBA Blog – Guía de Instalación

¡Bienvenido/a al proyecto **CBA Blog**! 🎉  
Este es un blog full-stack desarrollado con:
- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express + SQLite
- **Base de datos**: Liviana y sin necesidad de instalación externa

Esta guía te ayudará a instalar y ejecutar el proyecto localmente para probarlo, colaborar o proponer mejoras.

---

## 📦 . Clonar el repositorio



# 1. Entrar a la carpeta frontend
cd frontend


# 2. Instalar dependencias
Ejecutar npm install


# 3. Iniciar el servidor de desarrollo
Ejecutar npm run dev

✅ El front se abrirá automáticamente en:
👉 http://localhost:5173

# 1. Entrar a la carpeta backend
cd backend

# 2. Instalar dependencias
Ejecutar npm install


# 3. Iniciar el servidor
Ejecutar npm run dev

✅ El back-end se ejecutará en: 👉 http://localhost:5000

✅ Verás: 

✅ Servidor corriendo en http://localhost:5000


# 4 Dentro de la carpeta backend
Ejecutar node seed.js

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

✅ Node.js (versión 18 o superior)

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

COMANDO / DESCRIPCIÓN

npm run dev (en frontend/) -> 
Inicia el servidor de desarrollo del front

npm run dev (en backend/) -> 
Inicia el servidor del back-end


node seed.js (en backend/) -> 
Carga los artículos iniciales

Ctrl + C Detiene cualquier servidor -> 
npm install Instala dependencias


✅ ¿Todo funciona? Si ves:

✅ Artículos en el blog

✅ Imágenes visibles

✅ Búsqueda funcional

✅ Panel de admin accesible

✅ CRUD de artículos (crear, editar, eliminar)



🎉 ¡El proyecto está funcionando correctamente!

📁 Archivos clave
ARCHIVO / FUNCIÓN

frontend/src/components/AdminLogin.tsx -> 
Cambiar contraseña de acceso

backend/seed.js -> 
Cargar artículos iniciales

backend/server.js -> 
API REST con Express

frontend/vite.config.js -> 
Configuración del front-end


=======
# CBA Blog

Blog tecnológico desarrollado con React (Vite) en el frontend y Node.js + Express + SQLite en el backend.  
Permite gestionar artículos de forma dinámica, con panel de administración, búsqueda, categorías y más.

---

## 🚀 Cómo instalar y correr el proyecto

Este proyecto tiene dos partes: **frontend** y **backend**.  
Ambas deben estar corriendo al mismo tiempo para que todo funcione correctamente.

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/cba-blog.git
cd cba-blog
```

> Reemplaza `https://github.com/tu-usuario/cba-blog.git` con la URL de tu repositorio.

---

### 2. Instalar y correr el Frontend

El frontend está en React con Vite y usa Tailwind CSS.

```bash
# Entrar a la carpeta frontend
cd frontend

# Instalar dependencias
npm install

# cargar la base de datos
node seed.js

# Iniciar el servidor
npm run dev
```

El frontend se abrirá automáticamente en:  
👉 [http://localhost:5173](http://localhost:5173)

> ⚠️ Si ves un error como `Cannot find module 'tailwindcss'`, asegúrate de haber ejecutado `npm install` dentro de `frontend/`.  
> Esto instala Tailwind CSS, PostCSS y las dependencias necesarias.

---

### 3. Instalar y correr el Backend

En **otra terminal**, inicia el backend.

```bash
# Desde la raíz del proyecto, entra a backend
cd backend

# Instalar dependencias
npm install

# Iniciar el servidor
npm run dev
```

El backend se ejecutará en:  
👉 [http://localhost:5000](http://localhost:5000)

---

### 4. Cargar los artículos iniciales

La primera vez que corras el proyecto, debes cargar los artículos de ejemplo.

Con el backend corriendo, ejecuta este comando desde la carpeta `backend`:

```bash
node seed.js
```

Este script crea la base de datos `db.sqlite` y carga los artículos iniciales.

---

### 5. Acceder al panel de administración

Puedes crear, editar o eliminar artículos desde el panel de admin.

1. Ve a: [http://localhost:5173/admin-login](http://localhost:5173/admin-login)
2. Usa la contraseña: `cba40blog`
3. Serás redirigido a `/admin`

> Puedes cambiar la contraseña en `frontend/src/components/AdminLogin.tsx`.

---

### 6. Probar el blog

- **Blog principal**: [http://localhost:5173](http://localhost:5173)
- **Búsqueda**: escribe en el buscador (ej: "IA")
- **Artículo de ejemplo**: [http://localhost:5173/article/1](http://localhost:5173/article/1)
- **Panel de administración**: [http://localhost:5173/admin](http://localhost:5173/admin)

---

## 🛠 Requisitos previos

- [Node.js](https://nodejs.org/) (versión 18 o superior)
- npm (incluido con Node.js)
- Git

---

## 📝 Notas importantes

- Las imágenes están en `frontend/public/imagenes/ImagenesArticulos/`
- La base de datos (`db.sqlite`) se crea automáticamente al correr `seed.js`
- El frontend y el backend deben correr en **terminales separadas**
- Si cierras sesión, no uses el botón de "atrás" del navegador para volver al panel
- Si borras `db.sqlite`, vuelve a ejecutar `node seed.js` para recargar los artículos

---

¡Listo!  
Ahora podés navegar, buscar y gestionar artículos sin problemas.
```
>>>>>>> Walter
