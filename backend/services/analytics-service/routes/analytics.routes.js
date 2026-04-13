import express from "express"

import {
  getOverview,
  getActivity,
  getUsers,
} from "../controllers/analytics.controller.js"
import { protect } from "../../auth-service/middlewares/auth.middleware.js"
import { parseDaysParam } from "../middlewares/analytics.middleware.js"

const router = express.Router()

router.use(protect)

router.get("/overview", getOverview)
router.get("/activity", parseDaysParam, getActivity)
router.get("/users", getUsers)

export default router
