import { createApp } from "../backend/src/app.js";
import { bootstrapApp } from "../backend/src/bootstrap.js";

const app = createApp();

export default async function handler(req: any, res: any) {
  await bootstrapApp();
  return app(req, res);
}

