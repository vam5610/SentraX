export function requireQueryBody(req, res, next) {
  const { query } = req.body || {}
  if (!query || typeof query !== "string") {
    return res.status(400).json({ message: "query text is required" })
  }
  next()
}
