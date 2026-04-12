import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { config } from "../../config.js";
import { users } from "../../data/inMemoryStore.js";
import { pool } from "../../db.js";
import type { PublicUser, UserRecord } from "../../types.js";

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const toPublicUser = (user: UserRecord): PublicUser => ({
  id: user.id,
  name: user.name,
  email: user.email,
  role: user.role,
});

const createToken = (user: PublicUser): string =>
  jwt.sign({ sub: user.id, email: user.email, role: user.role, name: user.name }, config.jwtSecret, {
    expiresIn: "7d",
  });

async function findUserByEmail(email: string): Promise<UserRecord | null> {
  if (pool) {
    const result = await pool.query(
      "SELECT id, name, email, password_hash, role, created_at FROM users WHERE email = $1",
      [email],
    );
    if (!result.rowCount) return null;
    const row = result.rows[0];
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      passwordHash: row.password_hash,
      role: row.role,
      createdAt: row.created_at.toISOString(),
    };
  }

  return users.find((user) => user.email === email) || null;
}

async function createUser(input: { name: string; email: string; passwordHash: string }): Promise<UserRecord> {
  const newUser: UserRecord = {
    id: randomUUID(),
    name: input.name,
    email: input.email,
    passwordHash: input.passwordHash,
    role: "user",
    createdAt: new Date().toISOString(),
  };

  if (pool) {
    await pool.query(
      `INSERT INTO users (id, name, email, password_hash, role, created_at)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [newUser.id, newUser.name, newUser.email, newUser.passwordHash, newUser.role, newUser.createdAt],
    );
  } else {
    users.push(newUser);
  }

  return newUser;
}

export async function registerUser(payload: unknown) {
  const input = registerSchema.parse(payload);
  const existing = await findUserByEmail(input.email);

  if (existing) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(input.password, 10);
  const user = await createUser({ name: input.name, email: input.email, passwordHash });
  const publicUser = toPublicUser(user);

  return {
    token: createToken(publicUser),
    user: publicUser,
  };
}

export async function loginUser(payload: unknown) {
  const input = loginSchema.parse(payload);
  const user = await findUserByEmail(input.email);

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const validPassword = await bcrypt.compare(input.password, user.passwordHash);
  if (!validPassword) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const publicUser = toPublicUser(user);
  return {
    token: createToken(publicUser),
    user: publicUser,
  };
}



