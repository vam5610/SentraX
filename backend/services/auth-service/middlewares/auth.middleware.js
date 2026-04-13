import jwt from "jsonwebtoken"

import { findUserById } from "../models/user.model.js"

const jwtKey = process.env.JWT_SECRET || "sentra-secret"

export async function protect(req, res, next) {
  const authHeader = req.headers.authorization || ""
  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" })
  }

  const token = authHeader.replace("Bearer ", "").trim()
  if (!token) {
    return res.status(401).json({ message: "Authorization token missing" })
  }

  try {
    const decoded = jwt.verify(token, jwtKey)
    const user = await findUserById(decoded.userId)
    if (!user) {
      return res.status(401).json({ message: "Unauthorized user" })
    }

    req.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    }
    next()
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" })
  }
}

export function requireRole(requiredRole) {
  return (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
      return res.status(403).json({ message: "Insufficient permissions" })
    }
    next()
  }
}
