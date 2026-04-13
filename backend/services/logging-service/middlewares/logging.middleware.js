export function validateLogPayload(req, res, next) {
  const { action, status, risk } = req.body || {}
  if (!action || !status || !risk) {
    return res.status(400).json({ message: "action, status, and risk are required" })
  }
  next()
}
