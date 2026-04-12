import { initDatabase } from "./db.js";
import { seedArticles } from "./modules/content/content.service.js";

let bootstrapped = false;
let bootstrapPromise: Promise<void> | null = null;

export async function bootstrapApp(): Promise<void> {
  if (bootstrapped) return;

  if (!bootstrapPromise) {
    bootstrapPromise = (async () => {
      await initDatabase();
      await seedArticles();
      bootstrapped = true;
    })();
  }

  await bootstrapPromise;
}

