import express from "express"

import { executeProxy } from "../controllers/proxy.controller.js"
import { requireQueryBody } from "../middlewares/proxy.middleware.js"
import { protect } from "../../auth-service/middlewares/auth.middleware.js"

const router = express.Router()

router.post("/execute", protect, requireQueryBody, executeProxy)

export default router
