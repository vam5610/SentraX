import express from "express"

import { getLogs, postLogs } from "../controllers/log.controller.js"
import { protect } from "../../auth-service/middlewares/auth.middleware.js"
import { validateLogPayload } from "../middlewares/logging.middleware.js"

const router = express.Router()

router.get("/", protect, getLogs)
router.post("/", protect, validateLogPayload, postLogs)

export default router
