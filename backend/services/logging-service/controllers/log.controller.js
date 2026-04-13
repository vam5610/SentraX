import { createLogEntry, fetchLogs } from "../models/log.model.js"

export async function getLogs(req, res) {
  try {
    const logs = await fetchLogs()
    return res.json(
      logs.map((log) => ({
        id: log.id,
        time: log.created_at,
        user: log.email ?? "unknown",
        action: log.action,
        status: log.status,
        risk: log.risk,
        detail: log.detail,
      })),
    )
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function postLogs(req, res) {
  const { action, status, risk, detail } = req.body || {}
  if (!action || !status || !risk) {
    return res.status(400).json({ message: "action, status, and risk are required" })
  }

  try {
    const log = await createLogEntry({
      userId: req.user.id,
      action,
      status,
      risk,
      detail,
    })
    return res.status(201).json(log)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
