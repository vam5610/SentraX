import { query } from "../../../shared/db.js"

export async function createLogEntry({ userId, action, status, risk, detail }) {
  const result = await query(
    `
    INSERT INTO logs (user_id, action, status, risk, detail)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING id, user_id, action, status, risk, detail, created_at
  `,
    [userId, action, status, risk, detail],
  )
  return result.rows[0]
}

export async function fetchLogs(limit = 50) {
  const result = await query(
    `
    SELECT logs.*, users.email, users.role
    FROM logs
    JOIN users ON users.id = logs.user_id
    ORDER BY created_at DESC
    LIMIT $1
  `,
    [limit],
  )
  return result.rows
}

export async function countTotalLogs() {
  const result = await query(`SELECT COUNT(*) FROM logs`)
  return Number(result.rows[0]?.count ?? 0)
}

export async function countBlockedLogs() {
  const result = await query(`SELECT COUNT(*) FROM logs WHERE status = 'BLOCKED'`)
  return Number(result.rows[0]?.count ?? 0)
}

export async function countUniqueUsers() {
  const result = await query(`SELECT COUNT(DISTINCT user_id) FROM logs`)
  return Number(result.rows[0]?.count ?? 0)
}

export async function getDailyTrends(days = 7) {
  const since = new Date()
  since.setDate(since.getDate() - (days - 1))
  const result = await query(
    `
    SELECT DATE_TRUNC('day', created_at) AS day,
      COUNT(*) AS total,
      SUM(CASE WHEN status = 'BLOCKED' THEN 1 ELSE 0 END) AS blocked
    FROM logs
    WHERE created_at >= $1
    GROUP BY day
    ORDER BY day ASC
  `,
    [since.toISOString()],
  )
  return result.rows.map((row) => ({
    day: new Date(row.day).toLocaleDateString("en-US", { weekday: "short" }),
    total: Number(row.total),
    blocked: Number(row.blocked),
  }))
}

export async function getTopUsers(limit = 5) {
  const result = await query(
    `
    SELECT users.email, users.role,
      COUNT(*) AS queries,
      SUM(CASE WHEN logs.status = 'BLOCKED' THEN 1 ELSE 0 END) AS blocked
    FROM logs
    JOIN users ON users.id = logs.user_id
    GROUP BY users.id
    ORDER BY queries DESC
    LIMIT $1
  `,
    [limit],
  )
  return result.rows.map((row) => ({
    username: row.email,
    role: row.role,
    queries: Number(row.queries),
    blocked: Number(row.blocked),
  }))
}

export async function getRiskDistribution() {
  const result = await query(
    `
    SELECT risk, COUNT(*) AS value
    FROM logs
    GROUP BY risk
  `,
  )
  const total = result.rows.reduce((sum, row) => sum + Number(row.value), 0) || 1
  return result.rows.map((row) => ({
    name: row.risk,
    value: (Number(row.value) / total) * 100,
  }))
}
