import { createApp } from "./app.js";
import { config } from "./config.js";
import { initDatabase } from "./db.js";
import { seedArticles } from "./modules/content/content.service.js";

async function bootstrap() {
  await initDatabase();
  await seedArticles();

  const app = createApp();
  app.listen(config.port, () => {
    console.log(`Backend escuchando en http://localhost:${config.port}`);
  });
}

bootstrap().catch((error) => {
  console.error("No se pudo iniciar el backend", error);
  process.exitCode = 1;
});

