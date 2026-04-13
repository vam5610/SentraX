export function parseDaysParam(req, res, next) {
  const days = Number(req.query.days || 7)
  if (Number.isNaN(days) || days < 1 || days > 30) {
    return res.status(400).json({ message: "days must be between 1 and 30" })
  }
  req.analyticsDays = days
  next()
}
