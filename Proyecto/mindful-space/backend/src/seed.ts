import { initDatabase, pool } from "./db.js";
import { seedArticles } from "./modules/content/content.service.js";

async function seedUsers() {
  if (!pool) return;

  const existing = await pool.query("SELECT COUNT(*)::int AS count FROM users");
  if (existing.rows[0].count > 0) return;

  await pool.query(
    `INSERT INTO users (id, name, email, password_hash, role, created_at)
     VALUES
     ('u-demo-1', 'Usuario Demo', 'demo@mindwell.com', '$2a$10$C8T9M91uxfD6A8M4SxYf4uNdPg2fS6zQfQkEOw9hWf8rOQIFxw4wC', 'user', NOW())`,
  );
}

async function runSeed() {
  await initDatabase();
  await seedUsers();
  await seedArticles();
  console.log("Seed completado");
}

runSeed().catch((error) => {
  console.error("Error al ejecutar seed", error);
  process.exitCode = 1;
});

