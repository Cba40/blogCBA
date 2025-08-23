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
