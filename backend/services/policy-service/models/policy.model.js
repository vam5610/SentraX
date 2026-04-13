import { query } from "../../../shared/db.js"

const TABLE = "policies"

function normalize(role, action, effect) {
  return {
    role: (role || "user").toLowerCase(),
    action: (action || "SELECT").toUpperCase(),
    effect: (effect || "DENY").toUpperCase(),
  }
}

export async function listPolicies() {
  const result = await query(
    `SELECT id, role, action, effect FROM ${TABLE} ORDER BY role ASC, action ASC`,
  )
  return result.rows
}

export async function upsertPolicy({ role, action, effect }) {
  const normalized = normalize(role, action, effect)
  const result = await query(
    `
    INSERT INTO ${TABLE} (role, action, effect)
    VALUES ($1, $2, $3)
    ON CONFLICT (role, action)
    DO UPDATE SET effect = EXCLUDED.effect, updated_at = NOW()
    RETURNING id, role, action, effect
  `,
    [normalized.role, normalized.action, normalized.effect],
  )
  return result.rows[0]
}

export async function evaluatePolicy(role, action) {
  const normalized = normalize(role, action)
  const result = await query(
    `SELECT effect FROM ${TABLE} WHERE role = $1 AND action = $2 LIMIT 1`,
    [normalized.role, normalized.action],
  )
  const record = result.rows[0]
  if (!record) {
    const defaultAllow =
      ["SELECT", "VIEW", "PING"].includes(normalized.action)
    return {
      allowed: defaultAllow,
      reason: defaultAllow ? "Default read fallback" : "Default deny for sensitive action",
    }
  }
  return {
    allowed: record.effect === "ALLOW",
    reason: `${record.effect} ${normalized.action}`,
  }
}
