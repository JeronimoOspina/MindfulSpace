import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const app = createApp();

describe("MindfulSpace MVP API", () => {
  it("registra e inicia sesion", async () => {
    const registerResponse = await request(app).post("/api/auth/register").send({
      name: "Nuevo Usuario",
      email: "nuevo@mindwell.com",
      password: "123456",
    });

    expect(registerResponse.status).toBe(201);
    expect(registerResponse.body.token).toBeTypeOf("string");

    const loginResponse = await request(app).post("/api/auth/login").send({
      email: "nuevo@mindwell.com",
      password: "123456",
    });

    expect(loginResponse.status).toBe(200);
    expect(loginResponse.body.user.email).toBe("nuevo@mindwell.com");
  });

  it("lista articulos", async () => {
    const response = await request(app).get("/api/content/articles");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("responde chat cuando hay token", async () => {
    const login = await request(app).post("/api/auth/login").send({
      email: "demo@mindwell.com",
      password: "123456",
    });

    const token = login.body.token;
    const chat = await request(app)
      .post("/api/chat/messages")
      .set("Authorization", `Bearer ${token}`)
      .send({ message: "Me siento con ansiedad" });

    expect(chat.status).toBe(200);
    expect(chat.body.response).toBeTypeOf("string");
  });

  it("expone catalogo de musica y recursos", async () => {
    const music = await request(app).get("/api/wellness/music");
    const resources = await request(app).get("/api/wellness/resources");

    expect(music.status).toBe(200);
    expect(music.body.length).toBeGreaterThan(3);
    expect(resources.status).toBe(200);
    expect(resources.body.length).toBe(3);
  });

  it("calcula autoevaluacion de ansiedad", async () => {
    const score = await request(app)
      .post("/api/wellness/anxiety-test/score")
      .send({ answers: [1, 2, 1, 2, 1] });

    expect(score.status).toBe(200);
    expect(score.body.total).toBe(7);
    expect(score.body.level).toBe("Medio");
  });
});

