export function validatePolicyRequest(req, res, next) {
  const { role, action } = req.body || {}
  if (!role || !action) {
    return res.status(400).json({ message: "role and action are required" })
  }
  next()
}

export function requireAdminRole(req, res, next) {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin level access required" })
  }
  next()
}
