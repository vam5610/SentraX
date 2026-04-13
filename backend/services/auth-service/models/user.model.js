import bcrypt from "bcryptjs"

import { query } from "../../../shared/db.js"

const TABLE = "users"
const defaultEmail = process.env.DEFAULT_ADMIN_EMAIL || "admin@sentra.local"
const defaultPassword = process.env.DEFAULT_ADMIN_PASSWORD || "S3cur3P@ssw0rd"

function mapUser(row) {
  if (!row) return null
  return {
    id: row.id,
    email: row.email,
    password: row.password,
    role: row.role,
  }
}

export async function findUserByEmail(email) {
  if (!email) return null
  const result = await query(
    `SELECT id, email, password, role FROM ${TABLE} WHERE LOWER(email) = LOWER($1)`,
    [email.trim()],
  )
  return mapUser(result.rows[0])
}

export async function findUserById(id) {
  if (!id) return null
  const result = await query(
    `SELECT id, email, password, role FROM ${TABLE} WHERE id = $1`,
    [id],
  )
  return mapUser(result.rows[0])
}

export async function createUser({ email, password, role = "user" }) {
  const hashed = await bcrypt.hash(password, 10)
  const result = await query(
    `INSERT INTO ${TABLE} (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role`,
    [email.trim().toLowerCase(), hashed, role],
  )
  return result.rows[0]
}

export async function ensureDefaultUsers() {
  const existing = await findUserByEmail(defaultEmail)
  if (existing) return existing
  return createUser({
    email: defaultEmail,
    password: defaultPassword,
    role: "admin",
  })
}
