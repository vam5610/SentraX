import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import {
  createUser,
  findUserByEmail,
} from "../models/user.model.js"

const jwtKey = process.env.JWT_SECRET || "sentra-secret"

export async function login(req, res) {
  const { email, password } = req.body || {}
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" })
  }

  const user = await findUserByEmail(email.toLowerCase().trim())
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return res.status(401).json({ message: "Invalid credentials" })
  }

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    jwtKey,
    { expiresIn: "1h" },
  )

  return res.json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  })
}

export async function signup(req, res) {
  const { name, email, password, role } = req.body || {}
  if (!email || !password || !role) {
    return res
      .status(400)
      .json({ message: "Email, password, and role are required" })
  }

  const normalizedEmail = email.trim().toLowerCase()
  const existing = await findUserByEmail(normalizedEmail)
  if (existing) {
    return res.status(409).json({ message: "User already exists" })
  }

  const user = await createUser({
    email: normalizedEmail,
    password,
    role,
  })

  const token = jwt.sign(
    { userId: user.id, role: user.role, email: user.email },
    jwtKey,
    { expiresIn: "1h" },
  )

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  })
}
