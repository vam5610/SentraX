import express from "express"

import {
  getPolicies,
  updatePolicy,
  addPolicy,
} from "../controllers/policy.controller.js"
import { protect } from "../../auth-service/middlewares/auth.middleware.js"
import {
  validatePolicyRequest,
  requireAdminRole,
} from "../middlewares/policy.middleware.js"

const router = express.Router()

router.use(protect)

router.get("/", getPolicies)
router.post("/update", requireAdminRole, validatePolicyRequest, updatePolicy)
router.post("/add", requireAdminRole, validatePolicyRequest, addPolicy)

export default router
