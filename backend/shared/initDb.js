import pool from "./db.js"
import { upsertPolicy } from "../services/policy-service/models/policy.model.js"

const statements = [
  `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS policies (
    id SERIAL PRIMARY KEY,
    role TEXT NOT NULL,
    action TEXT NOT NULL,
    effect TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
  );
  `,
  `
  CREATE UNIQUE INDEX IF NOT EXISTS policies_role_action_idx ON policies(role, action);
  `,
  `
  CREATE TABLE IF NOT EXISTS logs (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id),
    action TEXT NOT NULL,
    status TEXT NOT NULL,
    risk TEXT NOT NULL,
    detail TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  `,
  `
  CREATE TABLE IF NOT EXISTS queries (
    id SERIAL PRIMARY KEY,
    query_text TEXT NOT NULL,
    user_id INT NOT NULL REFERENCES users(id),
    status TEXT NOT NULL,
    risk TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
  );
  `,
]

export async function ensureSchema() {
  const client = await pool.connect()
  try {
    await Promise.all(statements.map((sql) => client.query(sql)))
  } finally {
    client.release()
  }
  await seedDefaultPolicies()
}

const defaultPolicies = [
  { role: "admin", action: "SELECT", effect: "ALLOW" },
  { role: "admin", action: "INSERT", effect: "ALLOW" },
  { role: "admin", action: "UPDATE", effect: "ALLOW" },
  { role: "admin", action: "DELETE", effect: "ALLOW" },
  { role: "user", action: "SELECT", effect: "ALLOW" },
]

async function seedDefaultPolicies() {
  await Promise.all(defaultPolicies.map((policy) => upsertPolicy(policy)))
}
