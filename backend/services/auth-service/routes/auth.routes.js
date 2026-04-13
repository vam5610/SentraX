import express from "express"

import { login, signup } from "../controllers/auth.controller.js"
import { loginLimiter } from "../middlewares/rateLimiter.middleware.js"

const router = express.Router()

router.post("/login", loginLimiter, login)
router.post("/signup", loginLimiter, signup)

export default router
