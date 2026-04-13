import express from "express"
import cors from "cors"
import helmet from "helmet"
import dotenv from "dotenv"

import "./shared/db.js"
import authRoutes from "./services/auth-service/routes/auth.routes.js"
import policyRoutes from "./services/policy-service/routes/policy.routes.js"
import proxyRoutes from "./services/proxy-service/routes/proxy.routes.js"
import logRoutes from "./services/logging-service/routes/log.routes.js"
import analyticsRoutes from "./services/analytics-service/routes/analytics.routes.js"
import { ensureDefaultUsers } from "./services/auth-service/models/user.model.js"
import { ensureSchema } from "./shared/initDb.js"

dotenv.config()

const app = express()

app.use(helmet())
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  }),
)
app.use(express.json())

app.get("/health", (req, res) => res.json({ status: "ok" }))

app.use("/auth", authRoutes)
app.use("/policies", policyRoutes)
app.use("/proxy", proxyRoutes)
app.use("/logs", logRoutes)
app.use("/analytics", analyticsRoutes)

const PORT = process.env.PORT || 4000

async function startServer() {
  try {
    await ensureSchema()
    await ensureDefaultUsers()
    app.listen(PORT, () => {
      console.log(`✨ Sentra backend running on port ${PORT}`)
    })
  } catch (error) {
    console.error("Unable to start backend", error)
    process.exit(1)
  }
}

startServer()
