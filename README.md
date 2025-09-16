# API de Libros – Node.js + TypeScript

- Autor: Juan Esteban Castillo Guardia
- Clan: Linus

## Descripción
API REST sencilla para gestionar libros (CRUD) usando Express y TypeScript. La data persiste en un archivo JSON (sin base de datos) y expone endpoints para listar, obtener por id, crear, actualizar y eliminar libros.

## Scripts
- `npm install`: instala dependencias
- `npm run listen`: ejecuta en modo TS (ts-node)
- `npm run build`: compila a JavaScript en `dist/`
- `npm start`: ejecuta el build desde `dist/`

## Variables de entorno
Crea un archivo `.env` (en `src/` o en la raíz):
- `PORT`: puerto del servidor (por defecto 3001)
- `CORS_ORIGIN`: lista separada por comas de orígenes permitidos

## Endpoints principales
- `GET /`: estado de la API
- `GET /books`: lista de libros
- `GET /books/:id`: detalle de libro
- `POST /books`: crea libro `{ author, name, ouwner }`
- `PUT /books/:id`: actualiza libro (parcial)
- `DELETE /books/:id`: elimina libro

## Estructura breve
- `src/app.ts`: arranque del servidor y middlewares
- `src/routes/books.ts`: rutas de libros
- `src/controllers/book.ts`: controladores
- `src/services/book.services.ts`: lógica y persistencia en JSON
- `src/models/books.json`: datos de ejemplo

---
Trabajo realizado como práctica de API básica con Node.js, Express y TypeScript.
