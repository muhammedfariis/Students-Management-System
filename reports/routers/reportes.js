import express from "express"
import {
  studentEnrollmentReport,
  financialReports,
  salepersons
} from "../controllers/report.js"

import userRoles from "../../authentications/middlewares/userRoles.js"
import access from "../../authentications/middlewares/authmiddle.js"

const router = express.Router()

router.get("/enrollment" , access , userRoles("admin" , "director"),studentEnrollmentReport)
router.get("/financial" , access , userRoles("admin" , "director"),financialReports)
router.get("/sales-performance" , access , userRoles("admin","director","sales"),salepersons)

export default router