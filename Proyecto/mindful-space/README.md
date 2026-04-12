# MindfulSpace MVP

MVP full-stack basado en la arquitectura propuesta: monolito modular backend + frontend React.

## Modulos MVP implementados

- Autenticacion: registro, login y JWT.
- Chatbot basico: respuestas empaticas y recomendaciones simples.
- Biblioteca de contenido: listado y detalle de articulos.
- Ejercicio de respiracion: tecnica 4-7-8 y variantes guiadas.

## Nuevas funcionalidades (update)

- Ayuda inmediata visible con lineas reales de Colombia: 106, 192 y 165.
- Musica para relajarte por categorias (ansiedad, estres, dormir).
- Informacion orientativa sobre ansiedad, depresion y estres.
- Autoevaluacion de ansiedad con resultado orientativo (bajo/medio/alto).
- Videollamada basica integrada con Jitsi Meet.

## Estructura

```text
mindful-space/
  backend/
    src/
      modules/
        auth/
        chat/
        content/
      shared/
      app.ts
      server.ts
      seed.ts
  src/
    components/
    contexts/
    lib/
    pages/
```

## Requisitos

- Node.js 20+
- (Opcional) PostgreSQL para persistencia real

## Ejecutar backend

1. Ir a `backend/`.
2. Copiar `.env.example` a `.env`.
3. Instalar dependencias y correr.

```bash
cd backend
npm install
npm run dev
```

Backend por defecto: `http://localhost:4000`.

Si configuras `DATABASE_URL`, usa PostgreSQL y crea tablas al iniciar.
Si no configuras `DATABASE_URL`, usa almacenamiento en memoria para pruebas rapidas.

## Ejecutar frontend

1. En la raiz de `mindful-space/`, copiar `.env.example` a `.env`.
2. Instalar dependencias y correr.

```bash
npm install
npm run dev
```

Frontend por defecto: `http://localhost:5173`.

## Seed de datos

- Usuario demo:
  - email: `demo@mindwell.com`
  - password: `123456`
- Articulos de ejemplo incluidos.

Con PostgreSQL:

```bash
cd backend
npm run seed
```

## Endpoints MVP

- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/chat/messages` (requiere bearer token)
- `GET /api/content/articles`
- `GET /api/content/articles/:slug`
- `GET /api/health`

## Endpoints nuevos

- `GET /api/wellness/music`
- `GET /api/wellness/resources`
- `GET /api/wellness/anxiety-test`
- `POST /api/wellness/anxiety-test/score`

## Rutas frontend nuevas

- `/music`
- `/mental-health-info`
- `/self-assessment`

## Despliegue en Vercel

Este proyecto ya incluye `api/[...all].ts` para exponer el backend Express como funcion serverless en Vercel.

1. Sube el repositorio a GitHub.
2. En Vercel, crea un proyecto importando el repo.
3. Define como Root Directory: `Proyecto/mindful-space`.
4. Variables recomendadas en Vercel:
   - `JWT_SECRET=tu_secreto_seguro`
   - `CORS_ORIGIN=https://tu-app.vercel.app,https://*.vercel.app`
   - `DATABASE_URL` (opcional; si no se define, se usa memoria temporal)
5. Si quieres usar API remota separada, define tambien `VITE_API_URL`; si no, el frontend usa `/api` automaticamente en produccion.

Notas:

- Con memoria temporal, los datos pueden perderse en nuevos cold starts serverless.
- Para persistencia real en produccion, configura PostgreSQL en `DATABASE_URL`.

