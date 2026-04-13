import {
  countBlockedLogs,
  countTotalLogs,
  countUniqueUsers,
  getDailyTrends,
  getTopUsers,
  getRiskDistribution,
} from "../../logging-service/models/log.model.js"

export async function getOverview(req, res) {
  try {
    const [total, blocked, unique, distribution] = await Promise.all([
      countTotalLogs(),
      countBlockedLogs(),
      countUniqueUsers(),
      getRiskDistribution(),
    ])
    return res.json({
      total,
      blocked,
      users: unique,
      distribution,
    })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function getActivity(req, res) {
  try {
    const days = req.analyticsDays ?? 7
    const data = await getDailyTrends(days)
    return res.json(data)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function getUsers(req, res) {
  try {
    const users = await getTopUsers()
    return res.json(users)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
