# MindfulSpace — MVP (Full-stack)

Resumen
-------

MindfulSpace es un MVP full‑stack orientado a ofrecer herramientas básicas de apoyo en salud mental: chatbot de ayuda, biblioteca de artículos, ejercicios de respiración, catálogo de música relajante, autoevaluaciones y un flujo de teleconsulta demo. El proyecto está diseñado como un monolito modular con un frontend en React + Vite y un backend en TypeScript (Express) que puede desplegarse como funciones serverless en Vercel.

Stack técnico
-------------
- Frontend: React, TypeScript, Vite
- UI: componentes reutilizables (carteras propias), Tailwind CSS
- Backend: Node.js + Express (TypeScript) — pensado para funcionar localmente o como función serverless (`api/[...all].ts` en Vercel)
- Tests: Vitest (config incluida)
- Base de datos: opcional PostgreSQL; por defecto almacenamiento en memoria para desarrollo

Estructura del proyecto (resumen)
---------------------------------

`Proyecto/mindful-space/`

- `backend/` — código del backend (TypeScript)
  - `src/` — módulos por dominios: `auth`, `chat`, `content`, `wellness`, etc.
- `src/` — frontend (React + Vite), componentes, páginas y utilidades
- `public/`, `README.md`, `vite.config.ts`, `tsconfig.json`, `package.json`

Características principales
-------------------------
- Registro / login con JWT (demo)
- Chatbot con respuestas predefinidas y recomendaciones
- Biblioteca de artículos (artículos de ejemplo en memoria)
- Ejercicios de respiración guiada (4-7-8 y variantes)
- Catálogo de música relajante por categorías (ansiedad, estrés, dormir)
- Autoevaluación de ansiedad (test orientativo)
- Teleconsulta demo (flujo de front y simulación de pago)

Requisitos
----------
- Node.js 20+
- Git (para despliegue en Vercel via GitHub/GitLab)
- (Opcional) PostgreSQL para persistencia en producción

Instalación y ejecución (desarrollo)
----------------------------------

Backend (local)

1. Entra al directorio del backend:

```bash
cd Proyecto/mindful-space/backend
```

2. Copia el archivo de entorno y ajusta variables:

```bash
cp .env.example .env
# editar .env según sea necesario
```

3. Instala dependencias y ejecuta en modo desarrollo:

```bash
npm install
npm run dev
```

Por defecto el backend escucha en `http://localhost:4000`.

Frontend (local)

1. En la raíz del proyecto frontend:

```bash
cd Proyecto/mindful-space
cp .env.example .env
npm install
npm run dev
```

2. Abre `http://localhost:5173` en tu navegador.

Datos de ejemplo / seed
----------------------

El proyecto incluye datos en memoria y un script para poblar la base cuando usas PostgreSQL:

```bash
cd Proyecto/mindful-space/backend
npm run seed
```

Usuario demo (solo para testing):

- email: `demo@mindwell.com`
- password: `123456`

API y endpoints principales
---------------------------

- `POST /api/auth/register` — registrar usuario
- `POST /api/auth/login` — obtener JWT
- `POST /api/chat/messages` — enviar mensaje al chatbot (requiere token)
- `GET /api/content/articles` — listar artículos
- `GET /api/content/articles/:slug` — detalle de artículo
- `GET /api/wellness/music` — catálogo de música
- `GET /api/wellness/anxiety-test` — preguntas del test
- `POST /api/wellness/anxiety-test/score` — calcular puntaje

Despliegue en Vercel
---------------------

Si tienes el proyecto conectado a Vercel mediante el repositorio Git (GitHub/GitLab), el flujo típico es:

1. Commit y push de tus cambios a la rama configurada (p. ej. `main`):

```bash
git add .
git commit -m "Correcciones ortográficas y mejoras en README"
git push origin main
```

2. Vercel detecta el push y lanza una nueva build automáticamente.

Puntos importantes al desplegar en Vercel:
- En el panel de Vercel, definir **Root Directory** como `Proyecto/mindful-space` (esto ya está recomendado en la configuración actual).
- Configurar variables de entorno en Vercel (Project Settings → Environment Variables):
  - `JWT_SECRET` — secreto para tokens
  - `CORS_ORIGIN` — orígenes permitidos
  - `DATABASE_URL` — (opcional) URL de PostgreSQL para producción
  - `VITE_API_URL` — si el frontend debe apuntar a una API externa en producción
- Si la integración de backend utiliza `api/[...all].ts`, asegúrate de que la build incluya ese archivo y que las dependencias de backend estén en `package.json` correcto para el despliegue serverless.

Si no usas Git/Vercel integration, puedes desplegar manualmente con la CLI de Vercel:

```bash
npx vercel --prod --cwd Proyecto/mindful-space
```

¿Puedo recargarlo y que se reflejen los cambios?
------------------------------------------------

- Si hiciste cambios **locales**: primero comitea y haz `git push` al repositorio que Vercel tiene conectado; Vercel iniciará una nueva build automáticamente. (Si usas otra rama, asegúrate que Vercel está configurado para desplegarla o crea un PR.)
- Si los cambios fueron solo en `README.md` o archivos de documentación, no afectan la aplicación en ejecución — la build se actualizará pero no es necesario para que la app funcione localmente. Para que el sitio en Vercel muestre la nueva `README.md` en el repositorio, basta con pushear.
- Si realizaste cambios de código (frontend o backend), empuja y espera la build. Si la build falla, revisa los logs en Vercel y corrige errores (dependencias, variables faltantes, paths incorrectos).

Comandos útiles rápidos
----------------------

```bash
# Commit y push
git add .
git commit -m "tu mensaje"
git push

# Desplegar manual con Vercel CLI desde la carpeta del proyecto
npx vercel --prod --cwd Proyecto/mindful-space
```

Comprobaciones posteriores al deploy
-----------------------------------
- Verifica el log de despliegue en Vercel (Build & Functions logs).
- Revisa que las variables de entorno estén definidas en `Production` y `Preview` según necesites.
- Si usas base de datos, comprueba migraciones/seed y que `DATABASE_URL` sea accesible desde Vercel.

Contribuir / PRs
---------------

- Para cambios menores (como correcciones ortográficas) crea una rama, haz commit y abre un Pull Request; en la PR se ejecutará la build de preview de Vercel (si está configurado) y podrás revisar el sitio antes de mergear.

Contacto y notas finales
------------------------

Si quieres, puedo:

- generar un `CHANGELOG.md` y un `CONTRIBUTING.md` minimal para facilitar PRs;
- crear un PR con los cambios que ya realicé y preparar la rama para desplegar;
- ejecutar linter/formatter o pruebas y reportar errores (necesito permiso para correr comandos o que me digas si quieres que los ejecute localmente).

---

Archivo principal editado: [Proyecto/mindful-space/README.md](Proyecto/mindful-space/README.md#L1)

Si quieres que proceda a crear el PR y empujar los cambios, dime a qué rama debo enviarlos y si quieres un mensaje de PR específico.

