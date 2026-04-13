import { query } from "../../../shared/db.js"

export async function storeQueryEntry({ userId, queryText, status, risk }) {
  const result = await query(
    `
    INSERT INTO queries (query_text, user_id, status, risk)
    VALUES ($1, $2, $3, $4)
    RETURNING id
  `,
    [queryText, userId, status, risk],
  )
  return result.rows[0]
}
