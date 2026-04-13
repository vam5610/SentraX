import {
  listPolicies,
  upsertPolicy,
} from "../models/policy.model.js"

export async function getPolicies(req, res) {
  try {
    const policies = await listPolicies()
    return res.json(policies)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function updatePolicy(req, res) {
  const { role, action, allowed } = req.body || {}
  if (role == null || action == null || typeof allowed !== "boolean") {
    return res.status(400).json({ message: "role, action, and allowed(boolean) are required" })
  }

  try {
    const policy = await upsertPolicy({
      role,
      action,
      effect: allowed ? "ALLOW" : "DENY",
    })
    return res.json(policy)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

export async function addPolicy(req, res) {
  const { role, action, effect } = req.body || {}
  if (!role || !action || !effect) {
    return res.status(400).json({ message: "role, action, and effect are required" })
  }

  try {
    const policy = await upsertPolicy({
      role,
      action,
      effect,
    })
    return res.json(policy)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
