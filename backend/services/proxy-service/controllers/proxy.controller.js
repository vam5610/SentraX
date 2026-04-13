import { detectSQLInjection } from "../models/sqlDetector.model.js"
import { storeQueryEntry } from "../models/query.model.js"
import { evaluatePolicy } from "../../policy-service/models/policy.model.js"
import { createLogEntry } from "../../logging-service/models/log.model.js"

function extractAction(query = "") {
  const match = query.match(/\b(SELECT|UPDATE|DELETE|INSERT|CREATE|DROP|ALTER)\b/i)
  return match ? match[1].toUpperCase() : "UNKNOWN"
}

export async function executeProxy(req, res) {
  const { query } = req.body || {}
  const user = req.user
  const action = extractAction(query)

  const policyResult = await evaluatePolicy(user.role, action)
  const detection = detectSQLInjection(query)

  const shouldBlock = detection.isMalicious || !policyResult.allowed
  const status = shouldBlock ? "BLOCKED" : "ALLOWED"
  const risk = detection.risk || (shouldBlock ? "MEDIUM" : "LOW")
  const detail = detection.isMalicious ? detection.reason : policyResult.reason

  await storeQueryEntry({
    userId: user.id,
    queryText: query,
    status,
    risk,
  })

  await createLogEntry({
    userId: user.id,
    action,
    status,
    risk,
    detail,
  })

  return res.json({
    status,
    risk,
    blocked: shouldBlock,
    detail,
    policy: policyResult,
    detection,
  })
}
